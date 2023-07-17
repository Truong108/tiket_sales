
import '../css/styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Checkbox, DatePicker, DatePickerProps, Input, Modal, Pagination, Select, Space, TimePicker } from 'antd';

import { FormOutlined } from '@ant-design/icons';
import '../css/styles.css';
import type { } from 'antd/es/config-provider';
import { useEffect, useState } from 'react';
import {collection, getDocs } from 'firebase/firestore';
import api from '../firebase/firebaseAPI';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { CheckboxChangeEvent } from 'antd/es/checkbox';

dayjs.extend(customParseFormat)

interface datafirebase {
    id: string;
    stt: number;
    magoi: string;
    tengoive: string;
    napdung: string;
    nhethan: string;
    giave: string;
    giacombo: string;
    tinhtrang: string;
    capnhat: string;
}
function Goidichvu() {
    const [modal1Open, setModal1Open] = useState(false);
    const [modal2Open, setModal2Open] = useState(false);
    const [data, setData] = useState<datafirebase[]>([]);
    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
      };
    useEffect(() => {
        const fetchData = async () => {
          const querySnapshot = await getDocs(collection(api, "goive"));
          const fetchedData: datafirebase[] = [];
          querySnapshot.forEach((doc) => {
            fetchedData.push({ id: doc.id, ...doc.data() } as datafirebase);
          });
          setData(fetchedData);
        };
        fetchData();
      }, []);
      const CheckboxOnChange = (e: CheckboxChangeEvent) => {
        console.log(`checked = ${e.target.checked}`);
      };
      const handleChange = (value: string) => {
        console.log(`selected ${value}`);
      };
  return (
  <div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className='bang4' id='bang4'>
          <h1 className='danhsachgoive'>Danh sách gói vé</h1>
        <div style={{marginTop: '20px', display: 'flex', justifyContent: 'space-between'}}>
          <div className='searchve'>
            <div className='timkiemsove col-auto col-sm-8'>
              <input className="search__input" type="text" placeholder="Search" />
            </div>
          </div>
          <div>
            <Space wrap style={{marginRight: '30px'}}>
            <Button danger style={{fontFamily: 'Montserrat',fontSize: '15px',fontStyle: 'normal',
              fontWeight: '700',lineHeight: '26px', color: '#FF993C'}}>Xuất file (.csv)</Button>
              <Button type="primary" danger onClick={() => setModal2Open(true)}>
                Thêm gói vé
              </Button>
              <Modal
                title={<h5 style={{ textAlign: 'center', fontFamily: 'Montserrat', color: '#1E0D03',
                fontSize: '24px',fontStyle: 'normal', fontWeight: '700', lineHeight: '30px' }}>Thêm gói vé</h5>}
                centered
                open={modal2Open}
                onCancel={() => setModal2Open(false)}
                footer={null}
                >
                <div className='tndn'>
                <div className='textgv'>
                  <p className='tengv'>Tên gói vé *</p>
                  <Input placeholder="Nhập tên gói vé" style={{width: '50%'}}/>
                </div>
                <div className='lichtronglocve'>
                <div style={{ display: 'flex' }}>
                    <p style={{ marginRight: '130px', marginTop: '15px',fontFamily: 'Montserrat',
                  fontSize: '16px', fontStyle: 'normal', fontWeight: '600', lineHeight: '26px' }}>Ngày áp dụng</p>
                    <p style={{marginTop: '15px', fontFamily: 'Montserrat',
                   fontSize: '16px', fontStyle: 'normal', fontWeight: '600', lineHeight: '26px'}}>Ngày hết hạn</p>
                </div>
                <div style={{ display: 'flex' }}>
                <Space direction="vertical" style={{marginRight: '10px'}}>
                <DatePicker onChange={onChange} />
                </Space>
                <TimePicker defaultValue={dayjs('00:00:00', 'HH:mm:ss')} />
                <Space direction="vertical" style={{ marginLeft: '10px', marginRight: '10px' }}>
                    <DatePicker onChange={onChange} />
                </Space>
                <TimePicker defaultValue={dayjs('00:00:00', 'HH:mm:ss')} />
                </div>
                </div>
                </div>
                <div className='ttsudung'>
                  <div>
                    <p>Giá vé áp dụng</p>
                  <Checkbox onChange={CheckboxOnChange}>Vé lẻ (vnđ/vé) với giá</Checkbox>
                  <Input placeholder="Giá vé" style={{width: '35%', background: '#F1F4F8'}}/> 
                  <p style={{display: 'inline', marginLeft: '5px', fontWeight: 'normal'}}>/ vé</p>
                  </div>
                 <div style={{marginTop: '10px'}}>
                  <Checkbox onChange={CheckboxOnChange}>Combo vé với giá</Checkbox>
                  <Input placeholder="Giá vé" style={{width: '25%', background: '#F1F4F8'}}/> 
                  <p style={{display: 'inline', marginLeft: '5px', marginRight: '10px', fontWeight: 'normal'}}>/</p> 
                  <Input placeholder="Giá vé" style={{width: '20%', background: '#F1F4F8'}}/> 
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
                            { label: 'Chưa sử dụng', value: 'Chưa sử dụng' },
                            { label: 'Hết hạn', value: 'Hết hạn'},
                          ],
                        },
                      ]}
                    />
                    <p style={{fontFamily: 'Montserrat',fontSize: '12px',fontStyle: 'italic',fontWeight: '400',
                    lineHeight: 'normal'}}>* là thông tin bắt buộc</p>
                 </div>
                 <Space wrap style={{ marginTop: '22px', marginLeft: '70px'}}>
                  <Button danger onClick={() => setModal2Open(false)} style={{ width: '160px', height: '40px', fontFamily: 'Montserrat', 
                    fontSize: '18px', fontWeight: '700', lineHeight: '26px', color: '#FF993C'}}>Hủy</Button>
                  <Button danger onClick={() => setModal2Open(false)} style={{ width: '160px', height: '40px', fontFamily: 'Montserrat', 
                    fontSize: '18px', fontWeight: '700', lineHeight: '26px', background: '#FF993C', color: '#FFF'}}>Lưu</Button>
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
                {data.map((item, index) =>{
              let tdstyle = {};
              if(index%2 === 1){
                  tdstyle = {backgroundColor:"#F7F8FB"}
              }
                  return (
                    <tr key={item.stt}>
                      <td style={tdstyle}>{index + 1}</td>
                      <td style={tdstyle}>{item.magoi}</td>
                      <td style={tdstyle}>{item.tengoive}</td>
                      <td style={tdstyle}>{item.napdung}</td>
                      <td style={tdstyle}>{item.nhethan}</td>
                      <td style={tdstyle}>{item.giave}</td>
                      <td style={tdstyle}>{item.giacombo}</td>
                      <td style={tdstyle}>{item.tinhtrang}</td>
                      <td style={tdstyle} onClick={() => setModal1Open(true)}><FormOutlined /> {item.capnhat}</td>
                    </tr>
                  )
                })}
              </tbody>
              <Modal
                title={<h5 style={{ textAlign: 'center', fontFamily: 'Montserrat', color: '#1E0D03',
                fontSize: '24px',fontStyle: 'normal', fontWeight: '700', lineHeight: '30px',
                  marginBottom: '30px' }}> kjansdjkasd Cập nhật thông tin gói vé</h5>}
                centered
                open={modal1Open}
                onCancel={() => setModal1Open(false)}
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
                <div style={{ display: 'flex' }}>
                <Space direction="vertical" style={{marginRight: '10px'}}>
                <DatePicker onChange={onChange} />
                </Space>
                <TimePicker defaultValue={dayjs('00:00:00', 'HH:mm:ss')} />
                <Space direction="vertical" style={{ marginLeft: '10px', marginRight: '10px' }}>
                    <DatePicker onChange={onChange} />
                </Space>
                <TimePicker defaultValue={dayjs('00:00:00', 'HH:mm:ss')} />
                </div>
                </div>
                </div>
                <div className='ttsudung'>
                  <div>
                    <p>Giá vé áp dụng</p>
                  <Checkbox onChange={CheckboxOnChange}>Vé lẻ (vnđ/vé) với giá</Checkbox>
                  <Input placeholder="Giá vé" style={{width: '35%', background: '#F1F4F8'}}/> 
                  <p style={{display: 'inline', marginLeft: '5px', fontWeight: 'normal'}}>/ vé</p>
                  </div>
                 <div style={{marginTop: '10px'}}>
                  <Checkbox onChange={CheckboxOnChange}>Combo vé với giá</Checkbox>
                  <Input placeholder="Giá vé" style={{width: '25%', background: '#F1F4F8'}}/> 
                  <p style={{display: 'inline', marginLeft: '5px', marginRight: '10px', fontWeight: 'normal'}}>/</p> 
                  <Input placeholder="Giá vé" style={{width: '20%', background: '#F1F4F8'}}/> 
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
                            { label: 'Chưa sử dụng', value: 'Chưa sử dụng' },
                            { label: 'Hết hạn', value: 'Hết hạn'},
                          ],
                        },
                      ]}
                    />
                    <p style={{fontFamily: 'Montserrat',fontSize: '12px',fontStyle: 'italic',fontWeight: '400',
                    lineHeight: 'normal'}}>* là thông tin bắt buộc</p>
                 </div>
                <Space wrap style={{ marginTop: '22px', marginLeft: '70px'}}>
                  <Button danger onClick={() => setModal1Open(false)} style={{ width: '160px', height: '40px', fontFamily: 'Montserrat', 
                    fontSize: '18px', fontWeight: '700', lineHeight: '26px', color: '#FF993C'}}>Hủy</Button>
                  <Button danger onClick={() => setModal1Open(false)} style={{ width: '160px', height: '40px', fontFamily: 'Montserrat', 
                    fontSize: '18px', fontWeight: '700', lineHeight: '26px', background: '#FF993C', color: '#FFF'}}>Lưu</Button>
                </Space>
              </Modal>
            </table>
            <div className="direction-components" style={{display: 'flex',justifyContent: 'center'}}>
             <Pagination defaultCurrent={1} total={50} />
            </div>
          </div>

      </div>
      </div>
    </div>
  
  );
};

export default Goidichvu;
