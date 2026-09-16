import { createBrowserRouter, Navigate } from "react-router";
import App from "../App";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import MyAccount from "../pages/MyAccount/MyAccount";
import ErrorPage from "../pages/Error/ErrorPage";

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
        },
        {
            path: "/me/:id",
            element: <MyAccount />
        },
        {
            path: "/erro",
            element: <ErrorPage />
        }
    ]
)

export default rotas