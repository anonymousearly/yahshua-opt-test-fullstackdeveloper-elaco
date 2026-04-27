# Task Manager

A full-stack Task Manager SPA built with Django REST Framework and React + TypeScript.

---

## Stack

| Layer | Technology |
|---|---|
| Backend | Python 3.10+, Django 5.2, Django REST Framework, SQLite |
| Frontend | React 19, TypeScript, Vite, Axios |
| API Style | REST |

---

## Project Structure

```
latest-opt-test-softdev/
├── backend/
│   ├── root/               # Django project config (settings, urls)
│   ├── tasks/              # Tasks app (models, serializers, views, urls)
│   ├── .env                # Backend environment variables
│   ├── manage.py
│   └── db.sqlite3          # Auto-generated SQLite database
└── frontend/
    ├── src/
    │   ├── api/        # Individual Axios API call files
    │   ├── hooks/      # Custom React hooks per operation
    │   ├── components/ # TaskForm, TaskList, TaskItem
    │   ├── types/      # TypeScript interfaces
    │   └── App.tsx
    ├── .env            # Frontend environment variables
    └── package.json
```

---

## Backend Setup

### 1. Navigate to the backend directory

```bash
cd backend
```

### 2. Create and activate a virtual environment

```bash
python -m venv .venv

# Windows
.venv\Scripts\activate

# Mac/Linux
source .venv/bin/activate
```

### 3. Install dependencies

```bash
pip install django djangorestframework django-cors-headers
```

### 4. Apply migrations

```bash
python manage.py makemigrations tasks
python manage.py migrate
```

### 5. (Optional) Create a superuser for Django Admin

```bash
python manage.py createsuperuser
```

### 6. Start the server

```bash
python manage.py runserver
```

Backend runs at `http://localhost:8000`  
Admin panel at `http://localhost:8000/admin/`

### Backend Environment Variables

Located at `backend/.env`:

| Variable | Description |
|---|---|
| `SECRET_KEY` | Django secret key |
| `DEBUG` | `True` for development |
| `ALLOWED_HOSTS` | Comma-separated allowed hosts |
| `CORS_ALLOWED_ORIGINS` | Frontend origin allowed by CORS |
| `DB_NAME` | SQLite database filename |

---

## Frontend Setup

### 1. Navigate to the frontend directory

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in `frontend/task-manager/` (already provided):

```
VITE_API_BASE_URL=http://localhost:8000
```

### 4. Start the dev server

```bash
npm run dev
```

Frontend runs at `http://localhost:5173`

### Other scripts

```bash
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
```

### Frontend Environment Variables

| Variable | Value | Description |
|---|---|---|
| `VITE_API_BASE_URL` | `http://localhost:8000` | Django backend base URL |

> All Vite env variables must be prefixed with `VITE_` to be exposed to the browser.

---

## API Endpoint Summary

**Base URL:** `http://localhost:8000`

| Method | Endpoint | Description | Request Body | Success Response |
|---|---|---|---|---|
| `GET` | `/tasks/` | List all tasks | — | `200` Array of task objects |
| `POST` | `/tasks/` | Create a new task | `{ title, description? }` | `201` Created task object |
| `GET` | `/tasks/{id}/` | Retrieve a single task | — | `200` Task object |
| `PUT` | `/tasks/{id}/` | Update title and description | `{ title, description? }` | `200` Updated task object |
| `PATCH` | `/tasks/{id}/` | Toggle completed status | `{ completed: bool }` | `200` Updated task object |
| `DELETE` | `/tasks/{id}/` | Delete a task | — | `204` No content |

### Task Object Schema

```json
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false,
  "created_at": "2026-04-27T08:00:00Z"
}
```

### Error Responses

| Status | Meaning |
|---|---|
| `400` | Validation error (e.g. missing `title`) |
| `404` | Task not found |

---

## Notes & Assumptions

- **Backend must be running** at `http://localhost:8000` before starting the frontend.
- **CORS** is pre-configured in `root/settings.py` to allow `http://localhost:5173`. Update `CORS_ALLOWED_ORIGINS` in `.env` if the frontend runs on a different port.
- **No authentication** is required — all API endpoints are public. This is intended for local development only.
- **SQLite** is used as the database. `db.sqlite3` is auto-created on first `migrate` and is excluded from version control via `.gitignore`.
- **`.venv`** and **`.env`** are excluded from version control via `.gitignore`.
- Tasks are returned in **descending order** by `created_at` (newest first).
- The toggle switch on each task shows **Completed / Pending** status and sends a `PATCH` request on click.
- The task form operates in two modes: **Create** (empty form, "Add Task" button) and **Edit** (pre-filled form, "Save Changes" + Cancel buttons).

---

*Last updated: April 27, 2026*
