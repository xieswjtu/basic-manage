import React ,{useState}from "react";
import useLoading from '../../hooks/useLoading.ts'
import { Modal, Button, Select } from 'antd'
import Footer from '../../components/Footer/index.tsx'
import LabelHelp from '../../components/LabelHelp/index.tsx'
import SelectPro from '../../components/Select/index.tsx'
import DrawerBody from '../../components/DrawerBody/index.tsx'
// import ColorPicker from '../../components/ColorPicker/index.tsx'
import { message } from 'antd'
import StickyTable from '../../components/StickyTable/index.js'
import ModalBody from '../../components/ModalBody/index.tsx'
import { click } from "@testing-library/user-event/dist/click";
import Index from "../../components/ModalBody/index.tsx";

const PageTwo = () => {
    const delay = function(t){
        return new Promise((resolve)=>{
            setTimeout(() => {
                setOpen(false);
                resolve()
            }, t)
        })
    }
    const [loading, onSubmit] = useLoading(async () => {
       console.log(loading)
       setModalText("请等待...")
       await delay(2000)
      })
    console.log(loading)
    const [open, setOpen] = useState(false);
    // const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('内容');
    
    const showModal = () => {
        setOpen(true);
        setModalText('内容')
    };
    
    // const handleOk = () => {
    //     setModalText('The modal will be closed after two seconds');
    //     setConfirmLoading(true);
    //     setTimeout(() => {
    //     setOpen(false);
    //     setConfirmLoading(false);
    //     }, 2000);
    // };
    
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    const confirmDelay = function(t){
        return new Promise((resolve)=>{
            setTimeout(() => {
                console.log("完成传输")
                resolve()
            }, t)
        })
    }

    const clickHandler = () =>{
        return confirmDelay(1000)
    }
    const options = ["1", "2"]

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          width: 150,
        },
        {
          title: 'Age',
          dataIndex: 'age',
          width: 150,
        },
        {
          title: 'Address',
          dataIndex: 'address',
        },
    ];
    const data = [];
    for (let i = 0; i < 100; i++) {
        data.push({
          key: i,
          name: `Edward King ${i}`,
          age: 32,
          address: `London, Park Lane no. ${i}`,
        });
    }

    const fixedOptions = []
    for (let i = 0; i < 10; i++) {
        fixedOptions.push({
          value: i,
          label: `默认数据 ${i}`,
        });
    }

    const handleShow = () => {
        console.log('Drawer is shown')
      }
    
    const handleClose = () => {
        console.log('Drawer is closed')
    }
    
    const showTest = () => {
        // 这里可以添加自定义逻辑，例如检查用户权限等
        return true // 返回 true 时 Drawer 可以显示
    }

    
    return (
        <>
        <Button type="primary" onClick={showModal}>
            开始异步传输
        </Button>
        <Modal
            title="Title"
            open={open}
            onOk={onSubmit}
            confirmLoading={loading}
            onCancel={handleCancel}
        >
            <p>{modalText}</p>
        </Modal>

        <Footer onOk={clickHandler}></Footer>
        <LabelHelp>帮助</LabelHelp>
        <SelectPro
            // onService={fetchOptions} // 异步获取选项
            // searchService={true} // 启用搜索时请求接口
            showSearch
            trigger={['focus', 'mount']} // 在挂载和焦点时触发请求
            fixedOptions={fixedOptions} // 固定选项
            onSearch={(value) => console.log('搜索值:', value)} // 搜索时触发的回调
            placeholder="请选择"
            style={{width :"200px"}}
        />
            <DrawerBody
                trigger={<Button>打开 Drawer</Button>} // 触发显示的元素
                onShow={handleShow} // 显示回调
                onClose={handleClose} // 关闭回调
                showTest={showTest} // 判断是否显示的条件
                title="我的弹窗"
            >
                <div>这里是 Drawer 的内容</div>
            </DrawerBody>
        <StickyTable dataSource={data} columns={columns}></StickyTable>
        </>
    );
    
}

export default PageTwo