import React, { useContext } from 'react';
import MyContext from '../../../context';

function ComThree(props) {
    const {count,setCount} = useContext(MyContext)//函数组件通过useContext得到Provider传递下来的数据
    return (
        <div style={{
            width:"200px",
            border:"1px solid",
            display:"flex",
            flexDirection:"column",
            alignItems:"center"
        }}>
            第二层第二个组件
            <div>{count}</div>
            <button onClick={()=>setCount(0)}>归零</button>
        </div>
    );
}

export default ComThree;