import { Link } from "react-router-dom";
import "./header.css";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header className="header">
      <div className="Header_left">
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
      </div>
      <nav className="Header_right">
        <ul>
          <li>계산기</li>
          <li>질문</li>
          <li>소통</li>
          <li>일정</li>
          <li>로그인</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
