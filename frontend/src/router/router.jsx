import {createBrowserRouter} from "react-router-dom"
import Index from "../pages"
import SignIn from "../pages/SignIn"
import SignUp from "../pages/SignUp"



export const router = createBrowserRouter ([
    {
        path: "/",
        element: <Index />
    },
    {
        path: "/signin",
        element: <SignIn />
    },
    {
        path: "/signup",
        element: <SignUp />
    },
])