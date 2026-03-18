import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <section>
      {/* 소개 */}
      <div className="introduction">
        <h1 className="introduction_top">
          <span className="top_color">MORO</span>가 당신만을 위한
          <br />
          똑똑한 가이드가
          <br />
          되어드릴게요!
        </h1>
        <p className="introduction_middle">
          <span className="middle_color">
            실수령액 역계산 · 4대보험 · 주휴수당
          </span>
          을
          <br />
          가장 빠르고 간편하게 계산해보세요
        </p>

        {/* 버튼 */}
        <Link to="/calculator">
          <div className="introduction_bottom">
            <button className="main_btn">계산기 시작하기</button>
          </div>
        </Link>
      </div>

      {/* 아래 섹션 */}
      <div className="business">
        <div className="business_title">
          <h2>사업자등록조회</h2>
          <p>사업자 정보를 빠르게 확인하고 진위 여부를 파악할 수 있습니다</p>
        </div>
        <div className="business_imput"></div>
      </div>

      <div>
        <h2>세무 도서 추천</h2>
        <p>실무에 도움이 되는 도서를 소개합니다</p>
      </div>
    </section>
  );
};

export default Home;
