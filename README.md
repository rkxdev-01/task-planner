# Task Planner

A simple MERN stack task planner built for learning and beginner-friendly development. It allows users to create, view, complete, undo, filter, and delete tasks.

## Features

- Create a task with title, optional description, category, and priority
- View all, pending, and completed tasks
- Mark tasks as complete or undo completion
- Delete tasks
- Frontend and backend validation
- MongoDB persistence
- Clean separation between frontend and backend

## Tech stack

- MongoDB
- Express.js
- React
- Vite
- Node.js
- Mongoose

## Project structure

```text
task-planner/
├── client/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── .gitignore
├── README.md
├── task-planner-architecture.md
└── .env.example (optional root-level example if desired)
```

## Environment setup

Create a backend environment file in the server folder:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

A sample file is already provided in [server/.env.example](server/.env.example).

## Install dependencies

```bash
cd server
npm install

cd ../client
npm install
```

## Run the app

### Backend

```bash
cd server
npm run dev
```

### Frontend

```bash
cd client
npm run dev
```

The frontend will usually run at:

```text
http://localhost:5173/
```

The backend API will run at:

```text
http://localhost:5000
```

## API endpoints

```text
GET    /api/tasks
POST   /api/tasks
PATCH  /api/tasks/:id
DELETE /api/tasks/:id
```

## Notes

- This is an MVP and intentionally avoids authentication, Redux, and other unnecessary complexity.
- Validation is handled on both the frontend and backend.
- The app is built in a beginner-friendly structure with separate folders for client and server logic.
