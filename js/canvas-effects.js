/**
 * Canvas Effects & Visualizations for MorseVision
 * Handles:
 * - Interactive background particle / gradient orb systems (Orange theme)
 * - Dynamic audio processing waveform animations (Orange glowing lines)
 * - Custom high-tech analytics charts (Canvas-based, Orange accents)
 */

class BackgroundCanvas {
  constructor() {
    this.canvas = document.getElementById('bg-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.orbs = [];
    this.mouse = { x: null, y: null, tx: null, ty: null };
    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    window.addEventListener('mouseout', () => this.handleMouseOut());

    // Generate gradient orbs (in Orange/Amber spectrum)
    const colors = [
      { r: 255, g: 122, b: 0 },   // Neon Orange
      { r: 255, g: 75, b: 0 },    // Darker Orange
      { r: 255, g: 165, b: 0 }    // Bright Gold
    ];

    for (let i = 0; i < 4; i++) {
      const color = colors[i % colors.length];
      this.orbs.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 180 + 120,
        color: `rgba(${color.r}, ${color.g}, ${color.b}, 0.045)`,
        baseRadius: Math.random() * 180 + 120
      });
    }

    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  handleMouseMove(e) {
    this.mouse.tx = e.clientX;
    this.mouse.ty = e.clientY;
  }

  handleMouseOut() {
    this.mouse.tx = null;
    this.mouse.ty = null;
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Smooth mouse interpolation
    if (this.mouse.tx !== null) {
      if (this.mouse.x === null) {
        this.mouse.x = this.mouse.tx;
        this.mouse.y = this.mouse.ty;
      } else {
        this.mouse.x += (this.mouse.tx - this.mouse.x) * 0.08;
        this.mouse.y += (this.mouse.ty - this.mouse.y) * 0.08;
      }
    } else {
      this.mouse.x = null;
      this.mouse.y = null;
    }

    // Update and draw orbs
    this.orbs.forEach(orb => {
      orb.x += orb.vx;
      orb.y += orb.vy;

      if (orb.x < -orb.radius) orb.x = this.canvas.width + orb.radius;
      if (orb.x > this.canvas.width + orb.radius) orb.x = -orb.radius;
      if (orb.y < -orb.radius) orb.y = this.canvas.height + orb.radius;
      if (orb.y > this.canvas.height + orb.radius) orb.y = -orb.radius;

      if (this.mouse.x !== null) {
        const dx = this.mouse.x - orb.x;
        const dy = this.mouse.y - orb.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 500) {
          orb.x += dx * 0.003;
          orb.y += dy * 0.003;
        }
      }

      const grad = this.ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
      grad.addColorStop(0, orb.color);
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      this.ctx.beginPath();
      this.ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = grad;
      this.ctx.fill();
    });
  }
}

// Global ambient background instance
window.addEventListener('DOMContentLoaded', () => {
  window.bgCanvasEffect = new BackgroundCanvas();
});

// Waveform drawer
function animateWaveform(canvas, state) {
  if (!canvas) return null;
  const ctx = canvas.getContext('2d');
  let animationId;
  let phase = 0;
  
  const resizeCanvas = () => {
    const rect = canvas.parentNode.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = 100 * window.devicePixelRatio;
    canvas.style.width = '100%';
    canvas.style.height = '100px';
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  };
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const draw = () => {
    animationId = requestAnimationFrame(draw);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const w = canvas.width / window.devicePixelRatio;
    const h = canvas.height / window.devicePixelRatio;
    const midY = h / 2;
    
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    
    const grad = ctx.createLinearGradient(0, 0, w, 0);
    grad.addColorStop(0, '#FF5500');
    grad.addColorStop(0.5, '#FF7A00');
    grad.addColorStop(1, '#FFA500');
    
    ctx.strokeStyle = grad;
    
    for (let layer = 0; layer < 3; layer++) {
      ctx.beginPath();
      ctx.globalAlpha = layer === 0 ? 0.85 : layer === 1 ? 0.45 : 0.15;
      const step = layer === 0 ? 3 : layer === 1 ? 4 : 6;
      const amplitudeModifier = layer === 0 ? 28 : layer === 1 ? 16 : 8;
      
      for (let x = 0; x < w; x += step) {
        const scaleFactor = Math.sin((x / w) * Math.PI);
        const noise = Math.sin(x * 0.045 + phase + layer * 1.5) * Math.cos(x * 0.015 - phase);
        let val = midY + noise * amplitudeModifier * scaleFactor;
        
        if (state && state.progress) {
          const spikeFreq = 0.07 + (state.progress / 100) * 0.12;
          const spikeAmplitude = (Math.sin(phase * 5.2 + x * spikeFreq) > 0.65) ? 22 : 0;
          val += spikeAmplitude * scaleFactor * Math.random();
        }

        if (x === 0) ctx.moveTo(x, val);
        else ctx.lineTo(x, val);
      }
      ctx.stroke();
    }
    
    phase += 0.07;
  };
  
  draw();
  
  return {
    stop: () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    }
  };
}

