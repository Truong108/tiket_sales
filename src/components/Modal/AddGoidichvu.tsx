import { Button, Checkbox, Input, Modal, Pagination, Select, Space } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { addDoc, collection, getDocs } from "firebase/firestore";
import api from "../../firebase/firebaseAPI";
import { useEffect, useState } from "react";
import '../../css/styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { FormOutlined } from "@ant-design/icons";
import { CalendarDateValue, CalendarTime } from "../Calendar/CalendarDoisoat";
import UpdateGoidichvu from "./UpdateGoidichvu";
dayjs.extend(customParseFormat)
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
const AddGoidichvu = () => {
  const doigiatri = (value: number | string): string => {
    if (value == null) {
      return ""; 
    }
    return value.toLocaleString("vi-VN");
  };
    const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
    const [modal2Open, setModal2Open] = useState(false);
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
    const giaVeLeFormatted = doigiatri(giave);
    const giaVeComboFormatted = doigiatri(giacombo);
    const soveComboFormatted = doigiatri(sovecombo);
    const [filteredData, setFilteredData] = useState<datafirebase[]>([]);
    // const [isDataFetched, setIsDataFetched] = useState(false);
      const fetchData = async () => {
        const querySnapshot = await getDocs(collection(api, "goive"));
        const fetchedData: datafirebase[] = [];
        querySnapshot.forEach((doc) => {
          fetchedData.push({ id: doc.id, ...doc.data() } as datafirebase);
        });
        setData(fetchedData);
        setFilteredData(fetchedData);
        // setIsDataFetched(true);
      };
      useEffect(() => {
        fetchData();
      }, [modalUpdateOpen, modal2Open])
      // useEffect(() => {
      //   if (!isDataFetched) {
      //     fetchData();
      //   }
      // }, [isDataFetched, modalUpdateOpen, modal2Open]);
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
          setModal2Open(false);
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
    const handleVeLeCheckboxChange = (e: CheckboxChangeEvent) => {
        setIsVeLeChecked(e.target.checked);
      };
    
    const handleComboCheckboxChange = (e: CheckboxChangeEvent) => {
        setIsComboChecked(e.target.checked);
      };
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
        setTinhTrang(value);
      };
    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const handlePageChange = (page: number) => {
      setCurrentPage(page);
      };
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
    const currentData = data.slice(startIndex, endIndex);
    const [maGoi, setMagoi] = useState<string>("")
    const [tenGoi, setTengoi] = useState<string>("")
    const [giaVE, setGiave] = useState<number |null>(null)
    const [giaveCombo, setGiaveComBo] = useState<number|null>(null)
    const [soVe, setSove] = useState<number|null>(null)
    const [tinhTrang, setTinhtrang] = useState<string>("")
    const [idGoive, setIdgoive] = useState<string>("")
    const [ngayapdungUpdate, setNgayapdungUpdate] = useState<string | null>("")
    const [ngayhethanUpdate, setNgayhethanUpdate] = useState<string | null>("")
    const [tgapdungUpdate, setTgapdungUpdate] = useState<string | null>("")
    const [tghethanUpdate, setTghethanUpdate] = useState<string | null>("")
    const handleOpenModal = (
      id:string,
      magoi:string, 
      tengoi:string, 
      giave:number, 
      giavecombo:number,
      sove:number, 
      tinhtrang:string, 
      ngayapdungupdate:string,
      ngayhethanupdate:string,
      tgapdungUpdate: string,
      tghethanUpdate: string,
      ) => {
      setModalUpdateOpen(true);
      setMagoi(magoi)
      setTengoi(tengoi)
      setGiave(giave)
      setGiaveComBo(giavecombo)
      setSove(sove)
      setTinhtrang(tinhtrang)
      setIdgoive(id)
      setNgayapdungUpdate(ngayapdungupdate)
      setNgayhethanUpdate(ngayhethanupdate)
      setTgapdungUpdate(tgapdungUpdate)
      setTghethanUpdate(tghethanUpdate)
    };
    return ( <>
         <div style={{marginTop: '20px', display: 'flex', justifyContent: 'space-between'}}>
          <div className='searchve'>
            <div className='timkiemsove col-auto col-sm-8'>
              <input className="search__input" type="text" placeholder="Tìm bằng số vé" />
            </div>
          </div>
          <div>
            <Space wrap style={{marginRight: '30px'}}>
            <Button danger style={{fontFamily: 'Montserrat',
              fontSize: '15px',fontStyle: 'normal',
              fontWeight: '700',lineHeight: '26px', 
              width: '127px', height: '42px',
              color: '#FF993C'}}>Xuất file (.csv)</Button>
              <Button style={{width: '127px', height: '42px'}} 
              type="primary" danger onClick={() => setModal2Open(true)}>
                Thêm gói vé
              </Button>
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
                <div className='tndn'>
                <div className='textgv'>
                  <p className='tengv'>Tên gói vé *</p>
                  <Input placeholder="Nhập tên gói vé" style={{width: '50%'}} 
                  onChange={(e) => setTenGoiVe(e.target.value)}/>
                </div>
                <div className='lichtronglocve'>
                <div style={{ display: 'flex' }}>
                  <p style={{ marginRight: '130px', marginTop: '15px',
                  fontFamily: 'Montserrat',
                  fontSize: '16px', fontStyle: 'normal', 
                  fontWeight: '600', lineHeight: '26px' }}>Ngày áp dụng</p>
                  <p style={{marginTop: '15px', 
                  fontFamily: 'Montserrat',
                  fontSize: '16px', fontStyle: 'normal', 
                  fontWeight: '600', lineHeight: '26px'}}>Ngày hết hạn</p>
                </div>
                <div style={{ display: 'flex' }}>
                <Space direction="vertical" style={{marginRight: '10px'}}>
                <CalendarDateValue onDateChange={setNgayApDung} />
                </Space>
                <CalendarTime onTimeChange={setTgApdung} />
                <Space direction="vertical" 
                style={{ 
                  marginLeft: '10px', 
                  marginRight: '10px' }}>
                <CalendarDateValue onDateChange={setNgayHetHan} />
                </Space>
                <CalendarTime onTimeChange={setTgHethan} />
                </div>
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
                  <>
                  <Input
                      placeholder="Giá vé"
                      style={{ width: '35%', background: '#F1F4F8' }}
                      value={giaVeComboFormatted}
                      onChange={handleGiaComboChange}
                      type="number"
                      disabled={!isComboChecked}
                    />
                     <p style={{display: 'inline', 
                      marginLeft: '8px', 
                      marginRight: '10px', 
                      fontWeight: 'normal'}}>/</p> 
                   <Input
                      placeholder="Giá vé"
                      style={{ width: '20%', background: '#F1F4F8' }}
                      value={soveComboFormatted}
                      onChange={handleSoVeComboChange}
                      type="number"
                      disabled={!isComboChecked}
                    />
                      <p style={{display: 'inline', 
                        marginLeft: '5px', 
                        fontWeight: 'normal'}}>/ vé</p>
                      </>
                  </div>
                  </div>
                <div className='congcheckin'>
                    <p>Tình trạng</p>
                    <Select
                      value={tinhtrang}
                      defaultValue="Đang áp dụng"
                      style={{ width: 200 }}
                      onChange={handleChange}
                      options={[
                        {
                          label: 'Chọn tình trạng',
                          options: [
                            { label: 'Đang áp dụng', value: 'Đang áp dụng' },
                            { label: 'Tắt', value: 'Tắt'},
                          ],
                        },
                      ]}
                    />
                <p style={{fontFamily: 'Montserrat',
                  fontSize: '12px',
                  fontStyle: 'italic',
                  fontWeight: '400',
                  lineHeight: 'normal'}}>* là thông tin bắt buộc</p>
                 </div>
                 <Space wrap style={{ marginTop: '22px', marginLeft: '70px'}}>
                  <Button danger onClick={() => setModal2Open(false)} style={{ width: '160px', 
                    height: '40px', fontFamily: 'Montserrat', 
                    fontSize: '18px', fontWeight: '700', 
                    lineHeight: '26px', color: '#FF993C'}}>Hủy</Button>
                  <Button danger onClick={handleSave} style={{ width: '160px', 
                    height: '40px', fontFamily: 'Montserrat', 
                    fontSize: '18px', fontWeight: '700', 
                    lineHeight: '26px', background: '#FF993C',
                    color: '#FFF'}}>Lưu</Button>
                </Space>
              </Modal>
            </Space>
          </div>
        </div>
        <div className="content">
            <table className="table tableshow">
              <thead>
                <tr>
                  <th style={{background:"#F1F4F8"}}>STT</th>
                  <th style={{background:"#F1F4F8"}}>Mã gói</th>
                  <th style={{background:"#F1F4F8"}}>Tên gói vé</th>
                  <th style={{background:"#F1F4F8"}}>Ngày áp dụng </th>
                  <th style={{background:"#F1F4F8"}}>Ngày hết hạn</th>
                  <th style={{background:"#F1F4F8"}}>Giá vé(VNĐ/Vé)</th>
                  <th style={{background:"#F1F4F8"}}>Giá combo(VNĐ/Combo)</th>
                  <th style={{background:"#F1F4F8"}}>Tình trạng</th>
                  <th style={{background:"#F1F4F8"}}></th>
                </tr>
              </thead>
              <tbody>
              {currentData.map((item, index) =>{
              let tdstyle = {};
              let magoi = item.napdung.split("/");
              let maGoi = "ALT" + magoi.join("");
              if(index%2 === 1){
                  tdstyle = {backgroundColor:"#F7F8FB"}
              }
              let tinhtrangStyle = {}
                  if(item.tinhtrang ==="Đang áp dụng"){
                      tinhtrangStyle ={color:"#03AC00", 
                      backgroundColor:"#DEF7E0", 
                      border:"1px solid #919DBA", 
                      padding:"5px 10px", 
                      borderRadius:"8px"}
                  }
                   if(item.tinhtrang ==="Tắt"){
                    tinhtrangStyle={color:"#FD5959", 
                    backgroundColor:"#F8EBE8" , 
                    border:"1px solid #03AC00", 
                    padding:"5px 10px", 
                    borderRadius:"8px"}
                   }
                  return (
                    <tr key={item.id}>
                      <td style={tdstyle}>{index + 1}</td>
                      <td style={tdstyle}>{maGoi}</td>
                      <td style={tdstyle}>{item.tengoive}</td>
                      <td style={tdstyle}> {item.napdung} <br/> {item.tgapdung}</td>
                      <td style={tdstyle}>{item.nhethan} <br/> {item.tghethan}</td>
                      <td style={tdstyle}>{doigiatri(item.giave)} VNĐ</td>
                      <td style={tdstyle}>
{item.giacombo && item.sovecombo ? `${doigiatri(item.giacombo)} VNĐ / ${item.sovecombo} Vé` : item.giacombo || item.sovecombo}
                      </td>
                      <td style={tdstyle}><span style={tinhtrangStyle}>
                      <i className="bi bi-circle-fill"></i>{item.tinhtrang}</span></td>
                      <td style={{...tdstyle, color: '#FF993C'}} 
                      onClick={()=>handleOpenModal(
                        item.id,
                        item.magoi, 
                        item.tengoive, 
                        item.giave, 
                        item.giacombo, 
                        item.sovecombo, 
                        item.tinhtrang, 
                        item.napdung, 
                        item.nhethan, 
                        item.tgapdung,
                        item.tghethan
                        )}> 
                      <FormOutlined/> Cập nhật</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          <UpdateGoidichvu 
          thoigianapdung={tgapdungUpdate}
          thoigianhethan={tghethanUpdate}
          ngayapdung={ngayapdungUpdate} 
          ngayhethan={ngayhethanUpdate} 
          idGoiVe={idGoive} 
          magoi={maGoi} 
          tengoi={tenGoi} 
          giave={giaVE} 
          giaveCombo={giaveCombo}
          sove={soVe} 
          modalFinish={modalUpdateOpen} 
          tinhtrang={tinhTrang}  
          isOpen={modalUpdateOpen} 
          onClose={() => setModalUpdateOpen(false)}  
          />
          <div className="direction-components" style={{display: 'flex',justifyContent: 'center'}}>
          <Pagination
              current={currentPage}
              defaultCurrent={1}
              total={data.length}
              pageSize={itemsPerPage}
              onChange={handlePageChange}
            />
            </div>
          </div>
    </> );
}
 
export default AddGoidichvu;