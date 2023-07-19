import React, { useEffect, useState } from 'react';
import '../css/styles.css';
import type { DatePickerProps, RadioChangeEvent } from 'antd';
import { Radio, Space, Button, DatePicker, Pagination } from 'antd';
import api from '../firebase/firebaseAPI';
import { collection, getDocs } from "firebase/firestore";

interface datafirebase {
    id: string;
    stt: number;
    sove: string;
    ngaysudung: string;
    tenloaive: string;
    congcheckin: string;
    doisoat: string;
  }
  
  function Doisoatve() {
    const [filteredData, setFilteredData] = useState<datafirebase[]>([]);
    const [data, setData] = useState<datafirebase[]>([]);
    const [value, setValue] = useState<number>(1);
    const [isFiltering, setIsFiltering] = useState(false);
  
    useEffect(() => {
      const fetchData = async () => {
        const querySnapshot = await getDocs(collection(api, "soatve"));
        const fetchedData: datafirebase[] = [];
        querySnapshot.forEach((doc) => {
          fetchedData.push({ id: doc.id, ...doc.data() } as datafirebase);
        });
        setData(fetchedData);
        setFilteredData(fetchedData);
      };
      fetchData();
    }, []);
  
    const datePickerOnChange: DatePickerProps['onChange'] = (date, dateString) => {
      console.log(date, dateString);
    };
  
    const itemsPerPage = 9;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
    const currentData = filteredData.slice(startIndex, endIndex);
  
    const radioOnChange: (e: RadioChangeEvent) => void = (e) => {
      console.log('radio checked', e.target.value);
      setValue(e.target.value);
    };
  
    const handleFilterTickets = () => {
      if (isFiltering) {
        const filteredData = data.filter((ticket) => {
          if (value !== 1) {
            if ((value === 2 && ticket.doisoat !== 'Đã đối soát') || (value === 3 && ticket.doisoat !== 'Chưa đối soát')) {
              return false;
            }
          }
          return true;
        });
        setFilteredData(filteredData);
        setIsFiltering(false);
      }
    };
  
    useEffect(() => {
      handleFilterTickets();
    },);
  
    const handleFilterButtonClick = () => {
      setIsFiltering(true);
    };
    const [locve, setLocve] = useState<string>("")
    const handlevaluesove = (e: React.ChangeEvent<HTMLInputElement>) =>{
      setLocve(e.target.value)
    }
    let fillSoatve: datafirebase[];
    fillSoatve = data.filter((item) => {
      return typeof item.sove === 'string' && item.sove.includes(locve);
    });
  return (
    <div className='ct'> 
        <div className='doisoatve'>
          <div className='bang2' id='bang2'>
            <h1 className='danhsachve'>Đối Soát Vé</h1>
            <div style={{marginTop: '20px', display: 'flex', justifyContent: 'space-between'}}>
            <div className='searchve'>
              <div className='timkiemsove col-auto col-sm-8'>
                <input className="search__input" type="text" placeholder="Tìm bằng số vé" onChange={handlevaluesove}/>
              </div>
            </div>
            <div>
              <Space wrap style={{marginRight: '30px'}}>
                <Button type="primary" danger style={{fontFamily: 'Montserrat',
                fontSize: '18px',fontStyle: 'normal',
                fontWeight: '700',lineHeight: '26px', 
                width: '157px', height: '42px',
                marginTop: '10px', backgroundColor:"#FF993C"}}>
                  Chốt đối soát 
                </Button>
              </Space>
            </div>
          </div>
          <div className="contect">
              <table className="table bangshow">
                <thead>
                  <tr>
                    <th style={{background:"#F1F4F8"}}>STT</th>
                    <th style={{background:"#F1F4F8"}}>Số vé</th>
                    <th style={{background:"#F1F4F8"}}>Ngày sử dụng</th>
                    <th style={{background:"#F1F4F8"}}>Tên loại vé</th>
                    <th style={{background:"#F1F4F8"}}>Cổng check-in</th>
                    <th style={{background:"#F1F4F8"}}></th>
                  </tr>
                </thead>
                <tbody>
                {locve ? fillSoatve.map((item, index) => {
                  let tdstyle = {};
                  if (index % 2 === 1) {
                    tdstyle = { backgroundColor: "#F7F8FB" };
                  }
                  return (
                    <tr key={item.stt}>
                      <td style={tdstyle}>{index + 1}</td>
                      <td style={tdstyle}>{item.sove}</td>
                      <td style={tdstyle}>{item.ngaysudung}</td>
                      <td style={tdstyle}>{item.tenloaive}</td>
                      <td style={tdstyle}>{item.congcheckin}</td>
                      <td style={tdstyle}>{item.doisoat}</td>
                    </tr>
                  );
                }) : currentData.map((item, index) => {
                  let tdstyle = {};
                  if (index % 2 === 1) {
                    tdstyle = { backgroundColor: "#F7F8FB" };
                  }
                  return (
                    <tr key={item.stt}>
                      <td style={tdstyle}>{index + 1}</td>
                      <td style={tdstyle}>{item.sove}</td>
                      <td style={tdstyle}>{item.ngaysudung}</td>
                      <td style={tdstyle}>{item.tenloaive}</td>
                      <td style={tdstyle}>{item.congcheckin}</td>
                      <td style={tdstyle}>{item.doisoat}</td>
                    </tr>
                  );
                })
              }
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
        <div className='bang3' id='bang3'>
        <h1 className='danhsachve'>Lọc vé</h1>
          <div style={{ display: 'flex', marginTop: '-30px' }}>
           <p style={{ marginRight: '10px', marginTop: '60px', marginLeft: '20px', whiteSpace: 'nowrap',
            fontFamily: 'Montserrat', fontSize: '16px', fontStyle: 'normal',fontWeight: '600',
            lineHeight: '26px'}}>Tình trạng đối soát</p>
           <div className='radio'>
           <Radio.Group onChange={radioOnChange} value={value}>
            <Space direction="vertical">
              <Radio value={1}>Tất cả</Radio>
              <Radio value={2}>Đã đối soát</Radio>
              <Radio value={3} style={{whiteSpace: 'nowrap'}}>Chưa đối soát</Radio>
            </Space>
          </Radio.Group>
           </div>
          </div>
          <div className='loaive'>
            <p className='lv'>Loại vé</p>
            <p className='vc'>Vé cổng</p>
           </div>
           <div className='tungay'>
            <p className='tn'>Từ ngày</p>
            <Space direction="vertical" style={{marginLeft: '100px', marginTop: '22px'}}>
            <DatePicker onChange={datePickerOnChange} />
             </Space>
           </div>
           <div className='denngay'>
            <p className='dn'>Đến ngày</p>
            <Space direction="vertical" style={{marginLeft: '86px', marginTop: '22px'}}>
            <DatePicker onChange={datePickerOnChange} />
             </Space>
           </div>
           <Space wrap style={{ marginTop: '22px', justifyContent: 'center' }}>
            <Button danger onClick={handleFilterButtonClick} style={{ width: '160px', 
            height: '40px', fontFamily: 'Montserrat', 
            fontSize: '18px', fontWeight: '700', 
            lineHeight: '26px', color: '#FF993C' }}>Lọc</Button>
        </Space>
        </div>
        </div>  
      </div>
    
    );
  };
export default Doisoatve;
