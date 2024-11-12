import React, { useState, useEffect, useRef } from 'react';
import { Table } from 'antd';
import "./index.css"

const StickyTable = ({ dataSource, columns }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const tableContainerRef = useRef(null);
  const stickyRef = useRef(null);
  const tabBarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (selectedRow && stickyRef.current && tableContainerRef.current && tabBarRef.current) {
        const containerTop = tableContainerRef.current.getBoundingClientRect().top;
        const tabBarHeight = tabBarRef.current.offsetHeight;
        const selectedTop = stickyRef.current.getBoundingClientRect().top;

        if (selectedTop < containerTop + tabBarHeight) {
          stickyRef.current.style.position = 'sticky';
          stickyRef.current.style.top = `${tabBarHeight}px`;
          stickyRef.current.style.zIndex = '100';
        } else {
          stickyRef.current.style.position = 'static';
        }
      }
    };

    const container = tableContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [selectedRow]);

  const onRowClick = (record) => {
    setSelectedRow(record);
  };

  return (
    <div>
      <div ref={tabBarRef} style={{ background: '#fff', padding: '10px', borderBottom: '1px solid #ddd' }}>
        {/* Tab 栏的内容 */}
        <div>Tab Bar</div>
      </div>
      <div ref={tableContainerRef} style={{ height: '400px', overflowY: 'auto' }}>
        {selectedRow && (
          <div ref={stickyRef} className="sticky-row" style={{ background: '#f0f2f5', padding: '10px' }}>
            {`Selected: ${selectedRow.name}`}
          </div>
        )}
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{pageSize: 50,}}
        scroll={{y: 240,}}
        onRow={(record) => ({
          onClick: () => onRowClick(record),
        })}
        rowClassName={(record) =>
          selectedRow && record.key === selectedRow.key ? 'selected-row' : ''
        }
      />
      </div>
    </div>
  );
};

export default StickyTable;