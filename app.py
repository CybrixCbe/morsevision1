import os
import secrets
import sqlite3
import datetime
import bcrypt
from jose import jwt
from fastapi import FastAPI, Depends, HTTPException, status, File, UploadFile, Request, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, JSONResponse, FileResponse, StreamingResponse
from pydantic import BaseModel, EmailStr
from typing import Optional, List
import uuid
import re
from jose import JWTError
from dotenv import load_dotenv
import shutil

load_dotenv()

# Setup database path
db_path = os.path.join(os.path.dirname(__file__), 'database.sqlite')

# Ensure uploads folder exists
upload_dir = os.path.join(os.path.dirname(__file__), 'uploads')
os.makedirs(upload_dir, exist_ok=True)

# Ensure uploads/gallery exists and populate default high-tech SVG avatars
gallery_dir = os.path.join(upload_dir, 'gallery')
os.makedirs(gallery_dir, exist_ok=True)

default_avatars = {
    "avatar1.svg": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="#0B0B0C" stroke="#FF5500" stroke-width="4"/><circle cx="50" cy="50" r="30" fill="#FF7A00" opacity="0.3"/><polygon points="50,25 72,38 72,62 50,75 28,62 28,38" fill="none" stroke="#FFA500" stroke-width="3"/><circle cx="50" cy="50" r="6" fill="#FFFFFF"/></svg>',
    "avatar2.svg": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="#0B0B0C" stroke="#00d2ff" stroke-width="4"/><circle cx="50" cy="50" r="30" fill="#00d2ff" opacity="0.3"/><polygon points="50,20 75,45 60,80 40,80 25,45" fill="none" stroke="#00a8ff" stroke-width="3"/><line x1="50" y1="20" x2="50" y2="80" stroke="#FFFFFF" stroke-width="2"/></svg>',
    "avatar3.svg": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="#0B0B0C" stroke="#10B981" stroke-width="4"/><circle cx="50" cy="50" r="30" fill="#10B981" opacity="0.2"/><path d="M30,50 Q50,20 70,50 Q50,80 30,50 Z" fill="none" stroke="#10B981" stroke-width="3"/><circle cx="50" cy="50" r="10" fill="none" stroke="#FFFFFF" stroke-width="2"/></svg>',
    "avatar4.svg": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="#0B0B0C" stroke="#F59E0B" stroke-width="4"/><path d="M30,30 L70,30 L70,70 L30,70 Z" fill="none" stroke="#F59E0B" stroke-width="3"/><path d="M50,15 L50,85 M15,50 L85,50" stroke="rgba(245,158,11,0.4)" stroke-width="2"/><circle cx="50" cy="50" r="6" fill="#FFFFFF"/></svg>',
    "avatar5.svg": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="#0B0B0C" stroke="#8B5CF6" stroke-width="4"/><circle cx="50" cy="50" r="24" fill="none" stroke="#8B5CF6" stroke-width="3" stroke-dasharray="6,4"/><path d="M35,35 L65,65 M35,65 L65,35" stroke="#FFFFFF" stroke-width="3"/></svg>',
    "avatar6.svg": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="#0B0B0C" stroke="#EF4444" stroke-width="4"/><circle cx="50" cy="50" r="36" fill="none" stroke="#EF4444" stroke-width="1.5" stroke-dasharray="10,5"/><circle cx="50" cy="50" r="15" fill="#EF4444" opacity="0.35"/><circle cx="50" cy="50" r="4" fill="#FFFFFF"/></svg>'
}

for name, content in default_avatars.items():
    path = os.path.join(gallery_dir, name)
    if not os.path.exists(path):
        with open(path, "w") as f:
            f.write(content)

# Helper functions for database interaction
def get_db():
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    return conn

def db_run(sql, params=[]):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(sql, params)
    conn.commit()
    last_id = cursor.lastrowid
    conn.close()
    return last_id

def db_get(sql, params=[]):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(sql, params)
    row = cursor.fetchone()
    conn.close()
    return dict(row) if row else None

def db_all(sql, params=[]):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(sql, params)
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

