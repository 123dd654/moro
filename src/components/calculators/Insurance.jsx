import { useState } from "react";
import { CircleAlert, CircleQuestionMark } from "lucide-react";
import "./insurance.css";

const Insurance = () => {
  const [showButton, setShowbutton] = useState(false);

  const item = [
    { name: "국민연금", rate: "4.75%", employee: 118750, employer: 118750 },
    { name: "건강보험", rate: "3.60%", employee: 90000, employer: 90000 },
    {
      name: "장기요양",
      rate: "건강보험료의 13.14%",
      employee: 11826,
      employer: 11826,
    },
    { name: "고용보험", rate: "0.90%", employee: 22500, employer: 22500 },
    { name: "소득세", rate: "간이세액표 기준", employee: 201650, employer: 0 },
    { name: "지방소득세", rate: "소득세의 10%", employee: 20165, employer: 0 },
  ];

  return (
    <div className="insurance">
      <div className="insurance_title">
        <h2>4대보험 급여 계산기</h2>
        <p>
          월 보수액을 입력하면 4대보험 및 소득세 근로자/사업주 부담금을
          계산합니다.
        </p>
      </div>
      <div className="insurance_input_box">
        <div className="insurance_input_box_inner">
          <p>
            월 보수액<span>(비과세 포함 금액 입력)</span>
          </p>
          <div className="input_box">
            <input type="text" value="월 보수액을 입력하세요." />
            <button>계산하기</button>
          </div>
          <div className="input_select">
            <p>선택입력</p>
            <div className="input_select_inner">
              <div className="non_taxable">
                <span>비과세액</span>
                <CircleQuestionMark className="non_taxable_icon" />
                <div className="tooltip_box">
                  <p>
                    급여액 중 세금공제를 하지 않은 금액입니다.
                    <br /> 본 계산기는 식대 20만원으로 설정되어 있으며, 직접
                    입력도 가능합니다.
                  </p>
                  <p>다음 항목들이 비과세에 해당됩니다.</p>
                  <ul>
                    <li>실비변상적인 급여</li>
                    <li>식사대, 출산·보육수당</li>
                    <li>국외근로소득</li>
                    <li>생산직 근로자 야간근로수당</li>
                    <li>외국인 근로자 과세특례</li>
                    <li>기타 비과세 소득</li>
                  </ul>
                </div>
              </div>
              <input type="text" value="200,000원" />
            </div>
          </div>
        </div>
      </div>
      <div className="result_card">
        <div className="result_header">
          <span>급여 계산 결과</span>
          <button onClick={() => setShowbutton(!showButton)}>
            {showButton ? "사업주 부담 숨기기" : "사업주 부담 보기"}
          </button>
        </div>
        <table>
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
              <tr key={item.name}>
                <td>
                  {i.name}
                  <br />
                  {i.rate}
                </td>
                <td>{i.employee.toLocaleString()}원</td>
                {showButton && (
                  <td>
                    {i.employer === 0 ? "-" : i.employer.toLocaleString()}원
                  </td>
                )}
                {showButton && (
                  <td>{(i.employee + i.employer).toLocaleString()}원</td>
                )}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>합계</td>
              <td>
                {item.reduce((acc, i) => acc + i.employee, 0).toLocaleString()}
                원
              </td>
              {showButton && (
                <td>
                  {item
                    .reduce((acc, i) => acc + i.employer, 0)
                    .toLocaleString()}
                  원
                </td>
              )}
              {showButton && (
                <td>
                  {item
                    .reduce((acc, i) => acc + (i.employee + i.employer), 0)
                    .toLocaleString()}
                  원
                </td>
              )}
            </tr>
          </tfoot>
        </table>
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
