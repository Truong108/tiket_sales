import { Routes, Route} from 'react-router-dom'
import imageSrc from './assets/insight-051.png';
import homeIcon from './assets/u_home-alt.png'; 
import veIcon from './assets/u_ticket.png'; 
import doisoatveIcon from './assets/u_invoice.png'; 
import sukienIcon from './assets/u_list-ul.png'; 
import thietbiIcon from './assets/u_monitor.png'; 
import caidatIcon from './assets/u_setting.png';
import meIcon from './assets/Frame 54.png';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Home from './components/Home';
import Quanlyve from './components/Quanlyve';
import Doisoatve from './components/Doisoatve';
import Goidichvu from './components/Goidichvu';
import { BellOutlined, MailOutlined } from '@ant-design/icons';
// import Danhsachsukien from './components/Danhsachsukien';

const App = () => {
  return (
    <div className="container-fluid" style={{background: '#F9F6F4'}}>
    <div className="row">
      <div className="col-3" style={{width: '173px', height: '78px'}}>
        <div className="p-3">
        <img src={imageSrc} alt="insight"/>
        </div>
      </div>
      <div className="col-6">
        <div className="p-3">
        <div className="container text-center">
          <div className="row" style={{marginLeft: '10%'}}>
            <div className="col-auto col-sm-3">
            <input className="search__input" type="text" placeholder="Search" />
            </div>
          </div>
        </div>
        </div>
      </div>
      <div className="col-3" style={{marginLeft: '220px'}}>
        <div className="p-3 ">
        <div className="row justify-content-end">
            <div className="col-2" style={{fontSize: '27px'}}>
            <MailOutlined />
            </div>
            <div className="col-2" style={{fontSize: '27px'}}>
            <BellOutlined />
            </div>
            <div className="col-2">
            <img className='meImg' src={meIcon} alt="Search Icon"  />
            </div>
          </div>
        </div>
      </div>
      <div className="col-2">
        <div className="p-3">
        <ul className="custom-list">
        <li>
          <img src={homeIcon} alt="Home" />
          <a href="/">Trang chủ</a>
        </li>
        <li>
          <img src={veIcon} alt="quanli" />
          <a href="/quan-li-ve">Quản lí vé</a>
        </li>
        <li>
          <img src={doisoatveIcon} alt="doisoat" />
          <a href="/doi-soat-ve">Đối soát vé</a>
        </li>
        <li>
          <img src={sukienIcon} alt="danhsach" />
          <a href="/danh-sach-su-kien">Danh sách sự kiện</a>
        </li>
        <li>
          <img src={thietbiIcon} alt="quanlithietbi" />
          <a href="/quan-li-thiet-bi">Quản lí thiết bị</a>
        </li>
        <li style={{ cursor: 'pointer', marginBottom: '20px', whiteSpace:'nowrap'}}>
            <img src={caidatIcon} alt="caidat" />
            <a href="/goi-dich-vu">Cài đặt</a>
          </li>
            <ul style={{ listStyle: 'none', paddingLeft: '50px', marginTop: '35px'}}>
              <li>
                <a href="/goi-dich-vu" >Gói dịch vụ</a>
              </li>
            </ul>
        </ul>
        </div>
      </div>
       <div className="col-10">
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/quan-li-ve' element={<Quanlyve/>}/>
        <Route path='/doi-soat-ve' element={<Doisoatve/>}/>
        {/* <Route path='/danh-sach-su-kien' element={<Danhsachsukien/>}/> */}
        {/* <Route path='/quan-li-thiet-bi' element={< />}/> */}
        <Route path='/goi-dich-vu' element={<Goidichvu/>}/>
        </Routes>
        </div>
    </div>
    <div className="footer">
            <p className='ft1'>Copyright</p>
            <p className='ft2'>©</p>
            <p className='ft3'>2020 Alta Software</p>
      </div>
  </div>
  );
};

export default App;