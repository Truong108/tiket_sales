
import '../css/styles.css';
import { useEffect, useState } from "react";
import api from '../firebase/firebaseAPI';
import { collection, getDocs } from "firebase/firestore";
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Space, Modal, DatePicker, Radio, RadioChangeEvent, Checkbox, Row, Col } from 'antd';

import {} from '@ant-design/icons';
import type { DatePickerProps } from 'antd';
import {Pagination} from 'antd';
import type { } from 'antd/es/config-provider';
import { CheckboxValueType } from 'antd/es/checkbox/Group';

interface datafirebase {
  id: string;
  stt: number;
  bookingcode: string;
  tinhtrang: string;
  ngaysudung: string;
  ngayxuatve: string;
  sove: string;
  congcheck: string;
}
function Quanlyve() {
  const [data, setData] = useState<datafirebase[]>([]);
  const [modal2Open, setModal2Open] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(api, "ticket"));
      const fetchedData: datafirebase[] = [];
      querySnapshot.forEach((doc) => {
        fetchedData.push({ id: doc.id, ...doc.data() } as datafirebase);
      });
      setData(fetchedData);
    };
    fetchData();
  }, []);
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };
  const [value, setValue] = useState(1);

  const radioOnChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  const checkboxOnChange = (checkedValues: CheckboxValueType[]) => {
    console.log('checked = ', checkedValues);
  };
  
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data.length);
  const currentData = data.slice(startIndex, endIndex);

  return (
  <div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className='bang' id='bang2'>
          <h1 className='danhsachve'>Danh sách vé</h1>
         
        <div style={{marginTop: '20px', display: 'flex', justifyContent: 'space-between'}}>
          <div className='searchve'>
            <div className='timkiemsove col-auto col-sm-8'>
              <input className="search__input" type="text" placeholder="Search" />
            </div>
          </div>
          <div>
            <Space wrap style={{marginRight: '30px'}}>
              <Button danger onClick={() => setModal2Open(true)} style={{marginTop: '10px'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{marginBottom: '5px'}}>
                  <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke="#FF993C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p style={{display: 'inline', marginLeft: '10px', fontFamily: 'Montserrat',fontSize: '18px',fontStyle: 'normal',
                  fontWeight: '700',lineHeight: '26px', color: '#FF993C'}}>Lọc vé</p>
              </Button>
              <Modal
                title={<h5 style={{ textAlign: 'center', fontFamily: 'Montserrat', color: '#1E0D03',
                fontSize: '24px',fontStyle: 'normal', fontWeight: '700', lineHeight: '30px' }}>Lọc vé</h5>}
                centered
                open={modal2Open}
                onCancel={() => setModal2Open(false)}
                footer={null}
                >
                <div className='tndn'>
                <div className='texttrongloc'>
                  <p className='tungayy'>Từ ngày</p>
                  <p className='denngayy'>Đến ngày</p>
                </div>
                <div className='lichtronglocve'>
                <Space direction="vertical">
                <DatePicker onChange={onChange} />
                </Space>
                <Space direction="vertical" style={{marginLeft:'80px'}}>
                <DatePicker onChange={onChange} />
                </Space>
                </div>
                </div>
                <div className='ttsudung'>
                  <p>Tình trạng sử dụng</p>
                  <Radio.Group onChange={radioOnChange} value={value}>
                    <Radio value={1}>Tất cả</Radio>
                    <Radio style={{ marginLeft: '23px' }} value={2}>Đã sử dụng</Radio>
                    <Radio style={{ marginLeft: '23px' }} value={3}>Chưa sử dụng</Radio>
                    <Radio style={{ marginLeft: '23px' }} value={4}>Hết hạn</Radio>
                  </Radio.Group>
                </div>
                <div className='congcheckin'>
                    <p>Cổng Check-in</p>
                    <Checkbox.Group style={{ width: '100%', marginBottom: '15px' }} onChange={checkboxOnChange}>
                      <Row>
                        <Col span={8}>
                          <Checkbox value="Tất cả">Tất cả</Checkbox>
                        </Col>
                        <Col span={8}>
                          <Checkbox value="Cổng 1">Cổng 1</Checkbox>
                        </Col>
                        <Col span={8}>
                          <Checkbox value="Cổng 2">Cổng 2</Checkbox>
                        </Col>
                        <Col span={8}>
                          <Checkbox value="Cổng 3">Cổng 3</Checkbox>
                        </Col>
                        <Col span={8}>
                          <Checkbox value="Cổng 4">Cổng 4</Checkbox>
                        </Col>
                        <Col span={8}>
                          <Checkbox value="Cổng 5">Cổng 5</Checkbox>
                        </Col>
                      </Row>
                    </Checkbox.Group>
                 </div>
                <Space wrap style={{ marginTop: '22px', justifyContent: 'center' }}>
                  <Button danger onClick={() => setModal2Open(false)} style={{ width: '160px', height: '40px', fontFamily: 'Montserrat', 
                  fontSize: '18px', fontWeight: '700', lineHeight: '26px', marginLeft: '150px', color: '#FF993C'}}>Lọc</Button>
                </Space>
              </Modal>
              <Button danger style={{fontFamily: 'Montserrat',fontSize: '18px',fontStyle: 'normal',
              fontWeight: '700',lineHeight: '26px', marginTop: '10px', color: '#FF993C'}}>Xuất file (.csv)</Button>
            </Space>
          </div>
        </div>
        <div className="content">
            <table className="table tableshow">
              <thead>
                <tr>
                  <th style={{background:"#F1F4F8"}}>STT</th>
                  <th style={{background:"#F1F4F8"}}>Booking code</th>
                  <th style={{background:"#F1F4F8"}}>Số vé</th>
                  <th style={{background:"#F1F4F8"}}>Tình trạng sử dụng </th>
                  <th style={{background:"#F1F4F8"}}>Ngày sử dụng</th>
                  <th style={{background:"#F1F4F8"}}>Ngày xuất vé</th>
                  <th style={{background:"#F1F4F8"}}>Cổng check-in</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item, index) => {
                  let tdstyle = {};
                  if (index % 2 === 1) {
                    tdstyle = { backgroundColor: "#F7F8FB" };
                  }
                  return (
                    <tr key={item.stt}>
                      <td style={tdstyle}>{startIndex + index + 1}</td>
                      <td style={tdstyle}>{item.bookingcode}</td>
                      <td style={tdstyle}>{item.sove}</td>
                      <td style={tdstyle}>{item.tinhtrang}</td>
                      <td style={tdstyle}>{item.ngaysudung}</td>
                      <td style={tdstyle}>{item.ngayxuatve}</td>
                      <td style={tdstyle}>{item.congcheck}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
      </div>
      </div>
    </div>
  
  );
};

export default Quanlyve;
