import { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import {
  Search,
  FileText,
  Info,
  ChevronsDown,
  Calculator,
  Users,
  CalendarDays,
} from "lucide-react";

const Home = () => {
  const [businessData, setBusinessData] = useState(null);
  const [businessNumber, setBusinessNumber] = useState("");

  const handleCheck = async () => {
    const cleanedNumber = businessNumber.replace(/[^0-9]/g, "");

    if (!cleanedNumber) {
      alert("사업자등록번호를 입력해주세요.");
      return;
    }

    if (cleanedNumber.length !== 10) {
      alert("사업자등록번호는 10자리여야 합니다.");
      return;
    }

    const res = await fetch(
      `https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=${import.meta.env.VITE_MY_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ b_no: [cleanedNumber.trim()] }),
      },
    );
    const result = await res.json();
    console.log(result);

    const item = result.data?.[0];

    if (!item) {
      setBusinessData(null);
      return;
    }

    setBusinessData({
      companyName: "-",
      ceoName: "-",
      businessNumber: item.b_no,
      businessType: "-",
      businessCategory: "-",
      address: "-",
      openDate: item.start_dt,
      status: item.b_stt,
      taxType: item.tax_type,
      closeDate: item.end_dt || "-",
    });
  };

  const formatBusinessNumber = (num) => {
    if (!num) return "-";
    const cleacnd = num.replace(/[^0-9]/g, "");
    return cleacnd.replace(/(\d{3})(\d{2})(\d{5})/, "$1-$2-$3");
  };

  const rows = [
    // { label: "상호명", value: businessData?.companyName },
    // { label: "대표자명", value: businessData?.ceoName },
    {
      label: "사업자등록번호",
      value: formatBusinessNumber(businessData?.businessNumber),
    },
    // { label: "사업자 유형", value: businessData?.businessType },
    // { label: "업태 / 종목", value: businessData?.businessCategory },
    // { label: "사업장 주소", value: businessData?.address },
    // { label: "개업일자", value: businessData?.openDate },
    { label: "사업자 상태", value: businessData?.status, isBadge: true },
    { label: "과세 유형", value: businessData?.taxType },
    { label: "폐업일자", value: businessData?.closeDate },
  ];

  return (
    <section>
      {/* 메인 */}
      <div className="container">
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
      </div>

      {/* 소개용 카드섹션 */}
      <div className="container">
        <div className="card_section">
          <div className="section_inner">
            <div className="card_inner">
              <div className="card">
                <Calculator size={32} color="#6a784d" />
                <div className="card_detail">
                  <p>급여 계산</p>
                  <span>
                    실수령액, 주휴수당, 역계산 기능을 통해 급여와 공제 항목을 한
                    번에 계산할 수 있습니다.
                  </span>
                </div>
              </div>
              <div className="card">
                <Search size={32} color="#6a784d" />
                <div className="card_detail">
                  <p>사업자등록 조회</p>
                  <span>
                    사업자번호 입력만으로 상태, 과세 유형, 폐업 여부 등 주요
                    정보를 빠르게 확인할 수 있습니다.
                  </span>
                </div>
              </div>
              <div className="card">
                <Users size={32} color="#6a784d" />
                <div className="card_detail">
                  <p>질문과 소통</p>
                  <span>
                    사용자 간 정보 공유와 소통 기능을 제공할 예정이며 현재
                    게시판 기능을 개발 중입니다.
                  </span>
                </div>
              </div>
              <div className="card">
                <CalendarDays size={32} color="#6a784d" />
                <div className="card_detail">
                  <p>세금신고 일정관리</p>
                  <span>
                    종합소득세, 부가가치세 등 주요 세금 신고 일정을 달력 형태로
                    한눈에 확인할 수 있는 기능을 개발 중입니다
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 사업자조회 */}
      <div className="container">
        <div className="business">
          <div className="business_title">
            <h2>사업자등록조회</h2>
            <p>
              사업자 정보를 빠르게 확인하고 휴폐업 여부를 파악할 수 있습니다
            </p>
          </div>

          <div className="business_box">
            <div className="business_box_inner">
              <p>사업자등록번호</p>
              <div className="business_search">
                <input
                  className="business_search_input"
                  type="text"
                  placeholder="예: 1234567890"
                  value={businessNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    setBusinessNumber(value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleCheck();
                    }
                  }}
                />
                <button onClick={handleCheck}>조회하기</button>
              </div>
            </div>
          </div>

          <div className="business_result">
            <div className="business_result_header">
              <div className="business_result_title">
                <FileText className="result_icon" />
                <span>조회 결과</span>
              </div>
            </div>
            <div className="business_result_body">
              {rows.map((row) => (
                <div className="result_row" key={row.label}>
                  <div className="result_label">{row.label}</div>
                  <div className="result_value">
                    {row.value ? (
                      row.isBadge ? (
                        <span className="result_badge">{row.value}</span>
                      ) : (
                        row.value
                      )
                    ) : (
                      "-"
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
      </div>
    </section>
  );
};

export default Home;
