import React from 'react';
import MyCotext from "../../../context";

const {Consumer} = MyCotext

function ComTwo(props) {
    return (
        <div style={{
            width:"200px",
            border:"1px solid",
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            marginBottom:"100px"

        }}>
            第二层第一个组件
            <Consumer>
                {(context)=>{
                    return (
                        <div style ={{
                            display:"flex",
                            flexDirection:"column"
                        }}>
                            <div>name:{context.name}</div>
                            <div>count:{context.count}</div> 
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