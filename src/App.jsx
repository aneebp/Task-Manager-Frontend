import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import { TaskDetails } from "./pages/TaskDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import { TaskForm } from "./pages/TaskForm";
import { UpdateTask } from "./pages/UpdateTask";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login"></Navigate>;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer></ToastContainer>
        <Routes>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/logout" element={<Logout></Logout>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/" element={<Home></Home>}></Route>
          <Route
            path="/tasks/:id"
            element={<TaskDetails></TaskDetails>}
          ></Route>

          <Route
            path="/addtask"
            element={
              <ProtectedRoute>
                <TaskForm></TaskForm>
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/update/:id" element={<UpdateTask></UpdateTask>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
