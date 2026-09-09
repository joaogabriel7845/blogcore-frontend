import { createBrowserRouter, Navigate } from "react-router";
import App from "../App";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";

const rotas = createBrowserRouter(
    [
        {
            path: "/",
            element: <Navigate to={'/login'}/>
        },
        {
            path: "/app",
            element: <App />
        },
        {
            path: "/register",
            element: <Register />
        },
        {
            path: "/login",
            element: <Login />
        }
    ]
)

export default rotas