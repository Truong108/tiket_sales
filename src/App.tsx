import { Routes, Route} from 'react-router-dom'
import imageSrc from './assets/insight-051.png';
import meIcon from './assets/Frame 54.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Home from './components/Home';
import Quanlyve from './components/Quanlyve';
import Doisoatve from './components/Doisoatve';
import Goidichvu from './components/Goidichvu';
import { BellOutlined, MailOutlined } from '@ant-design/icons';
import Menu from './components/Menu/menu-tab';


const App = () => {
  return (
    <div className="container-fluid" style={{background: '#F9F6F4'}}>
    <div className="row">
      <div className="col-3" style={{width: '173px', height: '78px'}}>
        <div className="p-3">
        <img src={imageSrc} alt="insight"/>
        </div>
      </div>
      <div className="col-6" >
        <div className="container text-center" style={{margin: '20px', marginLeft: '-1px'}}>
          <div className="row" style={{marginLeft: '10%'}}>
            <div className="col-auto col-sm-3">
            <input className="search__input" type="text" placeholder="Search" />
            </div>
          </div>
        </div>
      </div>
      <div className="col-3" style={{marginLeft: '245px', marginTop: '14px'}}>
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
     <Menu />
       <div className="col-10">
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/quan-li-ve' element={<Quanlyve/>}/>
        <Route path='/doi-soat-ve' element={<Doisoatve/>}/>
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