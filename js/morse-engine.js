/**
 * MorseVision - Morse Code Translation & DSP Decoding Engine
 * Implements:
 * - Morse Dictionary translation maps
 * - Web Audio tone synthesis
 * - Client-side WAV compiler
 * - Fully Functional Goertzel Filter Digital Signal Processing (DSP) Audio/Video Decoder
 */

const MorseDictionary = {
  'A': '.-',     'B': '-...',   'C': '-.-.',   'D': '-..',    'E': '.',
  'F': '..-.',   'G': '--.',    'H': '....',   'I': '..',     'J': '.---',
  'K': '-.-',    'L': '.-..',   'M': '--',     'N': '-.',     'O': '---',
  'P': '.--.',   'Q': '--.-',   'R': '.-.',    'S': '...',    'T': '-',
  'U': '..-',    'V': '...-',   'W': '.--',    'X': '-..-',   'Y': '-.--',
  'Z': '--..',   '1': '.----',  '2': '..---',  '3': '...--',  '4': '....-',
  '5': '.....',  '6': '-....',  '7': '--...',  '8': '---..',  '9': '----.',
  '0': '-----',  '.': '.-.-.-', ',': '--..--', '?': '..--..', '\'': '.----.',
  '!': '-.-.--', '/': '-..-.',  '(': '-.--.',  ')': '-.--.-', '&': '.-...',
  ':': '---...', ';': '-.-.-.', '=': '-...-',  '+': '.-.-.',  '-': '-....-',
  '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.', ' ': '/'
};

const ReverseMorseDictionary = {};
Object.keys(MorseDictionary).forEach(char => {
  const code = MorseDictionary[char];
  if (code !== '/') {
    ReverseMorseDictionary[code] = char;
  }
});

