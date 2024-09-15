# Task Manager Application - Frontend (React)

This is the frontend source code for the **Task Manager Application** built using **React**. It provides a user-friendly interface to manage tasks, including creating, updating, deleting, and viewing task details.

## Features

- Display a list of tasks with title, description, and completion status
- Filter tasks by completed and pending status
- Create new tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as completed or pending
- View detailed information for each task
- User registration
- User authentication (login)
- Pagination to navigate through multiple task pages
- Responsive and user-friendly interface

## Technologies Used

- React
- React Router DOM
- Axios
- Bootstrap
- React Icons
- React Toastify
- JWT Decode

## Dependencies

```json
{
  "axios": "^1.7.7",
  "bootstrap": "^5.3.3",
  "jwt-decode": "^4.0.0",
  "react": "^18.3.1",
  "react-bootstrap": "^2.10.4",
  "react-dom": "^18.3.1",
  "react-icons": "^5.3.0",
  "react-router-dom": "^6.26.2",
  "react-toastify": "^10.0.5"
}
```


## Setup and Installation

1. Clone the repository:
   ```
   git clone [your-repo-url]
   cd task-manager-frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add the backend API URL:
   ```
   REACT_APP_API_URL=http://localhost:8000/
   ```

4. Start the development server:
   ```
   npm run dev
   ```

This will run the app in development mode. The console output will show you the local address where you can view your app (typically `http://localhost:5173` or similar for Vite-based projects).
