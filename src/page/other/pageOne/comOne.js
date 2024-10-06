import React from 'react';
import ComTwo from './comTwo';
import ComThree from './comThree';

function ComOne(props) {
    return (
        <div style={{
            width:"150px",
            border:"1px solid"

        }}>
            首层  
            <ComTwo/>
            <ComThree/>
        </div>
    );
}

export default ComOne;