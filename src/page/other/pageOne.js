import React, { useState } from "react";
import ComOne from "./pageOne/comOne";
import MyContext from "../../context";

const {Provider} = MyContext

const PageOne = () => {
    const [count, setCount] = useState(0)
    return (
        <>
            <div> 这是PageOne </div>
            <div style={{
                width:"200px",
                height:"300px",
                border:"1px solid"
            }}>
                context演示
                {count}
                <Provider value={{count, setCount}}>
                  <ComOne/>
                </Provider>       
            </div>
        </>
        
    )
}

export default PageOne