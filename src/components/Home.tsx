/* eslint-disable array-callback-return */
import { Col, DatePicker, Row, Typography } from 'antd';
import '../css/styles.css';
import LineChartComponent from './Chartjs/LineChartComponent';
import { Chart, registerables } from 'chart.js';
import ChartDoughnut from './Chartjs/ChartDoughnut';
import { CalendarOutlined } from "@ant-design/icons";
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import api from '../firebase/firebaseAPI';
import dayjs from 'dayjs';
Chart.register(...registerables);
interface DataFirebase {
  id: string;
  stt: number;
  bookingcode: string;
  tinhtrang: string;
  ngaysudung: string;
  ngayxuatve: string;
  sove: string;
  congcheck: string;
  giave: number;
  giav: number;
  datesudung:string;
  ttrang:string;
}
function Home() {
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [dataGiadinh, setDataGiadinh] = useState<DataFirebase[]>([]);
  const [dataSukien, setDataSukien] = useState<DataFirebase[]>([]);

  const fetchData1 = async () => {
    const querySnapshot = await getDocs(collection(api, "ticket"));
    const fetchedData: DataFirebase[] = [];
    querySnapshot.forEach((doc) => {
      fetchedData.push({ id: doc.id, ...doc.data() } as DataFirebase);
    });
    setDataGiadinh(fetchedData);
    setIsDataFetched(true);
  };
  const fetchData2 = async () => {
    const querySnapshot = await getDocs(collection(api, "ticket2"));
    const fetchedData: DataFirebase[] = [];
    querySnapshot.forEach((doc) => {
      fetchedData.push({ id: doc.id, ...doc.data() } as DataFirebase);
    });
    setDataSukien(fetchedData);
    setIsDataFetched(true);
  };

  useEffect(() => {
    if (!isDataFetched) {
      fetchData1();
      fetchData2();
    }
  }, [isDataFetched]);
  const defaultValue = dayjs().startOf('month').format('M');
  const [valueMonth, setValueMonth] = useState<dayjs.Dayjs>(dayjs(defaultValue));
  const { Title } = Typography;
  const handleChangeMonth = (month: any) =>{
      setValueMonth(month)
  }
  let totalVedasudungGiadinh = 0
  let totalVechuasudungGiadinh = 0
  let totalVedasudungSukien = 0
  let totalVechuasudungSukien = 0
  dataGiadinh.map((item) => {
      let month = Number(valueMonth?.format("M"))
      let monthValue = Number(item.ngaysudung.split("/")[1]) 
      if(month === monthValue){
        if(item.tinhtrang === "Đã sử dụng"){
          totalVedasudungGiadinh += item.giave
        }
        else if(item.tinhtrang === "Chưa sử dụng"){
          totalVechuasudungGiadinh += item.giave
        };
      };
  })
  dataSukien.map((item) => {
    let month = Number(valueMonth?.format("M"))
    let monthValue = Number(item.datesudung.split("/")[1]) 
    if(month === monthValue){
      if(item.ttrang === "Đã sử dụng"){
        totalVedasudungSukien += item.giav
      }
      else if(item.ttrang === "Chưa sử dụng"){
        totalVechuasudungSukien += item.giav
      }
    }
  })
  return (
  <div className='ct'>
  <div style={{ display: 'flex'}}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className='bang' id='bang1'>
          <h1 className='thongke'>Thống Kê</h1>
          <div style={{marginTop: '-30px'}}>
          <div className='doanhthu'>
            <p className='textdt'>Doanh Thu</p>
          </div>
          <Col span={12} style={{ textAlign: "end", marginLeft: 600, marginBottom: 30 }}>
            <DatePicker
              picker='month'
              suffixIcon={<CalendarOutlined />}
              format="MM-YYYY"
            />
          </Col>
          <Row style={{ marginBottom: "10px" }}>
          <Col span={24}>
            <LineChartComponent />
          </Col>
        </Row>
          </div>
          <div className='tongdanhthu'>
            <p>Tổng Doanh Thu Theo Tuần</p>
          </div>
          <div className='sotien'>
            <p className='sotien-text'>525.145.000 </p>
            <span className='dongtien'>đồng</span>
          </div>
          <Row>
          <Col span={6} style={{ padding: 15, marginTop: 30, marginLeft: 10 }}>
            <DatePicker
              onChange={handleChangeMonth}
              picker='month'
              suffixIcon={<CalendarOutlined />}
              format="MM-YYYY"
            />
          </Col>
          <Col span={6}>
            <div
              style={{ width: "250px", height: "240px", textAlign: "center" }}
            >
              <Title
                style={{
                  fontSize: 15,
                  margin: 0,
                  marginRight: 15,
                  marginBottom: 10,
                }}
              >
                Gói gia đình
              </Title>
              <ChartDoughnut unUse={totalVedasudungGiadinh} haveUse={totalVechuasudungGiadinh} />
            </div>
          </Col>
          <Col span={6}>
            <div
              style={{ width: "250px", height: "240px", textAlign: "center" }}
            >
              <Title
                style={{
                  fontSize: 15,
                  margin: 0,
                  marginRight: 15,
                  marginBottom: 10,
                }}
              >
                Gói sự kiện
              </Title>
              <ChartDoughnut  unUse={totalVedasudungSukien} haveUse={totalVechuasudungSukien}/>
            </div>
          </Col>
         <Col className='colorss'>
         <div className='mau'>
              <div className='mau1'></div>
              <p className='ve1'>Vé đã sử dụng</p>
            </div>
            <div className='mau'>
              <div className='mau2'></div>
              <p className='ve2'>Vé chưa sử dụng</p>
            </div>
         </Col>
        </Row>
        </div>
      </div>
      </div>  
    </div>
  );
};

export default Home;
