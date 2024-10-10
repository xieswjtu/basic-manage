
import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../page/home";
import Main from "../page/main";
import Mall from "../page/mall";
import User from "../page/user";
import PageOne from "../page/other/pageOne";
import PageTwo from "../page/other/pageTwo";
import PageThree from "../page/other/pageThree";

const routes = [
    {
        path: '/',
        Component: Main,
        children: [
            //重定向
            {
                path: '/',
                element: <Navigate to = 'home'></Navigate>
            },
            {
                path: '/home',
                Component: Home
            },
            {
                path: '/mall',
                Component: Mall
            },
            {
                path: '/user',
                Component: User
            },
            {
                path: '/other',
                children: [
                    {
                        path: 'pageOne',
                        Component: PageOne
                    },
                    {
                        path: 'pageTwo',
                        Component: PageTwo
                    },
                    {
                        path: 'pageThree',
                        Component: PageThree
                    }
                ]
            }
        ]
    }
]
const router =createBrowserRouter(routes)


export default router