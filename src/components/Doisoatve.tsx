import { useState } from 'react';
import '../css/styles.css';
import BangDoisoatve from './Doisoat/BangDoisoatve';
import LoveDoisoat from './Doisoat/LocveDoisoat';
import BangdoisoatSukien from './Doisoat/BangdoisoatSukien';
  
  function Doisoatve() {
    const [isSelected, setSelected] = useState(true);
    const [hienthi, setHienthi] = useState<boolean>(true);
    const handleButtonClick1 = () => {
      setSelected(true)
      setHienthi(true)
    };
    const handleButtonClick2= () =>{
      setSelected(false)
      setHienthi(false)
    }
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
         <LoveDoisoat label={hienthi}/>
        </div>  
      </div>
    
    );
  };
export default Doisoatve;
