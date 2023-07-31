import { Button, Select, Space } from "antd";
import { useState } from "react";
import '../css/styles.css';
import '../css/selectdoisoat.css';
import BangDoisoatve from "./Doisoat/BangDoisoatGiadinh";
import BangdoisoatSukien from "./Doisoat/BangdoisoatSukien";
import { CalendarDateValue } from "./Calendar/CalendarDoisoat";

function Doisoatve() {
    const [isSelected, setSelected] = useState(true);
    const [hienthi, setHienthi] = useState<boolean>(false);
    const [beginDate, setBeginDate] = useState<string>(" ")
    const [endDate, setEndDate] = useState<string | null>(null)
    const [valueTinhtrang, setValueTinhtrang] = useState<string>("Tất cả");
    const [onfillter, setOnfillter] = useState<string>("Tất cả");
    const handleValueTinhtrang = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValueTinhtrang(e.target.value);
    };
  
    const handleFilter = () => {
      setOnfillter(valueTinhtrang);
    };
    const handleButtonClick1 = () => {
      setSelected(true);
      setHienthi(false);
    };
  
    const handleButtonClick2 = () => {
      setSelected(false);
      setHienthi(true);
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
      {isSelected ? <BangDoisoatve 
      onfillter={onfillter} 
      sinceday={beginDate} 
      todate={endDate}/> 
      : <BangdoisoatSukien 
      onfillter={onfillter} 
      sinceday={beginDate} 
      todate={endDate}/> }
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
      <div style={{ 
        display: 'flex', 
        marginTop: '-30px' }}>
       <p style={{ 
        marginRight: '10px', 
        marginTop: '60px', 
        marginLeft: '20px', 
        whiteSpace: 'nowrap',
        fontFamily: 'Montserrat', 
        fontSize: '16px', 
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: '26px'}}>Tình trạng đối soát</p>
        <div className="" style={{marginTop:'60px', marginLeft:'30px'}}>
                <div
                  className=""
                  style={{ alignItems: "center", display: "flex", gap: "10px" }}
                >
                  <input
                    type="radio"
                    checked={valueTinhtrang === "Tất cả"}
                    value="Tất cả"
                    onChange={handleValueTinhtrang}
                  />{" "}
                  <span>Tất cả</span>
                </div>
                <div
                  className=""
                  style={{
                    alignItems: "center",
                    display: "flex",
                    gap: "10px",
                    marginTop: "5px",
                  }}
                >
                  <input
                    type="radio"
                    checked={valueTinhtrang === "Đã đối soát"}
                    value="Đã đối soát"
                    onChange={handleValueTinhtrang}
                    style={{backgroundColor: 'blue'}}
                  />{" "}
                  <span>Đã đối soát</span>
                </div>
                <div
                  className=""
                  style={{
                    alignItems: "center",
                    display: "flex",
                    gap: "10px",
                    marginTop: "5px",
                  }}
                >
                  <input
                    type="radio"
                    checked={valueTinhtrang === "Chưa đối soát"}
                    value="Chưa đối soát"
                    onChange={handleValueTinhtrang}
                  />{" "}
                  <span>Chưa đối soát</span>
                </div>
              </div>
            </div>
      <div className='loaive'>
        <p className='lv'>Loại vé</p>
        <p className='vc'>Vé cổng</p>
       </div>
       <div className='tungay'>
        <p className='tn'>Từ ngày</p>
        <Space direction="vertical" style={{marginLeft: '125px', marginTop: '22px'}}>
        <CalendarDateValue onDateChange={setBeginDate} />
         </Space>
       </div>
       <div className='denngay'>
        <p className='dn'>Đến ngày</p>
        <Space direction="vertical" style={{marginLeft: '110px', marginTop: '22px'}}>
        <CalendarDateValue onDateChange={setEndDate} />
         </Space>
       </div>
       <Space wrap style={{ marginTop: '22px', justifyContent: 'center' }}>
        <Button danger onClick={handleFilter} style={{ width: '160px', 
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