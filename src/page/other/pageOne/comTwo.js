import React from 'react';
import MyCotext from "../../../context";

const {Consumer} = MyCotext

function ComTwo(props) {
    return (
        <div style={{
            width:"100px",
            border:"1px solid"

        }}>
            第二层第一个组件
            <Consumer>
                {(context)=>{
                    return (
                        <div style ={{
                            display:"flex",
                        }}>
                            <div>{context.count}</div> 
                            <button onClick={()=>{
                                context.setCount(context.count++)
                            }}>
                            +
                            </button>
                            <button onClick={()=>{
                                context.setCount(context.count--)
                            }}>
                            -
                            </button>
                        </div>                       
                    )
                    
                }}
            </Consumer>
        </div>
    );
}

export default ComTwo;