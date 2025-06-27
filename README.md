# Gong Frontend Test

This project is a frontend React application for the Gong test.

## 🛠 Tech Stack

* React (Vite)
* TailwindCSS v4
* React Router

## 🚀 Features

* Login form that encodes credentials into a secret using a custom encode function
* Fetches user hierarchy from Firebase Realtime Database
* Displays hierarchy as a tree with expandable/collapsible managers
* Shows user photo or initials if photo is missing
* Logout button that clears session and redirects to login

## 📂 Project Structure

```
src/
 ├── assets/           # Static assets (e.g. logo)
 ├── components/       # Main components: Form, Hierarchy, UserNode
 ├── context/          # AuthSession context for authentication state
 ├── routes/           # (If applicable) routing helpers or wrappers
 ├── utils/            # Utility functions (e.g. encode.js)
 ├── App.jsx           # Main app component with routes
 ├── App.css           # App-wide CSS (if used)
 ├── index.css         # Tailwind base styles
 └── main.jsx          # Vite entry point
```

## ⚙️ Setup

1️⃣ Install dependencies:

```bash
npm install
```

2️⃣ Start the dev server:

```bash
npm run dev
```

## 🔑 Login

Use the provided test credentials or reinitialize the database via: [https://9y9r481m5w.csb.app](https://9y9r481m5w.csb.app)

## 💡 Notes

* The app does not persist login between refreshes, per test instructions.
* No external icon libraries are used; only native symbols (e.g. +, -).

## 📤 How to Deploy

Push to your GitHub repo and share the link with evaluators.
