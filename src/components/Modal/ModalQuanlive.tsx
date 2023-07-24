import { Button, Modal, Space } from "antd";
import { useState } from "react";

const ModalQuanlive = () => {
    const [modal2Open, setModal2Open] = useState(false);
    return ( <>
        <Modal
                title={<h5 style={{ textAlign: 'center', 
                fontFamily: 'Montserrat', color: '#1E0D03',
                fontSize: '24px',fontStyle: 'normal', 
                fontWeight: '700', lineHeight: '30px'}}>Thêm gói vé</h5>}
                centered
                open={modal2Open}
                onCancel={() => setModal2Open(false)}
                footer={null}
                >
                    
                 <Space wrap style={{ marginTop: '22px', marginLeft: '70px'}}>
                  <Button danger onClick={() => setModal2Open(false)} style={{ width: '160px', 
                    height: '40px', fontFamily: 'Montserrat', 
                    fontSize: '18px', fontWeight: '700', 
                    lineHeight: '26px', color: '#FF993C'}}>Hủy</Button>
                  <Button danger onClick={() => setModal2Open(false)} style={{ width: '160px', 
                    height: '40px', fontFamily: 'Montserrat', 
                    fontSize: '18px', fontWeight: '700', 
                    lineHeight: '26px', background: '#FF993C',
                    color: '#FFF'}}>Lưu</Button>
                </Space>
              </Modal>
    </> );
}
 
export default ModalQuanlive;