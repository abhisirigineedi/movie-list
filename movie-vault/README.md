# Movie Vault

A secure, serverless application for managing your personal movie wishlist.

## Tech Stack
- **Frontend:** React + Vite
- **Styling:** Tailwind CSS (v4)
- **Backend/Database:** Firebase (Authentication + Firestore)
- **Icons:** Lucide-React

## Features
- **Firebase Authentication:** Secure login and sign-up with simple **Username** and Password (hidden `@movievault.local` strategy).
- **Decimal Precision Ratings:** Rate movies with 0.1 increments (e.g., 4.3) and see visually accurate **partial-filled stars**.
- **Firestore Database:** Real-time data storage and security rules to ensure user data isolation.
- **Modern UI:** Responsive dark-mode dashboard with movie CRUD operations.
- **Profile Section:** View account metadata directly from Firebase.

## Setup Instructions

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- A [Firebase Project](https://console.firebase.google.com/)

### 2. General Setup
1.  Clone the repository.
2.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  **Configure Firebase Settings**:
    Open [Firebase Console](https://console.firebase.google.com/), find your app's Authentication settings, and **Enable Email/Password Sign-in**. This prevents `auth/configuration-not-found` errors.

### 3. Run Locally
```bash
npm run dev
```
Navigate to `http://localhost:5173`.

## Deployment

### Deploy to Render (Recommended)
This project includes a `render.yaml` for easy deployment:
1.  Connect your GitHub repository to [Render](https://render.com/).
2.  Select **Blueprint** or create a **Static Site**.
3.  Render will automatically use the `render.yaml` configuration:
    - **Build Command**: `npm install && npm run build` (in `frontend`)
    - **Publish Directory**: `dist`
    - **Note**: Ensure you add a "Rewrite Rule" (Source: `/*`, Destination: `/index.html`) in the Render dashboard if not using Blueprints.

### Manual Deployment
1.  Navigate to `frontend`.
2.  Run `npm run build`.
3.  Upload the `dist` folder to any static host (Firebase Hosting, Vercel, Netlify).