const CanvasCharts = {
  drawUserGrowth(canvas, growth = {}) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.parentElement.clientWidth;
    const height = 180;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);

    const data = growth.data || [];
    const labels = growth.labels || [];
    
    ctx.clearRect(0, 0, width, height);

    const paddingLeft = 35;
    const paddingRight = 15;
    const paddingTop = 20;
    const paddingBottom = 25;
    
    const chartW = width - paddingLeft - paddingRight;
    const chartH = height - paddingTop - paddingBottom;

    const totalAct = data.reduce((a, b) => a + b, 0);
    if (totalAct === 0) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.font = '12px Sora, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('No telemetry data yet.', width / 2, height / 2);
      return;
    }

    const maxVal = Math.max(...data, 10) * 1.15;

    ctx.strokeStyle = 'rgba(255, 122, 0, 0.04)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 3; i++) {
      const y = paddingTop + (chartH / 3) * i;
      ctx.beginPath();
      ctx.moveTo(paddingLeft, y);
      ctx.lineTo(width - paddingRight, y);
      ctx.stroke();
    }

    const points = data.map((val, idx) => {
      const x = paddingLeft + (chartW / (data.length - 1)) * idx;
      const y = paddingTop + chartH - (val / maxVal) * chartH;
      return { x, y };
    });

    const areaGrad = ctx.createLinearGradient(0, paddingTop, 0, paddingTop + chartH);
    areaGrad.addColorStop(0, 'rgba(255, 122, 0, 0.15)');
    areaGrad.addColorStop(1, 'rgba(255, 122, 0, 0.0)');
    
    ctx.beginPath();
    ctx.moveTo(points[0].x, paddingTop + chartH);
    points.forEach(pt => ctx.lineTo(pt.x, pt.y));
    ctx.lineTo(points[points.length - 1].x, paddingTop + chartH);
    ctx.closePath();
    ctx.fillStyle = areaGrad;
    ctx.fill();

    const lineGrad = ctx.createLinearGradient(paddingLeft, 0, width - paddingRight, 0);
    lineGrad.addColorStop(0, '#FF5500');
    lineGrad.addColorStop(0.5, '#FF7A00');
    lineGrad.addColorStop(1, '#FFA500');
    
    ctx.beginPath();
    ctx.strokeStyle = lineGrad;
    ctx.lineWidth = 3;
    points.forEach((pt, idx) => {
      if (idx === 0) ctx.moveTo(pt.x, pt.y);
      else {
        const prev = points[idx - 1];
        const cpX1 = prev.x + (pt.x - prev.x) / 2;
        const cpY1 = prev.y;
        const cpX2 = prev.x + (pt.x - prev.x) / 2;
        const cpY2 = pt.y;
        ctx.bezierCurveTo(cpX1, cpY1, cpX2, cpY2, pt.x, pt.y);
      }
    });
    ctx.stroke();

    points.forEach((pt) => {
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(255, 122, 0, 0.5)';
      ctx.fillStyle = '#FFA500';
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.shadowBlur = 0;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 5.5, 0, Math.PI * 2);
      ctx.stroke();
    });

    ctx.fillStyle = '#A0A0A0';
    ctx.font = '10px Sora, sans-serif';
    ctx.textAlign = 'center';
    labels.forEach((lbl, idx) => {
      const x = paddingLeft + (chartW / (labels.length - 1)) * idx;
      ctx.fillText(lbl, x, height - 6);
    });

    ctx.textAlign = 'right';
    ctx.fillText(Math.round(maxVal).toString(), paddingLeft - 8, paddingTop + 5);
    ctx.fillText(Math.round(maxVal / 2).toString(), paddingLeft - 8, paddingTop + chartH / 2 + 5);
    ctx.fillText('0', paddingLeft - 8, paddingTop + chartH + 5);
  },

  drawFileTypes(canvas, types = {}) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.parentElement.clientWidth;
    const height = 180;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);

    const values = types.data || [];
    const labels = types.labels || [];

    ctx.clearRect(0, 0, width, height);

    const paddingLeft = 35;
    const paddingRight = 15;
    const paddingTop = 20;
    const paddingBottom = 25;
    
    const chartW = width - paddingLeft - paddingRight;
    const chartH = height - paddingTop - paddingBottom;

    const totalScans = values.reduce((a, b) => a + b, 0);
    if (totalScans === 0) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.font = '12px Sora, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('No data available yet.', width / 2, height / 2);
      return;
    }

    const maxVal = Math.max(...values, 10) * 1.1;

    ctx.strokeStyle = 'rgba(255, 122, 0, 0.04)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 3; i++) {
      const y = paddingTop + (chartH / 3) * i;
      ctx.beginPath();
      ctx.moveTo(paddingLeft, y);
      ctx.lineTo(width - paddingRight, y);
      ctx.stroke();
    }

    const barSpacing = chartW / values.length;
    const barW = barSpacing * 0.45;

    values.forEach((val, idx) => {
      const x = paddingLeft + barSpacing * idx + (barSpacing - barW) / 2;
      const barH = (val / maxVal) * chartH;
      const y = paddingTop + chartH - barH;

      const grad = ctx.createLinearGradient(0, y, 0, y + barH);
      grad.addColorStop(0, '#FF7A00');
      grad.addColorStop(1, '#FF5500');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(x, y, barW, barH, [6, 6, 0, 0]);
      ctx.fill();

      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.stroke();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 9px Sora, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(val.toString(), x + barW / 2, y - 6);
    });

    ctx.fillStyle = '#A0A0A0';
    ctx.font = '8px Sora, sans-serif';
    ctx.textAlign = 'center';
    labels.forEach((lbl, idx) => {
      const x = paddingLeft + barSpacing * idx + barSpacing / 2;
      ctx.fillText(lbl, x, height - 6);
    });

    ctx.textAlign = 'right';
    ctx.fillText(Math.round(maxVal).toString(), paddingLeft - 8, paddingTop + 5);
    ctx.fillText(Math.round(maxVal / 2).toString(), paddingLeft - 8, paddingTop + chartH / 2 + 5);
    ctx.fillText('0', paddingLeft - 8, paddingTop + chartH + 5);
  }
};

function initBackgroundCanvas() {
  if (!window.bgCanvas) {
    window.bgCanvas = new BackgroundCanvas();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBackgroundCanvas);
} else {
  initBackgroundCanvas();
}
