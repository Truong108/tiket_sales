import { Button, Checkbox, Input, Modal, Select, Space } from "antd";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import api from "../../firebase/firebaseAPI";
import { CheckboxChangeEvent } from "antd/es/checkbox";

interface datafirebase {
    id: string;
    stt: number;
    magoi: string;
    tengoive: string;
    napdung: string;
    nhethan: string;
    tgapdung: string;
    tghethan: string;
    giave: number;
    giacombo: number;
    sovecombo: number;
    tinhtrang: string;
    capnhat: string;
}
interface CapnhatGoidichvuProps {
    isOpen: boolean;
    onClose: () => void; 
  }
const CapnhatGoidichvu: React.FC<CapnhatGoidichvuProps> = ({ isOpen, onClose }) => {
    const doigiatri = (value: number | string): string => {
        if (value == null) {
          return ""; 
        }
        return value.toLocaleString("vi-VN");
      };
    const [data, setData] = useState<datafirebase[]>([]);
    const [tengoive, setTenGoiVe] = useState('');
    const [napdung, setNgayApDung] = useState<string>("");
    const [nhethan, setNgayHetHan] = useState<string>("");
    const [tgapdung, setTgApdung] = useState<string | null>(null);
    const [tghethan, setTgHethan] = useState<string | null>(null);
    const [giave, setGiaVeLe] = useState<number | string>("");
    const [giacombo, setGiaVeCombo] = useState<number | string>("");
    const [sovecombo, setSoveCombo] = useState<number | string>("");  
    const [tinhtrang, setTinhTrang] = useState<string>('Đang áp dụng');
    const [isVeLeChecked, setIsVeLeChecked] = useState(false);
    const [isComboChecked, setIsComboChecked] = useState(false);
    const handleSave = async () => {
        try {
          const goive = {
            tengoive,
            napdung,
            nhethan,
            tgapdung,
            tghethan,
            giave, 
            giacombo,
            sovecombo,
            tinhtrang,
          };
          await addDoc(collection(api, "goive"), goive);
          setTenGoiVe(tengoive);
          setNgayApDung(napdung);
          setNgayHetHan(nhethan);
          setTgApdung(tgapdung);
          setTgHethan(tghethan);
          setGiaVeLe(giave);
          setGiaVeCombo(giacombo);
          setSoveCombo(sovecombo);
          setTinhTrang(tinhtrang);
        } catch (error) {
          console.error('Lỗi khi thêm gói vé:', error);
        }
      };
      const [isDataFetched, setIsDataFetched] = useState(false);
      const fetchData = async () => {
        const querySnapshot = await getDocs(collection(api, "goive"));
        const fetchedData: datafirebase[] = [];
        querySnapshot.forEach((doc) => {
          fetchedData.push({ id: doc.id, ...doc.data() } as datafirebase);
        });
        setData(fetchedData);
        setIsDataFetched(true);
      };
      useEffect(() => {
        if (!isDataFetched) {
          fetchData();
        }
      }, [isDataFetched]);
    const handlGiaveleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const giave = parseFloat(e.target.value);
        setGiaVeLe(giave);
      };
    const handleGiaComboChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const giacombo = parseFloat(e.target.value);
        setGiaVeCombo(giacombo);
      };
    const handleSoVeComboChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sovecombo = parseFloat(e.target.value);
        setSoveCombo(sovecombo);
      };
    const handleVeLeCheckboxChange = (e: CheckboxChangeEvent) => {
        setIsVeLeChecked(e.target.checked);
      };
    
    const handleComboCheckboxChange = (e: CheckboxChangeEvent) => {
        setIsComboChecked(e.target.checked);
      };
    const giaVeLeFormatted = doigiatri(giave);
    const giaVeComboFormatted = doigiatri(giacombo);
    const soveComboFormatted = doigiatri(sovecombo);
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
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
        <Input placeholder="PKG20210502" style={{width: '95%'}}/>
        </div>
        <div>
        <p className='tensk'>Tên sự kiện</p>
        <Input placeholder="Hội chợ triển lãm hàng tiêu dùng 2021" style={{width: '150%', marginLeft:'7px'}}/>
        </div>
        </div>
        <div className='lichtronglocve'>
            <div style={{ display: 'flex' }}>
                <p style={{ marginRight: '130px', marginTop: '15px',fontFamily: 'Montserrat',
            fontSize: '16px', fontStyle: 'normal', fontWeight: '600', lineHeight: '26px' }}>Ngày áp dụng</p>
            <p style={{marginTop: '15px', fontFamily: 'Montserrat',
            fontSize: '16px', fontStyle: 'normal', fontWeight: '600', lineHeight: '26px'}}>Ngày hết hạn</p>
        </div>
        {/* <div style={{ display: 'flex' }}>
        <Space direction="vertical" style={{marginRight: '10px'}}>
        <CalendarDateValue onDateChange={setNgayApDung} />
        </Space>
        <CalendarTime onTimeChange={setTgApdung} />
        <Space direction="vertical" style={{ marginLeft: '10px', marginRight: '10px' }}>
        <CalendarDateValue onDateChange={setNgayHetHan} />
        </Space>
        <CalendarTime onTimeChange={setTgApdung} />
        </div> */}
        </div>
        </div>
        <div className='ttsudung'>
        <div>
            <p>Giá vé áp dụng</p>
        <Checkbox onChange={handleVeLeCheckboxChange}>Vé lẻ (vnđ/vé) với giá</Checkbox>
        <Input
        placeholder="Giá vé"
        style={{ width: '35%', background: '#F1F4F8' }}
        value={giaVeLeFormatted}
        onChange={handlGiaveleChange}
        type="number"
        disabled={!isVeLeChecked}
            />
        <p style={{display: 'inline', marginLeft: '5px', fontWeight: 'normal'}}>/ vé</p>
        </div>
        <div style={{marginTop: '10px'}}>
        <Checkbox onChange={handleComboCheckboxChange}>Combo vé với giá</Checkbox>
        <Input
            placeholder="Giá vé"
            style={{ width: '35%', background: '#F1F4F8' }}
            value={giaVeComboFormatted}
            onChange={handleGiaComboChange}
            type="number"
            disabled={!isComboChecked}
        />
        <p style={{display: 'inline', 
            marginLeft: '8px', marginRight: '10px', 
            fontWeight: 'normal'}}>/</p> 
        <Input
            placeholder="Giá vé"
            style={{ width: '20%', background: '#F1F4F8' }}
            value={soveComboFormatted}
            onChange={handleSoVeComboChange}
            type="number"
            disabled={!isComboChecked}
        />
            <p style={{display: 'inline', marginLeft: '5px', fontWeight: 'normal'}}>/ vé</p>
            </div>
            </div>
        <div className='congcheckin'>
            <p>Tình trạng</p>
        <Select
            defaultValue="Đang áp dụng"
            style={{ width: 200 }}
            onChange={handleChange}
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
        <Button danger onClick={handleSave} 
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
 
export default CapnhatGoidichvu;
