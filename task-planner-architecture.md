# Task Planner — MERN Application Architecture

## 1. Project Overview

Build a simple **Task Planner** application using the MERN stack:

- **MongoDB** — database
- **Express.js** — backend API framework
- **React** — frontend UI
- **Node.js** — backend runtime

The application should allow users to:

1. Add a task
2. Assign a category
3. Assign a priority
4. Mark a task as completed
5. View all tasks
6. View pending tasks
7. View completed tasks
8. Delete a task

The first version should remain simple and beginner/intermediate-friendly.

---

# 2. Core Features

## Task Management

Each task should contain:

- Title
- Optional description
- Category
- Priority
- Completion status
- Created timestamp
- Updated timestamp

### Supported priorities

- Low
- Medium
- High

### Example categories

Categories can initially be free-form strings. Example values:

- College
- Programming
- Personal
- Project
- Exam
- Other

Do not create a separate category collection in the MVP.

---

# 3. High-Level Architecture

```text
┌─────────────────────────────────────────────┐
│                   Browser                   │
│                                             │
│              React Frontend                 │
│                                             │
│  Pages / Components / State / API Service   │
└──────────────────────┬──────────────────────┘
                       │
                       │ HTTP + JSON
                       ▼
┌─────────────────────────────────────────────┐
│              Node.js + Express              │
│                                             │
│       Routes → Controllers → Models         │
│                                             │
│          Validation + Error Handling        │
└──────────────────────┬──────────────────────┘
                       │
                       │ Mongoose
                       ▼
┌─────────────────────────────────────────────┐
│                   MongoDB                   │
│                                             │
│                    tasks                    │
└─────────────────────────────────────────────┘
```

---

# 4. Repository Structure

Use a monorepo-style project with separate frontend and backend directories.

```text
task-planner/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskFilter.jsx
│   │   │   ├── TaskList.jsx
│   │   │   └── TaskItem.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── NotFound.jsx
│   │   │
│   │   ├── services/
│   │   │   └── taskService.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── taskController.js
│   │
│   ├── middleware/
│   │   └── errorMiddleware.js
│   │
│   ├── models/
│   │   └── Task.js
│   │
│   ├── routes/
│   │   └── taskRoutes.js
│   │
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── .gitignore
└── README.md
```

---

# 5. Frontend Architecture

## Technology

Use:

- React
- Vite
- React Router
- Axios or native `fetch`
- Plain CSS initially

Avoid Redux or other global state libraries for the MVP.

React local state is sufficient.

## Frontend route

The initial application only needs:

```text
/
```

### Home page

The Home page should contain:

```text
Task Planner

[ Add Task Form ]

[ All ] [ Pending ] [ Completed ]

Task List
```

---

# 6. Frontend Components

## Navbar

Displays the application name.

## TaskForm

Responsible for creating a task.

Fields:

```text
Title
Description
Category
Priority
[Add Task]
```

Client-side validation should prevent obviously invalid submissions.

## TaskFilter

Provides:

```text
All
Pending
Completed
```

Filtering can initially happen on the frontend after retrieving all tasks.

## TaskList

Receives tasks and renders multiple `TaskItem` components.

## TaskItem

Displays:

- Title
- Description if present
- Category
- Priority
- Completion state
- Complete/Undo button
- Delete button

Example:

```text
┌─────────────────────────────────┐
│ ☐ Study MongoDB                 │
│                                 │
│ Category: Programming           │
│ Priority: High                  │
│                                 │
│ [Complete] [Delete]             │
└─────────────────────────────────┘
```

---

# 7. Backend Architecture

Use a simple layered structure:

```text
HTTP Request
     │
     ▼
Route
     │
     ▼
Controller
     │
     ▼
Mongoose Model
     │
     ▼
MongoDB
```

## Routes

The initial REST API should contain:

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create task |
| PATCH | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

Do not create separate `/pending` and `/completed` endpoints for the MVP.

---

# 8. API Details

## GET `/api/tasks`

Returns all tasks.

Expected response:

```json
[
  {
    "_id": "task-id",
    "title": "Study MongoDB",
    "description": "Learn CRUD operations",
    "category": "Programming",
    "priority": "High",
    "completed": false,
    "createdAt": "...",
    "updatedAt": "..."
  }
]
```

## POST `/api/tasks`

Request:

```json
{
  "title": "Complete DBMS assignment",
  "description": "Finish the remaining questions",
  "category": "College",
  "priority": "High"
}
```

The backend should automatically set:

```text
completed = false
createdAt
updatedAt
```

## PATCH `/api/tasks/:id`

Used for updating task fields.

For completing a task:

```json
{
  "completed": true
}
```

It should also support changing other editable task fields.

## DELETE `/api/tasks/:id`

Deletes the specified task.

---

# 9. MongoDB Data Model

Use one collection:

```text
tasks
```

Example document:

