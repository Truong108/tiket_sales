import { Button, Checkbox, Input, Modal, Select, Space } from "antd";
import { collection, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import api from "../../firebase/firebaseAPI";
import dayjs from 'dayjs';
import { UpdateCalendar, UpdateTimeCalendar } from "../Calendar/CalendarUpdate";

interface CapnhatGoidichvuProps {
    isOpen: boolean;
    onClose: () => void; 
    idGoiVe: string;
    magoi:string;
    tengoi:string;
    giave:number | null;
    giaveCombo:number | null;
    sove:number | null;
    tinhtrang:string;
    modalFinish:boolean;
    ngayapdung:string |null ;
    ngayhethan: string | null;
    thoigianapdung: string | null;
    thoigianhethan: string | null;
  }
const UpdateGoidichvu: React.FC<CapnhatGoidichvuProps> = ({
  thoigianhethan,
  thoigianapdung,
  ngayapdung,
  ngayhethan,
  modalFinish, 
  isOpen, 
  onClose, 
  idGoiVe, 
  magoi, 
  tengoi, 
  giave, 
  giaveCombo, 
  sove, 
  tinhtrang 
}) => {
  const [tengoive, setTenGoiVe] = useState<string>("");
  const [magoive, setmaGoive] = useState<string>("");
  const [napdung, setNgayApDung] = useState<dayjs.Dayjs | null>(null);
  const [nhethan, setNgayHetHan] = useState<dayjs.Dayjs | null>(null);
  const [tgapdung, setTgApdung] = useState<dayjs.Dayjs | null>(null);
  const [tghethan, setTgHethan] = useState<dayjs.Dayjs | null>(null);
  const [GiaVeLe, setGiaVeLe] = useState<number | null>(null);
  const [giacombo, setGiaVeCombo] = useState<number | null>(null);
  const [sovecombo, setSoveCombo] = useState<number | null>(null);
  const [tinhtrangg, setTinhTrang] = useState<string>('Đang áp dụng');
  const handleNgayApDungChange = (date: any) => {
    setNgayApDung(date);
  };
  const handleNgayHetHanChange = (date: any) => {
    setNgayHetHan(date); 
  };
  const handleTgApdungChange = (time: any) => {
    setTgApdung(time);
  };
  const handleTgHethanChange = (time: any) => {
    setTgHethan(time);
  };
  useEffect(()=>{
    setmaGoive(magoi)
    setTenGoiVe(tengoi)
    setGiaVeLe(giave)
    setGiaVeCombo(giaveCombo)
    setSoveCombo(sove)
    setTinhTrang(tinhtrang)
    setNgayApDung(dayjs(ngayapdung,"DD/MM/YYYY"))
    setNgayHetHan(dayjs(ngayhethan,"DD/MM/YYYY"))
    setTgApdung(dayjs(thoigianapdung,"HH:mm:ss"))
    setTgHethan(dayjs(thoigianhethan,"HH:mm:ss"))
  },[
    magoi,
    tengoi,
    giave,
    giaveCombo,
    tinhtrang,
    sove, 
    idGoiVe,
    modalFinish,
    ngayapdung, 
    ngayhethan,
    thoigianapdung,
    thoigianhethan
  ])
  const handleUpdate = async () => {
        try{
          const docRef = doc(collection(api, "goive"),idGoiVe );
          await updateDoc(docRef,{
              tengoive:tengoive,
              giave: GiaVeLe,
              giacombo: giacombo,
              sovecombo:sovecombo,
              tinhtrang: tinhtrangg,
              napdung:napdung?.format("DD/MM/YYYY"),
              nhethan:nhethan?.format("DD/MM/YYYY"),
              tgapdung: tgapdung?.format("HH:mm:ss"),
              tghethan: tghethan?.format("HH:mm:ss"),
          })
          onClose()
        } catch(error){
          console.log("Lỗi update Gói vé!");
        }
      };
      const handleChangeTinhTrang = (value: string) => {
        setTinhTrang(value);
      };
    return ( <>
    <Modal
        title={<h5 style={{ textAlign: 'center', fontFamily: 'Montserrat', color: '#1E0D03',
            fontSize: '24px',fontStyle: 'normal', fontWeight: '700', lineHeight: '30px',
            marginBottom: '30px' }}>Cập nhật thông tin gói vé</h5>}
        centered
        open={isOpen}
        onCancel={onClose}
        footer={null}
        >
        <div className='tndn'>
        <div className='textsukien'>
        <div>
         <p className='mask'>Mã sự kiện *</p>
        <Input 
        value={magoive} 
        onChange={(e) => setmaGoive(e.target.value)} 
        placeholder="PKG20210502" 
        style={{width: '95%'}}
        />
        </div>
        <div>
        <p className='tensk'>Tên sự kiện</p>
        <Input 
        placeholder="Hội chợ triển lãm hàng tiêu dùng 2021" 
        style={{width: '150%', marginLeft:'7px'}}
        value={tengoive} 
        onChange={(e) => setTenGoiVe(e.target.value)}
        />
        </div>
        </div>
        <div className='lichtronglocve'>
        <div style={{ display: 'flex' }}>
          <p style={{
          marginRight: '130px', 
          marginTop: '15px',
          fontFamily: 'Montserrat',
          fontSize: '16px', 
          fontStyle: 'normal', 
          fontWeight: '600', 
          lineHeight: '26px' 
          }}>Ngày áp dụng</p>
          <p style={{
            marginTop: '15px', 
            fontFamily: 'Montserrat',
            fontSize: '16px', 
            fontStyle: 'normal', 
            fontWeight: '600', 
            lineHeight: '26px'
            }}>Ngày hết hạn</p>
        </div>
        <div style={{ display: 'flex' }}>
            <Space direction="vertical" style={{ marginRight: '10px' }}>
              {/* Chọn ngày áp dụng */}
              <UpdateCalendar 
                dateValue={napdung} 
                onDateChange={handleNgayApDungChange}
              />
            </Space>  
            {/* Chọn giờ áp dụng */}
            <UpdateTimeCalendar  
              timeValue={tgapdung}
              onTimeChange={handleTgApdungChange}
            />
            {/* Chọn ngày hết hạn */}
            <Space direction="vertical" style={{ marginLeft: '10px', marginRight: '10px' }}>
              <UpdateCalendar 
                dateValue={nhethan}
                onDateChange={handleNgayHetHanChange}
              />
            </Space>       
            {/* Chọn giờ hết hạn */}
            <UpdateTimeCalendar 
              timeValue={tghethan}
              onTimeChange={handleTgHethanChange}
            />
          </div>
        </div>
        </div>
        <div className='ttsudung'>
        <div>
        <p>Giá vé áp dụng</p>
        <Checkbox >Vé lẻ (vnđ/vé) với giá</Checkbox>
        <Input
        placeholder="Giá vé"
        style={{ width: '35%', background: '#F1F4F8' }}
        value={GiaVeLe ? GiaVeLe : " "}
        type="number"
        onChange={(e) => setGiaVeLe(parseFloat( e.target.value))}
        />
        <p style={{display: 'inline', marginLeft: '5px', fontWeight: 'normal'}}>/ vé</p>
        </div>
        <div style={{marginTop: '10px'}}>
        <Checkbox>Combo vé với giá</Checkbox>
        <Input
            placeholder="Giá vé"
            style={{ width: '35%', background: '#F1F4F8' }}
            value={giacombo ? giacombo : ""}
            type="number"
            onChange={(e) => setGiaVeCombo(parseFloat( e.target.value))}
        />
        <p style={{display: 'inline', 
            marginLeft: '8px', marginRight: '10px', 
            fontWeight: 'normal'}}>/</p> 
        <Input
            placeholder="Giá vé"
            style={{ width: '20%', background: '#F1F4F8' }}
            value={sovecombo ? sovecombo: ""}
            type="number"
            onChange={(e) => setSoveCombo(parseFloat( e.target.value))}
          />
            <p style={{display: 'inline', marginLeft: '5px', fontWeight: 'normal'}}>/ vé</p>
            </div>
            </div>
        <div className='congcheckin'>
            <p>Tình trạng</p>
        <Select
            defaultValue="Đang áp dụng"
            style={{ width: 200 }}
            value={tinhtrangg}
            onChange={handleChangeTinhTrang}
            options={[
            {
                label: 'Chọn tình trạng',
                options: [
                { label: 'Đang áp dụng', value: 'Đang áp dụng' },
                { label: 'Tắt', value: 'Tắt'},
                ],},]}
                />
            <p style={{fontFamily: 'Montserrat',fontSize: '12px',
                fontStyle: 'italic',fontWeight: '400',
                lineHeight: 'normal'}}>* là thông tin bắt buộc</p>
            </div>
        <Space wrap style={{ marginTop: '22px', marginLeft: '70px'}}>
        <Button danger onClick={onClose} 
        style={{ width: '160px', 
            height: '40px', 
            fontFamily: 'Montserrat', 
            fontSize: '18px', 
            fontWeight: '700', 
            lineHeight: '26px', 
            color: '#FF993C'}}>Hủy</Button>
        <Button danger onClick={handleUpdate} 
        style={{ width: '160px', 
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
 
export default UpdateGoidichvu;