# 📡 MorseVision

**MorseVision** is a premium, standalone, AI-powered Morse Code Signal Ingest, Analysis, and Decryption platform. Designed with a high-end glassmorphism dark cyber aesthetics interface, it integrates Goertzel Digital Signal Processing (DSP) for audio analysis and Computer Vision tracking for video eye-blink decoding, logging all telemetry activities dynamically into a MySQL database.

---

## 🌟 Key Features

### 📡 1. Signal Ingestion & Decryption Engine
* **Multi-Format Media Support:** Upload and process `.mp3`, `.wav`, `.mp4`, `.mov`, `.avi`, and `.m4a` signal files.
* **Goertzel Algorithmic DSP:** Automatically filters and sweeps audio frequencies (targeting standard 800Hz channels) to calculate signal-to-noise ratio (SNR), detect tone pulses, and decode Morse messages.
* **Eye-Blink Video Decoder:** Analyzes light level changes and movement in video clips to track and transcribe eye-blink Morse signals.
* **Morse Synthesis & Playback:** Synthesizes Morse transmissions with customizable speed (WPM), carrier frequency (Hz), and volume controls.
* **Report Exports:** Download decrypted signal logs as plain text files or formatted PDF intelligence reports.

### 📊 2. Live Operator Telemetry Dashboard
* **Dynamic KPI Trackers:** View real-time aggregates for *Total Decodes*, *Successful Decodes*, *Failed Decodes*, and *Reports Downloaded*.
* **Decipher Activity Growth:** Interactive 7-day canvas charts logging daily signal capture activities.
* **Source Signal Containers:** Breakdowns of processed signal formats (Audio DSP sweeps vs Video tracking).
* **Automatic Live Refreshes:** Graphs and summary statistics refresh periodically without manual reloads.

### 👥 3. Operator Registry & Node Security
* **Node Administration:** Control panel to register operators, change roles, edit profile parameters, toggle active status, and reset passkeys.
* **System Logs Console:** Real-time stream of backend events, kernel actions, and database writes.
* **Secure Access Controls:** Operator authorization with JWT tokens and optional Google/GitHub OAuth integrations.
* **Zero-Trust Policy Controls:** Enable enforced strong passkey rules and SMTP one-time passcode verification for administrators.

### 🖼️ 4. Operator Settings & Custom Profile pictures
* **Interactive SVG Avatars:** Instantly choose from six high-tech pre-configured avatars.
* **Local Gallery Ingestion:** Upload custom JPG/PNG profile pictures to operator accounts.

---

## 🛠️ Technology Stack

* **Backend:**
  * [FastAPI](https://fastapi.tiangolo.com/) (Web framework)
  * [Uvicorn](https://www.uvicorn.org/) (ASGI Server)
  * MySQL (Persistent relational database)
  * PyJWT & Bcrypt (Secure JWT authentication and password hashing)
* **Frontend:**
  * HTML5 & CSS3 (Glassmorphism layout framework and custom CSS properties)
  * HTML5 Canvas API (Custom visualizers and analytics charts)
  * Web Audio API (Tone synth oscillators and DSP filters)

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have **Python 3.11+** and **pip** installed.

### 2. Installation
Clone the repository and install dependencies:
```bash
pip install fastapi uvicorn bcrypt python-jose[cryptography] python-dotenv pydantic email-validator
```

### 3. Environment Configuration
Create a `.env` file in the root directory based on the `.env.example` template:
```env
SECRET_KEY="your-secure-jwt-secret-key-here"
ADMIN_EMAIL="admin@morsevision.io"
ADMIN_PASSWORD="secure-admin-password"
SMTP_SERVER="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="smtp-account@example.com"
SMTP_PASSWORD="smtp-app-password"
```

### 4. Run the Server
Launch the development server:
```bash
python app.py
```
The application will start on **[http://localhost:3000](http://localhost:3000)**.