import "./netsalary.css";
import { ReceiptText, CircleAlert } from "lucide-react";

const Netsalary = () => {
  const deduction = [
    {
      label: "국민연금",
      rate: "(4.75%)",
      value: "135,195",
    },
    {
      label: "건강보험",
      rate: "(3.6%)",
      value: "106,504",
    },
    {
      label: "장기요양보험",
      rate: "(건강보험료 x 13.14%)",
      value: "13,792",
    },
    {
      label: "고용보험",
      rate: "(0.9%)",
      value: "27,039",
    },
    {
      label: "소득세",
      rate: "(소득별 상이)",
      value: "201,652",
    },
    {
      label: "지방소득세",
      rate: "(소득세 x 10%)",
      value: "20,165",
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
          <input type="text" value="2,500,000" />
          <span>입력값 : 2,500,000원</span>
          <button className="calculate_btn">세전 급여 계산하기</button>
        </div>
      </div>
      <div className="netsalary_result">
        <div className="netsalary_result_inner">
          <p>필요한 세전 급여(월)</p>
          <h1>3,004,348원</h1>
          <span>실수령액 2,500,000원을 받으려면 이 금액이 필요합니다.</span>
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
                - {item.value.toLocaleString()}원
              </span>
            </div>
          ))}
          <div className="deduction_total">
            <span>총 공제액</span>
            {/* <span>- {totalDeduction.toLocaleString()}원</span> */}-
            504,347원
          </div>
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
            소득세는 간이세액표(부양가족 없음)을 기준으로 계산됩니다.
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
