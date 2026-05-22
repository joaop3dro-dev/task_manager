# 📝 Task Management System

> ⚠️ **Status: Actively in development**
>
> This project is not production-ready. Expect breaking changes, incomplete features, and ongoing refactoring. Use it for learning, experimentation, or controlled environments.

---

## 🎯 Overview

The **Task Management System** is a fullstack application designed to manage personal and collaborative tasks with a clean and predictable workflow.

Core principles:
- Simplicity over unnecessary abstraction
- Clear separation of concerns
- Secure authentication
- Maintainable and extensible architecture

---

## 🧠 Architecture

The project follows a client-server architecture:

- **Backend**: business logic, authentication, and data persistence
- **Frontend**: user interface and state management

---

## 🚀 Tech Stack

### 🔧 Backend
- Python 3.12+
- Django 6+
- Django REST Framework (DRF)
- JWT Authentication (SimpleJWT)
- SQLite (development) / PostgreSQL (production)
- drf-spectacular (Swagger / Redoc)

### 🎨 Frontend
- React
- Vite
- Context API + Hooks
- Vanilla CSS

---

## 📂 Project Structure

```

sistema_tarefas/
│
├── backend/
│   ├── core/        # Django core configuration
│   ├── tasks/       # Task domain logic
│   ├── users/       # User management & authentication
│   └── manage.py
│
├── frontend/
│   ├── src/         # React source code
│   └── public/
│
└── README.md

````

---

## ⚙️ Getting Started

### 📋 Prerequisites

- Python 3.12+
- Node.js (LTS recommended)
- Git

---

### 🔧 Backend Setup

```bash
cd backend

python -m venv .venv

# Windows
.venv\Scripts\activate

# Linux / Mac
source .venv/bin/activate

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
````

---

### 🎨 Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## 🔐 Authentication

JWT-based authentication:

1. Login returns access and refresh tokens
2. Access token is used in requests
3. Refresh token renews sessions

---

## 📌 Features

### ✅ Implemented

* User registration
* JWT authentication
* Task creation
* Task listing

### 🚧 In Progress

* Task update
* Task deletion
* Filtering and sorting
* UI improvements

---

## 🧪 Project Status

Active development:

* Frequent changes
* Ongoing refactoring
* Incomplete features

---

## 📜 License

MIT License. See `LICENSE` for details.

---

## 👤 Author

**João Pedro**
Backend / Fullstack Developer

