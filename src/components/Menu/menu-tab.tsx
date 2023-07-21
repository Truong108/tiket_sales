import { useState } from "react";
import { NavLink } from "react-router-dom";
import '../../css/menu.css';

const Menu = () => {
    const [activeItem, setActiveItem] = useState<string>("home");
  const handleTabClick = (tabName: string) => {
    setActiveItem(tabName);
  };
    return (
        <div className="menu-tab">
        <div className="frame">
          <NavLink to="/"  className="nav-link">
          <li
            className={activeItem === "home" ? "active" : ""}
            onClick={() => handleTabClick("home")}
          >
            <i className="bi bi-house-door"></i> <span>Trang chủ</span>
          </li>
          </NavLink>
          <NavLink to="/quan-li-ve" className="nav-link">
          <li
            className={activeItem === "ticket" ? "active" : ""}
            onClick={() => handleTabClick("ticket")}
          >
            <i className="bi bi-ticket-perforated"></i> <span>Quản lý vé</span>
          </li>
          </NavLink>
          <NavLink to="/doi-soat-ve"  className="nav-link">
          <li
            className={activeItem === "settlement" ? "active" : ""}
            onClick={() => handleTabClick("settlement")}
          >
            <i className="bi bi-file-earmark-text"></i>
            <span>Đối soát vé</span>
          </li>
          </NavLink>
          <li className={activeItem === "setting" ? "active" : ""}>
            <i className="bi bi-gear"></i>
            <span>Cài đặt</span>
          </li>
          <NavLink to="/goi-dich-vu" className="nav-link">
          <li onClick={() => handleTabClick("setting")}>
            <span style={{marginLeft:"80px" }}>Gói dịch vụ</span>
          </li>
          </NavLink>
        </div>
      </div>
    );
  };
  
  export default Menu;