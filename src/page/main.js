import React from "react";
import { Outlet } from "react-router-dom";


const Main = () => {
    return (
        <div>
            Main
            <Outlet />
        </div>
    )
}

export default Main