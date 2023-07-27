import { Button, Pagination, Space } from "antd"
import '../../css/styles.css';
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import api from "../../firebase/firebaseAPI";

interface datafirebase {
    id: string;
    stt: number;
    sove: string;
    tensukien: string;
    ngaysudung: string;
    tenloaive: string;
    congcheckin: string;
    doisoat: string;
  }
const BangdoisoatSukien: React.FC = () => {
    const [filteredData, setFilteredData] = useState<datafirebase[]>([]);
    const [data, setData] = useState<datafirebase[]>([]);
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
    const handlevaluesove = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setLocve(e.target.value)
      }
    const [locve, setLocve] = useState<string>("")
    let fillSoatve: datafirebase[];
    fillSoatve = data.filter((item) => {
      return typeof item.sove === 'string' && item.sove.includes(locve);
    });
    const itemsPerPage = 9;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
    const currentData = filteredData.slice(startIndex, endIndex);
    return ( <>
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
                    <th style={{background:"#F1F4F8"}}>Tên sự kiện</th>
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
                  let doisoatStyle = {}
                  if(item.doisoat ==="Đã đối soát"){
                      doisoatStyle ={color:"#FD5959"}
                  }
                   if(item.doisoat ==="Chưa đối soát"){
                    doisoatStyle={color:"#A5A8B1"}
                   }
                  return (
                    <tr key={item.stt}>
                      <td style={tdstyle}>{index + 1}</td>
                      <td style={tdstyle}>{item.sove}</td>
                      <td style={tdstyle}>{item.tensukien}</td>
                      <td style={tdstyle}>{item.ngaysudung}</td>
                      <td style={tdstyle}>{item.tenloaive}</td>
                      <td style={tdstyle}>{item.congcheckin}</td>
                      <td style={tdstyle}><span style={doisoatStyle}>{item.doisoat}</span></td>
                    </tr>
                  );
                }) : currentData.map((item, index) => {
                  let tdstyle = {};
                  if (index % 2 === 1) {
                    tdstyle = { backgroundColor: "#F7F8FB" };
                  }
                  let doisoatStyle = {}
                  if(item.doisoat ==="Đã đối soát"){
                      doisoatStyle ={color:"#FD5959", fontStyle: 'italic'}
                  }
                   if(item.doisoat ==="Chưa đối soát"){
                    doisoatStyle={color:"#A5A8B1", fontStyle: 'italic'}
                   }
                  return (
                    <tr key={item.stt}>
                      <td style={tdstyle}>{index + 1}</td>
                      <td style={tdstyle}>{item.sove}</td>
                      <td style={tdstyle}>{item.tensukien}</td>
                      <td style={tdstyle}>{item.ngaysudung}</td>
                      <td style={tdstyle}>{item.tenloaive}</td>
                      <td style={tdstyle}>{item.congcheckin}</td>
                      <td style={tdstyle}><span style={doisoatStyle}>{item.doisoat}</span></td>
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
    </> );
}
 
export default BangdoisoatSukien;