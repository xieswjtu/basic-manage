
import { createBrowserRouter } from "react-router-dom";
import Home from "../page/home";
import Main from "../page/main";

const routes = [
    {
        path: '/',
        Component: Main,
        children: [
            {
                path: '/home',
                Component: Home
            }
        ]
    }
]
const router =createBrowserRouter(routes)


export default router