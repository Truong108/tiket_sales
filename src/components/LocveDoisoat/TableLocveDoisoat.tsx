// import { Button, DatePicker, DatePickerProps, Radio, RadioChangeEvent, Space } from 'antd';
// import '../../css/styles.css';
// import { useEffect, useState } from 'react';
// import api from '../../firebase/firebaseAPI';
// import { collection, getDocs } from "firebase/firestore";
// import Doisoatve from '../Doisoatve';
 
// interface datafirebase {
//     id: string;
//     stt: number;
//     sove: string;
//     tensukien: string;
//     ngaysudung: string;
//     tenloaive: string;
//     congcheckin: string;
//     doisoat: string;
//   }
  
// const TableLocveDoisoat = () => {
//     const [data, setData] = useState<datafirebase[]>([]);
//     const [value, setValue] = useState<number>(1);
//     const [isFiltering, setIsFiltering] = useState(false);
//     const [filteredData, setFilteredData] = useState<datafirebase[]>([]);
//     const currentData = filteredData.slice(startIndex, endIndex);
//     useEffect(() => {
//         const fetchData = async () => {
//           const querySnapshot = await getDocs(collection(api, "soatve"));
//           const fetchedData: datafirebase[] = [];
//           querySnapshot.forEach((doc) => {
//             fetchedData.push({ id: doc.id, ...doc.data() } as datafirebase);
//           });
//           setData(fetchedData);
//           setFilteredData(fetchedData);
//         };
//         fetchData();
//       }, []);
//     const radioOnChange: (e: RadioChangeEvent) => void = (e) => {
//         console.log('radio checked', e.target.value);
//         setValue(e.target.value);
//       };
//     const datePickerOnChange: DatePickerProps['onChange'] = (date, dateString) => {
//         console.log(date, dateString);
//       };
//     const handleFilterTickets = () => {
//         if (isFiltering) {
//           const filteredData = data.filter((ticket) => {
//             if (value !== 1) {
//               if ((value === 2 && ticket.doisoat !== 'Đã đối soát') || (value === 3 && ticket.doisoat !== 'Chưa đối soát')) {
//                 return false;
//               }
//             }
//             return true;
//           });
//           setFilteredData(filteredData);
//           setIsFiltering(false);
//         }
//       };
//       useEffect(() => {
//         handleFilterTickets();
//       },);
//     const handleFilterButtonClick = () => {
//         setIsFiltering(true);
//       };
//     return ( <>
//         <Doisoatve/>
//         <div className='bang3' id='bang3'>
//         <h1 className='danhsachve'>Lọc vé</h1>
//           <div style={{ display: 'flex', marginTop: '-30px' }}>
//            <p style={{ marginRight: '10px', marginTop: '60px', marginLeft: '20px', whiteSpace: 'nowrap',
//             fontFamily: 'Montserrat', fontSize: '16px', fontStyle: 'normal',fontWeight: '600',
//             lineHeight: '26px'}}>Tình trạng đối soát</p>
//            <div className='radio'>
//            <Radio.Group onChange={radioOnChange} value={value}>
//             <Space direction="vertical">
//               <Radio value={1}>Tất cả</Radio>
//               <Radio value={2}>Đã đối soát</Radio>
//               <Radio value={3} style={{whiteSpace: 'nowrap'}}>Chưa đối soát</Radio>
//             </Space>
//           </Radio.Group>
//            </div>
//           </div>
//           <div className='loaive'>
//             <p className='lv'>Loại vé</p>
//             <p className='vc'>Vé cổng</p>
//            </div>
//            <div className='tungay'>
//             <p className='tn'>Từ ngày</p>
//             <Space direction="vertical" style={{marginLeft: '100px', marginTop: '22px'}}>
//             <DatePicker onChange={datePickerOnChange} />
//              </Space>
//            </div>
//            <div className='denngay'>
//             <p className='dn'>Đến ngày</p>
//             <Space direction="vertical" style={{marginLeft: '86px', marginTop: '22px'}}>
//             <DatePicker onChange={datePickerOnChange} />
//              </Space>
//            </div>
//            <Space wrap style={{ marginTop: '22px', justifyContent: 'center' }}>
//             <Button danger onClick={handleFilterButtonClick} style={{ width: '160px', 
//             height: '40px', fontFamily: 'Montserrat', 
//             fontSize: '18px', fontWeight: '700', 
//             lineHeight: '26px', color: '#FF993C' }}>Lọc</Button>
//         </Space>
//         </div>
//     </> );
// }
 
// export default TableLocveDoisoat;
export{}