```json
{
  "_id": "ObjectId(...)",
  "title": "Study MongoDB",
  "description": "Learn MongoDB CRUD operations",
  "category": "Programming",
  "priority": "High",
  "completed": false,
  "createdAt": "2026-09-29T10:00:00.000Z",
  "updatedAt": "2026-09-29T10:00:00.000Z"
}
```

## Mongoose schema

Conceptually:

```text
title
  String
  required
  max length: 200

description
  String
  optional
  max length: 1000

category
  String
  required

priority
  String
  enum: Low, Medium, High
  required

completed
  Boolean
  default: false

createdAt
  Date

updatedAt
  Date
```

Use Mongoose timestamps where appropriate.

---

# 10. Validation

Validation must exist on both frontend and backend.

## Title

- Required
- Trim whitespace
- Maximum 200 characters
- Reject empty/whitespace-only values

## Description

- Optional
- Maximum 1000 characters

## Category

- Required
- Trim whitespace
- Reasonable maximum length

## Priority

Only:

```text
Low
Medium
High
```

should be accepted.

The backend must not trust client-side validation.

---

# 11. Error Handling

Handle at least these cases:

### Invalid input

Return:

```text
400 Bad Request
```

### Invalid MongoDB ObjectId

Return:

```text
400 Bad Request
```

### Task not found

Return:

```text
404 Not Found
```

### Database/server error

Return:

```text
500 Internal Server Error
```

The frontend should display a useful human-readable error message.

Do not expose sensitive server/database details to the user.

---

# 12. Edge Cases

The application should account for:

1. Empty task title
2. Title containing only spaces
3. Very long title
4. Very long description
5. Invalid priority
6. Invalid task ID
7. Updating a task that does not exist
8. Deleting a task that does not exist
9. MongoDB connection failure
10. Backend unavailable
11. Network request failure
12. Duplicate button submissions
13. Empty task list
14. Undoing a completed task
15. Refreshing the browser without losing database data

Duplicate task titles are allowed.

---

# 13. State Management

For the MVP, React state should be enough.

The Home page can maintain:

```text
tasks
loading
error
filter
```

Example flow:

```text
GET /api/tasks
      │
      ▼
    tasks
      │
      ├── filter = all
      │
      ├── filter = pending
      │       └── completed === false
      │
      └── filter = completed
              └── completed === true
```

No Redux is required.

---

# 14. Environment Variables

The backend should use environment variables.

Example:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

Do not commit `.env` to Git.

Include `.env` in `.gitignore`.

Provide a `.env.example` file:

```env
PORT=5000
MONGODB_URI=
```

---

# 15. Development Scripts

The project should support separate development commands.

Backend:

```bash
npm run dev
```

Frontend:

```bash
npm run dev
```

Use a standard development setup such as `nodemon` for the backend if appropriate.

---

# 16. Security and Code Quality Basics

Even though this is an MVP:

- Never hard-code database credentials.
- Never commit `.env`.
- Validate request bodies.
- Validate MongoDB IDs.
- Handle async errors.
- Return appropriate HTTP status codes.
- Keep controllers focused.
- Keep database logic in models/services where appropriate.
- Avoid putting all backend code into `server.js`.
- Avoid unnecessary dependencies.

Authentication is intentionally out of scope for version 1.

---

# 17. Non-Goals for MVP

Do NOT implement these initially:

- User authentication
- Login/register
- JWT
- Password reset
- Social login
- Real-time notifications
- WebSockets
- Redux
- Separate category collection
- Separate priority collection
- Microservices
- Docker
- Cloud deployment
- Complex analytics
- Calendar integration

These can be added later if required.

---

# 18. Suggested Development Phases

## Phase 1 — Backend foundation

- Initialize Node project
- Install Express and Mongoose
- Create MongoDB connection
- Create Task model
- Create Express server

## Phase 2 — CRUD API

Implement:

```text
GET    /api/tasks
POST   /api/tasks
PATCH  /api/tasks/:id
DELETE /api/tasks/:id
```

Test the API before building the frontend.

## Phase 3 — React foundation

- Create Vite React app
- Create Home page
- Create components
- Add basic styling

## Phase 4 — Connect frontend to backend

Implement:

```text
React
  ↓
API service
  ↓
Express
  ↓
MongoDB
```

## Phase 5 — Complete functionality

Add:

- Create task
- Complete/undo
- Delete
- Filtering
- Loading states
- Error states

## Phase 6 — Polish

Add:

- Responsive design
- Better empty states
- Better validation messages
- Accessibility improvements
- README documentation

---

# 19. Definition of Done

The MVP is complete when a user can:

- Open the application
- Create a task
- Select a category
- Select a priority
- See the task immediately
- Refresh the page and still see the task
- Mark it completed
- Undo completion
- Filter pending tasks
- Filter completed tasks
- Delete a task
- Receive useful validation errors
- Receive useful error messages if the backend/database fails

The frontend and backend should be cleanly separated and communicate through the REST API.

