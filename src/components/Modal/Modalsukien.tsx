import { Button, Modal, Space } from "antd";
import '../../css/modalQuanlive.css';
import dayjs from 'dayjs';
import { useState } from "react";
import { collection, doc, updateDoc } from "firebase/firestore";
import api from "../../firebase/firebaseAPI";
import { UpdateCalendar } from "../Calendar/CalendarDateValue";
interface ModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  valueNgaysudung: string;
  idNgaysudung: string;
}
const ModalQuanlive: React.FC<ModalProps> = ({ 
  isModalOpen, 
  onClose , 
  valueNgaysudung, 
  idNgaysudung}) => {
  const [ngaysudung, setNgaysudung] = useState<dayjs.Dayjs | null>(
    valueNgaysudung ? dayjs(valueNgaysudung, "DD/MM/YYYY") : null
  );    
  const dateObject = ngaysudung ? ngaysudung : dayjs(valueNgaysudung, "DD/MM/YYYY");
  const handleEventSave = async () => {
    try {
      if (ngaysudung) {
        const docRef = doc(collection(api, "ticket2"), idNgaysudung);
        await updateDoc(docRef, { datesudung: ngaysudung.format("DD/MM/YYYY") });
      }
      onClose();
    } catch (err) {
      console.log("Lỗi đổi ngày sử dụng (gói sự kiện)", err);
    }
  };
  const handleEventDateChange = (date: dayjs.Dayjs | null) => {
    setNgaysudung(date);
  };
    return ( <>
    <Modal
      title={<h5 style={{ textAlign: 'center', 
      fontFamily: 'Montserrat', 
      color: '#1E0D03',
      fontSize: '24px',
      fontStyle: 'normal', 
      fontWeight: '700', 
      lineHeight: '30px'}}>Đổi ngày sử dụng vé</h5>}
      centered
      open={isModalOpen}
      onCancel={onClose}
      footer={null}
      > 
      <div className="a">
        <p style={{marginLeft: '30px',
        marginRight: '120px'}}>Số vé</p>
        <p>PKG20210502</p>
      </div>
      <div className="b">
        <p style={{marginLeft: '30px',
        marginRight: '120px'}}>Số vé</p>
        <p>Vé cổng - Gói sự kiện</p>
      </div>
      <div className="c">
        <p style={{marginLeft: '30px',
        marginRight: '86px'}}>Tên sự kiện</p>
        <p>Hội trợ triển lãm hàng tiêu dùng 2021</p>
      </div>
      <div className="d">
        <p style={{marginLeft: '30px',
        marginRight: '120px',
        fontWeight: 'bold',
        marginTop: '5px'}}>Hạn sử dụng</p>
        <UpdateCalendar dateValue={dateObject} onDateChange={handleEventDateChange} />
      </div>
     <Space wrap style={{ marginTop: '22px', 
      marginLeft: '70px'}}>
      <Button danger onClick={onClose} style={{ width: '160px', 
        height: '40px', 
        fontFamily: 'Montserrat', 
        fontSize: '18px', 
        fontWeight: '700', 
        lineHeight: '26px', 
        color: '#FF993C'}}>Hủy</Button>
      <Button danger onClick={handleEventSave} style={{ width: '160px', 
        height: '40px', 
        fontFamily: 'Montserrat', 
        fontSize: '18px', 
        fontWeight: '700', 
        lineHeight: '26px', 
        background: '#FF993C',
        color: '#FFF'}}>Lưu</Button>
    </Space>
    </Modal>       
  </> );
}
export default ModalQuanlive;