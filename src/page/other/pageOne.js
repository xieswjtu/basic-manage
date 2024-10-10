import React, { useState } from "react";
import ComOne from "./pageOne/comOne";
import MyContext from "../../context";

const {Provider} = MyContext

const PageOne = () => {
    const [count, setCount] = useState(0)
    return (
        <>
          <nav>
            1
          </nav>
            <div> 这是PageOne </div>
            <div style={{
                width:"500px",
                height:"500px",
                border:"2px solid",
                display:"flex",
                flexDirection:"column",
                alignItems:"center"
            }}>
                <h2>context演示</h2>
                <h3>{count}</h3>
                <Provider value={{count, setCount}}>
                  <ComOne/>
                </Provider>  
                {/* 不用Provider时使用context的默认值      */}
            </div>
        </>
        
    )
}

export default PageOne