const MorseEngine = {
  encode(text) {
    if (!text) return '';
    return text
      .toUpperCase()
      .split('')
      .map(char => {
        if (MorseDictionary[char]) {
          return MorseDictionary[char];
        }
        return '?';
      })
      .join(' ');
  },

  decode(morse) {
    if (!morse) return '';
    
    // Normalize: trim leading/trailing spaces and slashes
    let cleanMorse = morse.trim().replace(/^[\s/]+|[\s/]+$/g, '');
    // Replace duplicate/consecutive slashes with a single space-slash-space
    cleanMorse = cleanMorse.replace(/\s*\/+\s*/g, ' / ');
    // Replace multiple spaces with a single space
    cleanMorse = cleanMorse.replace(/ +/g, ' ');
    
    if (!cleanMorse) return '';

    const words = cleanMorse.split(' / ');
    
    const decodedWords = words.map(word => {
      const letters = word.split(' ');
      return letters
        .map(letter => {
          if (ReverseMorseDictionary[letter]) {
            return ReverseMorseDictionary[letter];
          }
          if (letter === '' || letter === '/') return '';
          return '__INVALID__'; // Temporary placeholder for invalid Morse symbols
        })
        .join('');
    });
    
    let decodedText = decodedWords.join(' ');
    
    // Remove leading/trailing invalid placeholders
    while (decodedText.startsWith('__INVALID__')) {
      decodedText = decodedText.substring('__INVALID__'.length);
    }
    while (decodedText.endsWith('__INVALID__')) {
      decodedText = decodedText.substring(0, decodedText.length - '__INVALID__'.length);
    }
    
    // Convert remaining invalid placeholders inside the message to '?'
    const cleanedText = decodedText.replaceAll('__INVALID__', '?');
    return cleanedText.trim();
  },

  validateMorse(morse) {
    if (!morse) return { isValid: true, errorIndex: -1 };
    
    const chars = morse.split('');
    const validSymbols = ['.', '-', ' ', '/', '\n'];
    
    for (let i = 0; i < chars.length; i++) {
      if (!validSymbols.includes(chars[i])) {
        return { isValid: false, errorIndex: i, invalidChar: chars[i] };
      }
    }
    
    return { isValid: true, errorIndex: -1 };
  },

  bufferToWavBlob(buffer) {
    const numChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const format = 1; // PCM
    const bitDepth = 16;
    const bytesPerSample = bitDepth / 8;
    const blockAlign = numChannels * bytesPerSample;
    const dataLength = buffer.length * blockAlign;
    const bufferLength = 44 + dataLength;

    const arrayBuffer = new ArrayBuffer(bufferLength);
    const view = new DataView(arrayBuffer);

    const writeString = (offset, string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    writeString(0, 'RIFF');
    view.setUint32(4, 36 + dataLength, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, format, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * blockAlign, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(36, bitDepth, true);
    writeString(40, 'data');
    view.setUint32(44, dataLength, true);

    const channelData = buffer.getChannelData(0);
    let index = 0;

    for (let i = 0; i < buffer.length; i++) {
      let sample = Math.max(-1, Math.min(1, channelData[i]));
      sample = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
      view.setInt16(44 + index, sample, true);
      index += 2;
    }

    return new Blob([arrayBuffer], { type: 'audio/wav' });
  },

  synthesizeMorseBuffer(morse, speedWPM = 20, frequencyHz = 800, oscType = 'sine') {
    const dotDuration = 1.2 / speedWPM;
    const dashDuration = dotDuration * 3;
    const symbolSpace = dotDuration;
    const letterSpace = dotDuration * 3;
    const wordSpace = dotDuration * 7;

    let totalTime = 0.5;
    const symbols = (morse || '').split('');
    symbols.forEach(char => {
      if (char === '.') totalTime += dotDuration + symbolSpace;
      else if (char === '-') totalTime += dashDuration + symbolSpace;
      else if (char === ' ') totalTime += letterSpace;
      else if (char === '/') totalTime += wordSpace;
    });
    totalTime += 0.5;

    const sampleRate = 44100;
    const numSamples = Math.ceil(totalTime * sampleRate);
    const OfflineCtx = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    if (!OfflineCtx) return Promise.reject(new Error("OfflineAudioContext not supported"));

    const offline = new OfflineCtx(1, Math.max(numSamples, 4410), sampleRate);
    const osc = offline.createOscillator();
    const gain = offline.createGain();

    osc.type = oscType;
    osc.frequency.setValueAtTime(frequencyHz, 0);
    gain.gain.setValueAtTime(0, 0);

    osc.connect(gain);
    gain.connect(offline.destination);

    let currentTime = 0.2;
    symbols.forEach(char => {
      if (char === '.') {
        gain.gain.setValueAtTime(0.8, currentTime);
        currentTime += dotDuration;
        gain.gain.setValueAtTime(0, currentTime);
        currentTime += symbolSpace;
      } else if (char === '-') {
        gain.gain.setValueAtTime(0.8, currentTime);
        currentTime += dashDuration;
        gain.gain.setValueAtTime(0, currentTime);
        currentTime += symbolSpace;
      } else if (char === ' ') {
        currentTime += letterSpace;
      } else if (char === '/') {
        currentTime += wordSpace;
      }
    });

    osc.start(0);
    osc.stop(totalTime);

    return offline.startRendering();
  },

  playMorse(morse, speedWPM = 20, frequencyHz = 800, oscType = 'sine', onComplete = null) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) {
      alert("Web Audio API is not supported in this browser.");
      return null;
    }
    
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = oscType;
    osc.frequency.setValueAtTime(frequencyHz, ctx.currentTime);
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    osc.start(0);

    const dotDur = 1.2 / speedWPM;
    const dashDur = 3 * dotDur;
    const symbolSpace = 1 * dotDur;
    const letterSpace = 3 * dotDur;
    const wordSpace = 7 * dotDur;

    let time = ctx.currentTime + 0.1;
    const cleanMorse = morse.trim().replace(/ {2,}/g, ' / ');
    const words = cleanMorse.split(' / ');
    
    words.forEach((word) => {
      const letters = word.split(' ');
      letters.forEach((letter) => {
        const symbols = letter.split('');
        symbols.forEach((symbol) => {
          if (symbol === '.') {
            gainNode.gain.setValueAtTime(1, time);
            time += dotDur;
            gainNode.gain.setValueAtTime(0, time);
            time += symbolSpace;
          } else if (symbol === '-') {
            gainNode.gain.setValueAtTime(1, time);
            time += dashDur;
            gainNode.gain.setValueAtTime(0, time);
            time += symbolSpace;
          }
        });
        time += (letterSpace - symbolSpace);
      });
      time += (wordSpace - letterSpace);
    });

    const totalDurationMs = (time - ctx.currentTime) * 1000;
    let stopTimeout = setTimeout(() => {
      osc.stop();
      ctx.close();
      if (onComplete) onComplete();
    }, totalDurationMs + 100);

    return {
      stop: () => {
        clearTimeout(stopTimeout);
        try {
          osc.stop();
          ctx.close();
        } catch(e) {}
      }
    };
  },

  generateWavBlob(morse, speedWPM = 20, frequencyHz = 800) {
    const sampleRate = 22050;
    const dotDur = 1.2 / speedWPM;
    const dashDur = 3 * dotDur;
    const symbolSpace = 1 * dotDur;
    const letterSpace = 3 * dotDur;
    const wordSpace = 7 * dotDur;
    
    const cleanMorse = morse.trim().replace(/ {2,}/g, ' / ');
    const words = cleanMorse.split(' / ');
    
    let totalSeconds = 0.2;
    
    words.forEach((word) => {
      const letters = word.split(' ');
      letters.forEach((letter) => {
        const symbols = letter.split('');
        symbols.forEach((symbol) => {
          if (symbol === '.') {
            totalSeconds += dotDur + symbolSpace;
          } else if (symbol === '-') {
            totalSeconds += dashDur + symbolSpace;
          }
        });
        totalSeconds += (letterSpace - symbolSpace);
      });
      totalSeconds += (wordSpace - letterSpace);
    });
    
    const numSamples = Math.ceil(totalSeconds * sampleRate);
    const buffer = new Float32Array(numSamples);
    let sampleOffset = Math.floor(0.1 * sampleRate);
    
    words.forEach((word) => {
      const letters = word.split(' ');
      letters.forEach((letter) => {
        const symbols = letter.split('');
        symbols.forEach((symbol) => {
          let duration = 0;
          if (symbol === '.') duration = dotDur;
          else if (symbol === '-') duration = dashDur;
          
          if (duration > 0) {
            const length = Math.floor(duration * sampleRate);
            for (let i = 0; i < length; i++) {
              if (sampleOffset + i < numSamples) {
                const t = i / sampleRate;
                const rampLength = Math.floor(0.005 * sampleRate);
                let env = 1.0;
                if (i < rampLength) env = i / rampLength;
                else if (i > length - rampLength) env = (length - i) / rampLength;
                
                buffer[sampleOffset + i] = Math.sin(2 * Math.PI * frequencyHz * t) * 0.5 * env;
              }
            }
            sampleOffset += length + Math.floor(symbolSpace * sampleRate);
          }
        });
        sampleOffset += Math.floor((letterSpace - symbolSpace) * sampleRate);
      });
      sampleOffset += Math.floor((wordSpace - letterSpace) * sampleRate);
    });
    
    const wavBuffer = new ArrayBuffer(44 + numSamples * 2);
    const view = new DataView(wavBuffer);
    
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + numSamples * 2, true);
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(view, 36, 'data');
    view.setUint32(40, numSamples * 2, true);
    
    let index = 44;
    for (let i = 0; i < numSamples; i++) {
      let s = Math.max(-1, Math.min(1, buffer[i]));
      view.setInt16(index, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
      index += 2;
    }
    
    return new Blob([view], { type: 'audio/wav' });
  },

  /**
   * Goertzel filter calculation for a specific window
   */
  goertzelFilter(data, targetFreq, sampleRate) {
    const sLen = data.length;
    const k = Math.round(sLen * targetFreq / sampleRate);
    const w = 2 * Math.PI * k / sLen;
    const cosine = Math.cos(w);
    const coeff = 2 * cosine;
    let q0 = 0, q1 = 0, q2 = 0;
    
    for (let i = 0; i < sLen; i++) {
      q0 = coeff * q1 - q2 + data[i];
      q2 = q1;
      q1 = q0;
    }
    return q1 * q1 + q2 * q2 - coeff * q1 * q2;
  },

  /**
   * Real DSP Morse Code Audio/Video Decoder
   */
  decodeAudioFile(file, onProgress, onLog, onSuccess, onError, cancelRef) {
    try {
      const startTime = performance.now();
      
      // Step 6: Automatically run validation sweep and print details in system log
      this.runSelfValidation(onLog);

      const reader = new FileReader();

      cancelRef.abort = () => {
        try {
          reader.abort();
        } catch(e) {}
        onLog("[WARNING] Reading process aborted by operator.");
      };

      reader.onload = (e) => {
        try {
          if (cancelRef.isAborted) return;
          
          onProgress(12, "Extracting audio...");
          onLog("[INFO] File loaded into memory buffer.");
          onLog("[INFO] Extracting audio stream from file container...");

          const AudioContext = window.AudioContext || window.webkitAudioContext;
          const actx = new AudioContext();

          cancelRef.abort = () => {
            try {
              actx.close();
            } catch(e) {}
            onLog("[WARNING] Audio extraction context closed.");
          };

          actx.decodeAudioData(e.target.result, (audioBuffer) => {
            try {
              if (cancelRef.isAborted) return;

              onProgress(22, "Converting to WAV...");
              const duration = audioBuffer.duration;
              const sampleRate = audioBuffer.sampleRate;
              onLog(`[INFO] Audio track decoded. Sample Rate: ${sampleRate} Hz, Duration: ${duration.toFixed(2)}s`);

              // Perform analysis on Left channel data
              const channelData = audioBuffer.getChannelData(0);
              
              onProgress(48, "Processing audio stream...");
              
              // Delegate core DSP timing analysis to decodePcmBuffer
              this.decodePcmBuffer(
                channelData,
                sampleRate,
                onProgress,
                onLog,
                (result) => {
                  // Forward success result
                  onProgress(100, "Completed");
                  const processingTime = ((performance.now() - startTime) / 1000).toFixed(2);
                  onLog(`[SUCCESS] Message decoded successfully in ${processingTime}s.`);
                  
                  // Keep duration parameter accurate
                  result.duration = `${Math.floor(duration / 60)}:${Math.floor(duration % 60).toString().padStart(2, '0')}`;
                  result.processingTime = `${processingTime}s`;
                  
                  onSuccess(result);
                  actx.close();
                },
                (err) => {
                  onError(err);
                  actx.close();
                },
                cancelRef,
                duration,
                startTime
              );
            } catch (innerErr) {
              onError(`Analysis error: ${innerErr.message || innerErr}`);
            }
          }, (err) => {
            onError(`Audio context decoding error: ${err.message || 'Corrupted file payload.'}`);
          });
        } catch (onloadErr) {
          onError(`Extraction error: ${onloadErr.message || onloadErr}`);
        }
      };

      reader.onerror = () => {
        onError("Failed to read file buffer.");
      };

      onProgress(5, "Loading file...");
      reader.readAsArrayBuffer(file);
    } catch (globalErr) {
      onError(`Decoding setup failure: ${globalErr.message || globalErr}`);
    }
  },

  /**
   * core PCM buffer Morse Code decoder logic
   */
  decodePcmBuffer(channelData, sampleRate, onProgress, onLog, onSuccess, onError, cancelRef, originalDuration = 0, globalStartTime = 0) {
    try {
      const startTime = globalStartTime || performance.now();
      const duration = originalDuration || (channelData.length / sampleRate);

      // 1. Preprocessing: DC Offset Removal
      let sumData = 0;
      for (let i = 0; i < channelData.length; i++) sumData += channelData[i];
      const dcMean = sumData / channelData.length;
      for (let i = 0; i < channelData.length; i++) channelData[i] -= dcMean;

      // 2. Preprocessing: Volume Normalization
      let maxAbsVal = 0;
      for (let i = 0; i < channelData.length; i++) {
        const abs = Math.abs(channelData[i]);
        if (abs > maxAbsVal) maxAbsVal = abs;
      }
      if (maxAbsVal > 0) {
        const normScale = 0.98 / maxAbsVal;
        for (let i = 0; i < channelData.length; i++) channelData[i] *= normScale;
      }

      // 3. Scan dominant beep frequency (300Hz - 1200Hz)
      let bestFreq = 800;
      let maxEnergy = 0;
      let energySumAll = 0;
      
      const sweepFreqs = [];
      for (let f = 300; f <= 1200; f += 25) {
        sweepFreqs.push(f);
      }
      
      const sampleSize = 1000;
      const numCheckPoints = 20;
      
      sweepFreqs.forEach(freq => {
        let energySum = 0;
        for (let p = 0; p < numCheckPoints; p++) {
          const offset = Math.floor((channelData.length / numCheckPoints) * p) + 2000;
          if (offset + sampleSize < channelData.length) {
            const slice = channelData.subarray(offset, offset + sampleSize);
            energySum += this.goertzelFilter(slice, freq, sampleRate);
          }
        }
        energySumAll += energySum;
        if (energySum > maxEnergy) {
          maxEnergy = energySum;
          bestFreq = freq;
        }
      });

      const avgSweepEnergy = energySumAll / sweepFreqs.length;
      const spectralPeakRatio = maxEnergy / (avgSweepEnergy || 1);

      // 4. Envelope generation (15ms windowing)
      const windowSize = Math.floor(0.015 * sampleRate);
      const numWindows = Math.floor(channelData.length / windowSize);
      
      const envGoertzel = new Float32Array(numWindows);
      const envBroadband = new Float32Array(numWindows);
      
      let maxGoertzel = 0;
      let maxBroadband = 0;
      
      for (let w = 0; w < numWindows; w++) {
        if (cancelRef.isAborted) return;
        const startIdx = w * windowSize;
        const slice = channelData.subarray(startIdx, startIdx + windowSize);
        
        // Goertzel envelope (pitch-based)
        const energy = this.goertzelFilter(slice, bestFreq, sampleRate);
        envGoertzel[w] = Math.sqrt(energy);
        if (envGoertzel[w] > maxGoertzel) maxGoertzel = envGoertzel[w];
        
        // Broadband envelope (amplitude-based RMS)
        let sumSq = 0;
        for (let i = 0; i < slice.length; i++) {
          sumSq += slice[i] * slice[i];
        }
        envBroadband[w] = Math.sqrt(sumSq / slice.length);
        if (envBroadband[w] > maxBroadband) maxBroadband = envBroadband[w];
      }

      let envelope = new Float32Array(numWindows);
      let useBroadband = false;
      if (spectralPeakRatio < 2.2) {
        useBroadband = true;
        for (let i = 0; i < numWindows; i++) envelope[i] = envBroadband[i];
      } else {
        for (let i = 0; i < numWindows; i++) envelope[i] = envGoertzel[i];
      }

      // Smooth the envelope with a 3-point moving average filter
      const smoothed = new Float32Array(numWindows);
      for (let i = 0; i < numWindows; i++) {
        const prev = i > 0 ? envelope[i - 1] : envelope[i];
        const next = i < numWindows - 1 ? envelope[i + 1] : envelope[i];
        smoothed[i] = (prev + envelope[i] + next) / 3;
      }
      envelope = smoothed;

      // Adaptive Noise Floor Detection & Subtraction (sorting lowest 20%)
      const envValuesSorted = [...envelope];
      envValuesSorted.sort((a, b) => a - b);
      const lowPctIdx = Math.floor(numWindows * 0.20);
      let noiseFloorEnergySum = 0;
      for (let i = 0; i < lowPctIdx; i++) {
        noiseFloorEnergySum += envValuesSorted[i];
      }
      const avgNoiseFloor = lowPctIdx > 0 ? (noiseFloorEnergySum / lowPctIdx) : 0;
      
      // Subtract background noise floor
      for (let i = 0; i < numWindows; i++) {
        envelope[i] = Math.max(0, envelope[i] - avgNoiseFloor);
      }
      
      // Re-normalize envelope after noise subtraction
      let cleanMaxEnvVal = 0;
      for (let i = 0; i < numWindows; i++) {
        if (envelope[i] > cleanMaxEnvVal) cleanMaxEnvVal = envelope[i];
      }
      
      if (cleanMaxEnvVal < 0.01) {
        onError("No Morse code signal detected. Possible reasons: Poor audio quality or empty silence.");
        return;
      }

      // Step 2: Adaptive Thresholding based on Valley/Peak statistics
      const sortedCleanEnv = [...envelope].sort((a, b) => a - b);
      const midIdx = Math.floor(sortedCleanEnv.length / 2);
      let valleySum = 0;
      for (let i = 0; i < midIdx; i++) valleySum += sortedCleanEnv[i];
      const avgValley = valleySum / (midIdx || 1);
      
      let peakSum = 0;
      for (let i = midIdx; i < sortedCleanEnv.length; i++) peakSum += sortedCleanEnv[i];
      const avgPeak = peakSum / ((sortedCleanEnv.length - midIdx) || 1);
      
      const threshold = Math.max(avgValley + (avgPeak - avgValley) * 0.40, cleanMaxEnvVal * 0.30);

      // Binary state conversion
      const binaryStates = new Uint8Array(numWindows);
      for (let i = 0; i < numWindows; i++) {
        binaryStates[i] = envelope[i] > threshold ? 1 : 0;
      }

      // Step 3: Run-length Segmentation Smoothing (dropout closing & spike suppression)
      const smoothedStates = new Uint8Array(numWindows);
      for (let i = 0; i < numWindows; i++) smoothedStates[i] = binaryStates[i];
      
      // Close short OFF dropouts (<= 15ms, i.e. 1 window of OFF)
      let offCount = 0;
      for (let i = 0; i < numWindows; i++) {
        if (binaryStates[i] === 0) {
          offCount++;
        } else {
          if (offCount > 0 && offCount <= 1) {
            for (let j = i - offCount; j < i; j++) {
              if (j >= 0) smoothedStates[j] = 1;
            }
          }
          offCount = 0;
        }
      }
      if (offCount > 0 && offCount <= 1) {
        for (let j = numWindows - offCount; j < numWindows; j++) {
          smoothedStates[j] = 1;
        }
      }

      // Suppress short ON spikes (<= 15ms, i.e. 1 window of ON)
      const tempStates = new Uint8Array(numWindows);
      for (let i = 0; i < numWindows; i++) tempStates[i] = smoothedStates[i];
      
      let onCount = 0;
      for (let i = 0; i < numWindows; i++) {
        if (tempStates[i] === 1) {
          onCount++;
        } else {
          if (onCount > 0 && onCount <= 1) {
            for (let j = i - onCount; j < i; j++) {
              if (j >= 0) smoothedStates[j] = 0;
            }
          }
          onCount = 0;
        }
      }
      if (onCount > 0 && onCount <= 1) {
        for (let j = numWindows - onCount; j < numWindows; j++) {
          smoothedStates[j] = 0;
        }
      }

      // Run length encoding
      let rawRuns = [];
      let currentState = smoothedStates[0];
      let currentDuration = 1;

      for (let i = 1; i < numWindows; i++) {
        if (smoothedStates[i] === currentState) {
          currentDuration++;
        } else {
          rawRuns.push({
            state: currentState,
            durationMs: currentDuration * 15 // each window is 15ms
          });
          currentState = smoothedStates[i];
          currentDuration = 1;
        }
      }
      rawRuns.push({
        state: currentState,
        durationMs: currentDuration * 15
      });

      // Filter out short remaining clicks/glitches < 35ms
      const smoothedRuns = [];
      rawRuns.forEach(run => {
        if (smoothedRuns.length > 0 && run.durationMs < 35) {
          smoothedRuns[smoothedRuns.length - 1].durationMs += run.durationMs;
        } else {
          smoothedRuns.push(run);
        }
      });

      const runs = [];
      smoothedRuns.forEach(run => {
        if (runs.length > 0 && runs[runs.length - 1].state === run.state) {
          runs[runs.length - 1].durationMs += run.durationMs;
        } else {
          runs.push(run);
        }
      });

      // Step 4: Robust Timing Classifier (Ignore outliers, use medians and Morse ratios)
      const onRuns = runs.filter(r => r.state === 1).map(r => r.durationMs).filter(d => d >= 35 && d <= 800);
      if (onRuns.length === 0) {
        onError("No Morse signal detected. Estimated timing sweeps failed.");
        return;
      }

      onRuns.sort((a, b) => a - b);
      
      const lowerHalf = onRuns.slice(0, Math.max(1, Math.floor(onRuns.length * 0.5)));
      let estimatedDotDurMs = lowerHalf[Math.floor(lowerHalf.length / 2)];
      
      const dashCandidates = onRuns.filter(d => d >= 1.8 * estimatedDotDurMs && d <= 5.0 * estimatedDotDurMs);
      let estimatedDashDurMs = 3 * estimatedDotDurMs;
      
      if (dashCandidates.length > 0) {
        estimatedDashDurMs = dashCandidates[Math.floor(dashCandidates.length / 2)];
      } else {
        // Handle single cluster case adaptively
        if (estimatedDotDurMs > 135) {
          estimatedDashDurMs = estimatedDotDurMs;
          estimatedDotDurMs = estimatedDashDurMs / 3;
        } else {
          estimatedDashDurMs = 3 * estimatedDotDurMs;
        }
      }

      const decisionBoundaryOn = (estimatedDotDurMs + estimatedDashDurMs) / 2;
      const dotDurationS = estimatedDotDurMs / 1000;
      const wpm = Math.round(1.2 / dotDurationS);

      // K-medians clustering of OFF durations (gaps)
      const offDurations = runs
        .filter((r, idx) => r.state === 0 && idx > 0 && idx < runs.length - 1)
        .map(r => r.durationMs)
        .filter(d => d >= 20 && d <= 1500);

      let g1 = 1.0 * estimatedDotDurMs;
      let g2 = 3.0 * estimatedDotDurMs;
      let g3 = 7.0 * estimatedDotDurMs;

      for (let iter = 0; iter < 5; iter++) {
        const cluster1 = [];
        const cluster2 = [];
        const cluster3 = [];
        
        offDurations.forEach(d => {
          const dist1 = Math.abs(d - g1);
          const dist2 = Math.abs(d - g2);
          const dist3 = Math.abs(d - g3);
          
          if (dist1 <= dist2 && dist1 <= dist3) {
            cluster1.push(d);
          } else if (dist2 <= dist1 && dist2 <= dist3) {
            cluster2.push(d);
          } else {
            cluster3.push(d);
          }
        });
        
        if (cluster1.length > 0) {
          cluster1.sort((a, b) => a - b);
          g1 = cluster1[Math.floor(cluster1.length / 2)];
        }
        if (cluster2.length > 0) {
          cluster2.sort((a, b) => a - b);
          g2 = cluster2[Math.floor(cluster2.length / 2)];
        }
        if (cluster3.length > 0) {
          cluster3.sort((a, b) => a - b);
          g3 = cluster3[Math.floor(cluster3.length / 2)];
        }
      }

      // Step 1: Print audit logs in Debug Mode
      onLog(`\n================== DECODER DEBUG AUDIT ==================`);
      onLog(`[DEBUG] Sample Rate: ${sampleRate} Hz`);
      onLog(`[DEBUG] Window Size: ${windowSize} samples (${(windowSize / sampleRate * 1000).toFixed(1)} ms)`);
      onLog(`[DEBUG] Detected Frequency: ${useBroadband ? 'Broadband (Tapping)' : bestFreq + ' Hz'}`);
      onLog(`[DEBUG] Noise Floor: ${avgNoiseFloor.toFixed(5)}`);
      onLog(`[DEBUG] Envelope Peak: ${cleanMaxEnvVal.toFixed(5)}`);
      onLog(`[DEBUG] Threshold Value: ${threshold.toFixed(5)}`);
      onLog(`[DEBUG] Estimated Dot Duration: ${Math.round(estimatedDotDurMs)} ms`);
      onLog(`[DEBUG] Estimated Dash Duration: ${Math.round(estimatedDashDurMs)} ms`);
      onLog(`[DEBUG] Decision Boundary: ${Math.round(decisionBoundaryOn)} ms`);
      onLog(`[DEBUG] Estimated WPM: ${wpm} WPM`);
      onLog(`[DEBUG] Gap centroids - Symbol: ${Math.round(g1)}ms, Letter: ${Math.round(g2)}ms, Word: ${Math.round(g3)}ms`);
      onLog(`--------------------------------------------------------`);

      let pulseIdx = 1;
      let rawMorse = '';
      let hasStartedBeeps = false;
      let dotCount = 0;
      let dashCount = 0;
      const gapDurations = [];
      const gapClassifications = [];
      
      runs.forEach((run, idx) => {
        if (run.state === 1) {
          hasStartedBeeps = true;
          const classification = run.durationMs > decisionBoundaryOn ? 'DASH' : 'DOT';
          const startTimeOffset = (runs.slice(0, idx).reduce((s, r) => s + r.durationMs, 0) / 1000).toFixed(2);
          const endTimeOffset = (runs.slice(0, idx + 1).reduce((s, r) => s + r.durationMs, 0) / 1000).toFixed(2);
          
          const startWindow = Math.floor((parseFloat(startTimeOffset) * 1000) / 15);
          const endWindow = Math.floor((parseFloat(endTimeOffset) * 1000) / 15);
          let energySum = 0;
          let energyCount = 0;
          for (let w = startWindow; w < endWindow && w < numWindows; w++) {
            energySum += envelope[w];
            energyCount++;
          }
          const energy = energyCount > 0 ? (energySum / energyCount) : 0;
          
          onLog(`[DEBUG] Pulse #${pulseIdx}: Start: ${startTimeOffset}s, End: ${endTimeOffset}s, Duration: ${run.durationMs}ms, Energy: ${energy.toFixed(4)}, Class: ${classification}`);
          pulseIdx++;
          
          if (classification === 'DASH') {
            rawMorse += '-';
            dashCount++;
          } else {
            rawMorse += '.';
            dotCount++;
          }
        } else if (hasStartedBeeps && idx < runs.length - 1) {
          const dist1 = Math.abs(run.durationMs - g1);
          const dist2 = Math.abs(run.durationMs - g2);
          const dist3 = Math.abs(run.durationMs - g3);
          
          let gapClass = "Symbol Gap";
          if (dist2 < dist1 && dist2 <= dist3) {
            gapClass = "Letter Gap";
            rawMorse += ' ';
          } else if (dist3 < dist1 && dist3 < dist2) {
            gapClass = "Word Gap";
            rawMorse += ' / ';
          }
          
          gapDurations.push(run.durationMs);
          gapClassifications.push(gapClass);
          onLog(`[DEBUG] Silence: Duration: ${run.durationMs}ms, Class: ${gapClass}`);
        }
      });

      const finalMorse = rawMorse.trim().replace(/ {2,}/g, ' ');
      onLog(`[DEBUG] Gap durations: ${gapDurations.join(', ')} ms`);
      onLog(`[DEBUG] Gap classifications: ${gapClassifications.join(', ')}`);
      onLog(`[DEBUG] Detected Morse: ${finalMorse}`);

      const decodedText = this.decode(finalMorse);
      onLog(`[DEBUG] Decoded Text: ${decodedText}`);
      onLog(`========================================================\n`);

      // Calculate confidence score based on timing variance
      let totalVariance = 0;
      let count = 0;
      runs.forEach(run => {
        if (run.state === 1 && run.durationMs > 35) {
          const expected = (run.durationMs > decisionBoundaryOn) ? estimatedDashDurMs : estimatedDotDurMs;
          totalVariance += Math.abs(run.durationMs - expected) / expected;
          count++;
        }
      });
      const avgVar = count > 0 ? (totalVariance / count) : 0.5;
      const confidence = Math.max(30, Math.round(100 - avgVar * 100));

      const totalCharacters = decodedText.replace(/[\s/]/g, '').length;
      const totalWords = decodedText.split(' ').filter(w => w.trim().length > 0).length;
      const noiseDb = avgNoiseFloor > 0 ? Math.round(20 * Math.log10(avgNoiseFloor / 0.05)) : -60;

      onSuccess({
        text: decodedText || '',
        morse: finalMorse || '',
        confidence: `${confidence}%`,
        wpm: `${wpm} WPM`,
        carrierFreq: useBroadband ? 'Broadband (Tapping)' : `${bestFreq} Hz`,
        duration: duration,
        processingTime: '0.00s',
        signalQuality: confidence > 80 ? 'Excellent' : confidence > 60 ? 'Moderate' : 'Poor',
        dotsCount: dotCount,
        dashesCount: dashCount,
        charactersCount: totalCharacters,
        wordsCount: totalWords,
        noiseLevel: `${noiseDb} dB`,
        channelData: channelData,
        sampleRate: sampleRate,
        runs: runs,
        decisionBoundaryOn: decisionBoundaryOn
      });
    } catch (err) {
      onError(`DSP calculation error: ${err.message || err}`);
    }
  },

  /**
   * Helper to synthesize PCM audio data directly in memory for validation sweeps
   */
  generatePcmBuffer(morse, speedWPM = 20, frequencyHz = 800, sampleRate = 8000) {
    const dotDur = 1.2 / speedWPM;
    const dashDur = 3 * dotDur;
    const symbolSpace = 1 * dotDur;
    const letterSpace = 3 * dotDur;
    const wordSpace = 7 * dotDur;
    
    const cleanMorse = morse.trim().replace(/ {2,}/g, ' / ');
    const words = cleanMorse.split(' / ');
    
    let totalSeconds = 0.2; // initial padding
    words.forEach((word) => {
      const letters = word.split(' ');
      letters.forEach((letter) => {
        const symbols = letter.split('');
        symbols.forEach((symbol) => {
          if (symbol === '.') totalSeconds += dotDur + symbolSpace;
          else if (symbol === '-') totalSeconds += dashDur + symbolSpace;
        });
        totalSeconds += (letterSpace - symbolSpace);
      });
      totalSeconds += (wordSpace - letterSpace);
    });
    
    const numSamples = Math.ceil(totalSeconds * sampleRate);
    const buffer = new Float32Array(numSamples);
    let sampleOffset = Math.floor(0.1 * sampleRate);
    
    words.forEach((word) => {
      const letters = word.split(' ');
      letters.forEach((letter) => {
        const symbols = letter.split('');
        symbols.forEach((symbol) => {
          let duration = 0;
          if (symbol === '.') duration = dotDur;
          else if (symbol === '-') duration = dashDur;
          
          if (duration > 0) {
            const length = Math.floor(duration * sampleRate);
            for (let i = 0; i < length; i++) {
              if (sampleOffset + i < numSamples) {
                const t = i / sampleRate;
                const rampLength = Math.floor(0.005 * sampleRate);
                let env = 1.0;
                if (i < rampLength) env = i / rampLength;
                else if (i > length - rampLength) env = (length - i) / rampLength;
                buffer[sampleOffset + i] = Math.sin(2 * Math.PI * frequencyHz * t) * 0.5 * env;
              }
            }
            sampleOffset += length + Math.floor(symbolSpace * sampleRate);
          }
        });
        sampleOffset += Math.floor((letterSpace - symbolSpace) * sampleRate);
      });
      sampleOffset += Math.floor((wordSpace - letterSpace) * sampleRate);
    });
    
    return buffer;
  },

  /**
   * Run validation suite using the synthesis-decoding loop
   */
  runSelfValidation(onLog) {
    onLog("\n========================================");
    onLog("[DEBUG] RUNNING DECODER SELF-VALIDATION TESTS");
    onLog("========================================");
    
    const testCases = [
      { text: "E", morse: "." },
      { text: "T", morse: "-" },
      { text: "I", morse: ".." },
      { text: "M", morse: "--" },
      { text: "S", morse: "..." },
      { text: "O", morse: "---" },
      { text: "HI", morse: ".... .." },
      { text: "SOS", morse: "... --- ..." },
      { text: "HELLO", morse: ".... . .-.. .-.. ---" }
    ];
    
    let passedCount = 0;
    
    testCases.forEach(tc => {
      try {
        const sampleRate = 8000;
        const pcmBuffer = this.generatePcmBuffer(tc.morse, 20, 800, sampleRate);
        
        let decodedMorse = "";
        let decodedText = "";
        
        this.decodePcmBuffer(
          pcmBuffer,
          sampleRate,
          () => {}, // dummy onProgress
          onLog, // forward logs for validation debug
          (res) => {
            decodedMorse = res.morse;
            decodedText = res.text;
          },
          (err) => {
            console.error("Validation error for", tc.text, err);
          },
          { isAborted: false }
        );
        
        const isPass = decodedText === tc.text;
        if (isPass) passedCount++;
        
        onLog(`Test [${tc.text}]: Expected Morse: "${tc.morse}", Detected Morse: "${decodedMorse}", Expected Text: "${tc.text}", Decoded Text: "${decodedText}" -> ${isPass ? 'PASS' : 'FAIL'}`);
      } catch (err) {
        onLog(`Test [${tc.text}]: Exception occurred: ${err.message || err} -> FAIL`);
      }
    });
    
    onLog(`[DEBUG] Validation Sweeps Completed. Result: ${passedCount}/${testCases.length} Passed.`);
    onLog("========================================\n");
  }
};

function writeString(view, offset, string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}
