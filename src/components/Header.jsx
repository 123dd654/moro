import { Link } from "react-router-dom";
import "./header.css";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header className="header">
      <div className="header_inner">
        <div className="Header_left">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <nav className="Header_right">
          <ul>
            <li className="menu_item">
              <Link to="/calculator" className="menu_link">
                계산기
              </Link>
            </li>
            <li className="Impossible_item">
              질문
              <span className="tooltip_text">개발중</span>
            </li>
            <li className="Impossible_item">
              소통<span className="tooltip_text">개발중</span>
            </li>
            <li className="Impossible_item">
              일정<span className="tooltip_text">개발중</span>
            </li>
            <li className="Impossible_item">
              로그인<span className="tooltip_text">개발중</span>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
