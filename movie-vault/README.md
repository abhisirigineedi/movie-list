# Movie Vault

A full-stack application built to securely manage personal movie wishlists. 

## Tech Stack
- **Backend:** Python, FastAPI, SQLAlchemy, PostgreSQL/SQLite.
- **Frontend:** React, Vite, Tailwind CSS (v4).
- **Authentication:** JWT via HTTP-only Cookies and bcrypt hashing.

## Requirements
Ensure you have Node.js and Python 3.10+ installed.
The python dependencies are detailed in `backend/requirements.txt` and npm dependencies are present in `frontend/package.json`.

## Quick Start

### 1. Setup Backend
```bash
cd backend
python -m venv venv
# On Windows
.\venv\Scripts\Activate.ps1
# On Mac/Linux
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### 2. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

### 3. Usage
Navigate to `http://localhost:5173` to interact with your secure Movie Vault. You can register, login, add, edit, and safely manage your personalized wishlist!

## Testing
Run unit and integration tests inside `backend` with:
```bash
pytest
```
