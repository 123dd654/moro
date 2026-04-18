// import { useState } from "react";
import { ReceiptText, CircleAlert, Chrome } from "lucide-react";
import "../../assets/css/netsalary.css";
import "../../assets/css/common.css";
import { useState } from "react";
import taxTable from "../../data/taxTable.json";

const Netsalary = () => {
  const [result, setResult] = useState(null);
  const [family, setFamily] = useState(1);
  const [children, setChildren] = useState(0);
  const [famliyErrerMsg, setFamliyErrerMsg] = useState("");
  const [childrenErrerMsg, setChildrenErrerMsg] = useState("");
  const [targetNet, setTargetNet] = useState("");
  const [nonTaxable, setNonTaxable] = useState(200000);
  const [TaxableError, setTaxableError] = useState("");
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
    if (children + value < 0) return;
    setChildren(children - value);
    setChildrenErrerMsg("");
  };

  const calculateNetSalary = (
    gross,
    family,
    children,
    nonTaxableAmountInput,
  ) => {
    const taxableIncome = Math.max(
      0,
      Number(gross) - Number(nonTaxableAmountInput),
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

    const finalIncomeTax = incomeTax - childTaxCredit;

    const localIncomeTax = Math.floor((finalIncomeTax * 0.1) / 10) * 10;

    const totalEmployee =
      pension + health + nursing + employment + finalIncomeTax + localIncomeTax;

    const totaltax = gross - totalEmployee;

    // console.log(
    //   "taxableIncome:",
    //   taxableIncome,
    //   "nonTaxable:",
    //   nonTaxableAmountInput,
    // );
    // console.log("totalEmployee:", totalEmployee, "totaltax:", totaltax);
    // console.log("incomeTax:", incomeTax, "found:", found);
    // console.log(
    //   "pension:",
    //   pension,
    //   "health:",
    //   health,
    //   "employment:",
    //   employment,
    // );

    console.log("국민연금:", pension);
    console.log("건강보험:", health);
    console.log("고용보험:", employment);
    console.log("소득세:", finalIncomeTax);
    console.log("지방소득세:", localIncomeTax);
    console.log(
      "합계:",
      pension + health + employment + incomeTax + localIncomeTax,
    );

    return {
      totaltax,
      pension,
      health,
      nursing,
      employment,
      finalIncomeTax,
      localIncomeTax,
      totalEmployee,
    };
  };

  const findGross = (targetNet, family, children, nonTaxable) => {
    let low = targetNet;
    let high = targetNet * 1.5;

    for (let i = 0; i < 100; i++) {
      let mid = Math.floor((low + high) / 2);
      let net = calculateNetSalary(mid, family, children, nonTaxable).totaltax;
      console.log("mid:", mid, "net:", net, "target:", targetNet);

      if (Math.abs(net - targetNet) < 1) break;
      if (net < targetNet) low = mid;
      else high = mid;
    }

    const grossLow = Math.floor((low + high) / 2);
    const grossHigh = grossLow + 1;

    const netLow = calculateNetSalary(
      grossLow,
      family,
      children,
      nonTaxable,
    ).totaltax;
    const netHigh = calculateNetSalary(
      grossHigh,
      family,
      children,
      nonTaxable,
    ).totaltax;

    const gross =
      Math.abs(netLow - targetNet) <= Math.abs(netHigh - targetNet)
        ? grossLow
        : grossHigh;
    const final = calculateNetSalary(gross, family, children, nonTaxable);

    setResult({
      gross,
      ...final,
    });
  };

  const deduction = [
    {
      label: "국민연금",
      rate: "4.75%",
      value: result?.pension || 0,
    },
    {
      label: "건강보험",
      rate: "3.6%",
      value: result?.health || 0,
    },
    {
      label: "장기요양보험",
      rate: "건강보험료 x 13.14%",
      value: result?.nursing || 0,
    },
    {
      label: "고용보험",
      rate: "0.9%",
      value: result?.employment || 0,
    },
    {
      label: "소득세",
      rate: "간이세액표 기준",
      value: result?.finalIncomeTax || 0,
    },
    {
      label: "지방소득세",
      rate: "소득세 x 10%",
      value: result?.localIncomeTax || 0,
    },
  ];

  return (
    <div className="netsalary">
      <div className="netsalary_title">
        <h2>실수령액 역계산기</h2>
        <p>실수령액을 입력하면, 필요한 세전 급여를 역으로 계산해드립니다.</p>
      </div>
      <div className="netsalary_input_box">
        <div className="input_box_inner">
          <p>실수령액 (세후)</p>
          <div className="input_box">
            <input
              type="number"
              placeholder="세후금액을 입력해주세요."
              value={targetNet}
              onChange={(e) => {
                const value = e.target.value;
                const numValue = Number(value);

                if (numValue < 0) {
                  setTaxableError("0원 이상 입력해주세요.");
                  return;
                }

                setTaxableError("");
                setTargetNet(value);
              }}
            />
            {TaxableError ? (
              <div className="error">{TaxableError}</div>
            ) : (
              <div className="non">
                실수령액 : {Number(targetNet).toLocaleString()}원
              </div>
            )}
          </div>

          <div className="Checklist">
            <div className="nonTaxable">
              <p>비과세 금액</p>
              <input
                type="number"
                placeholder="예) 200,000원"
                value={nonTaxable}
                onChange={(e) => {
                  const value = e.target.value;
                  const numValue = Number(value);

                  if (value === "") {
                    setNonTaxableError(""); // 빈 칸일 땐 에러 지움
                    setNonTaxable("");
                    return;
                  }

                  if (numValue < 0) {
                    setNonTaxableError("0원 이상 입력해주세요.");
                    return;
                  }

                  if (numValue > 200000) {
                    setNonTaxableError("20만원 미만으로 입력해주세요.");
                    return;
                  }
                  setNonTaxableError("");
                  setNonTaxable(value);
                }}
              />
              {nonTaxableError ? (
                <div className="error">{nonTaxableError}</div>
              ) : (
                <div className="non">
                  비과세 금액 : {Number(nonTaxable).toLocaleString() || 0}원
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
          <button
            className="calculate_btn"
            onClick={() =>
              findGross(Number(targetNet), family, children, Number(nonTaxable))
            }
          >
            계산하기
          </button>
        </div>
      </div>
      <div className="netsalary_result">
        <div className="netsalary_result_inner">
          <p>필요한 세전 급여(월)</p>
          <h1>{result?.gross?.toLocaleString() || 0}원</h1>
          <span>
            실수령액 {Number(targetNet).toLocaleString()}원을 받으려면 이 금액이
            필요합니다.
          </span>
        </div>
      </div>
      <div className="netsalary_deduction">
        <div className="deduction_title">
          <ReceiptText className="receipt_icon" />
          <span>공제 내역</span>
        </div>
        <div className="deduction_list">
          {deduction.map((item) => (
            <div className="deduction_item" key={item.label}>
              <div className="deduction_left">
                <span className="deduction_name">{item.label}</span>
                <span className="deduction_rate">{item.rate}</span>
              </div>
              <span className="deduction_value">
                {item.value?.toLocaleString()}원
              </span>
            </div>
          ))}
          <div className="deduction_total">
            <span>총 공제액</span>
            <span>{Number(result?.totalEmployee || 0).toLocaleString()}원</span>
          </div>
        </div>
      </div>
      <div className="netsalary_summation">
        <p>계산 요약</p>
        <div>
          <div className="summation_Before">
            <span>세전 급여</span>
            <span>{result?.gross?.toLocaleString() || 0}원</span>
          </div>
          <div className="summation_total">
            <span>총 공제액</span>
            <span>
              - {Number(result?.totalEmployee || 0).toLocaleString()}원
            </span>
          </div>
        </div>
        <div className="summation_netsalary">
          <span>실수령액</span>
          <span>
            {result?.totaltax?.toLocaleString() ||
              Number(targetNet).toLocaleString()}
            원
          </span>
        </div>
      </div>
      <div className="netsalary_result_notice">
        <div className="notice_inner">
          <p>
            <CircleAlert className="check_point_icon" />본 계산기는 2026년
            기준으로 작성되었으며, 실제 금액과 다를 수 있습니다.
          </p>
          <p>
            <CircleAlert className="check_point_icon" />
            역계산 특성상 실수령액과 1~2천원 차이가 발생할 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Netsalary;
