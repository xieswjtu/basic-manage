import React from 'react';
import ComTwo from './comTwo';
import ComThree from './comThree';
import { Flex } from 'antd';

function ComOne(props) {
    return (
        <div style={{
            width:"300px",
            height:"500px",
            border:"2px solid",
            display:"flex",
            flexDirection:"column",
            alignItems:"center"
        }}>
            <h3>first floor</h3> 
            <ComTwo/>
            <ComThree/>
        </div>
    );
}

export default ComOne;