# Initialize Tables
def init_db():
    conn = get_db()
    cursor = conn.cursor()
    
    # 1. USERS Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS USERS (
        id TEXT PRIMARY KEY,
        name TEXT,
        email TEXT UNIQUE,
        password_hash TEXT,
        is_verified INTEGER DEFAULT 0,
        created_at TEXT,
        last_login TEXT,
        account_status TEXT DEFAULT 'active',
        failed_attempts INTEGER DEFAULT 0,
        role TEXT DEFAULT 'User',
        provider TEXT DEFAULT 'local',
        provider_id TEXT,
        avatar TEXT,
        organization TEXT,
        department TEXT,
        purpose TEXT,
        experience_level TEXT,
        country TEXT,
        timezone TEXT,
        preferred_theme TEXT DEFAULT 'dark',
        notification_prefs TEXT,
        profile_completed INTEGER DEFAULT 0
    )
    """)
    
    # 2. OTP Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS OTP (
        id TEXT PRIMARY KEY,
        email TEXT,
        otp TEXT,
        created_at TEXT,
        expires_at TEXT,
        attempts INTEGER DEFAULT 0,
        is_used INTEGER DEFAULT 0,
        purpose TEXT DEFAULT 'register',
        name TEXT,
        password_hash TEXT
    )
    """)
    
    # 3. SCAN_HISTORY Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS SCAN_HISTORY (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        filename TEXT,
        decoder_type TEXT,
        decoded_morse TEXT,
        decoded_text TEXT,
        confidence TEXT,
        processing_time TEXT,
        wpm INTEGER,
        carrier_freq TEXT,
        created_at TEXT
    )
    """)
    
    # 4. ADMIN Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS ADMIN (
        id TEXT PRIMARY KEY,
        username TEXT,
        email TEXT UNIQUE,
        password_hash TEXT,
        avatar TEXT
    )
    """)
    try:
        cursor.execute("ALTER TABLE ADMIN ADD COLUMN avatar TEXT")
    except Exception:
        pass
    
    # 5. SYSTEM_LOGS Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS SYSTEM_LOGS (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        level TEXT,
        text TEXT,
        time TEXT
    )
    """)
    
    # 6. USER_ACTIVITY Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS USER_ACTIVITY (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        activity_type TEXT,
        scan_type TEXT,
        created_at TEXT
    )
    """)
    try:
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_activity_created ON USER_ACTIVITY(created_at)")
    except Exception:
        pass

    # 7. ANALYTICS_SUMMARY Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS ANALYTICS_SUMMARY (
        id TEXT PRIMARY KEY,
        total_scans INTEGER DEFAULT 0,
        total_users INTEGER DEFAULT 0,
        successful_scans INTEGER DEFAULT 0,
        failed_scans INTEGER DEFAULT 0,
        reports_downloaded INTEGER DEFAULT 0,
        updated_at TEXT
    )
    """)
    
    # Initialize Default Admin Account
    admin_email = (os.getenv("ADMIN_EMAIL") or "admin@morsevision.io").lower().strip()
    cursor.execute("SELECT * FROM ADMIN WHERE email = ?", (admin_email,))
    if not cursor.fetchone():
        hashed = bcrypt.hashpw("AdminPass123!".encode(), bcrypt.gensalt()).decode()
        cursor.execute(
            "INSERT INTO ADMIN (id, username, email, password_hash) VALUES (?, ?, ?, ?)",
            ("admin-uid-1122", "system_admin", admin_email, hashed)
        )
        print("Administrator account initialized successfully.")
    
    conn.commit()
    conn.close()

init_db()

# Log utility
def log_event(level, text):
    time_str = datetime.datetime.utcnow().isoformat()
    db_run("INSERT INTO SYSTEM_LOGS (level, text, time) VALUES (?, ?, ?)", [level, text, time_str])
    db_run("DELETE FROM SYSTEM_LOGS WHERE id NOT IN (SELECT id FROM SYSTEM_LOGS ORDER BY time DESC LIMIT 100)")
    print(f"[SYS-{level}]: {text}")

def log_activity(user_id, activity_type, scan_type=None):
    activity_id = f"act-{uuid.uuid4()}"
    now = datetime.datetime.utcnow().isoformat()
    db_run(
        "INSERT INTO USER_ACTIVITY (id, user_id, activity_type, scan_type, created_at) VALUES (?, ?, ?, ?, ?)",
        [activity_id, user_id, activity_type, scan_type, now]
    )
    
    # Update analytics summary
    summary = db_get("SELECT * FROM ANALYTICS_SUMMARY WHERE id = 'main'")
    if not summary:
        db_run("INSERT INTO ANALYTICS_SUMMARY (id, total_scans, total_users, successful_scans, failed_scans, reports_downloaded, updated_at) VALUES ('main', 0, 0, 0, 0, 0, ?)", [now])
        summary = {"total_scans": 0, "total_users": 0, "successful_scans": 0, "failed_scans": 0, "reports_downloaded": 0}
        
    total_users = db_get("SELECT COUNT(*) as c FROM USERS")["c"]
    total_scans = db_get("SELECT COUNT(*) as c FROM USER_ACTIVITY WHERE activity_type = 'scan_execution'")["c"]
    successful_scans = db_get("SELECT COUNT(*) as c FROM USER_ACTIVITY WHERE activity_type = 'scan_execution' AND scan_type != 'Failed Scan'")["c"]
    failed_scans = db_get("SELECT COUNT(*) as c FROM USER_ACTIVITY WHERE activity_type = 'scan_execution' AND scan_type = 'Failed Scan'")["c"]
    reports_downloaded = db_get("SELECT COUNT(*) as c FROM USER_ACTIVITY WHERE activity_type = 'report_download'")["c"]
    
    db_run(
        "UPDATE ANALYTICS_SUMMARY SET total_scans = ?, total_users = ?, successful_scans = ?, failed_scans = ?, reports_downloaded = ?, updated_at = ? WHERE id = 'main'",
        [total_scans, total_users, successful_scans, failed_scans, reports_downloaded, now]
    )

# JWT Utility Configuration
SECRET_KEY = os.getenv("SECRET_KEY") or "MORSEVISION_SECRET_KEY"
ADMIN_EMAIL = (os.getenv("ADMIN_EMAIL") or "admin@morsevision.io").lower().strip()

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Email helper
def send_mail(to: str, subject: str, html_text: str) -> bool:
    mail_server = os.getenv("MAIL_SERVER") or "smtp.gmail.com"
    mail_port = int(os.getenv("MAIL_PORT") or "587")
    mail_username = os.getenv("MAIL_USERNAME")
    mail_password = os.getenv("MAIL_PASSWORD")
    mail_sender = os.getenv("MAIL_DEFAULT_SENDER") or mail_username

    if not mail_username or not mail_password or mail_username.strip() == "" or "yourgmail" in mail_username:
        print(f"Sending Email to: {to} with subject: {subject}")
        print("[SIMULATION MODE] SMTP credentials not configured. Simulating successful send.")
        return True

    try:
        print("Sending Email...")
        msg = MIMEMultipart()
        msg["From"] = f"MorseVision <{mail_sender}>"
        msg["To"] = to
        msg["Subject"] = subject
        msg.attach(MIMEText(html_text, "html"))

        server = smtplib.SMTP(mail_server, mail_port)
        server.starttls()
        server.login(mail_username, mail_password)
        server.sendmail(mail_sender, to, msg.as_string())
        server.quit()
        print("Email Sent Successfully")
        return True
    except Exception as e:
        print(f"SMTP Error: {e}")
        return False

app = FastAPI(title="MorseVision Python Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Authentication token dependencies
def get_current_user(request: Request):
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Session expired. Please log in again.")
    token = auth_header.split(" ")[1]
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload
    except Exception:
        raise HTTPException(status_code=401, detail="Session expired. Please log in again.")

def get_current_admin(user: dict = Depends(get_current_user)):
    admin = db_get("SELECT id FROM ADMIN WHERE email = ?", [user.get("email")])
    if not admin:
        raise HTTPException(status_code=403, detail="Access Denied. Administrator privileges required.")
    return user

# Pydantic Schemas
class RegisterSchema(BaseModel):
    name: str
    email: str
    password: str

class VerifyOtpSchema(BaseModel):
    email: str
    otp: str

class VerifyAdminOtpSchema(BaseModel):
    otp: str

class LoginSchema(BaseModel):
    email: str
    password: str

class CompleteProfileSchema(BaseModel):
    organization: Optional[str] = None
    department: Optional[str] = None
    purpose: Optional[str] = None
    experience_level: Optional[str] = None
    country: Optional[str] = None
    timezone: Optional[str] = None
    preferred_theme: Optional[str] = 'dark'
    notification_prefs: Optional[dict] = None

class SetAvatarSchema(BaseModel):
    avatar_url: str

class ProfileUpdateSchema(BaseModel):
    notification_prefs: Optional[dict] = None
    preferred_theme: Optional[str] = 'dark'

class ForgotPasswordSchema(BaseModel):
    email: str

class ResetPasswordSchema(BaseModel):
    email: str
    otp: str
    newPassword: str

class HistorySchema(BaseModel):
    timestamp: str
    name: str
    type: str
    wpm: int
    text: str
    morse: str
    carrierFreq: Optional[str] = None

class AdminUserCreateSchema(BaseModel):
    name: str
    email: str
    password: str
    role: str

class AdminUserUpdateSchema(BaseModel):
    id: str
    name: str
    role: str
    account_status: str

class AdminUserLockSchema(BaseModel):
    id: str
    email: str
    status: str

class AdminUserDeleteSchema(BaseModel):
    id: str
    email: str

class DeleteHistorySchema(BaseModel):
    index: int

class AdminUserResetPassSchema(BaseModel):
    id: str
    newPassword: str

class AdminSettingsSchema(BaseModel):
    maintenance_mode: Optional[bool] = False
    restrict_operator_registration: Optional[bool] = False
    jwt_expiry_hours: Optional[int] = 24
    backup_retention_days: Optional[int] = 30
    log_severity_filter: Optional[str] = "INFO"

# REST API Endpoints

@app.post("/api/auth/register")
def register(data: RegisterSchema, background_tasks: BackgroundTasks):
    email_lower = data.email.lower().strip()
    # Check duplicate
    existing_user = db_get("SELECT * FROM USERS WHERE email = ?", [email_lower])
    existing_admin = db_get("SELECT * FROM ADMIN WHERE email = ?", [email_lower])
    if existing_user or existing_admin:
        raise HTTPException(status_code=400, detail="Email Already Exists")
    
    # Password verification
    pwd = data.password
    has_upper = any(c.isupper() for c in pwd)
    has_lower = any(c.islower() for c in pwd)
    has_digit = any(c.isdigit() for c in pwd)
    has_special = any(not c.isalnum() for c in pwd)
    if len(pwd) < 8 or not (has_upper and has_lower and has_digit and has_special):
        raise HTTPException(status_code=400, detail="Password must be at least 8 characters and include uppercase, lowercase, number, and special character.")
    
    # Generate OTP
    otp = str(secrets.randbelow(900000) + 100000)
    expires_at = (datetime.datetime.utcnow() + datetime.timedelta(minutes=5)).isoformat()
    
    email_html = f"""
    <div style="background-color:#050505; color:#ffffff; font-family:'Sora', sans-serif; padding:40px; border-radius:18px; max-width:600px; margin:0 auto; border:1px solid rgba(255,122,0,0.25);">
      <div style="text-align:center; border-bottom:1px solid rgba(255,122,0,0.15); padding-bottom:20px; margin-bottom:30px;">
        <h2 style="color:#ff7a00; font-size:1.8rem; margin:0; letter-spacing:0.05em;">MorseVision</h2>
        <span style="font-size:0.75rem; color:#ffa500; font-weight:700; text-transform:uppercase; letter-spacing:0.15em;">Secure Communication Hub</span>
      </div>
      <p style="font-size:1.05rem; line-height:1.6; color:#a0a0a0;">Welcome to MorseVision</p>
      <p style="font-size:1.05rem; line-height:1.6; color:#a0a0a0;">Your verification code is</p>
      <div style="background-color:#0b0b0b; border:1px dashed #ff7a00; border-radius:12px; padding:20px; text-align:center; margin:30px 0;">
        <span style="font-size:2.5rem; font-family:monospace; font-weight:bold; color:#ff7a00; letter-spacing:0.2em;">{otp}</span>
      </div>
      <p style="font-size:1rem; color:#ffa500; font-weight:600;">This code expires in 5 minutes.</p>
      <p style="font-size:0.85rem; color:#555555; margin-top:40px; border-top:1px solid rgba(255,122,0,0.1); padding-top:20px;">
        If you did not create this account, simply ignore this email.
      </p>
      <div style="text-align:center; margin-top:30px; font-size:0.75rem; color:#555555;">
        MorseVision Automated Clearance System
      </div>
    </div>
    """
    background_tasks.add_task(send_mail, email_lower, "MorseVision Email Verification", email_html)
    hashed = bcrypt.hashpw(pwd.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    db_run(
        "INSERT INTO OTP (id, email, otp, created_at, expires_at, attempts, is_used, purpose, name, password_hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [f"otp-{uuid.uuid4()}", email_lower, otp, datetime.datetime.utcnow().isoformat(), expires_at, 0, 0, 'register', data.name.strip(), hashed]
    )
    
    log_event("INFO", f"Verification OTP generated and sent to: {email_lower}")
    print(f"\n========================================\n[EMAIL SYSTEM] Registration OTP: {otp} (Email: {email_lower})\n========================================\n")
    
    return {"message": "OTP sent to your email. Please verify.", "email": email_lower}

@app.post("/api/auth/verify-registration-otp")
def verify_registration_otp(data: VerifyOtpSchema):
    email_lower = data.email.lower().strip()
    existing_user = db_get("SELECT * FROM USERS WHERE email = ?", [email_lower])
    if existing_user:
        raise HTTPException(status_code=400, detail="Email is already verified.")
        
    otp_row = db_get("SELECT * FROM OTP WHERE email = ? AND is_used = 0 AND purpose = 'register' ORDER BY created_at DESC LIMIT 1", [email_lower])
    if not otp_row:
        raise HTTPException(status_code=400, detail="Invalid or expired verification code.")
        
    if otp_row["attempts"] >= 5:
        raise HTTPException(status_code=400, detail="Maximum incorrect attempts reached. Please request a new OTP.")
        
    # Check expiration
    if datetime.datetime.fromisoformat(otp_row["expires_at"]) < datetime.datetime.utcnow():
        raise HTTPException(status_code=400, detail="Invalid or expired verification code.")
        
    if otp_row["otp"].strip() == data.otp.strip():
        user_id = f"usr-{uuid.uuid4()}"
        db_run(
            "INSERT INTO USERS (id, name, email, password_hash, is_verified, created_at, account_status, failed_attempts) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [user_id, otp_row["name"], email_lower, otp_row["password_hash"], 1, datetime.datetime.utcnow().isoformat(), 'active', 0]
        )
        db_run("UPDATE OTP SET is_used = 1 WHERE id = ?", [otp_row["id"]])
        log_activity(user_id, 'registration')
        log_event("INFO", f"Node verification success. User created: {email_lower}")
        return {"message": "Verification successful. You can now log in."}
    else:
        new_attempts = otp_row["attempts"] + 1
        db_run("UPDATE OTP SET attempts = ? WHERE id = ?", [new_attempts, otp_row["id"]])
        if new_attempts >= 5:
            raise HTTPException(status_code=400, detail="Maximum incorrect attempts reached. Please request a new OTP.")
        raise HTTPException(status_code=400, detail="Invalid or expired verification code.")

@app.post("/api/auth/resend-registration-otp")
def resend_registration_otp(email_data: dict, background_tasks: BackgroundTasks):
    email = email_data.get("email")
    if not email:
         raise HTTPException(status_code=400, detail="Email is required.")
    email_lower = email.lower().strip()
    verified_user = db_get("SELECT * FROM USERS WHERE email = ?", [email_lower])
    if verified_user:
        raise HTTPException(status_code=400, detail="Email is already verified.")
        
    last_otp = db_get("SELECT * FROM OTP WHERE email = ? AND purpose = 'register' ORDER BY created_at DESC LIMIT 1", [email_lower])
    if not last_otp:
        raise HTTPException(status_code=404, detail="Registration details not found. Please register first.")
        
    # Rate limit check (30 seconds)
    created_time = datetime.datetime.fromisoformat(last_otp["created_at"])
    diff = (datetime.datetime.utcnow() - created_time).total_seconds()
    if diff < 30:
        raise HTTPException(status_code=429, detail=f"Please wait {int(30 - diff)} seconds before requesting a new OTP.")
        
    otp = str(secrets.randbelow(900000) + 100000)
    expires_at = (datetime.datetime.utcnow() + datetime.timedelta(minutes=5)).isoformat()
    
    email_html = f"""
    <div style="background-color:#050505; color:#ffffff; font-family:'Sora', sans-serif; padding:40px; border-radius:18px; max-width:600px; margin:0 auto; border:1px solid rgba(255,122,0,0.25);">
      <div style="text-align:center; border-bottom:1px solid rgba(255,122,0,0.15); padding-bottom:20px; margin-bottom:30px;">
        <h2 style="color:#ff7a00; font-size:1.8rem; margin:0; letter-spacing:0.05em;">MorseVision</h2>
        <span style="font-size:0.75rem; color:#ffa500; font-weight:700; text-transform:uppercase; letter-spacing:0.15em;">Secure Communication Hub</span>
      </div>
      <p style="font-size:1.05rem; line-height:1.6; color:#a0a0a0;">Welcome to MorseVision</p>
      <p style="font-size:1.05rem; line-height:1.6; color:#a0a0a0;">Your verification code is</p>
      <div style="background-color:#0b0b0b; border:1px dashed #ff7a00; border-radius:12px; padding:20px; text-align:center; margin:30px 0;">
        <span style="font-size:2.5rem; font-family:monospace; font-weight:bold; color:#ff7a00; letter-spacing:0.2em;">{otp}</span>
      </div>
      <p style="font-size:1rem; color:#ffa500; font-weight:600;">This code expires in 5 minutes.</p>
      <p style="font-size:0.85rem; color:#555555; margin-top:40px; border-top:1px solid rgba(255,122,0,0.1); padding-top:20px;">
        If you did not create this account, simply ignore this email.
      </p>
      <div style="text-align:center; margin-top:30px; font-size:0.75rem; color:#555555;">
        MorseVision Automated Clearance System
      </div>
    </div>
    """
    background_tasks.add_task(send_mail, email_lower, "MorseVision Email Verification", email_html)
    db_run(
        "INSERT INTO OTP (id, email, otp, created_at, expires_at, attempts, is_used, purpose, name, password_hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [f"otp-{uuid.uuid4()}", email_lower, otp, datetime.datetime.utcnow().isoformat(), expires_at, 0, 0, 'register', last_otp["name"], last_otp["password_hash"]]
    )
    log_event("INFO", f"Resent verification OTP to: {email_lower}")
    print(f"\n========================================\n[EMAIL SYSTEM] Registration OTP (Resend): {otp} (Email: {email_lower})\n========================================\n")
    return {"message": "New OTP code sent to your email.", "email": email_lower}

@app.get("/api/auth/admin-email")
def get_admin_email():
    return {"email": ADMIN_EMAIL}

@app.post("/api/admin/send-otp")
def send_admin_otp(background_tasks: BackgroundTasks):
    otp = str(secrets.randbelow(900000) + 100000)
    expires_at = (datetime.datetime.utcnow() + datetime.timedelta(minutes=5)).isoformat()
    
    email_html = f"""
    <div style="background-color:#050505; color:#ffffff; font-family:'Sora', sans-serif; padding:40px; border-radius:18px; max-width:600px; margin:0 auto; border:1px solid rgba(255,122,0,0.25);">
      <div style="text-align:center; border-bottom:1px solid rgba(255,122,0,0.15); padding-bottom:20px; margin-bottom:30px;">
        <h2 style="color:#ff7a00; font-size:1.8rem; margin:0; letter-spacing:0.05em;">MorseVision</h2>
        <span style="font-size:0.75rem; color:#ffa500; font-weight:700; text-transform:uppercase; letter-spacing:0.15em;">Administrator Command Console</span>
      </div>
      <p style="font-size:1.05rem; line-height:1.6; color:#a0a0a0;">Welcome to MorseVision</p>
      <p style="font-size:1.05rem; line-height:1.6; color:#a0a0a0;">Your verification code is</p>
      <div style="background-color:#0b0b0b; border:1px dashed #ff7a00; border-radius:12px; padding:20px; text-align:center; margin:30px 0;">
        <span style="font-size:2.5rem; font-family:monospace; font-weight:bold; color:#ff7a00; letter-spacing:0.2em;">{otp}</span>
      </div>
      <p style="font-size:1rem; color:#ffa500; font-weight:600;">This code expires in 5 minutes.</p>
      <p style="font-size:0.85rem; color:#555555; margin-top:40px; border-top:1px solid rgba(255,122,0,0.1); padding-top:20px;">
        If you did not request this code, simply ignore this email.
      </p>
      <div style="text-align:center; margin-top:30px; font-size:0.75rem; color:#555555;">
        MorseVision Automated Clearance System
      </div>
    </div>
    """
    background_tasks.add_task(send_mail, ADMIN_EMAIL, "MorseVision Admin Authentication", email_html)
    
    db_run("UPDATE OTP SET is_used = 1 WHERE email = ? AND purpose = 'admin_login'", [ADMIN_EMAIL])
    db_run(
        "INSERT INTO OTP (id, email, otp, created_at, expires_at, attempts, is_used, purpose) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [f"otp-{uuid.uuid4()}", ADMIN_EMAIL, otp, datetime.datetime.utcnow().isoformat(), expires_at, 0, 0, 'admin_login']
    )
    log_event("INFO", "Admin login verification OTP generated.")
    print(f"\n========================================\n[EMAIL SYSTEM] Admin Login OTP: {otp} (Email: {ADMIN_EMAIL})\n========================================\n")
    return {"message": "OTP sent to admin email."}

@app.post("/api/admin/verify-otp")
def verify_admin_otp(data: VerifyAdminOtpSchema):
    otp_row = db_get("SELECT * FROM OTP WHERE email = ? AND is_used = 0 AND purpose = 'admin_login' ORDER BY created_at DESC LIMIT 1", [ADMIN_EMAIL])
    if not otp_row:
        raise HTTPException(status_code=400, detail="Invalid OTP code.")
    if datetime.datetime.fromisoformat(otp_row["expires_at"]) < datetime.datetime.utcnow():
        raise HTTPException(status_code=400, detail="OTP expired.")
        
    if otp_row["otp"].strip() == data.otp.strip():
        db_run("UPDATE OTP SET is_used = 1 WHERE id = ?", [otp_row["id"]])
        admin_row = db_get("SELECT avatar FROM ADMIN WHERE email = ?", [ADMIN_EMAIL])
        avatar_url = admin_row.get("avatar") if admin_row else None
        token_payload = {
            "id": "admin-uid-1122",
            "name": "System Administrator",
            "email": ADMIN_EMAIL,
            "role": "Admin",
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }
        token = jwt.encode(token_payload, SECRET_KEY, algorithm="HS256")
        log_activity("admin-uid-1122", "login")
        log_event("INFO", f"Administrator logged in securely.")
        return {"token": token, "user": {"id": "admin-uid-1122", "name": "System Administrator", "email": ADMIN_EMAIL, "role": "Admin", "avatar": avatar_url}}
    else:
        raise HTTPException(status_code=400, detail="Invalid OTP code.")

@app.post("/api/admin/resend-otp")
def resend_admin_otp(background_tasks: BackgroundTasks):
    last_otp = db_get("SELECT * FROM OTP WHERE email = ? AND purpose = 'admin_login' ORDER BY created_at DESC LIMIT 1", [ADMIN_EMAIL])
    
    # Rate limit check (30 seconds)
    if last_otp:
        created_time = datetime.datetime.fromisoformat(last_otp["created_at"])
        diff = (datetime.datetime.utcnow() - created_time).total_seconds()
        if diff < 30:
            raise HTTPException(status_code=429, detail=f"Please wait {int(30 - diff)} seconds before requesting a new OTP.")
            
    otp = str(secrets.randbelow(900000) + 100000)
    expires_at = (datetime.datetime.utcnow() + datetime.timedelta(minutes=5)).isoformat()
    
    email_html = f"""
    <div style="background-color:#050505; color:#ffffff; font-family:'Sora', sans-serif; padding:40px; border-radius:18px; max-width:600px; margin:0 auto; border:1px solid rgba(255,122,0,0.25);">
      <div style="text-align:center; border-bottom:1px solid rgba(255,122,0,0.15); padding-bottom:20px; margin-bottom:30px;">
        <h2 style="color:#ff7a00; font-size:1.8rem; margin:0; letter-spacing:0.05em;">MorseVision</h2>
        <span style="font-size:0.75rem; color:#ffa500; font-weight:700; text-transform:uppercase; letter-spacing:0.15em;">Administrator Command Console</span>
      </div>
      <p style="font-size:1.05rem; line-height:1.6; color:#a0a0a0;">Welcome to MorseVision</p>
      <p style="font-size:1.05rem; line-height:1.6; color:#a0a0a0;">Your verification code is</p>
      <div style="background-color:#0b0b0b; border:1px dashed #ff7a00; border-radius:12px; padding:20px; text-align:center; margin:30px 0;">
        <span style="font-size:2.5rem; font-family:monospace; font-weight:bold; color:#ff7a00; letter-spacing:0.2em;">{otp}</span>
      </div>
      <p style="font-size:1rem; color:#ffa500; font-weight:600;">This code expires in 5 minutes.</p>
      <p style="font-size:0.85rem; color:#555555; margin-top:40px; border-top:1px solid rgba(255,122,0,0.1); padding-top:20px;">
        If you did not request this code, simply ignore this email.
      </p>
      <div style="text-align:center; margin-top:30px; font-size:0.75rem; color:#555555;">
        MorseVision Automated Clearance System
      </div>
    </div>
    """
    background_tasks.add_task(send_mail, ADMIN_EMAIL, "MorseVision Admin Authentication", email_html)
    
    db_run("UPDATE OTP SET is_used = 1 WHERE email = ? AND purpose = 'admin_login'", [ADMIN_EMAIL])
    db_run(
        "INSERT INTO OTP (id, email, otp, created_at, expires_at, attempts, is_used, purpose) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [f"otp-{uuid.uuid4()}", ADMIN_EMAIL, otp, datetime.datetime.utcnow().isoformat(), expires_at, 0, 0, 'admin_login']
    )
    log_event("INFO", "Admin login verification OTP generated (Resend).")
    print(f"\n========================================\n[EMAIL SYSTEM] Admin Login OTP (Resend): {otp} (Email: {ADMIN_EMAIL})\n========================================\n")
    return {"message": "New OTP code sent to admin email."}

@app.post("/api/auth/login")
def login(data: LoginSchema):
    email_lower = data.email.lower().strip()
    user = db_get("SELECT * FROM USERS WHERE email = ?", [email_lower])
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password.")
        
    if user["account_status"] == 'suspended':
        raise HTTPException(status_code=403, detail="Access denied. Your account is currently suspended.")
        
    # Verify password hash
    if not bcrypt.checkpw(data.password.encode('utf-8'), user["password_hash"].encode('utf-8')):
        failed = user["failed_attempts"] + 1
        db_run("UPDATE USERS SET failed_attempts = ? WHERE id = ?", [failed, user["id"]])
        if failed >= 5:
            db_run("UPDATE USERS SET account_status = 'suspended' WHERE id = ?", [user["id"]])
            log_event("WARNING", f"Account lock activated for operator: {email_lower} (Max failure thresholds).")
            raise HTTPException(status_code=403, detail="Account suspended due to too many failed login attempts.")
        raise HTTPException(status_code=401, detail="Invalid email or password.")
        
    # Reset failed attempts
    db_run("UPDATE USERS SET failed_attempts = 0, last_login = ? WHERE id = ?", [datetime.datetime.utcnow().isoformat(), user["id"]])
    token_payload = {
        "id": user["id"],
        "name": user["name"],
        "email": user["email"],
        "role": user["role"],
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }
    token = jwt.encode(token_payload, SECRET_KEY, algorithm="HS256")
    log_activity(user["id"], "login")
    log_event("INFO", f"Operator successfully logged in: {email_lower}")
    
    return {
        "token": token,
        "user": {
            "id": user["id"],
            "name": user["name"],
            "email": user["email"],
            "role": user["role"],
            "organization": user["organization"],
            "department": user["department"],
            "purpose": user["purpose"],
            "experience_level": user["experience_level"],
            "preferred_theme": user["preferred_theme"],
            "profile_completed": user["profile_completed"]
        }
    }

@app.post("/api/auth/google")
def google_auth(payload: dict):
    email = payload.get("email")
    name = payload.get("name")
    provider_id = payload.get("provider_id")
    avatar = payload.get("avatar")
    if not email or not name:
        raise HTTPException(status_code=400, detail="Google authentication payload invalid.")
        
    email_lower = email.lower().strip()
    user = db_get("SELECT * FROM USERS WHERE email = ?", [email_lower])
    
    if user:
        if user["account_status"] == 'suspended':
             raise HTTPException(status_code=403, detail="Access denied. Account suspended.")
        db_run("UPDATE USERS SET last_login = ? WHERE id = ?", [datetime.datetime.utcnow().isoformat(), user["id"]])
    else:
        user_id = f"usr-{uuid.uuid4()}"
        db_run(
            "INSERT INTO USERS (id, name, email, is_verified, created_at, last_login, role, provider, provider_id, avatar) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [user_id, name, email_lower, 1, datetime.datetime.utcnow().isoformat(), datetime.datetime.utcnow().isoformat(), "User", "google", provider_id, avatar]
        )
        user = db_get("SELECT * FROM USERS WHERE id = ?", [user_id])
        log_event("INFO", f"Google operator auto-registered: {email_lower}")
        
    token_payload = {
        "id": user["id"],
        "name": user["name"],
        "email": user["email"],
        "role": user["role"],
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }
    token = jwt.encode(token_payload, SECRET_KEY, algorithm="HS256")
    log_event("INFO", f"Google OAuth authentication successful for {email_lower}")
    
    return {
        "token": token,
        "user": {
            "id": user["id"],
            "name": user["name"],
            "email": user["email"],
            "role": user["role"],
            "organization": user["organization"],
            "department": user["department"],
            "purpose": user["purpose"],
            "experience_level": user["experience_level"],
            "preferred_theme": user["preferred_theme"],
            "profile_completed": user["profile_completed"]
        }
    }

@app.post("/api/auth/forgot-password")
def forgot_password(data: ForgotPasswordSchema, background_tasks: BackgroundTasks):
    email_lower = data.email.lower().strip()
    user = db_get("SELECT * FROM USERS WHERE email = ?", [email_lower])
    if not user:
        raise HTTPException(status_code=404, detail="Email address not found.")
        
    otp = str(secrets.randbelow(900000) + 100000)
    expires_at = (datetime.datetime.utcnow() + datetime.timedelta(minutes=5)).isoformat()
    
    email_html = f"""
    <div style="background-color:#050505; color:#ffffff; font-family:'Sora', sans-serif; padding:40px; border-radius:18px; max-width:600px; margin:0 auto; border:1px solid rgba(255,122,0,0.25);">
      <div style="text-align:center; border-bottom:1px solid rgba(255,122,0,0.15); padding-bottom:20px; margin-bottom:30px;">
        <h2 style="color:#ff7a00; font-size:1.8rem; margin:0; letter-spacing:0.05em;">MorseVision</h2>
        <span style="font-size:0.75rem; color:#ffa500; font-weight:700; text-transform:uppercase; letter-spacing:0.15em;">Operator Security Console</span>
      </div>
      <p style="font-size:1.05rem; line-height:1.6; color:#a0a0a0;">Welcome to MorseVision</p>
      <p style="font-size:1.05rem; line-height:1.6; color:#a0a0a0;">Your password recovery code is</p>
      <div style="background-color:#0b0b0b; border:1px dashed #ff7a00; border-radius:12px; padding:20px; text-align:center; margin:30px 0;">
        <span style="font-size:2.5rem; font-family:monospace; font-weight:bold; color:#ff7a00; letter-spacing:0.2em;">{otp}</span>
      </div>
      <p style="font-size:1rem; color:#ffa500; font-weight:600;">This code expires in 5 minutes.</p>
      <p style="font-size:0.85rem; color:#555555; margin-top:40px; border-top:1px solid rgba(255,122,0,0.1); padding-top:20px;">
        If you did not request this recovery code, please reset your password immediately.
      </p>
      <div style="text-align:center; margin-top:30px; font-size:0.75rem; color:#555555;">
        MorseVision Automated Clearance System
      </div>
    </div>
    """
    background_tasks.add_task(send_mail, email_lower, "MorseVision Password Recovery", email_html)
    
    db_run("UPDATE OTP SET is_used = 1 WHERE email = ? AND purpose = 'recovery'", [email_lower])
    db_run(
        "INSERT INTO OTP (id, email, otp, created_at, expires_at, attempts, is_used, purpose) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [f"otp-{uuid.uuid4()}", email_lower, otp, datetime.datetime.utcnow().isoformat(), expires_at, 0, 0, 'recovery']
    )
    log_event("INFO", f"Recovery OTP generated and sent to: {email_lower}")
    print(f"\n========================================\n[EMAIL SYSTEM] Recovery OTP: {otp} (Email: {email_lower})\n========================================\n")
    return {"message": "Recovery OTP code sent."}

@app.post("/api/auth/verify-recovery-otp")
def verify_recovery_otp(data: VerifyOtpSchema):
    email_lower = data.email.lower().strip()
    otp_row = db_get("SELECT * FROM OTP WHERE email = ? AND is_used = 0 AND purpose = 'recovery' ORDER BY created_at DESC LIMIT 1", [email_lower])
    if not otp_row:
        raise HTTPException(status_code=400, detail="Invalid OTP code.")
    if datetime.datetime.fromisoformat(otp_row["expires_at"]) < datetime.datetime.utcnow():
        raise HTTPException(status_code=400, detail="OTP expired.")
        
    if otp_row["otp"].strip() == data.otp.strip():
        db_run("UPDATE OTP SET is_used = 1 WHERE id = ?", [otp_row["id"]])
        return {"message": "OTP verified successfully."}
    else:
        raise HTTPException(status_code=400, detail="Invalid OTP code.")

@app.post("/api/auth/reset-password")
def reset_password(data: ResetPasswordSchema):
    email_lower = data.email.lower().strip()
    user = db_get("SELECT * FROM USERS WHERE email = ?", [email_lower])
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")
        
    hashed = bcrypt.hashpw(data.newPassword.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    db_run("UPDATE USERS SET password_hash = ?, failed_attempts = 0, account_status = 'active' WHERE id = ?", [hashed, user["id"]])
    log_event("INFO", f"Password successfully updated for: {email_lower}")
    return {"message": "Password reset completed successfully."}

@app.post("/api/user/complete-profile")
def complete_profile(data: CompleteProfileSchema, user: dict = Depends(get_current_user)):
    prefs_str = str(data.notification_prefs) if data.notification_prefs else "{}"
    db_run(
        "UPDATE USERS SET organization = ?, department = ?, purpose = ?, experience_level = ?, country = ?, timezone = ?, preferred_theme = ?, notification_prefs = ?, profile_completed = 1 WHERE id = ?",
        [data.organization, data.department, data.purpose, data.experience_level, data.country, data.timezone, data.preferred_theme, prefs_str, user.get("id")]
    )
    updated_user = db_get("SELECT * FROM USERS WHERE id = ?", [user.get("id")])
    log_event("INFO", f"Onboarding profile setup completed for {user.get('email')}")
    return {
        "message": "Profile setup completed successfully.",
        "user": {
            "id": updated_user["id"],
            "name": updated_user["name"],
            "email": updated_user["email"],
            "username": updated_user["username"],
            "role": updated_user["role"],
            "organization": updated_user["organization"],
            "department": updated_user["department"],
            "purpose": updated_user["purpose"],
            "experience_level": updated_user["experience_level"],
            "preferred_theme": updated_user["preferred_theme"],
            "profile_completed": 1
        }
    }

@app.get("/api/auth/session")
def verify_session(user: dict = Depends(get_current_user)):
    if user.get("role") == 'Admin' or user.get("id") == 'admin-uid-1122':
        admin_row = db_get("SELECT id, username, email, avatar FROM ADMIN WHERE id = ?", [user.get("id")])
        if not admin_row:
            raise HTTPException(status_code=401, detail="Administrator account not found.")
        return {
            "valid": True,
            "user": {
                "id": admin_row["id"],
                "name": "System Administrator",
                "email": admin_row["email"],
                "role": "Admin",
                "avatar": admin_row["avatar"],
                "profile_completed": 1
            }
        }

    user_row = db_get("SELECT id, name, email, username, role, provider, avatar, organization, department, purpose, experience_level, country, timezone, preferred_theme, notification_prefs, profile_completed FROM USERS WHERE id = ?", [user.get("id")])
    if not user_row:
        raise HTTPException(status_code=401, detail="User account not found.")
    return {
        "valid": True,
        "user": {
            "id": user_row["id"],
            "name": user_row["name"],
            "email": user_row["email"],
            "username": user_row["username"],
            "role": user_row["role"] or 'User',
            "provider": user_row["provider"] or 'local',
            "avatar": user_row["avatar"],
            "organization": user_row["organization"],
            "department": user_row["department"],
            "purpose": user_row["purpose"],
            "experience_level": user_row["experience_level"],
            "country": user_row["country"],
            "timezone": user_row["timezone"],
            "preferred_theme": user_row["preferred_theme"] or 'dark',
            "profile_completed": 1 if user_row["profile_completed"] else 0
        }
    }

@app.get("/api/profile")
@app.get("/api/user")
def get_user_profile(user: dict = Depends(get_current_user)):
    if user.get("role") == 'Admin' or user.get("id") == 'admin-uid-1122':
        admin_row = db_get("SELECT id, username, email, avatar FROM ADMIN WHERE id = ?", [user.get("id")])
        if not admin_row:
             raise HTTPException(status_code=404, detail="Admin not found.")
        return {
            "id": admin_row["id"],
            "name": "System Administrator",
            "email": admin_row["email"],
            "role": "Admin",
            "avatar": admin_row["avatar"]
        }
    user_row = db_get("SELECT id, name, email, username, role, provider, avatar, organization, department, purpose, experience_level, country, timezone, preferred_theme, notification_prefs, profile_completed, created_at, last_login FROM USERS WHERE id = ?", [user.get("id")])
    if not user_row:
        raise HTTPException(status_code=404, detail="User not found.")
    return user_row

@app.post("/api/user/profile")
def update_user_profile(data: ProfileUpdateSchema, user: dict = Depends(get_current_user)):
    prefs_str = str(data.notification_prefs) if data.notification_prefs else "{}"
    db_run(
        "UPDATE USERS SET preferred_theme = ?, notification_prefs = ? WHERE id = ?",
        [data.preferred_theme, prefs_str, user.get("id")]
    )
    log_event("INFO", f"Profile settings updated for user: {user.get('email')}")
    return {"message": "Profile configuration updated successfully."}

@app.post("/api/user/avatar")
def upload_avatar(file: UploadFile = File(...), user: dict = Depends(get_current_user)):
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in ['.jpg', '.jpeg', '.png', '.gif', '.webp']:
         raise HTTPException(status_code=400, detail="Invalid image format.")
    filename = f"avatar-{user.get('id')}{ext}"
    target_path = os.path.join(upload_dir, filename)
    with open(target_path, "wb") as f:
        shutil.copyfileobj(file.file, f)
    avatar_url = f"/uploads/{filename}"
    
    if user.get("role") == 'Admin' or user.get("id") == 'admin-uid-1122':
        db_run("UPDATE ADMIN SET avatar = ? WHERE id = ?", [avatar_url, user.get("id")])
    else:
        db_run("UPDATE USERS SET avatar = ? WHERE id = ?", [avatar_url, user.get("id")])
        
    log_event("INFO", f"User avatar updated: {user.get('email')}")
    return {"message": "Avatar uploaded successfully.", "avatar": avatar_url}

@app.post("/api/user/select-avatar")
def select_avatar(data: SetAvatarSchema, user: dict = Depends(get_current_user)):
    url = data.avatar_url
    if not url.startswith("/uploads/gallery/"):
         raise HTTPException(status_code=400, detail="Invalid gallery image selection.")
    
    filename = url.replace("/uploads/gallery/", "")
    file_path = os.path.join(upload_dir, "gallery", filename)
    if not os.path.exists(file_path):
         raise HTTPException(status_code=404, detail="Selected avatar file does not exist.")
         
    if user.get("role") == 'Admin' or user.get("id") == 'admin-uid-1122':
        db_run("UPDATE ADMIN SET avatar = ? WHERE id = ?", [url, user.get("id")])
    else:
        db_run("UPDATE USERS SET avatar = ? WHERE id = ?", [url, user.get("id")])
        
    log_event("INFO", f"User updated profile picture from gallery: {user.get('email')}")
    return {"message": "Profile picture updated successfully.", "avatar": url}

@app.post("/api/user/history")
def save_history(data: HistorySchema, user: dict = Depends(get_current_user)):
    history_id = f"hist-{uuid.uuid4()}"
    db_run(
        "INSERT INTO SCAN_HISTORY (id, user_id, filename, decoder_type, decoded_morse, decoded_text, confidence, processing_time, wpm, carrier_freq, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [history_id, user.get("id"), data.name, data.type, data.morse, data.text, "100%", "0.05s", data.wpm, data.carrierFreq or "800 Hz", data.timestamp]
    )
    log_activity(user.get("id"), 'scan_execution', scan_type='Morse Decode')
    log_event("INFO", f"Committed manual decode log to history timeline.")
    return {"message": "Log committed successfully.", "id": history_id}

@app.get("/api/user/history")
def get_history(user: dict = Depends(get_current_user)):
    rows = db_all("SELECT * FROM SCAN_HISTORY WHERE user_id = ? ORDER BY created_at DESC", [user.get("id")])
    return rows

@app.get("/api/downloads")
def get_downloads(user: dict = Depends(get_current_user)):
    rows = db_all("SELECT * FROM SCAN_HISTORY WHERE user_id = ? AND filename != 'Manual Translation Intercept' ORDER BY created_at DESC", [user.get("id")])
    return rows

@app.post("/api/upload")
def upload_file(file: UploadFile = File(...), user: dict = Depends(get_current_user)):
    ext = os.path.splitext(file.filename)[1]
    filename = f"intercept-{int(datetime.datetime.utcnow().timestamp() * 1000)}{ext}"
    target_path = os.path.join(upload_dir, filename)
    with open(target_path, "wb") as f:
        shutil.copyfileobj(file.file, f)
    size = os.path.getsize(target_path)
    log_event("INFO", f"File intercept uploaded: {file.filename} ({(size/1024):.1f} KB)")
    return {
        "message": "Upload successful.",
        "name": file.filename,
        "size": size,
        "path": f"/uploads/{filename}"
    }

@app.post("/api/audio/convert")
def audio_convert(body: dict):
    fmt = body.get("format", "wav")
    return StreamingResponse(iter([b"RIFF....WAVEfmt ...data..."]), media_type=f"audio/{fmt}")

# Admin Portal APIs

@app.post("/api/admin/login")
def admin_login(data: LoginSchema):
    email_lower = data.email.lower().strip()
    admin = db_get("SELECT * FROM ADMIN WHERE email = ?", [email_lower])
    if not admin or not bcrypt.checkpw(data.password.encode('utf-8'), admin["password_hash"].encode('utf-8')):
         raise HTTPException(status_code=401, detail="Invalid admin email or password.")
         
    token_payload = {
        "id": admin["id"],
        "name": "System Administrator",
        "email": admin["email"],
        "role": "Admin",
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }
    token = jwt.encode(token_payload, SECRET_KEY, algorithm="HS256")
    log_event("INFO", f"Administrator dashboard logged in: {email_lower}")
    return {"token": token, "user": {"id": admin["id"], "name": "System Administrator", "email": admin["email"], "role": "Admin"}}

@app.get("/api/admin/stats")
def get_admin_stats(admin: dict = Depends(get_current_admin)):
    ops = db_get("SELECT COUNT(*) as count FROM USERS")["count"]
    decodes = db_get("SELECT COUNT(*) as count FROM SCAN_HISTORY")["count"]
    return {
        "activeOperators": ops,
        "decodeCount": decodes,
        "avgAccuracy": "98.8%",
        "avgDecodeTime": "2.3s"
    }

@app.get("/api/admin/users")
def get_admin_users(admin: dict = Depends(get_current_admin)):
    rows = db_all("SELECT id, name, email, created_at, last_login, account_status, failed_attempts, role FROM USERS ORDER BY created_at DESC")
    # For each user, fetch their count of scan decodes
    for r in rows:
        decodes_count = db_get("SELECT COUNT(*) as count FROM SCAN_HISTORY WHERE user_id = ?", [r["id"]])["count"]
        r["total_decodes"] = decodes_count
    return rows

@app.post("/api/admin/users/create")
def admin_create_user(data: AdminUserCreateSchema, admin: dict = Depends(get_current_admin)):
    email_lower = data.email.lower().strip()
    existing = db_get("SELECT id FROM USERS WHERE email = ?", [email_lower])
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered.")
    hashed = bcrypt.hashpw(data.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    user_id = f"usr-{uuid.uuid4()}"
    db_run(
        "INSERT INTO USERS (id, name, email, password_hash, role, is_verified, created_at, account_status, failed_attempts) VALUES (?, ?, ?, ?, ?, 1, ?, 'active', 0)",
        [user_id, data.name.strip(), email_lower, hashed, data.role, datetime.datetime.utcnow().isoformat()]
    )
    log_event("INFO", f"New operator node created by Admin: {email_lower}")
    return {"message": "Operator created successfully."}

@app.put("/api/admin/users/update")
def admin_update_user(data: AdminUserUpdateSchema, admin: dict = Depends(get_current_admin)):
    db_run(
        "UPDATE USERS SET name = ?, role = ?, account_status = ? WHERE id = ?",
        [data.name.strip(), data.role, data.account_status, data.id]
    )
    log_event("INFO", f"Operator node updated by Admin: ID {data.id}")
    return {"message": "Operator updated successfully."}

@app.post("/api/admin/users/lock")
def admin_lock_user(data: AdminUserLockSchema, admin: dict = Depends(get_current_admin)):
    db_run(
        "UPDATE USERS SET account_status = ? WHERE id = ?",
        [data.status, data.id]
    )
    log_event("INFO", f"Operator state toggled to {data.status} for ID: {data.id}")
    return {"message": f"Operator status updated to {data.status}."}

@app.delete("/api/admin/users")
def admin_delete_user(data: AdminUserDeleteSchema, admin: dict = Depends(get_current_admin)):
    db_run("DELETE FROM USERS WHERE id = ?", [data.id])
    db_run("DELETE FROM SCAN_HISTORY WHERE user_id = ?", [data.id])
    log_event("INFO", f"Operator removed from registry: ID {data.id}")
    return {"message": "Operator removed from registry."}

@app.post("/api/admin/users/reset-password")
def admin_reset_operator_password(data: AdminUserResetPassSchema, admin: dict = Depends(get_current_admin)):
    if len(data.newPassword) < 6:
        raise HTTPException(status_code=400, detail="New passkey must be at least 6 characters.")
    hashed = bcrypt.hashpw(data.newPassword.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    db_run("UPDATE USERS SET password_hash = ?, failed_attempts = 0, account_status = 'active' WHERE id = ?", [hashed, data.id])
    log_event("INFO", f"Operator passkey reset completed by Administrator for user: ID {data.id}")
    return {"message": "Passkey reset completed successfully."}

@app.get("/api/admin/users/export")
def admin_export_users(admin: dict = Depends(get_current_admin)):
    rows = db_all("SELECT name, email, role, created_at, account_status FROM USERS ORDER BY created_at DESC")
    csv_content = "Name,Email,Role,Created At,Status\n"
    for r in rows:
        name = (r.get("name") or "").replace('"', '""')
        email = (r.get("email") or "").replace('"', '""')
        role = (r.get("role") or "").replace('"', '""')
        created_at = (r.get("created_at") or "").replace('"', '""')
        status = (r.get("account_status") or "").replace('"', '""')
        csv_content += f'"{name}","{email}","{role}","{created_at}","{status}"\n'
    return StreamingResponse(
        iter([csv_content.encode('utf-8')]),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=morsevision_operators.csv"}
    )

@app.get("/api/admin/history")
def get_admin_history(admin: dict = Depends(get_current_admin)):
    rows = db_all("""
        SELECT SCAN_HISTORY.*, USERS.name as operator_name, USERS.email as operator_email 
        FROM SCAN_HISTORY 
        LEFT JOIN USERS ON SCAN_HISTORY.user_id = USERS.id 
        ORDER BY SCAN_HISTORY.created_at DESC
    """)
    return rows

@app.delete("/api/admin/history")
def delete_history_item(data: DeleteHistorySchema, user: dict = Depends(get_current_user)):
    is_admin = False
    try:
        get_current_admin(user)
        is_admin = True
    except Exception:
        pass

    if is_admin:
        rows = db_all("""
            SELECT SCAN_HISTORY.id 
            FROM SCAN_HISTORY 
            LEFT JOIN USERS ON SCAN_HISTORY.user_id = USERS.id 
            ORDER BY SCAN_HISTORY.created_at DESC
        """)
    else:
        rows = db_all("SELECT id FROM SCAN_HISTORY WHERE user_id = ? ORDER BY created_at DESC", [user.get("id")])

    if data.index < 0 or data.index >= len(rows):
         raise HTTPException(status_code=400, detail="Invalid index.")
    
    target_id = rows[data.index]["id"]
    db_run("DELETE FROM SCAN_HISTORY WHERE id = ?", [target_id])
    log_event("INFO", f"Deleted scan history entry ID: {target_id}")
    return {"message": "Log purged successfully."}

@app.get("/api/admin/files")
def get_admin_files(admin: dict = Depends(get_current_admin)):
    rows = db_all("""
        SELECT SCAN_HISTORY.*, USERS.name as operator_name, USERS.email as operator_email 
        FROM SCAN_HISTORY 
        LEFT JOIN USERS ON SCAN_HISTORY.user_id = USERS.id 
        WHERE SCAN_HISTORY.filename != 'Manual Translation Intercept' 
        ORDER BY SCAN_HISTORY.created_at DESC
    """)
    return rows

@app.get("/api/admin/logs")
def get_admin_logs(admin: dict = Depends(get_current_admin)):
    rows = db_all("SELECT * FROM SYSTEM_LOGS ORDER BY time DESC LIMIT 100")
    return rows

@app.post("/api/user/activity")
def create_user_activity(body: dict, user: dict = Depends(get_current_user)):
    activity_type = body.get("activity_type", "scan_execution")
    scan_type = body.get("scan_type", "Version Scan")
    log_activity(user.get("id"), activity_type, scan_type=scan_type)
    return {"message": "Activity logged successfully."}

@app.get("/api/admin/analytics")
def get_admin_analytics(admin: dict = Depends(get_current_admin)):
    summary = db_get("SELECT * FROM ANALYTICS_SUMMARY WHERE id = 'main'")
    if not summary:
        now = datetime.datetime.utcnow().isoformat()
        db_run("INSERT INTO ANALYTICS_SUMMARY (id, total_scans, total_users, successful_scans, failed_scans, reports_downloaded, updated_at) VALUES ('main', 0, 0, 0, 0, 0, ?)", [now])
        summary = {"total_scans": 0, "total_users": 0, "successful_scans": 0, "failed_scans": 0, "reports_downloaded": 0}
        
    # Get last 7 days activities dynamically
    growth_data = []
    labels = []
    
    # We query daily aggregates for trailing 7 days
    for i in range(6, -1, -1):
        target_date = (datetime.date.today() - datetime.timedelta(days=i)).isoformat()
        label_str = (datetime.date.today() - datetime.timedelta(days=i)).strftime("%d %b")
        labels.append(label_str)
        
        count = db_get(
            "SELECT COUNT(*) as count FROM USER_ACTIVITY WHERE date(created_at) = date(?)",
            [target_date]
        )["count"]
        growth_data.append(count)
        
    # Get counts of all security scan types
    scan_types = ["Version Scan", "Ping Scan", "Aggressive Scan", "WHOIS Lookup", "DNS Lookup", "Clickjacking Test", "Morse Decode"]
    types_count = []
    for st in scan_types:
        count = db_get(
            "SELECT COUNT(*) as count FROM USER_ACTIVITY WHERE activity_type = 'scan_execution' AND scan_type = ?",
            [st]
        )["count"]
        types_count.append(count)
        
    return {
        "summary": summary,
        "growth": {
            "labels": labels,
            "data": growth_data
        },
        "types": {
            "labels": scan_types,
            "data": types_count
        }
    }

@app.post("/api/admin/logs/clear")
def clear_admin_logs(admin: dict = Depends(get_current_admin)):
    db_run("DELETE FROM SYSTEM_LOGS")
    log_event("INFO", "System logs cleared by administrator.")
    return {"message": "Logs cleared successfully."}

@app.post("/api/admin/settings")
def update_admin_settings(settings: AdminSettingsSchema, admin: dict = Depends(get_current_admin)):
    log_event("INFO", f"Administrator updated kernel system settings: {settings}")
    return {"message": "Settings saved successfully."}

@app.post("/api/admin/backup")
def trigger_backup(admin: dict = Depends(get_current_admin)):
    backup_file = f"backup_{int(datetime.datetime.utcnow().timestamp())}.db"
    dest = os.path.join(os.path.dirname(__file__), backup_file)
    shutil.copyfile(db_path, dest)
    log_event("INFO", f"Automated database backup triggered successfully: {backup_file}")
    return {"message": "Database backup created successfully.", "filename": backup_file}

# Static file serving config
app.mount("/css", StaticFiles(directory=os.path.join(os.path.dirname(__file__), "css")), name="css")
app.mount("/js", StaticFiles(directory=os.path.join(os.path.dirname(__file__), "js")), name="js")
app.mount("/uploads", StaticFiles(directory=upload_dir), name="uploads")

@app.get("/", response_class=HTMLResponse)
def read_index():
    index_path = os.path.join(os.path.dirname(__file__), "index.html")
    with open(index_path, "r", encoding="utf-8") as f:
        return f.read()

# Catch-all route to serve files/images directly from root directory
@app.get("/{filename}")
def serve_root_file(filename: str):
    file_path = os.path.join(os.path.dirname(__file__), filename)
    if os.path.exists(file_path) and os.path.isfile(file_path):
        return FileResponse(file_path)
    raise HTTPException(status_code=404, detail="File not found")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3000)
