import { Button, DatePicker, Radio, Select, Space } from "antd";
import { useState } from "react";
import '../css/styles.css';
import '../css/selectdoisoat.css';
import BangDoisoatve from "./Doisoat/BangDoisoatve";
import BangdoisoatSukien from "./Doisoat/BangdoisoatSukien";

function Doisoatve() {
    const [isSelected, setSelected] = useState(true);
    const [hienthi, setHienthi] = useState<boolean>(false);
  
    const handleButtonClick1 = () => {
      setSelected(true);
      setHienthi(false);
    };
  
    const handleButtonClick2 = () => {
      setSelected(false);
      setHienthi(true);
    };
     const radioOnChange = (e: any) => {
    };
    return ( 
    <div className='ct'> 
    <div className='doisoatve'>
      <div className='bang2' id='bang2'>
        <h1 className='danhsachve'>Đối Soát Vé</h1>
        <div className='doisoatve'>
        <div className='textButton'>
        <button 
          className={isSelected ? "active" : ""}
          onClick={handleButtonClick1} 
        >
          Gói vé gia đình
        </button>
        <button 
        className={isSelected ? "" : "active"}
          onClick={handleButtonClick2}
        >
          Gói vé sự kiện
        </button>
        </div>
        </div>
      {isSelected ? <BangDoisoatve/>: <BangdoisoatSukien />}
    </div>
    <div className='bang3' id='bang3'>
    <h1 className='danhsachve'>Lọc vé</h1>
      {hienthi && (
        <Select
          defaultValue="Hội chợ triển lãm tiêu dùng 2021"
          options={[
            {
              label: "Hội chợ triển lãm tiêu dùng 2021",
              value: "Hội chợ triển lãm tiêu dùng 2021",
            },
          ]}
          className="custom-select"
        />
      )}
      <div style={{ display: 'flex', marginTop: '-30px' }}>
       <p style={{ marginRight: '10px', marginTop: '60px', marginLeft: '20px', whiteSpace: 'nowrap',
        fontFamily: 'Montserrat', fontSize: '16px', fontStyle: 'normal',fontWeight: '600',
        lineHeight: '26px'}}>Tình trạng đối soát</p>
       <div className='radio'>
       <Radio.Group onChange={radioOnChange}>
       <Space direction="vertical">
       <Radio value={1}>Tất cả</Radio>
       <Radio value={2}>Đã đối soát</Radio>
       <Radio value={3} style={{ whiteSpace: 'nowrap' }}>
       Chưa đối soát
       </Radio>
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
        <Space direction="vertical" style={{marginLeft: '110px', marginTop: '22px'}}>
        <DatePicker  />
         </Space>
       </div>
       <div className='denngay'>
        <p className='dn'>Đến ngày</p>
        <Space direction="vertical" style={{marginLeft: '98px', marginTop: '22px'}}>
        <DatePicker  />
         </Space>
       </div>
       <Space wrap style={{ marginTop: '22px', justifyContent: 'center' }}>
        <Button danger  style={{ width: '160px', 
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