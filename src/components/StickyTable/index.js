import React, { useEffect, useRef, useState } from 'react';
import './TabList.css'; // 引入样式

const StickyTable = () => {


  return (
    <div className="container">
      <div className="tab-bar">
        <button>Tab 1</button>
        <button>Tab 2</button>
        <button>Tab 3</button>
      </div>
      <div className="content">
        {[...Array(50)].map((_, index) => (
          <div key={index} className="item">
            Item {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StickyTable