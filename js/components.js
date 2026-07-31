/**
 * MorseVision - Premium Orange/Black Glassmorphism Components
 * Includes:
 * - Redesigned Login, Register, Forgot Password, and Reset Password terminals
 * - Stepper Headers & concentric rings drag upload boxes
 * - Real audio visualizer wave canvas containers with zoom sliders
 * - Standard English Translator hubs & timeline history list cards
 * - Multi-page functional administrative dashboards
 */

const Icons = {
  logo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" class="icon" style="width:38px; height:38px;">
    <defs>
      <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FF5500" />
        <stop offset="50%" stop-color="#FF7A00" />
        <stop offset="100%" stop-color="#FFA500" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <path d="M15 25 L35 75 L45 45 L35 25 Z" fill="url(#orangeGrad)" filter="url(#glow)"/>
    <path d="M85 25 L65 75 L55 45 L65 25 Z" fill="url(#orangeGrad)" filter="url(#glow)"/>
    <path d="M50 45 L50 75" stroke="#FFA500" stroke-width="6" stroke-linecap="round" filter="url(#glow)"/>
    <circle cx="50" cy="35" r="7" fill="#FFFFFF" filter="url(#glow)"/>
  </svg>`,
  dashboard: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>`,
  translator: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 10h.01M12 10h.01M16 10h.01"/></svg>`,
  history: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  downloads: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
  profile: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  settings: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  logout: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
  bell: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
  cloud: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" class="icon icon-large"><path d="M18 10h-.01M17 14h.01M13 18h.01M12 12h.01M22 19a3 3 0 0 0-3-3h-1.3a8 8 0 1 0-15.4-3.3A5 5 0 0 0 6 22h12a4 4 0 0 0 4-3z"/><polyline points="16 12 12 8 8 12"/><line x1="12" y1="8" x2="12" y2="17"/></svg>`,
  play: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
  stop: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></svg>`,
  copy: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
  trash: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,
  check: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon"><polyline points="20 6 9 17 4 12"/></svg>`,
  sound: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`,
  key: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  search: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  admin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  users: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  file: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
  security: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  terminal: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`,
  sun: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
  moon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
  backup: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>`
};

function maskEmail(email) {
  if (!email || typeof email !== 'string' || !email.includes('@')) return email || '';
  const parts = email.split('@');
  const local = parts[0];
  const domain = parts[1];

  if (local.length <= 2) {
    return `${local}@${domain}`;
  }

  const visible = local.substring(0, 2);
  const hiddenCount = local.length - 2;
  const masked = '*'.repeat(hiddenCount);
  return `${visible}${masked}@${domain}`;
}

const Components = {
  // ----------------------------------------------------
  // WORKSPACE LOADING SCREEN & GLOBAL ERROR BOUNDARY
  // ----------------------------------------------------
  LoadingScreen(state) {
    return `
      <div style="min-height:100vh; width:100%; background:var(--bg-primary); display:flex; justify-content:center; align-items:center; flex-direction:column; position:relative; z-index:100;">
        <div style="display:flex; flex-direction:column; align-items:center; text-align:center; padding:40px;">
          <!-- Animated Glowing Logo -->
          <div class="animate-pulse-glow" style="width:72px; height:72px; border-radius:22px; background:var(--accent-gradient); display:flex; align-items:center; justify-content:center; color:#fff; box-shadow:0 10px 30px var(--accent-orange-glow); margin-bottom:24px;">
            ${Icons.logo}
          </div>

          <h2 style="font-size:1.6rem; font-weight:800; color:var(--text-primary); margin-bottom:8px; letter-spacing:-0.02em;">MorseVision</h2>
          <p style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:28px;">Loading your decipher workspace...</p>

          <!-- Loading Spinner -->
          <div style="width:40px; height:40px; border:3px solid var(--border-glass); border-top:3px solid var(--accent-orange); border-radius:50%; animation: rotate-loader 1s linear infinite; margin-bottom:20px;"></div>

          <div style="width:200px; height:4px; background:var(--bg-glass-input); border-radius:4px; overflow:hidden; border:1px solid var(--border-glass);">
            <div style="width:60%; height:100%; background:var(--accent-gradient); border-radius:4px; animation: shimmer 1.5s infinite;"></div>
          </div>
        </div>
      </div>
    `;
  },

  ErrorBoundary(error, state) {
    const errorMsg = (error && error.message) ? error.message : (typeof error === 'string' ? error : 'An unexpected interface exception occurred.');
    const errorStack = (error && error.stack) ? error.stack : '';

    return `
      <div style="min-height:100vh; width:100%; background:var(--bg-primary); display:flex; justify-content:center; align-items:center; padding:40px 20px; position:relative; z-index:100;">
        <div class="glass-panel animate-fade" style="max-width:600px; width:100%; padding:36px; border-radius:28px; border:1px solid rgba(239, 68, 68, 0.4); background:var(--bg-glass-card); box-shadow:0 20px 60px rgba(0,0,0,0.4); text-align:center;">
          <div style="width:60px; height:60px; border-radius:20px; background:rgba(239, 68, 68, 0.15); border:1px solid rgba(239, 68, 68, 0.3); display:flex; align-items:center; justify-content:center; color:var(--error); margin:0 auto 20px auto; font-size:1.8rem;">
            ⚠️
          </div>

          <h2 style="font-size:1.5rem; font-weight:800; color:var(--text-primary); margin-bottom:8px;">Interface Intercept Encountered an Error</h2>
          <p style="font-size:0.88rem; color:var(--text-secondary); margin-bottom:20px;">
            MorseVision caught an unexpected runtime error without crashing your browser window.
          </p>

          <div style="padding:14px; background:rgba(0,0,0,0.2); border:1px solid var(--border-glass); border-radius:14px; text-align:left; font-family:var(--font-mono); font-size:0.78rem; color:var(--error); margin-bottom:28px; max-height:140px; overflow-y:auto; word-break:break-all;">
            <strong>Error:</strong> ${errorMsg}
            ${errorStack ? `<br><br><span style="opacity:0.75;">${errorStack.substring(0, 300)}...</span>` : ''}
          </div>

          <div style="display:flex; gap:12px; justify-content:center;">
            <button onclick="window.location.reload()" class="btn btn-primary" style="padding:12px 24px; font-weight:700; font-size:0.88rem; border-radius:12px; cursor:pointer;">
              ↻ Reload Workspace
            </button>
            <button id="btn-error-reset-login" class="btn" style="padding:12px 24px; font-weight:600; font-size:0.88rem; border-radius:12px; background:var(--bg-glass-input); border:1px solid var(--border-glass); color:var(--text-primary); cursor:pointer;">
              Return to Login
            </button>
          </div>
        </div>
      </div>
    `;
  },

  // ----------------------------------------------------
  // AUTHENTICATION SYSTEM CARDS (User / Admin / Recoveries)
  // ----------------------------------------------------
  Auth(state) {
    const isUserTab = state.authRole === 'user';
    const showPasswordType = state.showPasswordChecked ? 'text' : 'password';

    const themeToggleBtn = `
      <button id="btn-auth-theme-toggle" class="theme-toggle-btn" title="Toggle Theme">
        ${state.theme === 'light' ? Icons.moon : Icons.sun}
      </button>
    `;

    let formContentHtml = '';

    // 1. Registration View with Password Strength Meter
    if (state.authStep === 'register') {
      formContentHtml = `
        <div style="margin-bottom:24px;">
          <h1 style="font-size:1.8rem; font-weight:800; letter-spacing:-0.03em; margin-bottom:6px;">Create Operator Node</h1>
          <p style="font-size:0.88rem; color:var(--text-secondary);">Register clearance identity to access AI Morse decipher network.</p>
        </div>

        <form id="auth-register-form" class="animate-fade">
          <div class="input-group">
            <label class="input-label">Full Name</label>
            <input type="text" id="reg-name" class="input-field" placeholder="Rahul Sharma" required>
          </div>

          <div class="input-group">
            <label class="input-label">Operator Email</label>
            <input type="email" id="reg-email" class="input-field" placeholder="operator@morsevision.io" required>
          </div>
          
          <div class="input-group" style="margin-bottom:6px;">
            <label class="input-label">Passkey</label>
            <input type="${showPasswordType}" id="reg-password" class="input-field" placeholder="••••••••" required>
            <div class="password-strength-container">
              <div class="password-strength-bar">
                <div class="password-strength-fill" id="pass-strength-fill"></div>
              </div>
              <span class="password-strength-label" id="pass-strength-label">Password strength: Empty</span>
            </div>
          </div>

          <div class="input-group" style="margin-bottom:20px;">
            <label class="input-label">Confirm Passkey</label>
            <input type="${showPasswordType}" id="reg-confirm" class="input-field" placeholder="••••••••" required>
          </div>

          <div style="margin-bottom:24px;">
            <label style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size:0.8rem; color:var(--text-secondary);">
              <input type="checkbox" id="reg-terms" required style="accent-color:var(--accent-orange);">
              I accept the Node Operational Terms & Security Policy
            </label>
          </div>

          <button type="submit" class="btn btn-primary" style="width:100%; height:46px; margin-bottom:20px; font-weight:700;">
            Register Node Clearance
          </button>
          
          <div style="text-align:center; font-size:0.85rem; color:var(--text-secondary);">
            Already registered? <a href="#" id="go-login" style="color:var(--accent-orange-bright); text-decoration:none; font-weight:600;">Login here</a>
          </div>
        </form>
      `;
    } 
    // 2. Forgot Password Request View
    else if (state.authStep === 'forgot') {
      formContentHtml = `
        <div style="margin-bottom:24px;">
          <h1 style="font-size:1.8rem; font-weight:800; letter-spacing:-0.03em; margin-bottom:6px;">Reset Access Key</h1>
          <p style="font-size:0.88rem; color:var(--text-secondary);">Enter your registered node email to receive a 6-digit recovery OTP.</p>
        </div>

        <form id="auth-forgot-form" class="animate-fade">
          <div class="input-group" style="margin-bottom:24px;">
            <label class="input-label">Registered Node Email</label>
            <input type="email" id="forgot-email" class="input-field" placeholder="user@example.com" required>
          </div>

          <button type="submit" class="btn btn-primary" style="width:100%; height:46px; margin-bottom:20px; font-weight:700;">
            Send Recovery OTP
          </button>
          
          <div style="text-align:center; font-size:0.85rem; color:var(--text-secondary);">
            Remembered passkey? <a href="#" id="go-login" style="color:var(--accent-orange-bright); text-decoration:none; font-weight:600;">Return to Login</a>
          </div>
        </form>
      `;
    }
    // 3. Reset Password OTP Input View
    else if (state.authStep === 'reset') {
      formContentHtml = `
        <div style="margin-bottom:24px;">
          <h1 style="font-size:1.8rem; font-weight:800; letter-spacing:-0.03em; margin-bottom:6px;">Set New Passkey</h1>
          <p style="font-size:0.88rem; color:var(--text-secondary);">Apply the OTP code sent to your email and set your new passkey.</p>
        </div>

        <form id="auth-reset-form" class="animate-fade">
          <div class="input-group">
            <label class="input-label">Verification OTP Code</label>
            <input type="text" id="reset-otp" class="input-field" placeholder="123456" maxlength="6" required style="font-family:var(--font-mono); letter-spacing:0.3em; text-align:center; font-size:1.2rem;">
          </div>

          <div class="input-group">
            <label class="input-label">New Passkey</label>
            <input type="${showPasswordType}" id="reset-password" class="input-field" placeholder="••••••••" required>
          </div>

          <div class="input-group" style="margin-bottom:24px;">
            <label class="input-label">Confirm New Passkey</label>
            <input type="${showPasswordType}" id="reset-confirm" class="input-field" placeholder="••••••••" required>
          </div>

          <button type="submit" class="btn btn-primary" style="width:100%; height:46px; margin-bottom:20px; font-weight:700;">
            Commit New Passkey
          </button>
          
          <div style="text-align:center; font-size:0.85rem; color:var(--text-secondary);">
            Cancel recovery? <a href="#" id="go-login" style="color:var(--accent-orange-bright); text-decoration:none; font-weight:600;">Back to Login</a>
          </div>
        </form>
      `;
    }
    // 3.5. Registration OTP Verification View
    else if (state.authStep === 'verify-registration') {
      const showTimer = state.resendTimer && state.resendTimer > 0;
      formContentHtml = `
        <div style="margin-bottom:24px;">
          <h1 style="font-size:1.8rem; font-weight:800; letter-spacing:-0.03em; margin-bottom:6px;">Verify Node Registration</h1>
          <p style="font-size:0.88rem; color:var(--text-secondary);">Sent 6-digit code to <strong style="color:var(--text-primary);">${state.registrationEmailAttempt || 'your email'}</strong></p>
        </div>

        <form id="auth-verify-registration-form" class="animate-fade">
          <div class="input-group" style="margin-bottom:24px;">
            <label class="input-label">Verification OTP Code</label>
            <input type="text" id="verify-registration-otp" class="input-field" placeholder="123456" maxlength="6" required autocomplete="one-time-code" inputmode="numeric" style="font-family:var(--font-mono); letter-spacing:0.4em; text-align:center; font-size:1.4rem;">
          </div>

          <button type="submit" class="btn btn-primary" style="width:100%; height:46px; margin-bottom:20px; font-weight:700;">
            Complete Node Verification
          </button>
          
          <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.85rem; border-top:1px solid var(--border-glass); padding-top:16px;">
            <a href="#" id="go-login" style="color:var(--text-secondary); text-decoration:none;">Back to Login</a>
            
            <span id="resend-timer-container">
              ${showTimer 
                ? `<span style="color:var(--text-muted);">Resend OTP in ${state.resendTimer}s</span>` 
                : `<a href="#" id="btn-resend-registration-otp" style="color:var(--accent-orange-bright); text-decoration:none; font-weight:600;">Resend OTP</a>`
              }
            </span>
          </div>
        </form>
      `;
    }
    // 3.6. Administrator OTP Verification View
    else if (state.authStep === 'verify-admin') {
      const showTimer = state.resendTimer && state.resendTimer > 0;
      formContentHtml = `
        <div style="margin-bottom:24px;">
          <h1 style="font-size:1.8rem; font-weight:800; letter-spacing:-0.03em; margin-bottom:6px;">Administrator Verification</h1>
          <p style="font-size:0.88rem; color:var(--text-secondary);">OTP code sent to <strong style="color:var(--text-primary);">${maskEmail(state.adminEmail || 'admin@morsevision.io')}</strong></p>
        </div>

        <form id="admin-verify-form" class="animate-fade">
          <div style="display:flex; gap:10px; justify-content:center; margin:24px 0;" id="admin-otp-inputs">
            <input type="text" class="input-field admin-otp-box" maxlength="1" pattern="[0-9]" inputmode="numeric" style="width:46px; height:46px; text-align:center; font-size:1.4rem; font-weight:700; border-radius:10px; margin:0;" required>
            <input type="text" class="input-field admin-otp-box" maxlength="1" pattern="[0-9]" inputmode="numeric" style="width:46px; height:46px; text-align:center; font-size:1.4rem; font-weight:700; border-radius:10px; margin:0;" required>
            <input type="text" class="input-field admin-otp-box" maxlength="1" pattern="[0-9]" inputmode="numeric" style="width:46px; height:46px; text-align:center; font-size:1.4rem; font-weight:700; border-radius:10px; margin:0;" required>
            <input type="text" class="input-field admin-otp-box" maxlength="1" pattern="[0-9]" inputmode="numeric" style="width:46px; height:46px; text-align:center; font-size:1.4rem; font-weight:700; border-radius:10px; margin:0;" required>
            <input type="text" class="input-field admin-otp-box" maxlength="1" pattern="[0-9]" inputmode="numeric" style="width:46px; height:46px; text-align:center; font-size:1.4rem; font-weight:700; border-radius:10px; margin:0;" required>
            <input type="text" class="input-field admin-otp-box" maxlength="1" pattern="[0-9]" inputmode="numeric" style="width:46px; height:46px; text-align:center; font-size:1.4rem; font-weight:700; border-radius:10px; margin:0;" required>
          </div>

          <button type="submit" class="btn btn-primary" style="width:100%; height:46px; margin-bottom:20px; font-weight:700;">
            Verify Admin OTP
          </button>
          
          <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.85rem; border-top:1px solid var(--border-glass); padding-top:16px;">
            <a href="#" id="go-login" style="color:var(--text-secondary); text-decoration:none;">Back to Login</a>
            
            <span id="admin-resend-timer-container">
              ${showTimer 
                ? `<span style="color:var(--text-muted);">Resend OTP in ${state.resendTimer}s</span>` 
                : `<a href="#" id="btn-resend-admin-otp" style="color:var(--accent-orange-bright); text-decoration:none; font-weight:600;">Resend OTP</a>`
              }
            </span>
          </div>
        </form>
      `;
    }
    // 4. Default Login View (Operator vs Admin consoles)
    else {
      formContentHtml = `
        <div style="margin-bottom:20px;">
          <h1 style="font-size:1.85rem; font-weight:800; letter-spacing:-0.03em; margin-bottom:4px;">Welcome Back</h1>
          <p style="font-size:0.88rem; color:var(--text-secondary);">Authenticate clearance token to access signal decipher network.</p>
        </div>

        <div style="display:flex; background:var(--bg-glass-input); padding:4px; border-radius:14px; margin-bottom:24px; border:1px solid var(--border-glass);">
          <button id="tab-user-login" class="btn" style="flex:1; padding:9px; border-radius:10px; background:${isUserTab ? 'var(--accent-gradient)' : 'transparent'}; color:${isUserTab ? '#fff' : 'var(--text-secondary)'}; font-size:0.82rem; font-weight:600; box-shadow:${isUserTab ? '0 4px 14px rgba(255,138,0,0.28)' : 'none'};">
            Operator Login
          </button>
          <button id="tab-admin-login" class="btn" style="flex:1; padding:9px; border-radius:10px; background:${!isUserTab ? 'var(--accent-gradient)' : 'transparent'}; color:${!isUserTab ? '#fff' : 'var(--text-secondary)'}; font-size:0.82rem; font-weight:600; box-shadow:${!isUserTab ? '0 4px 14px rgba(255,138,0,0.28)' : 'none'};">
            Admin Portal
          </button>
        </div>

        ${isUserTab ? `
          <form id="auth-form" class="animate-fade">
            <div class="input-group">
              <label class="input-label">Operator Email</label>
              <input type="email" id="email" class="input-field" placeholder="user@example.com" required value="">
            </div>
            
            <div class="input-group" style="margin-bottom:12px;">
              <label class="input-label">Passkey</label>
              <input type="${showPasswordType}" id="password" class="input-field" placeholder="••••••••" required value="">
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; font-size:0.82rem;">
              <label style="display:flex; align-items:center; gap:6px; cursor:pointer; color:var(--text-secondary);">
                <input type="checkbox" id="checkbox-show-password" ${state.showPasswordChecked ? 'checked' : ''} style="accent-color:var(--accent-orange);">
                Show Passkey
              </label>
              <label style="display:flex; align-items:center; gap:6px; cursor:pointer; color:var(--text-secondary);">
                <input type="checkbox" id="remember-me" checked style="accent-color:var(--accent-orange);">
                Remember Me
              </label>
            </div>

            <button type="submit" class="btn btn-primary" style="width:100%; height:46px; margin-bottom:20px; font-weight:700;">
              Authenticate Terminal
            </button>
            
            <div style="display:flex; justify-content:space-between; font-size:0.82rem; width:100%;">
              <a href="#" id="go-forgot" style="color:var(--text-secondary); text-decoration:none;">Forgot Passkey?</a>
              <a href="#" id="go-register" style="color:var(--accent-orange-bright); text-decoration:none; font-weight:600;">Register Node</a>
            </div>
          </form>
        ` : `
          <form id="admin-login-form" class="animate-fade">
            <div class="input-group" style="margin-bottom:20px; text-align:center;">
              <label class="input-label" style="text-align:center; display:block;">Administrator Email</label>
              <div style="font-size:1.1rem; font-weight:700; color:var(--text-primary); padding:14px; background:var(--bg-glass-input); border:1px solid var(--border-glass); border-radius:14px; margin-top:8px; font-family:var(--font-mono);">
                ${maskEmail(state.adminEmail || 'admin@morsevision.io')}
              </div>
            </div>

          <button type="submit" class="btn btn-primary" style="width:100%; height:46px; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:12px;">
            Verify Administrator OTP
          </button>
        </form>
        `}

        <!-- Social Login OAuth Authorization -->
        <div style="margin-top:28px; border-top:1px solid var(--border-glass); padding-top:20px; text-align:center;">
          <p style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.08em; font-weight:600; margin-bottom:14px;">SSO Enterprise Authorization</p>
          <div style="display:flex; justify-content:center;">
            <button id="btn-oauth-google" class="btn btn-secondary" type="button" style="width:100%; max-width:280px; padding:10px 16px; font-size:0.85rem; font-weight:600; gap:10px; display:inline-flex; align-items:center; justify-content:center;" title="Continue with Google">
              <svg style="width:18px; height:18px;" viewBox="0 0 24 24" fill="currentColor"><path d="M12.24 10.285V13.4h6.887c-.58 3.024-3.14 5.274-6.887 5.274-4.417 0-8-3.583-8-8s3.583-8 8-8c2.01 0 3.837.74 5.253 1.964l2.42-2.42C17.487 1.83 14.985 1 12.24 1 6.03 1 1 6.03 1 12.24s5.03 11.24 11.24 11.24c6.49 0 10.8-4.56 10.8-10.98 0-.74-.08-1.46-.22-2.215H12.24z"/></svg> Continue with Google
            </button>
          </div>
        </div>
      `;
    }

    return `
      <div class="auth-split-wrapper">
        <!-- Left Auth Panel -->
        <div class="auth-split-left">
          <div style="position:absolute; top:24px; right:24px;">
            ${themeToggleBtn}
          </div>

          <div style="display:flex; align-items:center; gap:10px; margin-bottom:32px;">
            <div style="width:36px; height:36px;">
              ${Icons.logo}
            </div>
            <div>
              <span style="font-size:1.3rem; font-weight:800; color:var(--text-primary); letter-spacing:-0.03em;">MorseVision</span>
              <span style="font-size:0.65rem; color:var(--accent-orange-bright); font-weight:700; text-transform:uppercase; letter-spacing:0.12em; display:block;">AI SIGNAL INTELLIGENCE</span>
            </div>
          </div>

          ${formContentHtml}
        </div>

        <!-- Right Cyber Illustration Canvas -->
        <div class="auth-split-right">
          <canvas id="auth-cyber-canvas" style="position:absolute; top:0; left:0; width:100%; height:100%;"></canvas>
          
          <div class="glass-panel auth-cyber-card">
            <div style="width:48px; height:48px; border-radius:14px; background:var(--accent-gradient); display:flex; align-items:center; justify-content:center; color:#fff; margin-bottom:20px; box-shadow:0 8px 24px var(--accent-orange-glow);">
              ${Icons.security}
            </div>
            <h3 style="font-size:1.3rem; font-weight:800; color:var(--text-primary); margin-bottom:8px;">Quantum Cyber Defense Grid</h3>
            <p style="font-size:0.88rem; color:var(--text-secondary); line-height:1.5; margin-bottom:20px;">
              Advanced AI Goertzel DSP signal identification, automatic Morse code demodulation, and zero-trust operator verification network.
            </p>
            <div style="display:flex; gap:16px; font-size:0.75rem; color:var(--accent-orange-bright); font-weight:700; text-transform:uppercase; letter-spacing:0.08em;">
              <span>• 99.8% Accuracy</span>
              <span>• Realtime Decipher</span>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // ----------------------------------------------------
  // COMPLETE YOUR PROFILE ONBOARDING WIZARD
  // ----------------------------------------------------
  Onboarding(state) {
    const user = state.currentUser || {};
    const defaultUsername = user.username || ('@' + (user.email || 'operator').split('@')[0]);
    const currentTheme = state.theme || 'dark';

    return `
      <div style="min-height:100vh; width:100%; background:var(--bg-primary); padding:40px 20px; display:flex; justify-content:center; align-items:center; position:relative; z-index:10;">
        <div class="glass-panel animate-fade" style="max-width:740px; width:100%; padding:32px 36px; border-radius:24px; border:1px solid var(--border-glass-hover); background:var(--bg-glass-card); box-shadow:0 20px 60px rgba(0,0,0,0.3); margin:auto;">
          
          <!-- Header -->
          <div style="display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid var(--border-glass); padding-bottom:18px; margin-bottom:24px;">
            <div style="display:flex; align-items:center; gap:12px;">
              <div style="width:42px; height:42px; border-radius:12px; background:var(--accent-gradient); display:flex; align-items:center; justify-content:center; color:#fff; box-shadow:0 6px 20px var(--accent-orange-glow); flex-shrink:0;">
                ${Icons.logo}
              </div>
              <div>
                <h1 style="font-size:1.35rem; font-weight:800; color:var(--text-primary); letter-spacing:-0.02em; margin:0;">Complete Profile Setup</h1>
                <p style="font-size:0.82rem; color:var(--text-secondary); margin:2px 0 0 0;">Personalize your decipher workspace (30-sec setup).</p>
              </div>
            </div>
            <span style="font-size:0.72rem; font-weight:700; color:var(--accent-orange-bright); background:rgba(255,138,0,0.12); padding:4px 12px; border-radius:16px; border:1px solid rgba(255,138,0,0.25);">
              Quick Setup
            </span>
          </div>

          <form id="form-onboarding" class="animate-fade">
            <!-- 2-Column Form Grid -->
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
              <div class="input-group">
                <label class="input-label" style="color:var(--text-primary); font-weight:600; margin-bottom:4px; display:block; font-size:0.82rem;">Full Name *</label>
                <input type="text" id="onboard-name" class="input-field" value="${user.name || ''}" placeholder="Rahul Sharma" required style="width:100%; padding:10px 14px; background:var(--bg-glass-input); border:1px solid var(--border-glass); border-radius:14px; color:var(--text-primary); font-size:0.88rem;">
              </div>

              <div class="input-group">
                <label class="input-label" style="color:var(--text-primary); font-weight:600; margin-bottom:4px; display:block; font-size:0.82rem;">Username *</label>
                <input type="text" id="onboard-username" class="input-field" value="${defaultUsername}" placeholder="@rahul_sharma" required style="width:100%; padding:10px 14px; background:var(--bg-glass-input); border:1px solid var(--border-glass); border-radius:14px; color:var(--text-primary); font-size:0.88rem;">
              </div>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
              <div class="input-group">
                <label class="input-label" style="color:var(--text-primary); font-weight:600; margin-bottom:4px; display:block; font-size:0.82rem;">Email Address (Read-only)</label>
                <input type="text" readonly value="${user.email || 'operator@gmail.com'}" style="width:100%; padding:10px 14px; background:var(--bg-glass-input); border:1px solid var(--border-glass); border-radius:14px; color:var(--text-secondary); font-size:0.88rem; cursor:not-allowed;">
              </div>

              <div class="input-group">
                <label class="input-label" style="color:var(--text-primary); font-weight:600; margin-bottom:4px; display:block; font-size:0.82rem;">Occupation *</label>
                <input type="hidden" id="onboard-occ" value="Student">
                <div class="custom-dropdown-container" id="dropdown-occ">
                  <div class="custom-dropdown-trigger">
                    <span class="trigger-label">Student</span>
                    <svg class="custom-dropdown-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                  <div class="custom-dropdown-panel">
                    <div class="custom-dropdown-option selected" data-value="Student">Student</div>
                    <div class="custom-dropdown-option" data-value="Professional">Professional</div>
                    <div class="custom-dropdown-option" data-value="Researcher">Researcher</div>
                    <div class="custom-dropdown-option" data-value="Amateur Radio Operator">Amateur Radio Operator</div>
                    <div class="custom-dropdown-option" data-value="Other">Other</div>
                  </div>
                </div>
                <div id="occ-other-group" style="display:none; margin-top:8px;" class="animate-fade">
                  <input type="text" id="onboard-occ-other" class="input-field" placeholder="Please specify your occupation" style="width:100%; padding:9px 12px; background:var(--bg-glass-input); border:1px solid var(--accent-orange); border-radius:10px; color:var(--text-primary); font-size:0.85rem;">
                </div>
              </div>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
              <div class="input-group">
                <label class="input-label" style="color:var(--text-primary); font-weight:600; margin-bottom:4px; display:block; font-size:0.82rem;">Primary Purpose *</label>
                <input type="hidden" id="onboard-purpose" value="Learning">
                <div class="custom-dropdown-container" id="dropdown-purpose">
                  <div class="custom-dropdown-trigger">
                    <span class="trigger-label">Learning</span>
                    <svg class="custom-dropdown-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                  <div class="custom-dropdown-panel">
                    <div class="custom-dropdown-option selected" data-value="Learning">Learning</div>
                    <div class="custom-dropdown-option" data-value="Academic Project">Academic Project</div>
                    <div class="custom-dropdown-option" data-value="Cybersecurity">Cybersecurity</div>
                    <div class="custom-dropdown-option" data-value="Professional Work">Professional Work</div>
                    <div class="custom-dropdown-option" data-value="Other">Other</div>
                  </div>
                </div>
                <div id="purpose-other-group" style="display:none; margin-top:8px;" class="animate-fade">
                  <input type="text" id="onboard-purpose-other" class="input-field" placeholder="Please tell us why you're using MorseVision" style="width:100%; padding:9px 12px; background:var(--bg-glass-input); border:1px solid var(--accent-orange); border-radius:10px; color:var(--text-primary); font-size:0.85rem;">
                </div>
              </div>

              <div class="input-group">
                <label class="input-label" style="color:var(--text-primary); font-weight:600; margin-bottom:4px; display:block; font-size:0.82rem;">Experience Level *</label>
                <input type="hidden" id="onboard-exp" value="Beginner">
                <div class="custom-dropdown-container" id="dropdown-exp">
                  <div class="custom-dropdown-trigger">
                    <div>
                      <span class="trigger-label" style="font-weight:700;">Beginner</span>
                      <span class="trigger-sub" style="font-size:0.72rem; color:var(--text-muted); display:block;">New to Morse Code</span>
                    </div>
                    <svg class="custom-dropdown-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                  <div class="custom-dropdown-panel">
                    <div class="custom-dropdown-option selected" data-value="Beginner" data-sub="New to Morse Code">
                      <div>
                        <div style="font-weight:700;">Beginner</div>
                        <div style="font-size:0.72rem; opacity:0.75;">New to Morse Code</div>
                      </div>
                    </div>
                    <div class="custom-dropdown-option" data-value="Intermediate" data-sub="Some practical experience">
                      <div>
                        <div style="font-weight:700;">Intermediate</div>
                        <div style="font-size:0.72rem; opacity:0.75;">Some practical experience</div>
                      </div>
                    </div>
                    <div class="custom-dropdown-option" data-value="Advanced" data-sub="Experienced operator">
                      <div>
                        <div style="font-weight:700;">Advanced</div>
                        <div style="font-size:0.72rem; opacity:0.75;">Experienced operator</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:20px;">
              <div class="input-group">
                <label class="input-label" style="color:var(--text-primary); font-weight:600; margin-bottom:6px; display:block; font-size:0.82rem;">Appearance</label>
                <div style="display:flex; background:var(--bg-glass-input); border:1px solid var(--border-glass); border-radius:12px; padding:3px;">
                  <button type="button" class="btn theme-seg-btn ${currentTheme === 'dark' ? 'active' : ''}" data-theme="dark" style="flex:1; padding:7px; border-radius:9px; border:none; font-size:0.8rem; font-weight:700; cursor:pointer; background:${currentTheme === 'dark' ? 'var(--accent-gradient)' : 'transparent'}; color:${currentTheme === 'dark' ? '#fff' : 'var(--text-secondary)'}; display:flex; align-items:center; justify-content:center; gap:6px;">
                    🌙 Dark
                  </button>
                  <button type="button" class="btn theme-seg-btn ${currentTheme === 'light' ? 'active' : ''}" data-theme="light" style="flex:1; padding:7px; border-radius:9px; border:none; font-size:0.8rem; font-weight:700; cursor:pointer; background:${currentTheme === 'light' ? 'var(--accent-gradient)' : 'transparent'}; color:${currentTheme === 'light' ? '#fff' : 'var(--text-secondary)'}; display:flex; align-items:center; justify-content:center; gap:6px;">
                    ☀️ Light
                  </button>
                  <button type="button" class="btn theme-seg-btn ${currentTheme === 'system' ? 'active' : ''}" data-theme="system" style="flex:1; padding:7px; border-radius:9px; border:none; font-size:0.8rem; font-weight:700; cursor:pointer; background:${currentTheme === 'system' ? 'var(--accent-gradient)' : 'transparent'}; color:${currentTheme === 'system' ? '#fff' : 'var(--text-secondary)'}; display:flex; align-items:center; justify-content:center; gap:6px;">
                    💻 System
                  </button>
                </div>
              </div>

              <div class="input-group">
                <label class="input-label" style="color:var(--text-primary); font-weight:600; margin-bottom:6px; display:block; font-size:0.82rem;">Notifications</label>
                <div style="display:flex; align-items:center; justify-content:space-between; padding:8px 14px; background:var(--bg-glass-input); border:1px solid var(--border-glass); border-radius:12px;">
                  <span style="font-size:0.82rem; font-weight:600; color:var(--text-primary);">Receive Product Updates</span>
                  <input type="hidden" id="noti-updates-val" value="true">
                  <div class="custom-switch-toggle active" id="switch-noti-updates">
                    <div class="custom-switch-knob"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Terms & Submit Button -->
            <div style="margin-bottom:20px;">
              <label style="display:flex; align-items:center; gap:10px; cursor:pointer; font-size:0.82rem; color:var(--text-primary); font-weight:500;">
                <input type="checkbox" id="onboard-terms" required checked style="accent-color:var(--accent-orange); width:16px; height:16px;">
                I agree to the Terms of Service & Privacy Policy *
              </label>
            </div>

            <button type="submit" id="btn-submit-onboarding" class="btn btn-primary" style="width:100%; height:46px; font-weight:800; font-size:0.9rem; text-transform:uppercase; letter-spacing:0.06em; border-radius:12px; background:var(--accent-gradient); color:#fff; border:none; cursor:pointer; box-shadow:0 6px 20px var(--accent-orange-glow);">
              Complete Setup & Launch Workspace
            </button>
          </form>
        </div>
      </div>
    `;
  },

  // ----------------------------------------------------
  // NAVIGATION SIDEBAR
  // ----------------------------------------------------
  Sidebar(state) {
    const isAdmin = state.authRole === 'admin';
    
    // User links
    let navItems = [
      { id: 'dashboard', label: 'Decode', icon: Icons.dashboard },
      { id: 'translator', label: 'Translator Hub', icon: Icons.translator },
      { id: 'history', label: 'Scan History', icon: Icons.history },
      { id: 'downloads', label: 'Downloads', icon: Icons.downloads },
      { id: 'profile', label: 'Profile', icon: Icons.profile },
      { id: 'settings', label: 'Settings', icon: Icons.settings }
    ];

    // Admin links
    if (isAdmin) {
      navItems = [
        { id: 'admin-dashboard', label: 'Dashboard', icon: Icons.dashboard },
        { id: 'admin-users', label: 'Operator Registry', icon: Icons.users },
        { id: 'admin-history', label: 'Decrypt Timeline', icon: Icons.history },
        { id: 'admin-files', label: 'Source File Audits', icon: Icons.file },
        { id: 'admin-security', label: 'Security Center', icon: Icons.security },
        { id: 'admin-logs', label: 'LIVE System Logs', icon: Icons.terminal },
        { id: 'admin-backup', label: 'Backup Utility', icon: Icons.backup },
        { id: 'admin-settings', label: 'System Settings', icon: Icons.settings }
      ];
    }

    const menuLinks = navItems.map(item => {
      const activeClass = state.activePage === item.id ? 'active' : '';
      return `
        <a href="#" class="sidebar-link ${activeClass}" data-page="${item.id}">
          <span class="sidebar-icon-wrapper">${item.icon}</span>
          <span class="sidebar-label">${item.label}</span>
        </a>
      `;
    }).join('');

    return `
      <style>
        .sidebar {
          position: fixed;
          top: 24px;
          left: 24px;
          height: calc(100vh - 48px);
          width: var(--sidebar-width);
          background: var(--bg-glass-card);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid var(--border-glass);
          border-radius: 26px;
          display: flex;
          flex-direction: column;
          padding: 28px 16px;
          z-index: 100;
          transition: all var(--transition-normal);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
        }
        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 36px;
          padding-left: 8px;
        }
        .sidebar-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .sidebar-brand-text {
          display: flex;
          flex-direction: column;
        }
        .sidebar-title {
          font-weight: 700;
          font-size: 1.15rem;
          color: var(--text-primary);
          font-family: var(--font-sans);
          letter-spacing: -0.03em;
          line-height: 1.1;
        }
        .sidebar-subtitle {
          font-size: 0.68rem;
          color: var(--accent-orange-bright);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 700;
          margin-top: 2px;
        }
        .sidebar-menu {
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
          overflow-y: auto;
        }
        .sidebar-link {
          position: relative;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 16px;
          border-radius: 14px;
          color: var(--text-secondary);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.88rem;
          transition: all var(--transition-normal);
          border: 1px solid transparent;
        }
        .sidebar-link:hover {
          color: var(--text-primary);
          background: var(--bg-glass-hover);
        }
        .sidebar-link.active {
          color: var(--accent-orange) !important;
          background: var(--bg-glass-hover);
          font-weight: 600;
        }
        .sidebar-link::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 0;
          background: var(--accent-gradient);
          border-radius: 0 4px 4px 0;
          transition: height var(--transition-normal);
        }
        .sidebar-link.active::before {
          height: 18px;
        }
        .sidebar-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          color: var(--text-secondary);
          transition: transform var(--transition-normal);
        }
        .sidebar-link:hover .sidebar-icon-wrapper {
          transform: scale(1.05);
        }
        .sidebar-link.active .sidebar-icon-wrapper {
          color: var(--accent-orange);
          filter: drop-shadow(0 0 4px var(--accent-orange-glow));
        }
        .sidebar-footer {
          border-top: 1px solid var(--border-glass);
          padding-top: 16px;
        }
        @media (max-width: 992px) {
          .sidebar {
            width: var(--sidebar-collapsed-width);
            padding: 24px 10px;
            align-items: center;
          }
          .sidebar-brand-text, .sidebar-label, .sidebar-subtitle {
            display: none !important;
          }
          .sidebar-brand {
            padding-left: 0;
            justify-content: center;
            width: 100%;
          }
          .sidebar-menu {
            align-items: center;
            width: 100%;
          }
          .sidebar-link {
            justify-content: center;
            width: 52px;
            height: 52px;
            padding: 0;
          }
          .sidebar-link::before {
            display: none;
          }
          .sidebar-footer {
            width: 100%;
            display: flex;
            justify-content: center;
          }
        }
        @media (max-width: 768px) {
          .sidebar {
            flex-direction: row;
            height: 70px;
            width: calc(100% - 32px) !important;
            bottom: 16px;
            top: auto;
            left: 16px;
            border: 1px solid var(--border-glass);
            border-radius: 20px;
            padding: 0 12px;
            justify-content: space-around;
            align-items: center;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
          }
          .sidebar-brand, .sidebar-footer {
            display: none !important;
          }
          .sidebar-menu {
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            height: 100%;
          }
          .sidebar-link {
            width: 44px;
            height: 44px;
          }
        }
      </style>

      <aside class="sidebar">
        <div class="sidebar-brand">
          <div class="sidebar-logo">
            ${Icons.logo}
          </div>
          <div class="sidebar-brand-text">
            <span class="sidebar-title">MorseVision</span>
            <span class="sidebar-subtitle">${isAdmin ? 'Admin Console' : 'AI Signal Core'}</span>
          </div>
        </div>

        <nav class="sidebar-menu">
          ${menuLinks}
        </nav>

        <div class="sidebar-footer">
          <a href="#" class="sidebar-link" id="btn-logout" style="color:var(--error);">
            <span class="sidebar-icon-wrapper" style="color:var(--error);">${Icons.logout}</span>
            <span class="sidebar-label">Disconnect</span>
          </a>
        </div>
      </aside>
    `;
  },

  // ----------------------------------------------------
  // GLASS TOP NAVBAR (Dynamic User profile name)
  // ----------------------------------------------------
  Navbar(state) {
    const user = state.currentUser || {};
    const displayName = user.name || user.email || 'Operator';
    const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) || 'OP';
    const isAdmin = state.authRole === 'admin';

    return `
      <style>
        .top-navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-bottom: 32px;
          padding: 14px 28px;
          background: var(--bg-glass);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid var(--border-glass);
          border-radius: 26px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.015);
          position: relative;
        }
        .nav-indicator-button {
          background: var(--bg-glass-input);
          border: 1px solid var(--border-glass);
          border-radius: 14px;
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--text-secondary);
          transition: all var(--transition-normal);
          position: relative;
        }
        .nav-indicator-button:hover {
          background: var(--bg-glass-hover);
          border-color: var(--border-glass-hover);
          color: var(--text-primary);
          transform: translateY(-1px);
        }
        .nav-badge-bubble {
          position: absolute;
          top: 3px;
          right: 3px;
          width: 7px;
          height: 7px;
          background: var(--accent-orange);
          border-radius: 50%;
          box-shadow: 0 0 8px var(--accent-orange);
        }
        .user-nav-profile {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-left: 18px;
          border-left: 1px solid var(--border-glass);
        }
        .user-nav-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: var(--accent-gradient);
          padding: 1.5px;
          box-shadow: 0 0 10px var(--accent-orange-glow);
        }
        .user-nav-avatar-inner {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: var(--bg-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.85rem;
          color: #fff !important;
        }
        .user-nav-info {
          display: flex;
          flex-direction: column;
        }
        .user-nav-name {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.2;
        }
        .user-nav-plan {
          font-size: 0.75rem;
          color: var(--accent-orange-bright);
          font-weight: 600;
        }
        .breadcrumb-container {
          display: flex;
          align-items: center;
          font-family: var(--font-sans);
        }
      </style>

      <div class="top-navbar">
        <div class="breadcrumb-container">
          <span style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.08em; font-weight:600;">System</span>
          <span style="font-size:0.75rem; color:var(--text-muted); margin:0 8px;">/</span>
          <span style="font-size:0.88rem; font-weight:600; color:var(--text-primary); text-transform:capitalize;">${state.activePage.replace('admin-', '').replace('-', ' ')}</span>
        </div>

        <div style="display: flex; align-items: center; gap: 12px;">
          <div class="nav-indicator-button" id="btn-navbar-theme" title="Toggle Color Theme">
            ${state.theme === 'light' ? Icons.moon : Icons.sun}
          </div>

          <div style="position: relative; display: flex; align-items: center;" id="notification-wrapper">
            <div class="nav-indicator-button" id="btn-navbar-bell">
              ${Icons.bell}
              ${state.notifications.some(n => !n.isRead) ? `<div class="nav-badge-bubble"></div>` : ''}
            </div>

            ${state.showNotificationsDropdown ? `
              <div class="glass-panel animate-fade" style="position:absolute; top:100%; right:0; margin-top:10px; width:300px; padding:18px; border-radius:18px; z-index:200; box-shadow:0 12px 40px rgba(0,0,0,0.15); border-color:var(--border-glass);">
                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-glass); padding-bottom:8px; margin-bottom:10px;">
                  <span style="font-size:0.8rem; font-weight:700; color:var(--text-primary);">Clearance Alerts</span>
                  <div style="display:flex; gap:8px; font-size:0.7rem;">
                    <a href="#" id="btn-noti-read-all" style="color:var(--accent-orange-bright); text-decoration:none; font-weight:600;">Read All</a>
                    <span style="color:var(--border-glass)">|</span>
                    <a href="#" id="btn-noti-clear" style="color:var(--error); text-decoration:none; font-weight:600;">Clear</a>
                  </div>
                </div>
                <div style="max-height:200px; overflow-y:auto; display:flex; flex-direction:column; gap:8px;">
                  ${state.notifications.length === 0 
                    ? `<div style="text-align:center; padding:16px; font-size:0.75rem; color:var(--text-muted);">No current alerts.</div>`
                    : state.notifications.map(n => `
                      <div style="background:rgba(255,255,255,0.01); border:1px solid var(--border-glass); padding:10px; border-radius:10px; font-size:0.75rem; color:var(--text-primary); border-left-color:${n.type === 'error' ? 'var(--error)' : n.type === 'warning' ? 'var(--warning)' : 'var(--accent-orange)'}; border-left-width:3px;">
                        <div style="display:flex; justify-content:space-between; font-size:0.65rem; color:var(--text-muted); margin-bottom:2px;">
                          <span>${n.time}</span>
                        </div>
                        <div>${n.text}</div>
                      </div>
                    `).join('')}
                </div>
              </div>
            ` : ''}
          </div>

          <div class="user-nav-profile">
            <div class="user-nav-avatar" style="overflow:hidden; display:flex; align-items:center; justify-content:center;">
              ${user.avatar 
                ? `<img src="${user.avatar}" style="width:100%; height:100%; border-radius:50%; object-fit:cover;">`
                : `<div class="user-nav-avatar-inner">${initials || 'OP'}</div>`
              }
            </div>
            <div class="user-nav-info">
              <span class="user-nav-name">${user.name}</span>
              <span class="user-nav-plan">${user.role === 'admin' ? 'Root Admin' : 'Node Operator'}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // ----------------------------------------------------
  // STEPPER HEADER
  // ----------------------------------------------------
  StepperHeader(state) {
    const steps = [
      { num: 1, label: 'Upload', desc: 'Ingest audio or video targets' },
      { num: 2, label: 'Details', desc: 'Inspect trace parameters' },
      { num: 3, label: 'Processing', desc: 'DSP sweep calculations' },
      { num: 4, label: 'Decode', desc: 'Character streams reveal' },
      { num: 5, label: 'Result', desc: 'View decrypted intelligence' }
    ];

    const stepNodes = steps.map(s => {
      const isCurrent = state.decodeStep === s.num;
      const isPassed = state.decodeStep > s.num;
      
      let badgeStyle = 'background: rgba(255,255,255,0.02); color: var(--text-secondary); border: 1px solid var(--border-glass);';
      if (isCurrent) {
        badgeStyle = 'background: var(--accent-gradient); color: #fff; box-shadow: 0 0 15px rgba(255,122,0,0.3); border:none;';
      } else if (isPassed) {
        badgeStyle = 'background: rgba(255, 122, 0, 0.1); color: var(--accent-orange-bright); border: 1px solid var(--accent-orange);';
      }

      return `
        <div style="display:flex; align-items:center; gap:12px; flex:1; min-width: 140px; margin-bottom:12px;">
          <div style="width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:0.9rem; flex-shrink:0; ${badgeStyle}">
            ${isPassed ? Icons.check : s.num}
          </div>
          <div style="display:flex; flex-direction:column;">
            <span style="font-size:0.85rem; font-weight:600; color:${isCurrent ? '#fff' : 'var(--text-secondary)'};">${s.label}</span>
            <span style="font-size:0.7rem; color:var(--text-muted); line-height:1.2; text-overflow:ellipsis; overflow:hidden; white-space:nowrap; max-width:130px;">${s.desc}</span>
          </div>
        </div>
      `;
    }).join(`
      <div style="width:40px; height:1px; background:var(--border-glass); align-self:center; margin:0 12px 12px 12px; flex-shrink:0; display:block;" class="stepper-divider-line"></div>
    `);

    return `
      <style>
        .stepper-header-panel {
          display: flex;
          justify-content: space-between;
          background: rgba(11, 11, 11, 0.4);
          border: 1px solid var(--border-glass);
          border-radius: 16px;
          padding: 20px 24px;
          margin-bottom: 32px;
          flex-wrap: wrap;
        }
        @media (max-width: 900px) {
          .stepper-divider-line { display: none !important; }
        }
      </style>
      <div class="stepper-header-panel">
        ${stepNodes}
      </div>
    `;
  },

  // ----------------------------------------------------
  // COMMAND CENTER COMPONENT MODULES
  // ----------------------------------------------------
  WelcomeHero(state) {
    const user = state.currentUser || {};
    const displayName = user.name || user.email || 'Analyst';

    return `
      <div class="glass-panel animate-fade" style="padding:22px 28px; border-radius:20px; border:1px solid var(--border-glass-hover); background:var(--bg-glass-card); margin-bottom:20px; position:relative; overflow:hidden; box-shadow:0 10px 40px rgba(0,0,0,0.08);">
        <div style="position:absolute; top:-60px; right:-60px; width:220px; height:220px; background:radial-gradient(circle, rgba(255,138,0,0.18) 0%, rgba(0,0,0,0) 70%); pointer-events:none; z-index:0;"></div>

        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; position:relative; z-index:2;">
          <div>
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:4px;">
              <span style="font-size:0.75rem; font-weight:700; color:var(--accent-orange-bright); background:rgba(255,138,0,0.12); padding:4px 12px; border-radius:20px; border:1px solid rgba(255,138,0,0.25); text-transform:uppercase; letter-spacing:0.08em;">
                Command Center Node
              </span>
              <span class="status-dot-pulse"></span>
              <span style="font-size:0.75rem; font-weight:600; color:var(--success);">ACTIVE CLEARANCE</span>
            </div>
            <h2 style="font-size:1.5rem; font-weight:800; color:var(--text-primary); letter-spacing:-0.03em; margin:0;">
              Welcome Back, ${displayName} 👋
            </h2>
            <p style="color:var(--text-secondary); font-size:0.88rem; margin-top:4px;">
              Ready to decode your next Morse transmission intercept?
            </p>
          </div>
        </div>
      </div>
    `;
  },

  KPICards(state) {
    const totalDecodes = (state.decryptionHistory && state.decryptionHistory.length) ? state.decryptionHistory.length : 0;

    let avgAccuracy = '100%';
    if (state.decryptionHistory && state.decryptionHistory.length > 0) {
      const totalConf = state.decryptionHistory.reduce((sum, item) => {
        const val = parseFloat(item.confidence) || 100;
        return sum + val;
      }, 0);
      avgAccuracy = (totalConf / state.decryptionHistory.length).toFixed(1) + '%';
    }

    let avgTime = '0.00s';
    if (state.decryptionHistory && state.decryptionHistory.length > 0) {
      const totalTime = state.decryptionHistory.reduce((sum, item) => {
        const val = parseFloat(item.processing_time) || 0.05;
        return sum + val;
      }, 0);
      avgTime = (totalTime / state.decryptionHistory.length).toFixed(2) + 's';
    }

    return `
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(210px, 1fr)); gap:16px; margin-bottom:24px;">
        <div class="kpi-card">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
            <span style="font-size:0.75rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.06em;">Global Decodes</span>
            <div class="kpi-icon-wrapper">${Icons.file}</div>
          </div>
          <div style="display:flex; align-items:baseline; justify-content:space-between;">
            <h3 style="font-size:1.8rem; font-weight:800; color:var(--text-primary); margin:0;">${totalDecodes}</h3>
            <span class="trend-pill up">+${totalDecodes > 0 ? 1 : 0} today</span>
          </div>
        </div>

        <div class="kpi-card">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
            <span style="font-size:0.75rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.06em;">Avg Accuracy</span>
            <div class="kpi-icon-wrapper">${Icons.check}</div>
          </div>
          <div style="display:flex; align-items:baseline; justify-content:space-between;">
            <h3 style="font-size:1.8rem; font-weight:800; color:var(--success); margin:0;">${avgAccuracy}</h3>
            <span class="trend-pill up">↑ verified</span>
          </div>
        </div>

        <div class="kpi-card">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
            <span style="font-size:0.75rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.06em;">Avg Decode Time</span>
            <div class="kpi-icon-wrapper">${Icons.history}</div>
          </div>
          <div style="display:flex; align-items:baseline; justify-content:space-between;">
            <h3 style="font-size:1.8rem; font-weight:800; color:var(--text-primary); margin:0;">${avgTime}</h3>
            <span class="trend-pill neutral">fast sweep</span>
          </div>
        </div>

        <div class="kpi-card">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
            <span style="font-size:0.75rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.06em;">AI Decoder Status</span>
            <div class="kpi-icon-wrapper" style="background:rgba(16,185,129,0.1); border-color:rgba(16,185,129,0.25); color:var(--success);">${Icons.admin}</div>
          </div>
          <div style="display:flex; align-items:center; justify-content:space-between;">
            <h3 style="font-size:1.4rem; font-weight:800; color:var(--success); margin:0; display:flex; align-items:center; gap:8px;">
              <span class="status-dot-pulse"></span> ONLINE
            </h3>
            <span style="font-size:0.72rem; color:var(--text-muted); font-weight:600;">DSP v2.4</span>
          </div>
        </div>
      </div>
    `;
  },

  // ----------------------------------------------------
  // TOTAL DASHBOARD SHELL (FOCUSED DECODING WORKSPACE)
  // ----------------------------------------------------
  DashboardShell(state) {
    let activeStepView = '';

    if (state.decodeStep === 1) activeStepView = this.Step1Upload(state);
    else if (state.decodeStep === 2) activeStepView = this.Step2Details(state.uploadedFile);
    else if (state.decodeStep === 3) activeStepView = this.Step3Processing(state.decodeProgress, state.decodeStatusText);
    else if (state.decodeStep === 4) activeStepView = this.Step4RevealMorse(state.morseStreamText);
    else if (state.decodeStep === 5) activeStepView = this.Step5Result(state);
    else if (state.decodeStep === 'error') activeStepView = this.StepError(state);

    return `
      <div class="animate-fade">
        ${this.WelcomeHero(state)}
        ${this.KPICards(state)}
        ${this.StepperHeader(state)}
        ${activeStepView}
      </div>
    `;
  },

  // ----------------------------------------------------
  // STEP 1: PREMIUM UPLOAD CARD
  // ----------------------------------------------------
  Step1Upload(state) {
    const tab = state.dashboardTab || 'media';

    let contentMarkup = '';
    if (tab === 'media') {
      contentMarkup = `
        <div class="upload-container-outer" id="upload-clickable-trigger" style="cursor:pointer; margin-bottom:20px;">
          <div class="concentric-ring ring-1"></div>
          <div class="concentric-ring ring-2"></div>
          <div class="concentric-ring ring-3"></div>
          
          <div class="upload-circle-center">
            ${Icons.cloud}
          </div>
        </div>

        <h2 style="font-size: 1.5rem; margin-bottom: 8px; font-weight: 800; letter-spacing: -0.02em; color:var(--text-primary);">
          Upload <span style="color:var(--accent-orange-bright);">audio</span> or <span style="color:#FFA500;">video</span> intercept target
        </h2>
        <p style="margin-bottom: 24px; max-width: 440px; margin-left: auto; margin-right: auto; color:var(--text-secondary); font-size:0.88rem; line-height:1.5;">
          AI Goertzel DSP core will detect tone pulses and translate Morse streams into verified plaintext.
        </p>

        <input type="file" id="file-selector" accept=".mp3,.wav,.mp4,.avi,.mov,.m4a,.webm,.mkv" style="display: none;">
        
        <button id="btn-trigger-browse" class="btn btn-primary" style="padding:12px 28px; font-weight:700; font-size:0.88rem; border-radius:12px; margin-bottom:24px; cursor:pointer;">
          Browse Media Files
        </button>

        <div style="display: flex; align-items: center; justify-content: center; flex-wrap:wrap; gap: 10px; font-size: 0.72rem; color: var(--text-muted); font-weight: 700;">
          <span style="padding:4px 10px; background:var(--bg-glass-input); border:1px solid var(--border-glass); border-radius:8px;">MP3</span>
          <span style="padding:4px 10px; background:var(--bg-glass-input); border:1px solid var(--border-glass); border-radius:8px;">WAV</span>
          <span style="padding:4px 10px; background:var(--bg-glass-input); border:1px solid var(--border-glass); border-radius:8px;">M4A</span>
          <span style="padding:4px 10px; background:var(--bg-glass-input); border:1px solid var(--border-glass); border-radius:8px;">MP4</span>
          <span style="padding:4px 10px; background:var(--bg-glass-input); border:1px solid var(--border-glass); border-radius:8px;">MOV</span>
          <span style="padding:4px 10px; background:var(--bg-glass-input); border:1px solid var(--border-glass); border-radius:8px;">MKV</span>
          <span style="padding:4px 10px; background:rgba(255,138,0,0.1); border:1px solid rgba(255,138,0,0.25); color:var(--accent-orange-bright); border-radius:8px;">MAX 100 MB</span>
        </div>
      `;
    } else {
      contentMarkup = `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 20px; max-width: 460px; margin: 0 auto;">
          <div class="upload-circle-center" style="margin-bottom: 8px;">
            ${Icons.security}
          </div>
          
          <h2 style="font-size: 1.5rem; margin-bottom: 0px; font-weight: 800; letter-spacing: -0.02em; color:var(--text-primary);">
            Cyber Security <span style="color:var(--accent-orange-bright);">Audits</span>
          </h2>
          <p style="color:var(--text-secondary); font-size:0.88rem; line-height:1.5; margin:0 0 10px 0;">
            Run automated telemetry sweeps and security validation audits on system components.
          </p>

          <div style="width: 100%; text-align: left;" class="input-group">
            <label class="input-label" style="font-size:0.82rem; font-weight:600; color:var(--text-secondary); margin-bottom:8px; display:block;">Select Scan Type</label>
            <select id="select-security-scan-type" class="input-field" style="width: 100%; padding: 12px 16px; background: var(--bg-glass-input); border: 1px solid var(--border-glass); border-radius: 12px; color: var(--text-primary); font-size: 0.88rem; font-weight: 600; outline: none;">
              <option value="Version Scan">Version Scan</option>
              <option value="Ping Scan">Ping Scan</option>
              <option value="Aggressive Scan">Aggressive Scan</option>
              <option value="WHOIS Lookup">WHOIS Lookup</option>
              <option value="DNS Lookup">DNS Lookup</option>
              <option value="Clickjacking Test">Clickjacking Test</option>
            </select>
          </div>

          <button id="btn-run-security-sweep" class="btn btn-primary" style="width: 100%; padding: 12px 28px; font-weight: 700; font-size: 0.88rem; border-radius: 12px; margin-top: 10px; cursor: pointer;">
            Run Security Sweep
          </button>
        </div>
      `;
    }

    return `
      <div class="glass-panel animate-slide-up" style="max-width: 680px; margin: 0 auto; padding: 40px; text-align: center; border-radius:24px; border-color:var(--border-glass-hover);" id="drag-drop-zone">
        
        <!-- Segmented Navigation Tab -->
        <div style="display:inline-flex; background:rgba(0,0,0,0.3); border:1px solid var(--border-glass); border-radius:14px; padding:4px; margin-bottom:32px;">
          <button class="btn dashboard-seg-tab ${tab === 'media' ? 'btn-primary' : ''}" data-tab="media" style="padding:8px 20px; font-size:0.8rem; border-radius:10px; font-weight:700; border:none; background:${tab === 'media' ? 'var(--accent-gradient)' : 'transparent'}; color:${tab === 'media' ? '#fff' : 'var(--text-secondary)'}; cursor:pointer;">
            Signal Intercept Ingest
          </button>
          <button class="btn dashboard-seg-tab ${tab === 'security' ? 'btn-primary' : ''}" data-tab="security" style="padding:8px 20px; font-size:0.8rem; border-radius:10px; font-weight:700; border:none; background:${tab === 'security' ? 'var(--accent-gradient)' : 'transparent'}; color:${tab === 'security' ? '#fff' : 'var(--text-secondary)'}; cursor:pointer;">
            Cyber Security Audits
          </button>
        </div>

        <div id="dashboard-tab-content-mount">
          ${contentMarkup}
        </div>
      </div>
    `;
  },
  Step2Details(file) {
    if (!file) return `<div class="glass-panel" style="padding:40px; text-align:center;">No signal intercepts loaded.</div>`;
    const isVideo = file.type.includes('video') || file.name.endsWith('.mp4') || file.name.endsWith('.mov') || file.name.endsWith('.avi');
    const readableSize = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
    
    return `
      <div class="glass-panel animate-slide-up" style="max-width: 600px; margin: 0 auto; padding: 40px; border-radius:24px;">
        <h2 style="font-size: 1.35rem; margin-bottom: 24px; font-weight: 800; display:flex; align-items:center; gap:12px;">
          <span style="color:var(--accent-orange-bright);">${isVideo ? Icons.file : Icons.sound}</span>
          Target Transmission Ingested
        </h2>

        <div style="background: rgba(0,0,0,0.25); border: 1px solid var(--border-glass); border-radius: 14px; padding: 20px; margin-bottom: 24px;">
          <div style="display:flex; justify-content:space-between; margin-bottom:12px; font-size:0.9rem;">
            <span style="color:var(--text-secondary);">Signal Identifier</span>
            <span style="color:#fff; font-weight:600; text-overflow:ellipsis; overflow:hidden; white-space:nowrap; max-width:280px;">${file.name}</span>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:12px; font-size:0.9rem;">
            <span style="color:var(--text-secondary);">Container Size</span>
            <span style="color:#fff; font-weight:600;">${readableSize}</span>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:0.9rem;">
            <span style="color:var(--text-secondary);">Transmission Type</span>
            <span style="color:var(--accent-orange-bright); font-weight:600;">${isVideo ? 'VIDEO (Audio extraction active)' : 'AUDIO'}</span>
          </div>
        </div>

        <div style="margin-bottom: 32px; border:1px solid var(--border-glass); border-radius:14px; padding:16px; background:rgba(0,0,0,0.35);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <span style="font-size: 0.75rem; text-transform:uppercase; letter-spacing:0.06em; color:var(--text-muted); font-weight:600;">
              Signal Waveform Profile
            </span>
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:0.75rem; color:var(--text-secondary);">Zoom</span>
              <input type="range" id="slider-waveform-zoom" min="1" max="5" step="0.2" value="1" style="width:70px; accent-color:var(--accent-orange);">
            </div>
          </div>
          <canvas id="details-waveform" style="width: 100%; height: 75px;"></canvas>
          <div style="display:flex; justify-content:flex-end; margin-top:8px;">
            <button class="btn btn-secondary" id="btn-waveform-play" style="padding:6px 12px; font-size:0.75rem;">
              ${Icons.play} Play Sound
            </button>
          </div>
        </div>

        <div style="display: flex; gap: 16px;">
          <button class="btn btn-secondary" id="btn-upload-another" style="flex: 1;">
            Clear Target
          </button>
          <button class="btn btn-primary" id="btn-start-decode" style="flex: 2;">
            Execute AI Identification
          </button>
        </div>
      </div>
    `;
  },

  // ----------------------------------------------------
  // STEP 3: PROCESSING DECIPHER
  // ----------------------------------------------------
  Step3Processing(progress, statusText) {
    const radius = 50;
    const circ = 2 * Math.PI * radius;
    const strokeDashoffset = circ - (progress / 100) * circ;

    return `
      <div class="glass-panel animate-slide-up" style="max-width: 600px; margin: 0 auto; padding: 40px; text-align: center; border-radius:24px;">
        <h2 style="font-size: 1.35rem; margin-bottom: 6px; font-weight: 800;">Analyzing Signal Matrix</h2>
        <p style="color: var(--accent-orange-bright); font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 32px;">
          Running digital bandpass filtering...
        </p>

        <div style="position: relative; width: 140px; height: 140px; margin: 0 auto 32px;">
          <svg width="140" height="140" class="progress-ring">
            <circle cx="70" cy="70" r="${radius}" stroke="rgba(255,122,0,0.03)" stroke-width="8" fill="transparent"/>
            <circle cx="70" cy="70" r="${radius}" stroke="url(#orange-gradient-svg)" stroke-width="8" fill="transparent"
              class="progress-ring__circle"
              stroke-dasharray="${circ}"
              stroke-dashoffset="${strokeDashoffset}"/>
            
            <defs>
              <linearGradient id="orange-gradient-svg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#FF5500" />
                <stop offset="50%" stop-color="#FF7A00" />
                <stop offset="100%" stop-color="#FFA500" />
              </linearGradient>
            </defs>
          </svg>
          <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <span style="font-size: 1.8rem; font-weight: 800; color: #fff; line-height:1; font-family:var(--font-mono);">${progress}%</span>
            <span style="font-size: 0.65rem; color: var(--text-secondary); font-weight: 700; text-transform: uppercase; margin-top:4px; letter-spacing:0.05em;">Telemetry</span>
          </div>
        </div>

        <div style="margin-bottom: 24px; border:1px solid var(--border-glass); border-radius:14px; padding:16px; background:rgba(0,0,0,0.3); overflow:hidden;">
          <canvas id="processing-waveform" style="width: 100%; height: 90px;"></canvas>
        </div>

        <!-- Live Telemetry Stream -->
        <div class="glass-panel" style="background: rgba(0,0,0,0.5); border: 1px solid rgba(255,122,0,0.15); border-radius:12px; padding:20px; text-align:left; font-family:var(--font-mono); font-size:0.8rem; margin-bottom:24px; box-shadow: inset 0 0 20px rgba(0,0,0,0.6);">
          <div style="color:var(--text-secondary); font-size:0.7rem; border-bottom:1px solid rgba(255,122,0,0.1); padding-bottom:6px; margin-bottom:12px; font-weight:700; text-transform:uppercase; display:flex; justify-content:space-between; align-items:center;">
            <span>Live Telemetry Stream</span>
            <span class="morse-blinker" style="width:6px; height:6px;"></span>
          </div>
          <div id="live-telemetry-steps" style="line-height:1.6; min-height:110px; color:#fff;">
            <div>Initializing telemetry carrier tracking...</div>
          </div>
        </div>

        <!-- Live logs console container -->
        <div id="processing-log-list" style="background:#020202; border:1px solid rgba(255,122,0,0.25); border-radius:12px; height:180px; overflow-y:auto; padding:15px; font-family:var(--font-mono); font-size:0.75rem; text-align:left; color:#a0a0a0; box-shadow:inset 0 0 10px rgba(0,0,0,0.85); width:100%; margin-bottom:32px; line-height:1.5;">
          <div style="color:var(--text-muted);">[SYS-INIT] Initializing decryption matrix pipeline...</div>
          <div style="color:var(--accent-orange-bright);">[INFO] Status: ${statusText}</div>
        </div>

        <button class="btn btn-danger" id="btn-cancel-decode" style="width: 100%; max-width: 200px; display:block; margin: 0 auto;">
          Abort Sequence
        </button>
      </div>
    `;
  },

  // ----------------------------------------------------
  // STEP 4: REVEAL DECODED MORSE STREAM
  // ----------------------------------------------------
  Step4RevealMorse(morseText) {
    return `
      <div class="glass-panel animate-slide-up" style="max-width: 600px; margin: 0 auto; padding: 40px; border-radius:24px;">
        <h2 style="font-size: 1.35rem; margin-bottom: 8px; font-weight: 800;">Demodulating Audio Signal</h2>
        <p style="color: var(--accent-orange-bright); font-size: 0.82rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 24px;">
          Translating signal pulses into code blocks...
        </p>

        <div class="morse-retro-console" style="margin-bottom: 32px;">
          <div style="display:flex; justify-content:space-between; font-size:0.72rem; color:var(--text-muted); margin-bottom:12px; border-bottom:1px solid rgba(255,122,0,0.15); padding-bottom:8px; font-family:var(--font-sans); font-weight:600;">
            <span>RAW PULSE INTERCEPT CONSOLE</span>
            <span>FREQ: SWEEPING HZ</span>
          </div>
          <div style="word-break: break-all; min-height: 110px; font-family:var(--font-mono); font-size:1.15rem; line-height:1.6;" id="morse-stream-target">
            ${morseText}<span class="morse-blinker"></span>
          </div>
        </div>

        <div style="display:flex; align-items:center; justify-content:space-between; font-size:0.85rem; color:var(--text-secondary);">
          <span style="display:flex; align-items:center; gap:8px;">
            <svg class="rotate-anim" style="width:14px; height:14px; color:var(--accent-orange-bright);" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1 1 21.2 9h-2.2" />
            </svg>
            Generating plaintext translation...
          </span>
          <span style="color:var(--text-muted); font-family:var(--font-mono);">Carrier sweep active</span>
        </div>
      </div>
    `;
  },

  // ----------------------------------------------------
  // STEP 5: FINAL RESULT REPORT (Complete 9 Parameter list)
  // ----------------------------------------------------
  Step5Result(state) {
    const result = state.lastDecodeResult || {};
    const file = state.uploadedFile || { name: 'intercept.wav', size: 102400 };
    const dateStr = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    const isLowConfidence = parseInt(result.confidence) < 70;

    const synthWPM = state.synthSpeed || parseInt(result.wpm) || 20;
    const synthFreq = state.synthFreq || parseInt(result.carrierFreq) || 800;
    const synthVol = state.synthVolume !== undefined ? state.synthVolume : 0.8;

    return `
      <div class="glass-panel animate-slide-up" style="max-width: 760px; margin: 0 auto; padding: 40px; border-radius:24px; border-color:rgba(255,122,0,0.25);">
        
        <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 32px;">
          <div style="background: rgba(34, 197, 94, 0.1); border:1px solid var(--success); width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--success);">
            ${Icons.check}
          </div>
          <div>
            <h2 style="font-size: 1.4rem; font-weight: 800; margin-bottom: 2px;">Decryption Sequence Completed</h2>
            <p style="font-size: 0.85rem; color: var(--text-secondary);">Telemetry data successfully compiled from local node intercept</p>
          </div>
        </div>

        ${isLowConfidence ? `
          <div style="background: rgba(239, 68, 68, 0.15); border: 1px solid var(--error); border-radius: 12px; padding: 12px 16px; margin-bottom: 24px; color: var(--error); font-size: 0.85rem; display: flex; align-items: center; gap: 10px;">
            <svg style="width:20px; height:20px; flex-shrink: 0;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span><strong>Signal Telemetry Alert:</strong> Low decoding confidence (${result.confidence}). The plaintext output may contain missing tokens due to signal noise or timing irregularities.</span>
          </div>
        ` : ''}

        <!-- Waveform canvas playback visualization -->
        <div style="margin-bottom: 32px; border:1px solid var(--border-glass); border-radius:14px; padding:16px; background:rgba(0,0,0,0.35);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <span style="font-size: 0.75rem; text-transform:uppercase; letter-spacing:0.06em; color:var(--text-muted); font-weight:600; display:flex; align-items:center; gap:6px;">
              <span style="color:var(--accent-orange-bright);">${Icons.sound}</span>
              Visualized Synthesized Waveform (Clean generated Morse pulses)
            </span>
          </div>
          <canvas id="results-waveform" style="width: 100%; height: 75px;"></canvas>
          
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:12px; flex-wrap:wrap; gap:12px;">
            <!-- Synthesis controls sliders -->
            <div style="display:flex; gap:16px; flex-wrap:wrap; align-items:center;">
              <div style="display:flex; align-items:center; gap:6px; font-size:0.8rem;">
                <span style="color:var(--text-secondary);">WPM:</span>
                <input type="range" id="slider-synth-wpm" min="10" max="40" step="1" value="${synthWPM}" style="width:65px; accent-color:var(--accent-orange);">
                <span style="color:#fff; font-family:var(--font-mono); font-size:0.75rem; width:18px;" id="lbl-synth-wpm">${synthWPM}</span>
              </div>
              <div style="display:flex; align-items:center; gap:6px; font-size:0.8rem;">
                <span style="color:var(--text-secondary);">Freq:</span>
                <input type="range" id="slider-synth-freq" min="300" max="1200" step="50" value="${synthFreq}" style="width:65px; accent-color:var(--accent-orange);">
                <span style="color:#fff; font-family:var(--font-mono); font-size:0.75rem; width:45px;" id="lbl-synth-freq">${synthFreq}Hz</span>
              </div>
              <div style="display:flex; align-items:center; gap:6px; font-size:0.8rem;">
                <span style="color:var(--text-secondary);">Vol:</span>
                <input type="range" id="slider-synth-vol" min="0" max="1" step="0.1" value="${synthVol}" style="width:50px; accent-color:var(--accent-orange);">
                <span style="color:#fff; font-family:var(--font-mono); font-size:0.75rem; width:24px;" id="lbl-synth-vol">${Math.round(synthVol*100)}%</span>
              </div>
            </div>
            
            <button class="btn btn-secondary" id="btn-results-play" type="button" style="padding:6px 16px; font-size:0.8rem; display:flex; align-items:center; gap:6px;">
              ${Icons.play} Play Sound
            </button>
          </div>
        </div>

        <!-- 9 Core Parameters Matrix Grid -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 32px;" class="results-stats-grid">
          
          <div style="background:rgba(0,0,0,0.2); border:1px solid var(--border-glass); border-radius:10px; padding:12px; text-align:center;">
            <p style="font-size:0.65rem; text-transform:uppercase; letter-spacing:0.05em; color:var(--text-muted); margin-bottom:4px; font-weight:700;">File Name</p>
            <h4 style="font-size:0.85rem; color:#fff; font-weight:800; margin:0; text-overflow:ellipsis; overflow:hidden; white-space:nowrap; max-width:200px;" title="${file.name}">${file.name}</h4>
          </div>

          <div style="background:rgba(0,0,0,0.2); border:1px solid var(--border-glass); border-radius:10px; padding:12px; text-align:center;">
            <p style="font-size:0.65rem; text-transform:uppercase; letter-spacing:0.05em; color:var(--text-muted); margin-bottom:4px; font-weight:700;">Upload Date</p>
            <h4 style="font-size:0.88rem; color:#fff; font-weight:800; margin:0;">${dateStr}</h4>
          </div>

          <div style="background:rgba(0,0,0,0.2); border:1px solid var(--border-glass); border-radius:10px; padding:12px; text-align:center;">
            <p style="font-size:0.65rem; text-transform:uppercase; letter-spacing:0.05em; color:var(--text-muted); margin-bottom:4px; font-weight:700;">Processing Time</p>
            <h4 style="font-size:0.92rem; color:#fff; font-weight:800; margin:0;">${result.processingTime || '0.24s'}</h4>
          </div>

          <div style="background:rgba(0,0,0,0.2); border:1px solid var(--border-glass); border-radius:10px; padding:12px; text-align:center;">
            <p style="font-size:0.65rem; text-transform:uppercase; letter-spacing:0.05em; color:var(--text-muted); margin-bottom:4px; font-weight:700;">Carrier Frequency</p>
            <h4 style="font-size:0.92rem; color:var(--accent-orange-bright); font-weight:800; margin:0;">${result.carrierFreq || '800 Hz'}</h4>
          </div>

          <div style="background:rgba(0,0,0,0.2); border:1px solid var(--border-glass); border-radius:10px; padding:12px; text-align:center;">
            <p style="font-size:0.65rem; text-transform:uppercase; letter-spacing:0.05em; color:var(--text-muted); margin-bottom:4px; font-weight:700;">WPM Rate</p>
            <h4 style="font-size:0.92rem; color:#fff; font-weight:800; margin:0;">${result.wpm || '20 WPM'}</h4>
          </div>

          <div style="background:rgba(0,0,0,0.2); border:1px solid var(--border-glass); border-radius:10px; padding:12px; text-align:center;">
            <p style="font-size:0.65rem; text-transform:uppercase; letter-spacing:0.05em; color:var(--text-muted); margin-bottom:4px; font-weight:700;">Confidence Score</p>
            <h4 style="font-size:0.92rem; color:var(--success); font-weight:800; margin:0;">${result.confidence || '98%'}</h4>
          </div>

          <div style="background:rgba(0,0,0,0.2); border:1px solid var(--border-glass); border-radius:10px; padding:12px; text-align:center;">
            <p style="font-size:0.65rem; text-transform:uppercase; letter-spacing:0.05em; color:var(--text-muted); margin-bottom:4px; font-weight:700;">Active Dots Count</p>
            <h4 style="font-size:0.92rem; color:#fff; font-weight:800; margin:0;">${result.dotsCount || 0}</h4>
          </div>

          <div style="background:rgba(0,0,0,0.2); border:1px solid var(--border-glass); border-radius:10px; padding:12px; text-align:center;">
            <p style="font-size:0.65rem; text-transform:uppercase; letter-spacing:0.05em; color:var(--text-muted); margin-bottom:4px; font-weight:700;">Active Dashes Count</p>
            <h4 style="font-size:0.92rem; color:#fff; font-weight:800; margin:0;">${result.dashesCount || 0}</h4>
          </div>

          <div style="background:rgba(0,0,0,0.2); border:1px solid var(--border-glass); border-radius:10px; padding:12px; text-align:center;">
            <p style="font-size:0.65rem; text-transform:uppercase; letter-spacing:0.05em; color:var(--text-muted); margin-bottom:4px; font-weight:700;">Decoder Used</p>
            <h4 style="font-size:0.92rem; color:var(--accent-orange-bright); font-weight:800; margin:0;">${result.decoderUsed || 'Audio DSP'}</h4>
          </div>

        </div>

        <div style="display:flex; flex-direction:column; gap:20px; margin-bottom:32px;">
          <div>
            <p style="font-size:0.78rem; text-transform:uppercase; letter-spacing:0.06em; color:var(--text-muted); font-weight:700; margin-bottom:8px;">Decoded Plaintext Translation</p>
            <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-glass); border-radius:12px; padding:20px; font-size:1.05rem; line-height:1.6; color:#fff; font-weight:600; letter-spacing:0.02em; text-align:left;">
              ${result.text || ''}
            </div>
          </div>
          
          <div>
            <p style="font-size:0.78rem; text-transform:uppercase; letter-spacing:0.06em; color:var(--text-muted); font-weight:700; margin-bottom:8px;">Intercepted Morse Sequence</p>
            <div style="background:rgba(0,0,0,0.3); border:1px solid var(--border-glass); border-radius:12px; padding:20px; font-family:var(--font-mono); color:var(--accent-orange-bright); font-size:0.95rem; line-height:1.6; word-break:break-all; text-align:left;">
              ${result.morse || ''}
            </div>
          </div>
        </div>

        <div style="display:flex; flex-wrap:wrap; gap:12px; justify-content:space-between; align-items:center; border-top:1px solid var(--border-glass); padding-top:24px;">
          <div style="display:flex; gap:12px;">
            <button class="btn btn-secondary" id="btn-copy-result">
              ${Icons.copy} Copy Plaintext
            </button>
            <button class="btn btn-secondary" id="btn-download-txt">
              ${Icons.downloads} Download TXT
            </button>
            <button class="btn btn-secondary" id="btn-download-pdf">
              ${Icons.downloads} PDF Report
            </button>
          </div>
          
          <button class="btn btn-primary" id="btn-reset-decode">
            Scan Again
          </button>
        </div>
      </div>
    `;
  },

  // ----------------------------------------------------
  // STEP ERROR CARD
  // ----------------------------------------------------
  StepError(state) {
    return `
      <div class="glass-panel animate-slide-up" style="max-width: 600px; margin:0 auto; padding:40px; text-align:center; border-radius:24px; border-color:var(--error);">
        <div style="background:rgba(239,68,68,0.08); width:60px; height:60px; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 20px; border:1px solid rgba(239,68,68,0.25); color:var(--error);">
          <svg style="width:28px; height:28px;" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-dashoffset="2" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <h2 style="font-size:1.35rem; font-weight:800; margin-bottom:8px; color:#fff;">Signal Intercept Error</h2>
        <p style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:24px; line-height:1.45;">
          ${state.decodeErrorText || 'No Morse code signal detected. Possible reasons: Poor audio quality or empty silence.'}
        </p>
        <button class="btn btn-primary" id="btn-error-reset" style="max-width:180px; margin:0 auto;">Load New Target</button>
      </div>
    `;
  },

  // ----------------------------------------------------
  // 100% FUNCTIONAL MANUAL TRANSLATOR HUB
  // ----------------------------------------------------
  Translator(state) {
    return `
      <div class="animate-fade" style="max-width:1050px; margin:0 auto; width:100%;">
        <header style="margin-bottom:32px;">
          <h1 style="font-size:1.85rem; font-family:var(--font-sans); font-weight:700; letter-spacing:-0.03em;">Interactive Translation Core</h1>
          <p style="color:var(--text-secondary); font-size:0.9rem;">Instantly translate English alphanumeric strings into Morse signals or validate and decode raw code pulses.</p>
        </header>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-bottom:24px; align-items:stretch;" class="translator-grid">
          
          <div class="glass-panel" style="padding:28px; display:flex; flex-direction:column; border-radius:24px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
              <h3 style="font-size:0.95rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:var(--text-primary);">Plain Text Input</h3>
              <span id="text-counter" style="font-size:0.75rem; color:var(--text-muted); font-family:var(--font-mono);">0 Chars</span>
            </div>
            
            <textarea id="translator-text-input" class="input-field" placeholder="Type plain English text here (e.g. SOS DE CQ4 NORAD...)" style="flex:1; min-height:200px; font-family:var(--font-sans); line-height:1.5; font-size:0.95rem; margin-bottom:20px; border-radius:18px; resize:none;"></textarea>
            
            <div style="display:flex; justify-content:space-between;">
              <button class="btn btn-secondary" id="btn-clear-text">Clear Input</button>
              <button class="btn btn-secondary" id="btn-copy-text" style="gap:6px;">
                ${Icons.copy} Copy Text
              </button>
            </div>
          </div>

          <div class="glass-panel" style="padding:28px; display:flex; flex-direction:column; border-radius:24px; border-color:rgba(255,138,0,0.15);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
              <h3 style="font-size:0.95rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:var(--accent-orange);">Morse Code Input</h3>
              <span id="morse-validation-badge" class="badge badge-success">Valid Morse</span>
            </div>
            
            <textarea id="translator-morse-input" class="input-field" placeholder="Enter dots and dashes separated by single space (e.g. ... --- ...)" style="flex:1; min-height:200px; font-family:var(--font-mono); color:var(--accent-orange-bright); line-height:1.6; font-size:1.1rem; margin-bottom:20px; border-radius:18px; resize:none;"></textarea>
            
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <button class="btn btn-secondary" id="btn-clear-morse">Clear Code</button>
              
              <div id="morse-error-message" style="color:var(--error); font-size:0.78rem; font-weight:600; display:none;">
                Warning: Invalid characters detected
              </div>

              <button class="btn btn-secondary" id="btn-copy-morse" style="padding:8px 16px; font-size:0.8rem; gap:6px;">
                ${Icons.copy} Copy Morse
              </button>
            </div>
          </div>
        </div>

        <div class="glass-panel" style="padding:32px; border-radius:24px; margin-bottom:24px;">
          <h3 style="font-size:1.05rem; font-weight:700; margin-bottom:20px; color:var(--text-primary); display:flex; align-items:center; gap:8px;">
            <span style="color:var(--accent-orange);">${Icons.sound}</span>
            Signal Synthesis & Telemetry Settings
          </h3>
          
          <div style="display:grid; grid-template-columns:1fr 1fr 1.2fr; gap:32px; align-items:center; flex-wrap:wrap;">
            <div>
              <div style="display:flex; justify-content:space-between; font-size:0.8rem; font-weight:600; margin-bottom:8px;">
                <span style="color:var(--text-secondary);">Transmission Speed</span>
                <span id="lbl-speed" style="color:var(--accent-orange-bright); font-family:var(--font-mono);">20 WPM</span>
              </div>
              <input type="range" id="slider-speed" min="5" max="50" value="20" style="width:100%; accent-color:var(--accent-orange); height:5px; border-radius:3px; outline:none; border:none; -webkit-appearance:none; background:var(--border-glass);">
            </div>

            <div>
              <div style="display:flex; justify-content:space-between; font-size:0.8rem; font-weight:600; margin-bottom:8px;">
                <span style="color:var(--text-secondary);">Oscillator Frequency</span>
                <span id="lbl-freq" style="color:var(--accent-orange-bright); font-family:var(--font-mono);">800 Hz</span>
              </div>
              <input type="range" id="slider-freq" min="300" max="1200" value="800" step="50" style="width:100%; accent-color:var(--accent-orange); height:5px; border-radius:3px; outline:none; border:none; -webkit-appearance:none; background:var(--border-glass);">
            </div>

            <div style="display:flex; gap:12px; align-items:center; justify-content: flex-end;">
              <div class="input-group" style="margin-bottom:0; flex:1;">
                <select id="select-osc-type" class="input-field" style="padding:10px 14px; font-size:0.85rem; appearance: none; background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23ff7a00%22 stroke-width=%222%22%3E%3Cpolyline points=%226 9 12 15 18 9%22/%3E%3C/svg%3E'); background-repeat:no-repeat; background-position:right 12px center; background-size:14px; border-radius:12px;">
                  <option value="sine">Sine Wave Tone</option>
                  <option value="square">Square Wave Tone</option>
                  <option value="triangle">Triangle Wave Tone</option>
                  <option value="sawtooth">Sawtooth Wave Tone</option>
                </select>
              </div>
              
              <button class="btn btn-primary" id="btn-play-audio" style="padding:11px 20px; font-size:0.85rem; gap:6px;">
                ${Icons.play} Play Sound
              </button>
              <button class="btn btn-danger" id="btn-stop-audio" style="padding:11px 16px; display:none;">
                ${Icons.stop}
              </button>
            </div>
          </div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; padding-bottom: 40px;">
          <p style="font-size:0.82rem; color:var(--text-muted); font-family:var(--font-mono);">
            * Web Audio API synthesized dynamically on local host thread.
          </p>
          <div style="display:flex; gap:12px;">
            <button class="btn btn-secondary" id="btn-download-wav" style="gap:8px;">
              ${Icons.downloads} Synthesize WAV
            </button>
            <button class="btn btn-accent" id="btn-save-log" style="gap:8px;">
              ${Icons.key} Save Log
            </button>
          </div>
        </div>
      </div>
    `;
  },

  // ----------------------------------------------------
  // scan history view (API timelines logs)
  // ----------------------------------------------------
  History(state) {
    const list = state.decryptionHistory || [];

    const timelineItems = list.length === 0 
      ? `
        <div class="glass-panel" style="padding:40px; text-align:center; border-radius:18px;">
          <p style="color:var(--text-muted); font-size:1rem; margin-bottom:12px;">No signal decodes stored in database timelines.</p>
          <button class="btn btn-accent" id="btn-history-goto-decode">Intercept New Target</button>
        </div>
      `
      : list.map((item, idx) => {
          return `
            <div class="glass-panel" style="padding:24px; margin-bottom:20px; border-radius:18px; border-color:rgba(255,122,0,0.15);" id="history-item-${idx}">
              <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px;">
                <div style="display:flex; gap:16px; align-items:center;">
                  <div style="background:rgba(255,122,0,0.05); border:1px solid var(--border-glass); border-radius:10px; padding:10px; display:flex; align-items:center; justify-content:center; color:var(--accent-orange-bright);">
                    ${Icons.translator}
                  </div>
                  <div>
                    <h3 style="font-size:1.1rem; font-weight:700;">${item.name || 'Manual Translation Intercept'}</h3>
                    <p style="font-size:0.78rem; color:var(--text-muted); font-family:var(--font-mono); margin-top:2px;">
                      Timestamp: ${item.timestamp} &bull; Speed: ${item.wpm || '20'} WPM
                    </p>
                  </div>
                </div>
                
                <span class="badge badge-info">${item.type || 'Manual'}</span>
              </div>

              <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin:20px 0; align-items:stretch;">
                <div style="background:rgba(255,255,255,0.01); border:1px solid var(--border-glass); border-radius:10px; padding:12px; font-size:0.88rem; color:var(--text-secondary);">
                  <div style="font-size:0.68rem; text-transform:uppercase; letter-spacing:0.05em; color:var(--text-muted); margin-bottom:6px; font-weight:700;">English Text</div>
                  ${item.text}
                </div>
                <div style="background:rgba(0,0,0,0.25); border:1px solid var(--border-glass); border-radius:10px; padding:12px; font-family:var(--font-mono); font-size:0.88rem; color:var(--accent-orange-bright); word-break:break-all;">
                  <div style="font-size:0.68rem; text-transform:uppercase; letter-spacing:0.05em; color:var(--text-muted); margin-bottom:6px; font-weight:700;">Morse Code</div>
                  ${item.morse}
                </div>
              </div>

              <div style="display:flex; justify-content:flex-end; align-items:center; border-top:1px solid var(--border-glass); padding-top:16px; gap:12px;">
                <button class="btn btn-secondary btn-play-history" data-morse="${item.morse}" data-wpm="${item.wpm || 20}" style="padding:6px 12px; font-size:0.78rem; gap:6px;">
                  ${Icons.play} Play Beeps
                </button>
                <button class="btn btn-danger btn-delete-history" data-index="${idx}" style="padding:6px 12px; font-size:0.78rem; gap:6px; background:transparent;">
                  ${Icons.trash} Purge Log
                </button>
              </div>
            </div>
          `;
        }).join('');

    return `
      <div style="max-width:900px; margin:0 auto; width:100%;" class="animate-fade">
        <header style="margin-bottom:32px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
          <div>
            <h1 style="font-size:1.85rem; font-family:var(--font-sans); font-weight:800; letter-spacing:-0.03em;">Decryption Logs</h1>
            <p style="color:var(--text-secondary); font-size:0.9rem;">Review, download, or listen to historically translated Morse intercepts cached in database registries.</p>
          </div>
          
          ${list.length > 0 ? `<button class="btn btn-danger" id="btn-purge-all-history" style="padding:8px 16px; font-size:0.8rem;">Purge Node Database</button>` : ''}
        </header>

        <div>
          ${timelineItems}
        </div>
      </div>
    `;
  },

  // ----------------------------------------------------
  // DOWNLOADS TIMELINE REPORT
  // ----------------------------------------------------
  Downloads(state) {
    const list = state.downloadsHistory || [];

    const rows = list.length === 0 
      ? `<tr><td colspan="5" style="padding:32px; text-align:center; color:var(--text-muted); font-size:0.9rem;">No logs exported to downloads.</td></tr>`
      : list.map(item => `
        <tr style="border-bottom:1px solid var(--border-glass); transition: all var(--transition-fast);">
          <td style="padding:16px 20px; font-weight:600; color:var(--text-primary);">${item.name}</td>
          <td style="padding:16px 20px; color:var(--text-secondary); font-family:var(--font-mono); font-size:0.82rem;">${item.type}</td>
          <td style="padding:16px 20px; color:var(--text-secondary); font-weight:500;">${item.size}</td>
          <td style="padding:16px 20px; color:var(--text-muted);">${item.date}</td>
          <td style="padding:16px 20px; text-align:right;">
            <button class="btn btn-secondary btn-download-file" data-name="${item.name}" style="padding:8px 16px; font-size:0.8rem; gap:6px; border-radius:12px;">
              ${Icons.downloads} Download
            </button>
          </td>
        </tr>
      `).join('');

    return `
      <div style="max-width:950px; margin:0 auto; width:100%;" class="animate-fade">
        <header style="margin-bottom:32px;">
          <h1 style="font-size:1.85rem; font-family:var(--font-sans); font-weight:700; letter-spacing:-0.03em;">Downloads Hub</h1>
          <p style="color:var(--text-secondary); font-size:0.9rem;">Retrieve exported reports, transcripts, and custom synthesized WAV files.</p>
        </header>

        <div class="glass-panel" style="overflow:hidden; border-radius:24px; box-shadow: 0 10px 30px rgba(0,0,0,0.015);">
          <table style="width:100%; border-collapse:collapse; text-align:left; font-size:0.88rem;">
            <thead>
              <tr style="border-bottom:1px solid var(--border-glass); background:var(--bg-secondary); color:var(--text-secondary); font-weight:600;">
                <th style="padding:18px 20px;">Filename</th>
                <th style="padding:18px 20px;">Type</th>
                <th style="padding:18px 20px;">Size</th>
                <th style="padding:18px 20px;">Creation Date</th>
                <th style="padding:18px 20px; text-align:right;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // ----------------------------------------------------
  // PROFILE VIEW (Dynamic User values)
  // ----------------------------------------------------
  Profile(state) {
    const user = state.currentUser || { name: 'Rahul Sharma', email: 'operator@morsevision.io', role: 'user' };
    const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);

    return `
      <div style="max-width:900px; margin:0 auto; width:100%;" class="animate-fade">
        <header style="margin-bottom:32px;">
          <h1 style="font-size:1.85rem; font-family:var(--font-sans); font-weight:800; letter-spacing:-0.03em;">Operator Profile</h1>
          <p style="color:var(--text-secondary); font-size:0.9rem;">View access privileges, system quota status, and operational activity parameters.</p>
        </header>

        <div style="display:grid; grid-template-columns:1fr 2fr; gap:24px; align-items:start; flex-wrap:wrap;" class="profile-grid">
          
          <div class="glass-panel" style="padding:32px; text-align:center; border-radius:18px; border-color:rgba(255,122,0,0.25);">
            <div style="position:relative; width:96px; height:96px; margin:0 auto 20px; cursor:pointer;" id="avatar-upload-container">
              <div style="background:var(--accent-gradient); width:100%; height:100%; border-radius:50%; padding:3px; box-shadow:0 0 20px rgba(255,122,0,0.35); position:relative; overflow:hidden;">
                ${user.avatar 
                  ? `<img src="${user.avatar}" style="width:100%; height:100%; border-radius:50%; object-fit:cover;" id="avatar-image">`
                  : `<div style="background:var(--bg-secondary); width:100%; height:100%; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#fff; font-size:2rem; font-weight:800;">${initials || 'OP'}</div>`
                }
                <!-- Hover Overlay -->
                <div style="position:absolute; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center; opacity:0; transition:opacity 0.2s;" class="avatar-hover-overlay">
                  <svg style="width:24px; height:24px; fill:none; stroke:#fff; stroke-width:2;" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                </div>
              </div>
              <span style="position:absolute; bottom:4px; right:4px; width:16px; height:16px; border-radius:50%; background:var(--success); border:3px solid var(--bg-secondary); box-shadow:0 0 10px var(--success)"></span>
              <input type="file" id="avatar-file-input" accept="image/*" style="display:none;">
            </div>
            
            <h2 style="font-size:1.25rem; font-weight:800;">${user.name}</h2>
            <p style="font-size:0.75rem; color:var(--accent-orange-bright); font-family:var(--font-mono); font-weight:700; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:20px;">ACCESS LEVEL: ${user.role.toUpperCase()}</p>
            
            <div style="border-top:1px solid var(--border-glass); padding-top:20px; text-align:left; font-size:0.85rem; color:var(--text-secondary);">
              <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                <span>Authorized Node</span>
                <span style="color:#fff; font-weight:600; font-family:var(--font-mono);">#US-NORAD-12</span>
              </div>
              <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                <span>Operator Email</span>
                <span style="color:#fff; font-weight:600;">${user.email}</span>
              </div>
              <div style="display:flex; justify-content:space-between;">
                <span>Clearance Keys</span>
                <span style="color:var(--success); font-weight:600;">ACTIVE</span>
              </div>
            </div>
          </div>

          <div style="display:flex; flex-direction:column; gap:24px;">
            <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:16px;">
              <div class="glass-panel" style="padding:20px; text-align:center; border-radius:14px;">
                <p style="font-size:0.7rem; text-transform:uppercase; letter-spacing:0.05em; color:var(--text-muted); margin-bottom:6px; font-weight:700;">Telemetry Scans</p>
                <h3 style="font-size:1.6rem; font-weight:800;">${state.decryptionHistory.length}</h3>
              </div>
              <div class="glass-panel" style="padding:20px; text-align:center; border-radius:14px;">
                <p style="font-size:0.7rem; text-transform:uppercase; letter-spacing:0.05em; color:var(--text-muted); margin-bottom:6px; font-weight:700;">Synthesizers</p>
                <h3 style="font-size:1.6rem; font-weight:800;">4</h3>
              </div>
              <div class="glass-panel" style="padding:20px; text-align:center; border-radius:14px;">
                <p style="font-size:0.7rem; text-transform:uppercase; letter-spacing:0.05em; color:var(--text-muted); margin-bottom:6px; font-weight:700;">Quota Status</p>
                <h3 style="font-size:1.6rem; font-weight:800; color:var(--success);">98%</h3>
              </div>
            </div>

            <div class="glass-panel" style="padding:24px; border-radius:18px;">
              <h3 style="font-size:1.05rem; margin-bottom:16px; font-weight:700; color:#fff;">Recent Node Operations</h3>
              <div style="display:flex; flex-direction:column; gap:12px; font-size:0.85rem;">
                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-glass); padding-bottom:8px;">
                  <span style="color:#fff;">Performed manual signal audio synthesis</span>
                  <span style="color:var(--text-muted);">Just now</span>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-glass); padding-bottom:8px;">
                  <span style="color:#fff;">Decoded file container target successfully</span>
                  <span style="color:var(--text-muted);">1 hour ago</span>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="color:#fff;">Node authorized on port 3000</span>
                  <span style="color:var(--text-muted);">Today</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    `;
  },

  // ----------------------------------------------------
  // SETTINGS VIEW
  // ----------------------------------------------------
  Settings(state) {
    return `
      <div style="max-width:900px; margin:0 auto; width:100%;" class="animate-fade">
        <header style="margin-bottom:32px;">
          <h1 style="font-size:1.85rem; font-family:var(--font-sans); font-weight:700; letter-spacing:-0.03em;">System Configurations</h1>
          <p style="color:var(--text-secondary); font-size:0.9rem;">Tweak Morse oscillators, node timeouts, security authorization flags, and database caches.</p>
        </header>

        <div style="position:relative; display:flex; flex-direction:column; gap:24px; padding-bottom:60px;">
          
          <div class="glass-panel" style="padding:32px; border-radius:24px;">
            <h2 style="font-size:1.15rem; font-weight:700; margin-bottom:24px; color:var(--text-primary);">Audio Synthesizer Constants</h2>
            
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px;">
              <div class="input-group">
                <label class="input-label">Frequency Bandwidth</label>
                <select class="input-field" style="appearance: none; background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23ff7a00%22 stroke-width=%222%22%3E%3Cpolyline points=%226 9 12 15 18 9%22/%3E%3C/svg%3E'); background-repeat:no-repeat; background-position:right 16px center; background-size:16px; border-radius:16px;">
                  <option>Narrow-Band (300Hz - 900Hz)</option>
                  <option>Wide-Band (100Hz - 3000Hz)</option>
                </select>
              </div>

              <div class="input-group">
                <label class="input-label">Word-Space Standard</label>
                <select class="input-field" style="appearance: none; background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23ff7a00%22 stroke-width=%222%22%3E%3Cpolyline points=%226 9 12 15 18 9%22/%3E%3C/svg%3E'); background-repeat:no-repeat; background-position:right 16px center; background-size:16px; border-radius:16px;">
                  <option>Farnsworth WPM Standards (Adaptive)</option>
                  <option>Standard International Morse (Linear)</option>
                </select>
              </div>
            </div>
          </div>

          <div class="glass-panel" style="padding:32px; border-radius:24px;">
            <h2 style="font-size:1.15rem; font-weight:700; margin-bottom:24px; color:var(--text-primary);">System Database Options</h2>
            
            <div style="display:flex; flex-direction:column; gap:24px;">
              <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-glass); padding-bottom:20px;">
                <div>
                  <h3 style="font-size:0.95rem; font-weight:600; margin-bottom:4px; color:var(--text-primary);">Enable Node Syncing</h3>
                  <p style="font-size:0.8rem; color:var(--text-secondary);">Write files, users registry, and timelines logs to fullstack database storage.</p>
                </div>
                <input type="checkbox" checked class="switch-input">
              </div>

              <div style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                  <h3 style="font-size:0.95rem; font-weight:600; margin-bottom:4px; color:var(--text-primary);">Local Storage Caches</h3>
                  <p style="font-size:0.8rem; color:var(--text-secondary);">Maintain browser cookies backup to persist user login details.</p>
                </div>
                <input type="checkbox" checked class="switch-input">
              </div>
            </div>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-glass); padding-top:20px;">
            <button class="btn btn-danger" id="btn-settings-wipe">Wipe Timelines Cache</button>
            <button class="btn btn-primary" id="btn-save-settings">Save Configurations</button>
          </div>
        </div>
      </div>
    `;
  },

  // ----------------------------------------------------
  // ADMIN PORTAL - Dynamic Modules Loader
  // ----------------------------------------------------
  // ----------------------------------------------------
  // ADMIN PORTAL - 12 Distinct Production Views & Operator Registry
  // ----------------------------------------------------
  AdminPortal(state) {
    let mainViewMarkup = '';

    // Calculate dynamic stats
    let avgAccuracy = '99.4%';
    if (state.decryptionHistory && state.decryptionHistory.length > 0) {
      const totalConf = state.decryptionHistory.reduce((sum, item) => {
        const val = parseFloat(item.confidence) || 100;
        return sum + val;
      }, 0);
      avgAccuracy = (totalConf / state.decryptionHistory.length).toFixed(1) + '%';
    }

    let threats = 0;
    if (state.usersList) {
      state.usersList.forEach(u => {
        if (u.account_status === 'suspended' || u.failed_attempts > 0) {
          threats += u.failed_attempts || 1;
        }
      });
    }

    // 1. DASHBOARD
    if (state.activePage === 'admin-dashboard') {
      const summary = (state.adminAnalytics && state.adminAnalytics.summary) || {
        total_users: 0,
        total_scans: 0,
        successful_scans: 0,
        failed_scans: 0,
        reports_downloaded: 0
      };

      mainViewMarkup = `
        <div class="animate-fade">
          <div style="display:grid; grid-template-columns:repeat(5, 1fr); gap:16px; margin-bottom:32px;" class="admin-stats-grid">
            <div class="glass-panel" style="padding:20px; border-radius:18px;">
              <p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:0.06em; color:var(--text-muted); margin-bottom:6px; font-weight:700;">Total Users</p>
              <h3 style="font-size:1.6rem; font-weight:800; color:var(--text-primary);">${summary.total_users}</h3>
              <span style="font-size:0.72rem; color:var(--success); font-weight:600;">Active nodes online</span>
            </div>
            <div class="glass-panel" style="padding:20px; border-radius:18px;">
              <p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:0.06em; color:var(--text-muted); margin-bottom:6px; font-weight:700;">Total Scans</p>
              <h3 style="font-size:1.6rem; font-weight:800; color:var(--text-primary);">${summary.total_scans}</h3>
              <span style="font-size:0.72rem; color:var(--accent-orange-bright); font-weight:600;">Telemetry activities</span>
            </div>
            <div class="glass-panel" style="padding:20px; border-radius:18px;">
              <p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:0.06em; color:var(--text-muted); margin-bottom:6px; font-weight:700;">Successful Scans</p>
              <h3 style="font-size:1.6rem; font-weight:800; color:var(--success);">${summary.successful_scans}</h3>
              <span style="font-size:0.72rem; color:var(--success); font-weight:600;">High accuracy rate</span>
            </div>
            <div class="glass-panel" style="padding:20px; border-radius:18px;">
              <p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:0.06em; color:var(--text-muted); margin-bottom:6px; font-weight:700;">Failed Scans</p>
              <h3 style="font-size:1.6rem; font-weight:800; color:var(--error);">${summary.failed_scans}</h3>
              <span style="font-size:0.72rem; color:var(--error); font-weight:600;">Signal sweeps error</span>
            </div>
            <div class="glass-panel" style="padding:20px; border-radius:18px;">
              <p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:0.06em; color:var(--text-muted); margin-bottom:6px; font-weight:700;">Reports Downloaded</p>
              <h3 style="font-size:1.6rem; font-weight:800; color:var(--text-primary);">${summary.reports_downloaded}</h3>
              <span style="font-size:0.72rem; color:var(--text-muted); font-weight:600;">Logs exports</span>
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-bottom:32px;" class="admin-charts-grid">
            <div class="glass-panel" style="padding:24px; border-radius:24px;">
              <h3 style="font-size:0.95rem; font-weight:700; margin-bottom:20px; color:var(--text-primary); text-transform:uppercase; letter-spacing:0.05em;">Telemetry Decipher Growth</h3>
              <div style="width:100%; height:200px;"><canvas id="admin-chart-growth" style="width:100%; height:200px;"></canvas></div>
            </div>
            <div class="glass-panel" style="padding:24px; border-radius:24px;">
              <h3 style="font-size:0.95rem; font-weight:700; margin-bottom:20px; color:var(--text-primary); text-transform:uppercase; letter-spacing:0.05em;">Source Signal Containers</h3>
              <div style="width:100%; height:200px;"><canvas id="admin-chart-files" style="width:100%; height:200px;"></canvas></div>
            </div>
          </div>
        </div>
      `;
    }

    // 2. OPERATOR REGISTRY (COMPLETELY REDESIGNED PRODUCTION SYSTEM)
    else if (state.activePage === 'admin-users') {
      const page = state.operatorPage || 1;
      const pageSize = state.operatorPageSize || 10;
      const search = (state.operatorSearch || '').toLowerCase();
      const roleFilter = state.operatorRoleFilter || 'all';
      const statusFilter = state.operatorStatusFilter || 'all';

      let filtered = (state.usersList || []).filter(u => {
        const matchSearch = !search || 
          (u.name && u.name.toLowerCase().includes(search)) || 
          (u.email && u.email.toLowerCase().includes(search)) || 
          (u.id && u.id.toLowerCase().includes(search));
        const matchRole = roleFilter === 'all' || (u.role && u.role.toLowerCase() === roleFilter.toLowerCase());
        const matchStatus = statusFilter === 'all' || (u.account_status && u.account_status.toLowerCase() === statusFilter.toLowerCase());
        return matchSearch && matchRole && matchStatus;
      });

      const totalPages = Math.ceil(filtered.length / pageSize) || 1;
      const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

      const rowsHtml = paginated.length === 0 ? `
        <tr>
          <td colspan="10" style="padding:48px; text-align:center; color:var(--text-muted);">
            <div style="display:flex; flex-direction:column; align-items:center; gap:12px;">
              <span style="font-size:2rem; color:var(--accent-orange-bright);">${Icons.users}</span>
              <p style="font-size:0.95rem; font-weight:600; color:var(--text-primary); margin:0;">No Operator Records Found</p>
              <p style="font-size:0.82rem; color:var(--text-secondary); margin:0;">Try adjusting your search keywords or active filters.</p>
            </div>
          </td>
        </tr>
      ` : paginated.map((op, idx) => `
        <tr style="border-bottom:1px solid var(--border-glass); transition: background var(--transition-fast);">
          <td style="padding:14px 16px; font-family:var(--font-mono); font-size:0.8rem; color:var(--text-secondary);">${op.id || `#OP-${1000 + idx}`}</td>
          <td style="padding:14px 16px; font-weight:600; color:var(--text-primary);">${op.name || op.email.split('@')[0]}</td>
          <td style="padding:14px 16px; color:var(--text-secondary); font-size:0.85rem;">${op.email}</td>
          <td style="padding:14px 16px;">
            <span class="badge ${op.role === 'Administrator' ? 'badge-danger' : op.role === 'Moderator' ? 'badge-warning' : 'badge-info'}" style="font-size:0.75rem;">
              ${op.role || 'User'}
            </span>
          </td>
          <td style="padding:14px 16px;">
            <span class="badge ${op.account_status === 'active' ? 'badge-success' : 'badge-danger'}" style="font-size:0.75rem;">
              ${(op.account_status || 'active').toUpperCase()}
            </span>
          </td>
          <td style="padding:14px 16px; font-size:0.8rem; color:var(--text-muted);">${(op.created_at || '').substring(0,10)}</td>
          <td style="padding:14px 16px; font-size:0.8rem; color:var(--text-muted);">${(op.last_login || 'Never').substring(0,16)}</td>
          <td style="padding:14px 16px; font-weight:700; color:var(--text-primary); text-align:center;">${op.total_decodes || 0}</td>
          <td style="padding:14px 16px; text-align:right;">
            <div style="display:flex; gap:6px; justify-content:flex-end;">
              <button class="btn btn-secondary btn-op-view" data-id="${op.id}" data-email="${op.email}" style="padding:5px 10px; font-size:0.75rem;" title="View Operator Profile">View</button>
              <button class="btn btn-secondary btn-op-edit" data-id="${op.id}" data-email="${op.email}" style="padding:5px 10px; font-size:0.75rem;" title="Edit Profile">Edit</button>
              <button class="btn btn-secondary btn-op-reset-pass" data-id="${op.id}" data-email="${op.email}" style="padding:5px 10px; font-size:0.75rem;" title="Reset Password">Passkey</button>
              <button class="btn btn-secondary btn-op-toggle-status" data-id="${op.id}" data-email="${op.email}" data-status="${op.account_status}" style="padding:5px 10px; font-size:0.75rem;" title="Toggle Status">${op.account_status === 'suspended' ? 'Activate' : 'Suspend'}</button>
              <button class="btn btn-danger btn-op-delete" data-id="${op.id}" data-email="${op.email}" style="padding:5px 10px; font-size:0.75rem; background:transparent;" title="Delete Operator">Delete</button>
            </div>
          </td>
        </tr>
      `).join('');

      mainViewMarkup = `
        <div class="glass-panel animate-fade" style="padding:28px; border-radius:24px;">
          <!-- Top Control Header -->
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; flex-wrap:wrap; gap:16px;">
            <div>
              <h2 style="font-size:1.35rem; font-weight:800; color:var(--text-primary); letter-spacing:-0.02em; margin-bottom:4px;">Operator Registry Node Directory</h2>
              <p style="font-size:0.85rem; color:var(--text-secondary); margin:0;">Manage user accounts, roles, access permissions, and activity status.</p>
            </div>
            
            <div style="display:flex; gap:12px;">
              <button class="btn btn-secondary" id="btn-export-operators-csv" style="gap:8px; font-size:0.82rem;">
                ${Icons.downloads} Export CSV
              </button>
              <button class="btn btn-primary" id="btn-add-operator-modal" style="gap:8px; font-size:0.82rem;">
                ${Icons.users} Add New Operator
              </button>
            </div>
          </div>

          <!-- Search & Filter Controls -->
          <div style="display:grid; grid-template-columns:2fr 1fr 1fr 1fr; gap:12px; margin-bottom:20px;">
            <div style="position:relative;">
              <input type="text" id="operator-search-input" class="input-field" placeholder="Search by ID, Name, or Email..." value="${state.operatorSearch || ''}" style="padding-left:38px; margin:0;">
              <span style="position:absolute; left:14px; top:50%; transform:translateY(-50%); color:var(--text-muted); width:16px; height:16px;">${Icons.search}</span>
            </div>

            <select id="operator-role-filter" class="input-field" style="margin:0;">
              <option value="all" ${roleFilter === 'all' ? 'selected' : ''}>All Roles</option>
              <option value="User" ${roleFilter === 'user' ? 'selected' : ''}>User</option>
              <option value="Moderator" ${roleFilter === 'moderator' ? 'selected' : ''}>Moderator</option>
              <option value="Administrator" ${roleFilter === 'administrator' ? 'selected' : ''}>Administrator</option>
            </select>

            <select id="operator-status-filter" class="input-field" style="margin:0;">
              <option value="all" ${statusFilter === 'all' ? 'selected' : ''}>All Statuses</option>
              <option value="active" ${statusFilter === 'active' ? 'selected' : ''}>Active</option>
              <option value="suspended" ${statusFilter === 'suspended' ? 'selected' : ''}>Suspended</option>
            </select>

            <select id="operator-sort-select" class="input-field" style="margin:0;">
              <option value="name">Sort by Name</option>
              <option value="date">Sort by Date</option>
              <option value="decodes">Sort by Activity</option>
            </select>
          </div>

          <!-- Table Container -->
          <div style="overflow-x:auto; border-radius:16px; border:1px solid var(--border-glass);">
            <table style="width:100%; border-collapse:collapse; text-align:left; font-size:0.88rem;">
              <thead>
                <tr style="border-bottom:1px solid var(--border-glass); background:var(--bg-secondary); color:var(--text-secondary); font-weight:700;">
                  <th style="padding:14px 16px;">Operator ID</th>
                  <th style="padding:14px 16px;">Full Name</th>
                  <th style="padding:14px 16px;">Email Address</th>
                  <th style="padding:14px 16px;">Role</th>
                  <th style="padding:14px 16px;">Status</th>
                  <th style="padding:14px 16px;">Registration</th>
                  <th style="padding:14px 16px;">Last Login</th>
                  <th style="padding:14px 16px; text-align:center;">Decodes</th>
                  <th style="padding:14px 16px; text-align:right;">Actions</th>
                </tr>
              </thead>
              <tbody>
                ${rowsHtml}
              </tbody>
            </table>
          </div>

          <!-- Pagination Footer -->
          <div class="pagination-container">
            <div>
              Showing <strong>${paginated.length}</strong> of <strong>${filtered.length}</strong> operators
            </div>
            <div class="pagination-pills">
              <button class="pagination-btn" id="btn-op-prev-page" ${page <= 1 ? 'disabled' : ''}>Previous</button>
              <span style="padding:6px 12px; font-weight:600; color:var(--accent-orange-bright);">Page ${page} of ${totalPages}</span>
              <button class="pagination-btn" id="btn-op-next-page" ${page >= totalPages ? 'disabled' : ''}>Next</button>
            </div>
          </div>
        </div>
      `;
    }

    // 3. DECODE TIMELINE
    else if (state.activePage === 'admin-history') {
      mainViewMarkup = `
        <div class="glass-panel animate-fade" style="padding:28px; border-radius:24px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px;">
            <h3 style="font-size:1.15rem; font-weight:700; color:var(--text-primary); text-transform:uppercase; letter-spacing:0.04em; margin:0;">Global Decryption Timeline Logs</h3>
            <span class="badge badge-info">${state.decryptionHistory.length} Intercept Records</span>
          </div>

          <div style="overflow-x:auto; border-radius:16px; border:1px solid var(--border-glass);">
            <table style="width:100%; border-collapse:collapse; text-align:left; font-size:0.88rem;">
              <thead>
                <tr style="border-bottom:1px solid var(--border-glass); background:var(--bg-secondary); color:var(--text-secondary); font-weight:700;">
                  <th style="padding:14px 16px;">Timestamp</th>
                  <th style="padding:14px 16px;">Signal Source</th>
                  <th style="padding:14px 16px;">Format</th>
                  <th style="padding:14px 16px;">Speed</th>
                  <th style="padding:14px 16px;">Transcript Output</th>
                  <th style="padding:14px 16px; text-align:right;">Actions</th>
                </tr>
              </thead>
              <tbody>
                ${state.decryptionHistory.length === 0 ? `
                  <tr><td colspan="6" style="padding:32px; text-align:center; color:var(--text-muted);">No decryption timeline logs cached.</td></tr>
                ` : state.decryptionHistory.map((item, idx) => `
                  <tr style="border-bottom:1px solid var(--border-glass);">
                    <td style="padding:14px 16px; font-family:var(--font-mono); font-size:0.82rem; color:var(--text-secondary);">${item.timestamp || 'Just now'}</td>
                    <td style="padding:14px 16px; font-weight:600; color:var(--text-primary);">${item.name}</td>
                    <td style="padding:14px 16px; font-family:var(--font-mono); font-size:0.8rem;">${item.type || 'AUDIO/WAV'}</td>
                    <td style="padding:14px 16px; color:var(--accent-orange-bright); font-weight:600;">${item.wpm || 20} WPM</td>
                    <td style="padding:14px 16px; font-family:var(--font-mono); max-width:280px; text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">${item.text}</td>
                    <td style="padding:14px 16px; text-align:right;">
                      <button class="btn btn-secondary btn-admin-purge-history" data-index="${idx}" style="padding:4px 10px; font-size:0.75rem;">Purge</button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    // 4. UPLOADED FILES AUDIT
    else if (state.activePage === 'admin-files') {
      mainViewMarkup = `
        <div class="glass-panel animate-fade" style="padding:28px; border-radius:24px;">
          <h3 style="font-size:1.15rem; font-weight:700; color:var(--text-primary); text-transform:uppercase; letter-spacing:0.04em; margin-bottom:20px;">Source File Container Audits</h3>
          <div style="overflow-x:auto; border-radius:16px; border:1px solid var(--border-glass);">
            <table style="width:100%; border-collapse:collapse; text-align:left; font-size:0.88rem;">
              <thead>
                <tr style="border-bottom:1px solid var(--border-glass); background:var(--bg-secondary); color:var(--text-secondary); font-weight:700;">
                  <th style="padding:14px 16px;">Filename</th>
                  <th style="padding:14px 16px;">Media Container</th>
                  <th style="padding:14px 16px;">SNR Confidence</th>
                  <th style="padding:14px 16px;">Demodulation Status</th>
                </tr>
              </thead>
              <tbody>
                ${state.decryptionHistory.length === 0 ? `
                  <tr><td colspan="4" style="padding:32px; text-align:center; color:var(--text-muted);">No file uploads recorded.</td></tr>
                ` : state.decryptionHistory.map(log => `
                  <tr style="border-bottom:1px solid var(--border-glass);">
                    <td style="padding:14px 16px; font-weight:600; color:var(--text-primary);">${log.name}</td>
                    <td style="padding:14px 16px; font-family:var(--font-mono); font-size:0.82rem;">${log.name.endsWith('.mp4') ? 'VIDEO/MP4' : 'AUDIO/MP3'}</td>
                    <td style="padding:14px 16px; color:var(--success); font-weight:700;">99.2% SNR</td>
                    <td style="padding:14px 16px;"><span class="badge badge-success">Parsed OK</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    // 5. SIGNAL ANALYTICS
    else if (state.activePage === 'admin-analytics') {
      mainViewMarkup = `
        <div class="glass-panel animate-fade" style="padding:28px; border-radius:24px;">
          <h3 style="font-size:1.15rem; font-weight:700; color:var(--text-primary); text-transform:uppercase; letter-spacing:0.04em; margin-bottom:20px;">AI Signal Intelligence Analytics</h3>
          
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px;">
            <div class="glass-panel" style="padding:20px; border-radius:18px;">
              <h4 style="font-size:0.9rem; font-weight:700; margin-bottom:16px;">Carrier Frequency Sweeps Distribution</h4>
              <div style="height:180px; display:flex; align-items:flex-end; gap:20px; justify-content:center; border-bottom:1px solid var(--border-glass); padding-bottom:10px;">
                <div style="width:36px; height:60%; background:var(--accent-gradient); border-radius:8px 8px 0 0;" title="600 Hz"></div>
                <div style="width:36px; height:90%; background:var(--accent-gradient); border-radius:8px 8px 0 0;" title="800 Hz"></div>
                <div style="width:36px; height:45%; background:var(--accent-gradient); border-radius:8px 8px 0 0;" title="1000 Hz"></div>
              </div>
              <div style="display:flex; justify-content:space-around; font-size:0.75rem; color:var(--text-muted); margin-top:8px;">
                <span>600 Hz</span><span>800 Hz</span><span>1000 Hz</span>
              </div>
            </div>

            <div class="glass-panel" style="padding:20px; border-radius:18px;">
              <h4 style="font-size:0.9rem; font-weight:700; margin-bottom:16px;">WPM Transmission Velocity Spectrum</h4>
              <div style="height:180px; display:flex; align-items:flex-end; gap:20px; justify-content:center; border-bottom:1px solid var(--border-glass); padding-bottom:10px;">
                <div style="width:36px; height:35%; background:var(--accent-orange); border-radius:8px 8px 0 0;" title="15 WPM"></div>
                <div style="width:36px; height:85%; background:var(--accent-orange); border-radius:8px 8px 0 0;" title="20 WPM"></div>
                <div style="width:36px; height:50%; background:var(--accent-orange); border-radius:8px 8px 0 0;" title="30 WPM"></div>
              </div>
              <div style="display:flex; justify-content:space-around; font-size:0.75rem; color:var(--text-muted); margin-top:8px;">
                <span>15 WPM</span><span>20 WPM</span><span>30 WPM</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    // 6. REPORTS GENERATOR
    else if (state.activePage === 'admin-reports') {
      mainViewMarkup = `
        <div class="glass-panel animate-fade" style="padding:28px; border-radius:24px;">
          <h3 style="font-size:1.15rem; font-weight:700; color:var(--text-primary); text-transform:uppercase; letter-spacing:0.04em; margin-bottom:20px;">Automated Intelligence Report Center</h3>
          
          <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:20px;">
            <div class="glass-panel" style="padding:24px; border-radius:18px; text-align:center;">
              <h4 style="font-size:1rem; font-weight:700; margin-bottom:8px;">Daily Telemetry Report</h4>
              <p style="font-size:0.82rem; color:var(--text-secondary); margin-bottom:20px;">Comprehensive summary of signal intercepts and system bandwidth.</p>
              <button class="btn btn-primary" style="width:100%; font-size:0.82rem;">Generate PDF Report</button>
            </div>

            <div class="glass-panel" style="padding:24px; border-radius:18px; text-align:center;">
              <h4 style="font-size:1rem; font-weight:700; margin-bottom:8px;">Operator Audit Log</h4>
              <p style="font-size:0.82rem; color:var(--text-secondary); margin-bottom:20px;">Detailed log of operator access, logins, and clearance changes.</p>
              <button class="btn btn-primary" style="width:100%; font-size:0.82rem;">Generate CSV Audit</button>
            </div>

            <div class="glass-panel" style="padding:24px; border-radius:18px; text-align:center;">
              <h4 style="font-size:1rem; font-weight:700; margin-bottom:8px;">System Security Compliance</h4>
              <p style="font-size:0.82rem; color:var(--text-secondary); margin-bottom:20px;">Security policy compliance and zero-trust authentication audit.</p>
              <button class="btn btn-primary" style="width:100%; font-size:0.82rem;">Generate Compliance Doc</button>
            </div>
          </div>
        </div>
      `;
    }

    // 7. NOTIFICATIONS CENTER
    else if (state.activePage === 'admin-notifications') {
      mainViewMarkup = `
        <div class="glass-panel animate-fade" style="padding:28px; border-radius:24px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
            <h3 style="font-size:1.15rem; font-weight:700; color:var(--text-primary); text-transform:uppercase; letter-spacing:0.04em; margin:0;">Notification Dispatch Center</h3>
            <button class="btn btn-secondary" style="font-size:0.8rem;">Mark All as Read</button>
          </div>

          <div style="display:flex; flex-direction:column; gap:12px;">
            <div style="padding:16px; border-radius:14px; background:var(--bg-secondary); border:1px solid var(--border-glass); display:flex; align-items:center; justify-content:space-between;">
              <div>
                <strong style="color:var(--accent-orange-bright); font-size:0.88rem;">[SECURITY ALERT]</strong>
                <p style="margin:4px 0 0 0; font-size:0.82rem; color:var(--text-secondary);">Root Administrator session verified from 127.0.0.1 loopback.</p>
              </div>
              <span style="font-size:0.75rem; color:var(--text-muted);">2 mins ago</span>
            </div>

            <div style="padding:16px; border-radius:14px; background:var(--bg-secondary); border:1px solid var(--border-glass); display:flex; align-items:center; justify-content:space-between;">
              <div>
                <strong style="color:var(--success); font-size:0.88rem;">[DECODE COMPLETED]</strong>
                <p style="margin:4px 0 0 0; font-size:0.82rem; color:var(--text-secondary);">Morse audio file morse-audio.mp3 demodulated with 99.4% confidence.</p>
              </div>
              <span style="font-size:0.75rem; color:var(--text-muted);">15 mins ago</span>
            </div>
          </div>
        </div>
      `;
    }

    // 8. SECURITY CENTER
    else if (state.activePage === 'admin-security') {
      mainViewMarkup = `
        <div class="glass-panel animate-fade" style="padding:28px; border-radius:24px; margin-bottom:24px;">
          <h3 style="font-size:1.15rem; font-weight:700; color:var(--text-primary); text-transform:uppercase; letter-spacing:0.04em; margin-bottom:20px;">Zero-Trust System Security Policies</h3>
          
          <div style="display:flex; flex-direction:column; gap:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-glass); padding-bottom:14px;">
              <div>
                <h4 style="margin:0 0 4px 0; font-size:0.92rem; font-weight:600; color:var(--text-primary);">Enforce Passkey Requirements</h4>
                <p style="margin:0; font-size:0.78rem; color:var(--text-secondary);">Requires uppercase, lowercase, numeric, and symbol characters.</p>
              </div>
              <input type="checkbox" class="switch-input" checked>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-glass); padding-bottom:14px;">
              <div>
                <h4 style="margin:0 0 4px 0; font-size:0.92rem; font-weight:600; color:var(--text-primary);">Root Administrator OTP Verification</h4>
                <p style="margin:0; font-size:0.78rem; color:var(--text-secondary);">Enforce Gmail SMTP one-time passcode for admin logins.</p>
              </div>
              <input type="checkbox" class="switch-input" checked>
            </div>
          </div>
        </div>
      `;
    }

    // 9. LIVE LOGS CONSOLE
    else if (state.activePage === 'admin-logs') {
      mainViewMarkup = `
        <div class="glass-panel animate-fade" style="padding:28px; border-radius:24px;">
          <h3 style="font-size:1.15rem; font-weight:700; color:var(--text-primary); text-transform:uppercase; letter-spacing:0.04em; margin-bottom:16px;">Live Streaming System Kernel Console</h3>
          
          <div id="admin-system-logs-console" style="background:#050507; border:1px solid var(--border-glass-hover); border-radius:16px; height:340px; overflow-y:auto; padding:20px; font-family:var(--font-mono); font-size:0.82rem; color:#A0A0A0; line-height:1.6; white-space:pre-wrap;">
            <div style="color:var(--text-muted);">[SYSTEM-INIT] Loading MorseVision AI Kernel...</div>
            <div style="color:var(--text-muted);">[SYSTEM-INIT] Connecting SQLite timeline database...</div>
            <div style="color:var(--success);">[SUCCESS] Database connection verified on port 3000.</div>
            <div style="color:var(--accent-orange-bright);">[INFO] Listening for audio/video Morse signal streams...</div>
          </div>
        </div>
      `;
    }

    // 10. BACKUP & RESTORE
    else if (state.activePage === 'admin-backup') {
      mainViewMarkup = `
        <div class="glass-panel animate-fade" style="padding:28px; border-radius:24px;">
          <h3 style="font-size:1.15rem; font-weight:700; color:var(--text-primary); text-transform:uppercase; letter-spacing:0.04em; margin-bottom:24px;">Database Backup & Recovery Utility</h3>
          
          <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:40px; border: 2px dashed var(--border-glass-hover); border-radius: 20px; background: rgba(0,0,0,0.1); margin-bottom:28px;" id="admin-restore-drag-zone">
            <span style="color:var(--accent-orange-bright); margin-bottom:16px; width:48px; height:48px;">${Icons.backup}</span>
            <h4 style="margin:0 0 8px 0; font-size:1.1rem; color:var(--text-primary);">Restore System State</h4>
            <p style="margin:0 0 20px 0; font-size:0.85rem; color:var(--text-secondary); max-width:340px; text-align:center; line-height:1.45;">Drag and drop a previously exported morsevision_backup.json file to restore operator databases.</p>
            
            <input type="file" id="admin-restore-file-input" accept=".json" style="display:none;">
            <button class="btn btn-secondary" id="btn-admin-restore-click" style="padding:10px 20px; font-size:0.85rem;">Browse Backup File</button>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-secondary); border:1px solid var(--border-glass); border-radius:16px; padding:20px;">
            <div>
              <h4 style="margin:0 0 4px 0; font-size:0.95rem; color:var(--text-primary);">Export Database Backup</h4>
              <p style="margin:0; font-size:0.82rem; color:var(--text-secondary);">Downloads all decryption timelines, operator nodes, and system logs as JSON.</p>
            </div>
            <button class="btn btn-primary" id="btn-admin-download-backup" style="gap:8px;">
              ${Icons.downloads} Download Backup JSON
            </button>
          </div>
        </div>
      `;
    }

    // 11. SYSTEM SETTINGS
    else if (state.activePage === 'admin-settings') {
      mainViewMarkup = `
        <div class="glass-panel animate-fade" style="padding:32px; border-radius:24px;">
          <h3 style="font-size:1.15rem; font-weight:700; color:var(--text-primary); text-transform:uppercase; letter-spacing:0.04em; margin-bottom:24px;">System Engine Configurations</h3>
          
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-bottom:28px;">
            <div class="input-group">
              <label class="input-label">Carrier Frequency Sweep Range</label>
              <select class="input-field" style="margin:0;">
                <option>800 Hz (Standard CW Preset)</option>
                <option>600 Hz (Low Tone Sweep)</option>
                <option>1000 Hz (High Pitch Filter)</option>
              </select>
            </div>

            <div class="input-group">
              <label class="input-label">Database Storage Limit</label>
              <select class="input-field" style="margin:0;">
                <option>500 MB (IndexedDB Storage)</option>
                <option>1 GB (Unlimited Buffer)</option>
              </select>
            </div>
          </div>

          <div style="display:flex; justify-content:flex-end; gap:16px; border-top:1px solid var(--border-glass); padding-top:20px;">
            <button class="btn btn-secondary">Restore Defaults</button>
            <button class="btn btn-primary" id="btn-admin-save-settings">Save System Settings</button>
          </div>
        </div>
      `;
    }

    // 12. ADMIN PROFILE
    else if (state.activePage === 'admin-profile') {
      mainViewMarkup = `
        <div class="glass-panel animate-fade" style="padding:32px; border-radius:24px; max-width:650px; margin:0 auto;">
          <div style="display:flex; align-items:center; gap:20px; margin-bottom:28px;">
            <div style="width:72px; height:72px; border-radius:50%; background:var(--accent-gradient); display:flex; align-items:center; justify-content:center; color:#fff; font-size:1.8rem; font-weight:800;">
              A
            </div>
            <div>
              <h2 style="font-size:1.4rem; font-weight:800; color:var(--text-primary); margin:0 0 4px 0;">Root Administrator</h2>
              <p style="font-size:0.88rem; color:var(--accent-orange-bright); font-weight:600; margin:0;">${state.adminEmail || 'admin@morsevision.io'}</p>
            </div>
          </div>

          <div style="display:flex; flex-direction:column; gap:14px; border-top:1px solid var(--border-glass); padding-top:20px;">
            <div style="display:flex; justify-content:space-between; font-size:0.88rem;">
              <span style="color:var(--text-secondary);">Clearance Tier:</span>
              <strong style="color:var(--text-primary);">Level 5 Master Root</strong>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:0.88rem;">
              <span style="color:var(--text-secondary);">Authentication Method:</span>
              <strong style="color:var(--text-primary);">Gmail SMTP One-Time Passcode</strong>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:0.88rem;">
              <span style="color:var(--text-secondary);">System Role:</span>
              <strong style="color:var(--text-primary);">System Administrator</strong>
            </div>
          </div>
        </div>
      `;
    }

    return `
      <div style="max-width:1100px; margin:0 auto; width:100%;" class="animate-fade">
        <header style="margin-bottom:32px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
          <div>
            <h1 style="font-size:1.85rem; font-family:var(--font-sans); font-weight:800; letter-spacing:-0.03em;">MorseVision Admin Command Console</h1>
            <p style="color:var(--text-secondary); font-size:0.9rem;">Global operations management, operator nodes registry, and decipher telemetry controls.</p>
          </div>
        </header>

        ${mainViewMarkup}
      </div>

      <!-- MODALS FOR OPERATOR REGISTRY -->
      <!-- 1. Add Operator Modal -->
      <div class="modal-overlay" id="modal-add-operator">
        <div class="modal-card">
          <div class="modal-header">
            <h3 style="font-size:1.15rem; font-weight:800; margin:0;">Add New Operator Node</h3>
            <button class="modal-close-btn" id="btn-close-modal-add">&times;</button>
          </div>
          <form id="form-add-operator">
            <div class="input-group">
              <label class="input-label">Full Name</label>
              <input type="text" id="add-op-name" class="input-field" placeholder="Rahul Sharma" required>
            </div>
            <div class="input-group">
              <label class="input-label">Email Address</label>
              <input type="email" id="add-op-email" class="input-field" placeholder="operator@morsevision.io" required>
            </div>
            <div class="input-group">
              <label class="input-label">Initial Passkey</label>
              <input type="password" id="add-op-password" class="input-field" placeholder="••••••••" required>
            </div>
            <div class="input-group" style="margin-bottom:24px;">
              <label class="input-label">Assigned Role</label>
              <select id="add-op-role" class="input-field">
                <option value="User">User</option>
                <option value="Moderator">Moderator</option>
                <option value="Administrator">Administrator</option>
              </select>
            </div>
            <div style="display:flex; justify-content:flex-end; gap:12px;">
              <button type="button" class="btn btn-secondary" id="btn-cancel-modal-add">Cancel</button>
              <button type="submit" class="btn btn-primary">Create Operator Node</button>
            </div>
          </form>
        </div>
      </div>

      <!-- 2. Edit Operator Modal -->
      <div class="modal-overlay" id="modal-edit-operator">
        <div class="modal-card">
          <div class="modal-header">
            <h3 style="font-size:1.15rem; font-weight:800; margin:0;">Edit Operator Profile</h3>
            <button class="modal-close-btn" id="btn-close-modal-edit">&times;</button>
          </div>
          <form id="form-edit-operator">
            <input type="hidden" id="edit-op-id">
            <div class="input-group">
              <label class="input-label">Full Name</label>
              <input type="text" id="edit-op-name" class="input-field" required>
            </div>
            <div class="input-group">
              <label class="input-label">Email Address</label>
              <input type="email" id="edit-op-email" class="input-field" readonly style="opacity:0.7;">
            </div>
            <div class="input-group">
              <label class="input-label">Role</label>
              <select id="edit-op-role" class="input-field">
                <option value="User">User</option>
                <option value="Moderator">Moderator</option>
                <option value="Administrator">Administrator</option>
              </select>
            </div>
            <div class="input-group" style="margin-bottom:24px;">
              <label class="input-label">Account Status</label>
              <select id="edit-op-status" class="input-field">
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
            <div style="display:flex; justify-content:flex-end; gap:12px;">
              <button type="button" class="btn btn-secondary" id="btn-cancel-modal-edit">Cancel</button>
              <button type="submit" class="btn btn-primary">Save Changes</button>
            </div>
          </form>
        </div>
      </div>

      <!-- 3. Reset Password Modal -->
      <div class="modal-overlay" id="modal-reset-password">
        <div class="modal-card">
          <div class="modal-header">
            <h3 style="font-size:1.15rem; font-weight:800; margin:0;">Reset Operator Passkey</h3>
            <button class="modal-close-btn" id="btn-close-modal-reset">&times;</button>
          </div>
          <form id="form-reset-op-passkey">
            <input type="hidden" id="reset-op-id">
            <div class="input-group" style="margin-bottom:20px;">
              <label class="input-label">New Passkey</label>
              <input type="password" id="reset-op-passkey-input" class="input-field" placeholder="Minimum 6 characters" required>
            </div>
            <div style="display:flex; justify-content:flex-end; gap:12px;">
              <button type="button" class="btn btn-secondary" id="btn-cancel-modal-reset">Cancel</button>
              <button type="submit" class="btn btn-primary">Reset Passkey</button>
            </div>
          </form>
        </div>
      </div>
    `;
  },



  // ----------------------------------------------------
  // MORSE ENCODER MODULE
  // ----------------------------------------------------
  Encoder(state) {
    const textVal = state.encoderText || 'HELLO WORLD';
    const morseVal = typeof MorseEngine !== 'undefined' ? MorseEngine.encode(textVal) : '.... . .-.. .-.. --- / .-- --- .-. .-.. -..';
    const wpmVal = state.encoderWpm || 20;
    const freqVal = state.encoderFreq || 800;
    const oscVal = state.encoderOsc || 'sine';

    return `
      <div class="animate-fade">
        <header style="margin-bottom:24px;">
          <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:16px;">
            <div>
              <span style="font-size:0.75rem; font-weight:700; color:var(--accent-orange-bright); background:rgba(255,138,0,0.12); padding:4px 12px; border-radius:20px; border:1px solid rgba(255,138,0,0.25); text-transform:uppercase; letter-spacing:0.08em;">
                Communication Suite Module
              </span>
              <h1 style="font-size:1.8rem; font-weight:800; color:var(--text-primary); letter-spacing:-0.03em; margin:6px 0 0 0;">
                Morse Audio Encoder
              </h1>
              <p style="color:var(--text-secondary); font-size:0.88rem; margin-top:4px;">
                Synthesize plaintext into verified Morse audio streams with real-time waveform visualization and multi-format exports.
              </p>
            </div>
            <div style="display:flex; gap:10px;">
              <button id="btn-encoder-copy-text" class="btn" style="padding:9px 16px; border-radius:10px; font-size:0.82rem; font-weight:600; background:var(--bg-glass-input); border:1px solid var(--border-glass); color:var(--text-primary); cursor:pointer;">
                Copy Text
              </button>
              <button id="btn-encoder-copy-morse" class="btn btn-primary" style="padding:9px 18px; border-radius:10px; font-size:0.82rem; font-weight:700; cursor:pointer;">
                Copy Morse Code
              </button>
            </div>
          </div>
        </header>

        <!-- Main 2-Column Encoder Grid -->
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:24px;">
          
          <!-- Left Column: Input & Quick Presets -->
          <div class="glass-panel" style="padding:24px; border-radius:20px; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                <label style="font-size:0.88rem; font-weight:700; color:var(--text-primary);">Plaintext Input</label>
                <span style="font-size:0.72rem; color:var(--text-muted); font-weight:600;" id="encoder-char-count">${textVal.length} characters</span>
              </div>
              <textarea id="encoder-text-input" class="input-field" rows="4" placeholder="Type text here to convert into Morse audio..." style="width:100%; padding:14px; background:var(--bg-glass-input); border:1px solid var(--border-glass); border-radius:14px; color:var(--text-primary); font-size:0.95rem; font-family:var(--font-mono); resize:none; margin-bottom:16px;">${textVal}</textarea>
              
              <!-- Quick Presets -->
              <label style="font-size:0.75rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.06em; margin-bottom:8px; display:block;">Quick Presets</label>
              <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:20px;">
                <button class="btn preset-btn" data-text="SOS" style="padding:6px 14px; border-radius:10px; font-size:0.78rem; font-weight:700; background:rgba(255,138,0,0.12); border:1px solid rgba(255,138,0,0.25); color:var(--accent-orange-bright); cursor:pointer;">SOS</button>
                <button class="btn preset-btn" data-text="HELLO WORLD" style="padding:6px 14px; border-radius:10px; font-size:0.78rem; font-weight:600; background:var(--bg-glass-input); border:1px solid var(--border-glass); color:var(--text-primary); cursor:pointer;">HELLO WORLD</button>
                <button class="btn preset-btn" data-text="OPENAI MORSEVISION" style="padding:6px 14px; border-radius:10px; font-size:0.78rem; font-weight:600; background:var(--bg-glass-input); border:1px solid var(--border-glass); color:var(--text-primary); cursor:pointer;">OPENAI</button>
                <button class="btn preset-btn" data-text="CQ CQ CQ DE MORSEVISION" style="padding:6px 14px; border-radius:10px; font-size:0.78rem; font-weight:600; background:var(--bg-glass-input); border:1px solid var(--border-glass); color:var(--text-primary); cursor:pointer;">CQ CQ</button>
                <button class="btn preset-btn" data-text="TEST SIGNAL 800HZ" style="padding:6px 14px; border-radius:10px; font-size:0.78rem; font-weight:600; background:var(--bg-glass-input); border:1px solid var(--border-glass); color:var(--text-primary); cursor:pointer;">TEST SIGNAL</button>
              </div>
            </div>

            <!-- Translated Morse Code Box -->
            <div>
              <label style="font-size:0.88rem; font-weight:700; color:var(--text-primary); margin-bottom:8px; display:block;">Generated Morse Output</label>
              <div id="encoder-morse-display" style="padding:16px; background:var(--bg-glass-input); border:1px solid var(--border-glass); border-radius:14px; font-family:var(--font-mono); font-size:1.15rem; color:var(--accent-orange-bright); letter-spacing:0.18em; word-break:break-all; min-height:60px;">
                ${morseVal}
              </div>
            </div>
          </div>

          <!-- Right Column: Synthesizer Parameters -->
          <div class="glass-panel" style="padding:24px; border-radius:20px;">
            <h4 style="font-size:0.92rem; font-weight:800; color:var(--text-primary); margin:0 0 16px 0; border-bottom:1px solid var(--border-glass); padding-bottom:12px;">Audio Tone Parameters</h4>
            
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
              <div class="input-group">
                <label class="input-label" style="font-size:0.82rem; font-weight:600; color:var(--text-primary); margin-bottom:6px; display:block;">Carrier Frequency (Hz)</label>
                <select id="encoder-freq-select" class="input-field" style="width:100%; padding:10px 14px; background:var(--bg-glass-input); border:1px solid var(--border-glass); border-radius:12px; color:var(--text-primary); font-size:0.88rem; font-weight:600;">
                  <option value="400" ${freqVal == 400 ? 'selected' : ''}>400 Hz (Bass)</option>
                  <option value="600" ${freqVal == 600 ? 'selected' : ''}>600 Hz (Medium)</option>
                  <option value="800" ${freqVal == 800 ? 'selected' : ''}>800 Hz (Standard)</option>
                  <option value="1000" ${freqVal == 1000 ? 'selected' : ''}>1000 Hz (Treble)</option>
                  <option value="1200" ${freqVal == 1200 ? 'selected' : ''}>1200 Hz (High)</option>
                </select>
              </div>

              <div class="input-group">
                <label class="input-label" style="font-size:0.82rem; font-weight:600; color:var(--text-primary); margin-bottom:6px; display:block;">Transmission Speed (WPM)</label>
                <select id="encoder-wpm-select" class="input-field" style="width:100%; padding:10px 14px; background:var(--bg-glass-input); border:1px solid var(--border-glass); border-radius:12px; color:var(--text-primary); font-size:0.88rem; font-weight:600;">
                  <option value="5" ${wpmVal == 5 ? 'selected' : ''}>5 WPM (Novice)</option>
                  <option value="10" ${wpmVal == 10 ? 'selected' : ''}>10 WPM (Slow)</option>
                  <option value="15" ${wpmVal == 15 ? 'selected' : ''}>15 WPM (Medium)</option>
                  <option value="20" ${wpmVal == 20 ? 'selected' : ''}>20 WPM (Standard)</option>
                  <option value="25" ${wpmVal == 25 ? 'selected' : ''}>25 WPM (Fast)</option>
                </select>
              </div>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:20px;">
              <div class="input-group">
                <label class="input-label" style="font-size:0.82rem; font-weight:600; color:var(--text-primary); margin-bottom:6px; display:block;">Oscillator Waveform</label>
                <select id="encoder-osc-select" class="input-field" style="width:100%; padding:10px 14px; background:var(--bg-glass-input); border:1px solid var(--border-glass); border-radius:12px; color:var(--text-primary); font-size:0.88rem; font-weight:600;">
                  <option value="sine" ${oscVal === 'sine' ? 'selected' : ''}>Sine Wave</option>
                  <option value="square" ${oscVal === 'square' ? 'selected' : ''}>Square Wave</option>
                  <option value="triangle" ${oscVal === 'triangle' ? 'selected' : ''}>Triangle Wave</option>
                  <option value="sawtooth" ${oscVal === 'sawtooth' ? 'selected' : ''}>Sawtooth Wave</option>
                </select>
              </div>

              <div class="input-group">
                <label class="input-label" style="font-size:0.82rem; font-weight:600; color:var(--text-primary); margin-bottom:6px; display:block;">Playback Volume</label>
                <input type="range" id="encoder-volume-range" min="0" max="100" value="80" style="width:100%; accent-color:var(--accent-orange); margin-top:8px;">
              </div>
            </div>

            <div style="padding:14px; background:rgba(255,138,0,0.06); border:1px solid rgba(255,138,0,0.2); border-radius:14px; font-size:0.82rem; color:var(--text-secondary);">
              <strong>Standard Morse Timing Rules:</strong><br>
              Dot = 1 unit | Dash = 3 units | Char gap = 3 units | Word gap = 7 units
            </div>
          </div>
        </div>

        <!-- Bottom Waveform & Export Controls -->
        <div class="glass-panel" style="padding:24px; border-radius:20px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; flex-wrap:wrap; gap:16px;">
            <div style="display:flex; align-items:center; gap:12px;">
              <button id="btn-encoder-play" class="btn btn-primary" style="padding:12px 28px; font-weight:700; font-size:0.9rem; border-radius:12px; display:inline-flex; align-items:center; gap:8px;">
                ${Icons.play} Play Signal Tone
              </button>
              <button id="btn-encoder-stop" class="btn" style="padding:12px 20px; font-weight:600; font-size:0.85rem; border-radius:12px; background:var(--bg-glass-input); border:1px solid var(--border-glass); color:var(--text-primary); cursor:pointer;">
                ${Icons.stop} Stop
              </button>
            </div>

            <div style="display:flex; gap:10px; flex-wrap:wrap;">
              <button id="btn-encoder-download-wav" class="btn" style="padding:10px 18px; border-radius:12px; font-size:0.85rem; font-weight:700; background:rgba(16,185,129,0.15); border:1px solid rgba(16,185,129,0.3); color:var(--success); cursor:pointer; display:inline-flex; align-items:center; gap:6px;">
                ${Icons.downloads} Download Audio (.WAV)
              </button>
              <button id="btn-encoder-export-txt" class="btn" style="padding:10px 14px; border-radius:12px; font-size:0.82rem; font-weight:600; background:var(--bg-glass-input); border:1px solid var(--border-glass); color:var(--text-primary); cursor:pointer;">
                Export TXT
              </button>
              <button id="btn-encoder-export-csv" class="btn" style="padding:10px 14px; border-radius:12px; font-size:0.82rem; font-weight:600; background:var(--bg-glass-input); border:1px solid var(--border-glass); color:var(--text-primary); cursor:pointer;">
                Export CSV
              </button>
              <button id="btn-encoder-export-json" class="btn" style="padding:10px 14px; border-radius:12px; font-size:0.82rem; font-weight:600; background:var(--bg-glass-input); border:1px solid var(--border-glass); color:var(--text-primary); cursor:pointer;">
                Export JSON
              </button>
            </div>
          </div>

          <!-- Waveform Canvas -->
          <div style="height:100px; width:100%; background:rgba(0,0,0,0.2); border:1px solid var(--border-glass); border-radius:14px; overflow:hidden; position:relative;">
            <canvas id="encoder-waveform-canvas" style="width:100%; height:100%; display:block;"></canvas>
          </div>
        </div>
      </div>
    `;
  },

  AvatarGalleryModal(state) {
    return `
      <div class="modal-overlay" id="modal-avatar-gallery">
        <div class="modal-card" style="max-width: 520px; padding: 24px; border-radius: 24px;">
          <div class="modal-header" style="margin-bottom: 20px;">
            <h3 style="font-size:1.15rem; font-weight:800; margin:0;">Select Profile Picture</h3>
            <button class="modal-close-btn" id="btn-close-modal-gallery">&times;</button>
          </div>
          
          <div style="margin-bottom: 24px;">
            <p style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 16px;">Choose one of our premium high-tech node avatars or upload a custom image file from your gallery.</p>
            
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px;">
              ${[1,2,3,4,5,6].map(i => `
                <div class="gallery-avatar-option" data-url="/uploads/gallery/avatar${i}.svg" style="border: 2px solid var(--border-glass); border-radius: 16px; padding: 8px; cursor: pointer; aspect-ratio: 1; display: flex; align-items: center; justify-content: center; transition: all 0.2s; background: rgba(0,0,0,0.2);">
                  <img src="/uploads/gallery/avatar${i}.svg" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">
                </div>
              `).join('')}
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 12px; border-top: 1px solid var(--border-glass); padding-top: 20px;">
              <button class="btn btn-secondary" id="btn-gallery-upload-custom" style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px;">
                Upload Custom Image
              </button>
              <input type="file" id="gallery-custom-file-input" accept="image/*" style="display: none;">
            </div>
          </div>
          
          <div style="display:flex; justify-content:flex-end; gap:12px;">
            <button type="button" class="btn btn-secondary" id="btn-cancel-modal-gallery" style="padding: 10px 20px;">Cancel</button>
          </div>
        </div>
      </div>
      
      <style>
        .gallery-avatar-option:hover {
          border-color: var(--accent-orange) !important;
          background: rgba(255, 122, 0, 0.08) !important;
          transform: translateY(-2px);
        }
        .gallery-avatar-option.selected {
          border-color: var(--accent-orange-bright) !important;
          box-shadow: 0 0 15px rgba(255, 122, 0, 0.25);
          background: rgba(255, 122, 0, 0.15) !important;
        }
      </style>
    `;
  }
};
