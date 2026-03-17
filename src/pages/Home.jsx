import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section>
      {/* 소개 */}
      <div>
        <h1>세무를 쉽게, 한 번에 확인하세요</h1>
        <p>복잡한 세무 계산을 빠르게 해결할 수 있습니다.</p>

        {/* 버튼 */}
        <Link to="/calculator">
          <button>계산기 바로가기</button>
        </Link>
      </div>

      {/* 아래 섹션 */}
      <div>
        <h2>사업자등록조회</h2>
        <p>사업자 상태를 확인해보세요</p>
      </div>

      <div>
        <h2>세무 도서 추천</h2>
        <p>입문자를 위한 도서</p>
      </div>
    </section>
  );
};

export default Home;
