import { useState } from "react";
import { CircleAlert } from "lucide-react";
import "../../assets/css/insurance.css";
import "../../assets/css/common.css";
import taxTable from "../../data/taxTable.json";

const Insurance = () => {
  const [result, setResult] = useState(null);
  const [family, setFamily] = useState(1);
  const [children, setChildren] = useState(0);
  const [famliyErrerMsg, setFamliyErrerMsg] = useState("");
  const [childrenErrerMsg, setChildrenErrerMsg] = useState("");
  const [showButton, setShowbutton] = useState(false);
  const [monthlySalary, setMonthlySalary] = useState("");
  const [nonTaxableAmountInput, setNonTaxableAmountInput] = useState(200000);
  const [nonTaxableError, setNonTaxableError] = useState("");

  const increaseFamily = (value) => {
    if (family + value > 11) return;
    setFamily(family + value);
    setFamliyErrerMsg("");
  };

  const decreaseFamily = (value) => {
    if (family - value < 1) return;
    if (family <= children + 1) {
      setFamliyErrerMsg("부양가족 수는 자녀 포함 최소 1명 이상이어야 합니다.");
      return;
    }
    setFamliyErrerMsg("");
    setFamily(family - value);
  };

  const increaseChildren = (value) => {
    if (children + value >= family) {
      setChildrenErrerMsg("자녀수가 부양가족수보다 같거나 클 수 없습니다.");
      return;
    }
    setChildrenErrerMsg("");
    setChildren(children + value);
  };

  const decreaseChildren = (value) => {
    if (children - value < 0) return;
    setChildren(children - value);
    setChildrenErrerMsg("");
  };

  const handleCalculate = () => {
    const taxableIncome = Math.max(
      0,
      Number(monthlySalary) - Number(nonTaxableAmountInput),
    );
    const pension = Math.floor((taxableIncome * 475) / 10000 / 10) * 10;
    const health = Math.floor((taxableIncome * 3595) / 100000 / 10) * 10;
    const nursing = Math.floor((health * 1314) / 10000 / 10) * 10;
    const employment = Math.floor((taxableIncome * 9) / 1000 / 10) * 10;

    const found = taxTable.간이세액표.find(
      (data) =>
        taxableIncome >= data.월급여액_이상_천원 * 1000 &&
        taxableIncome < data.월급여액_미만_천원 * 1000,
    );

    const key = family + "인";

    const incomeTax = found?.공제대상가족수별_세액_원[key] || 0;

    let childTaxCredit = 0;

    if (children === 1) {
      childTaxCredit = 20830;
    } else if (children === 2) {
      childTaxCredit = 45830;
    } else if (children >= 3) {
      childTaxCredit = 45830 + (children - 2) * 33330;
    }

    const finalIncomeTax = Math.max(0, incomeTax - childTaxCredit);

    const localIncomeTax = Math.floor((finalIncomeTax * 0.1) / 10) * 10;

    const totalEmployee =
      pension + health + nursing + employment + finalIncomeTax + localIncomeTax;

    const totaltax = monthlySalary - totalEmployee;

    setResult({
      taxableIncome,
      nonTaxableAmountInput,
      pension,
      health,
      nursing,
      employment,
      finalIncomeTax,
      localIncomeTax,
      totalEmployee,
      totaltax,
    });
  };

  const item = [
    {
      name: "국민연금",
      rate: "4.75%",
      employee: result?.pension || 0,
      employer: result?.pension || 0,
    },
    {
      name: "건강보험",
      rate: "3.595%",
      employee: result?.health || 0,
      employer: result?.health || 0,
    },
    {
      name: "장기요양",
      rate: "건강보험료 x 13.14%",
      employee: result?.nursing || 0,
      employer: result?.nursing || 0,
    },
    {
      name: "고용보험",
      rate: "0.90%",
      employee: result?.employment || 0,
      employer: result?.employment || 0,
    },
    {
      name: "소득세",
      rate: "간이세액표 기준",
      employee: result?.finalIncomeTax || 0,
      employer: 0,
    },
    {
      name: "지방소득세",
      rate: "소득세 x 10%",
      employee: result?.localIncomeTax || 0,
      employer: 0,
    },
  ];

  return (
    <div className="insurance">
      <div className="insurance_title">
        <h2>급여 계산기</h2>
        <p>
          월 보수액을 입력하면 4대보험 및 소득세 근로자/사업주 부담금을
          계산합니다.
        </p>
      </div>
      <div className="insurance_input_box">
        <div className="insurance_input_box_inner">
          <p>
            월 보수액<span>(비과세 포함 총 급여 입력)</span>
          </p>
          <div className="input_box">
            <input
              type="number"
              placeholder="월 보수액을 입력하세요."
              value={monthlySalary}
              onChange={(e) => {
                const value = e.target.value;
                const numValue = Number(value);

                if (numValue < 0) {
                  alert("0원 이상 입력해주세요.");
                  return;
                }

                setNonTaxableError("");
                setMonthlySalary(e.target.value);
              }}
            />
            {nonTaxableError ? (
              <div className="error">{nonTaxableError}</div>
            ) : (
              <div className="non">
                보수월액 : {Number(monthlySalary).toLocaleString()}원
              </div>
            )}
          </div>

          <div className="Checklist">
            <div className="nonTaxable">
              <p>비과세 금액</p>
              <input
                type="number"
                placeholder="예) 200,000원"
                value={nonTaxableAmountInput}
                onChange={(e) => {
                  const value = e.target.value;
                  const numValue = Number(value);

                  // 1. 에러 체크 구간
                  if (value === "") {
                    setNonTaxableError(""); // 빈 칸일 땐 에러 지움
                    setNonTaxableAmountInput("");
                    return;
                  }

                  if (numValue < 0) {
                    setNonTaxableError("0원 이상 입력해주세요.");
                    return;
                  }

                  if (numValue > 200000) {
                    setNonTaxableError("20만원 이하로 입력해주세요.");
                    return;
                  }

                  // 2. 정상 범위일 때 (에러 초기화 및 값 반영)
                  setNonTaxableError("");
                  setNonTaxableAmountInput(value);
                }}
              />
              {nonTaxableError ? (
                <div className="error">{nonTaxableError}</div>
              ) : (
                /* 에러가 없을 때만 비과세 금액 안내 표시 */
                <div className="non">
                  비과세 금액 : {Number(nonTaxableAmountInput).toLocaleString()}
                  원
                </div>
              )}
            </div>
            <div className="responsibility_family">
              <p>부양가족 수</p>
              <div className="btn_wrap">
                <button
                  className="minus_Btn"
                  onClick={() => {
                    decreaseFamily(1);
                  }}
                >
                  -
                </button>
                <span>{family}</span>
                <button
                  className="plus_Btn"
                  onClick={() => {
                    increaseFamily(1);
                  }}
                >
                  +
                </button>
              </div>
              <div className="error">
                {famliyErrerMsg ? famliyErrerMsg : ""}
              </div>
            </div>
            <div className="children">
              <p>8세이상 20세이하 자녀수</p>
              <div className="btn_wrap">
                <button
                  className="minus_Btn"
                  onClick={() => {
                    decreaseChildren(1);
                  }}
                >
                  -
                </button>
                <span>{children}</span>
                <button
                  className="plus_Btn"
                  onClick={() => {
                    increaseChildren(1);
                  }}
                >
                  +
                </button>
              </div>
              <div className="error">
                {childrenErrerMsg ? childrenErrerMsg : ""}
              </div>
            </div>
          </div>

          <div className="input_select">
            <p>💡 비과세란?</p>
            <span>
              식대 (월 20만원) 자가운전보조금 (월 20만원) 육아수당 등 세금이
              부과되지 않는 금액입니다. <br />
              급여액에서 비과세액을 뺀 후, 나머지 금액에 세금을 적용합니다.
              <br />
              <strong>식대 20만원이 기본 적용되며, </strong>
              비과세 금액이 다르면 20만원 미만에서 수정이 가능합니다.
            </span>
            <p>💡 개정사항</p>
            <span>
              <strong style={{ color: "#6a784d" }}>2026년 03월 01일</strong>{" "}
              이후 원천징수분부터 적용입니다.
              <br />
              <strong>
                → 8세이상 20세 이하 자녀가 1명인 경우 : 20,830원 <br />→ 8세이상
                20세 이하 자녀가 2명인 경우 : 45,830원 <br />→ 8세이상 20세 이하
                자녀가 3명인 경우 : 45,830원 + 2명 초과 자녀 1명당 33,330원{" "}
              </strong>
              <br />
              근로소득 간이세액표의 금액에서 해당 자녀수별로 위 금액을
              공제합니다.
            </span>
          </div>
          <button className="result_btn" onClick={handleCalculate}>
            계산하기
          </button>
        </div>
      </div>
      <div className="insurance_result">
        <div className="insurance_result_inner">
          <p>최종 세후 급여(월)</p>
          <h1>{Math.floor(result?.totaltax || 0).toLocaleString()}원</h1>
          <span>
            ※ 본 계산 결과는 예상 금액이며, 실제 급여와 차이가 있을 수 있습니다.
          </span>
        </div>
      </div>
      <div className="result_card">
        <div className="result_header">
          <div className="header_inner">
            <span>급여 계산 결과</span>
            <button onClick={() => setShowbutton(!showButton)}>
              {showButton ? "사업주 부담 숨기기" : "사업주 부담 보기"}
            </button>
          </div>
        </div>
        <table className={showButton ? "table_wide" : "table_narrow"}>
          <thead>
            <tr>
              <th>항목</th>
              <th>근로자 부담</th>
              {showButton && <th>사업주 부담</th>}
              {showButton && <th>합계</th>}
            </tr>
          </thead>
          <tbody>
            {item.map((i) => (
              <tr key={i.name}>
                <td>
                  {i.name}
                  <br />
                  <span className="tbody_rate">{i.rate}</span>
                </td>
                <td>{Math.floor(i.employee).toLocaleString()}원</td>
                {showButton && (
                  <td>
                    {i.employer === 0
                      ? "-"
                      : Math.floor(i.employer).toLocaleString() + "원"}
                  </td>
                )}
                {showButton && (
                  <td>
                    {Math.floor(i.employee + i.employer).toLocaleString()}원
                  </td>
                )}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>합계</td>
              <td>
                {Math.floor(result?.totalEmployee || 0).toLocaleString()}원
              </td>
              {showButton && (
                <td>
                  {item
                    .reduce((acc, i) => acc + Math.floor(i.employer), 0)
                    .toLocaleString()}
                  원
                </td>
              )}
              {showButton && (
                <td>
                  {item
                    .reduce(
                      (acc, i) => acc + Math.floor(i.employee + i.employer),
                      0,
                    )
                    .toLocaleString()}
                  원
                </td>
              )}
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="netsalary_summation">
        <p>계산 요약</p>
        <div>
          <div className="summation_Before">
            <span>세전 급여</span>
            <span>
              {Math.floor(result?.taxableIncome || 0).toLocaleString()}원
            </span>
          </div>
          <div className="summation_Before">
            <span>비과세 금액</span>
            <span>
              {Math.floor(result?.nonTaxableAmountInput || 0).toLocaleString()}
              원
            </span>
          </div>
          <div className="summation_total">
            <span>총 공제액</span>
            <span>
              - {Math.floor(result?.totalEmployee || 0).toLocaleString()}원
            </span>
          </div>
        </div>
        <div className="summation_netsalary">
          <span>실수령액</span>
          <span>{Math.floor(result?.totaltax || 0).toLocaleString()}원</span>
        </div>
      </div>
      <div className="insurance_notice">
        <div className="insurance_notice_inner">
          <p>
            <CircleAlert className="check_point_icon" />
            <span>산재보험:</span> 사업주가 전액 부담하며, 업종별로 요율이
            다릅니다. 별도로 확인이 필요합니다.
          </p>
          <p>
            <CircleAlert className="check_point_icon" />
            <span>참고사항:</span> 실제 보험료는 소득 상한/하한 적용 및 단수
            처리 방식에 따라 차이가 있을 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Insurance;
