import '../css/styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import type { } from 'antd/es/config-provider';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import ModalGoidichvu from './Modal/ModalGoidichvu';
dayjs.extend(customParseFormat)

function Goidichvu() {
      const [isSelected1, setSelected1] = useState(false);
      const [isSelected2, setSelected2] = useState(false);
      const [isFirstLoad, setFirstLoad] = useState(true);
    
        useEffect(() => {
          if (isFirstLoad) {
            setSelected1(true); 
            setFirstLoad(false); 
          }
        }, [isFirstLoad]);
        const handleButtonClick1 = () => {
          setSelected1(true);
          setSelected2(false);
        };
      
        const handleButtonClick2 = () => {
          setSelected1(false);
          setSelected2(true);
        };
    return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className='bang4' id='bang4'>
          <h1 className='danhsachgoive'>Danh sách gói vé</h1>
          <div>
          <div className='textButton'>
            <button 
              style={{
                border: '0',
                background: 'white',
                color: isSelected1 ? '#FF993C' : 'black', 
                borderBottom: isSelected1 ? '4px solid #FF993C' : '4px solid transparent',
                cursor: 'pointer',
                transition: 'color 0.3s, border-bottom 0.3s',
              }}
              onClick={handleButtonClick1} 
            >
              Gói vé gia đình
            </button>
            <button 
              style={{
                border: '0',
                background: 'white',
                color: isSelected2 ? '#FF993C' : 'black', 
                borderBottom: isSelected2 ? '4px solid #FF993C' : '4px solid transparent',
                cursor: 'pointer',
                transition: 'color 0.3s, border-bottom 0.3s',
              }}
              onClick={handleButtonClick2}
            >
              Gói vé sự kiện
            </button>
            </div>
            {/* {isSelected1 ? <TableVegiadinh /> : <TableVeSuKien />} */}
          </div>
           <ModalGoidichvu/>
      </div>
      </div>
    </div>
  );
};

export default Goidichvu;
