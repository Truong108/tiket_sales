import { Button, DatePicker, DatePickerProps, Radio, RadioChangeEvent, Select, Space } from "antd";
import { useState } from "react";
import '../../css/styles.css';
import '../../css/selectdoisoat.css';
interface locveProps{
  label: boolean;
}
const LoveDoisoat = (props:locveProps) => {
    const [value, setValue] = useState<number>(1);
    const datePickerOnChange: DatePickerProps['onChange'] = (date, dateString) => {
      console.log(date, dateString);
    };
    const radioOnChange: (e: RadioChangeEvent) => void = (e) => {
      console.log('radio checked', e.target.value);
      setValue(e.target.value);
    };
    return ( <>
    <div className='bang3' id='bang3'>
        <h1 className='danhsachve'>Lọc vé</h1>
        {props.label ? "" :
        <Select
          defaultValue="Hội chợ triển lãm tiêu dùng 2021"
          options={[
            {
              label: "Hội chợ triển lãm tiêu dùng 2021"
            },
          ]}
          className="custom-select"
        />}
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
            <Space direction="vertical" style={{marginLeft: '110px', marginTop: '22px'}}>
            <DatePicker onChange={datePickerOnChange} />
             </Space>
           </div>
           <div className='denngay'>
            <p className='dn'>Đến ngày</p>
            <Space direction="vertical" style={{marginLeft: '98px', marginTop: '22px'}}>
            <DatePicker onChange={datePickerOnChange} />
             </Space>
           </div>
           <Space wrap style={{ marginTop: '22px', justifyContent: 'center' }}>
            <Button danger  style={{ width: '160px', 
            height: '40px', fontFamily: 'Montserrat', 
            fontSize: '18px', fontWeight: '700', 
            lineHeight: '26px', color: '#FF993C' }}>Lọc</Button>
        </Space>
        </div>
    </> );
}
 
export default LoveDoisoat;