import { Col, DatePicker, Row, Typography } from 'antd';
import '../css/styles.css';
import LineChartComponent from './Chartjs/LineChartComponent';
import { Chart, registerables } from 'chart.js';
import ChartDoughnut from './Chartjs/ChartDoughnut';
import { CalendarOutlined } from "@ant-design/icons";
import ChartDoughnut2 from './Chartjs/ChartDoughnut2';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import api from '../firebase/firebaseAPI';
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
}

function Home() {
  const [data, setData] = useState<DataFirebase[]>([]);
  const [filteredData, setFilteredData] = useState<DataFirebase[]>([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(api, "ticket"));
    const fetchedData: DataFirebase[] = [];
    querySnapshot.forEach((doc) => {
      fetchedData.push({ id: doc.id, ...doc.data() } as DataFirebase);
    });
    setData(fetchedData);
    setFilteredData(fetchedData);
    setIsDataFetched(true);
  };

  useEffect(() => {
    if (!isDataFetched) {
      fetchData();
    }
  }, [isDataFetched]);

  const unUse = data.filter(item => item.tinhtrang === "Chưa sử dụng")
  const haveUse = data.filter(item => item.tinhtrang === "Đã sử dụng")

  const { Title } = Typography;
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
              <ChartDoughnut unUse={unUse.length} haveUse={haveUse.length} />
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
              <ChartDoughnut2 />
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
