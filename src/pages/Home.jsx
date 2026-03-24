import { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import {
  Search,
  FileText,
  Info,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ChevronsDown,
} from "lucide-react";
import { booksDummy } from "../data/booksDummy";

const Home = () => {
  const [index, setIndex] = useState(0);

  const cardWidth = 280; // 카드 260 + gap 20
  const visibleCount = 4;
  const maxIndex = Math.max(0, booksDummy.length - visibleCount);

  const handlePrev = () => {
    setIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const businessData = {
    companyName: "-",
    ceoName: "-",
    businessNumber: "-",
    businessType: "-",
    businessCategory: "-",
    address: "-",
    openDate: "-",
    status: "-",
    taxType: "-",
    closeDate: "-",
  };

  const rows = [
    { label: "상호명", value: businessData.companyName },
    { label: "대표자명", value: businessData.ceoName },
    { label: "사업자등록번호", value: businessData.businessNumber },
    { label: "사업자 유형", value: businessData.businessType },
    { label: "업태 / 종목", value: businessData.businessCategory },
    { label: "사업장 주소", value: businessData.address },
    { label: "개업일자", value: businessData.openDate },
    { label: "사업자 상태", value: businessData.status, isBadge: true },
    { label: "과세 유형", value: businessData.taxType },
    { label: "폐업일자", value: businessData.closeDate },
  ];

  return (
    <section>
      {/* 소개 */}
      <div className="introduction">
        <h1 className="introduction_top">
          <span className="top_color">
            MOR
            <img src="/logo2.svg" width={28} />
          </span>
          가 당신만을 위한
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

        <Link to="/calculator" className="no_style_link">
          <div className="introduction_bottom">
            <button className="main_btn">계산기 시작하기</button>
          </div>
        </Link>
        <div className="scroll">
          <p>SCROLL</p>
          <ChevronsDown className="scroll_icon" />
        </div>
      </div>

      {/* 아래 섹션 */}
      <div className="business">
        <div className="business_title">
          <h2>사업자등록조회</h2>
          <p>사업자 정보를 빠르게 확인하고 휴폐업 여부를 파악할 수 있습니다</p>
        </div>

        <div className="business_box">
          <div className="business_box_inner">
            <p>사업자등록번호</p>
            <div className="business_search">
              <input
                className="business_search_input"
                type="text"
                placeholder="예: 123-45-67890"
              />
              <button>조회하기</button>
            </div>
            <span>숫자 10자리를 입력하시면 자동으로 형식이 맞춰집니다</span>
          </div>
        </div>

        <div className="business_result">
          <div className="business_result_header">
            <div className="business_result_title">
              <FileText className="result_icon" />
              <span>조회 결과</span>
            </div>
            <span className="result_status_top">-</span>
          </div>

          <div className="business_result_body">
            {rows.map((row) => (
              <div className="result_row" key={row.label}>
                <div className="result_label">{row.label}</div>
                <div className="result_value">
                  {row.isBadge ? (
                    <span className="result_badge">{row.value}</span>
                  ) : (
                    row.value
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="business_result_notice">
            <Info className="notice_icon" />
            <span>
              본 조회 결과는 참고용으로만 사용하시기 바라며, 정확한 정보는
              홈택스 등 공식 채널에서 다시 확인해 주세요.
            </span>
          </div>
        </div>
      </div>

      <div className="book">
        <div className="book_title">
          <h2>세무 도서 추천</h2>
          <p>실무에 도움이 되는 도서를 소개합니다</p>
        </div>

        <div className="book_box">
          <div className="book_search">
            <Search className="Search" />
            <span>책 제목, 저자, 키워드 검색...</span>
          </div>

          <div className="book_button">
            <button className="check">전체</button>
            <button>종합소득세</button>
            <button>법인세</button>
            <button>부가가치세</button>
            <button>4대보험</button>
            <button>자격증</button>
          </div>
        </div>

        <div className="book_result">
          <p>
            <span>'전체'</span> 검색결과 총 <span>{booksDummy.length}</span>건
          </p>

          <div className="book_slider_outer">
            <button className="arrow left" type="button" onClick={handlePrev}>
              <ChevronLeft size={20} />
            </button>

            <div className="book_slider">
              <div className="slider_view">
                <div
                  className="slider_track"
                  style={{ transform: `translateX(-${index * cardWidth}px)` }}
                >
                  {booksDummy.map((book) => (
                    <div className="history" key={book.id}>
                      <div className="history_box_img">
                        <div className="category">{book.category}</div>
                        <div className="imgbox">
                          <img src={book.image} alt={book.title} />
                        </div>
                      </div>

                      <div className="history_box_detail">
                        <h3>{book.title}</h3>
                        <p className="author">
                          {book.author} · {book.publisher}
                        </p>
                        <p className="description">{book.description}</p>
                        <div className="pricing_and_links">
                          <span>{book.price}</span>
                          <a
                            href={book.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link_btn"
                          >
                            <ArrowRight size={16} />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button className="arrow right" type="button" onClick={handleNext}>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
