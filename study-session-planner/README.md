# Study Session Planner

A lightweight React app to plan and track your study sessions.

## Features

- Add study sessions with topic, subject, duration, priority, and date
- View all sessions in a clean card layout
- Mark sessions as completed
- Filter sessions by subject
- Delete sessions
- Total study duration shown automatically
- Priority color coding — High (red), Medium (orange), Low (green)

## Tech Used

- React
- React Hook Form
- Context API
- Tailwind CSS

## Setup

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── context/
│   └── SessionContext.jsx
├── components/
│   ├── SessionForm.jsx
│   ├── SessionList.jsx
│   └── SessionCard.jsx
└── App.jsx
```
