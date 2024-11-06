import React ,{useState}from "react";
import useLoading from '../../hooks/useLoading.ts'
import { Modal, Button } from 'antd'

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
        </>
    );
    
}

export default PageTwo