import { useState } from "react";
import "./weeklypay.css";
import { CircleCheck, CircleAlert } from "lucide-react";

const Weeklypay = () => {
  const [hours, setHours] = useState();

  return (
    <div className="weeklypay">
      <div className="weeklypay_title">
        <h2>주휴수당 계산기</h2>
        <p>1주 소정근로시간과 시급을 입력하여 주휴수당을 계산해보세요</p>
      </div>
      <div className="weeklypay_input">
        <div className="weekly_time">
          <p>1주 소정근로시간</p>
          <div className="weekly_time_input">
            <input
              type="number"
              placeholder="예) 40"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
            />
            <span>시간</span>
          </div>
        </div>
        <div className="money">
          <p>시급</p>
          <div className="money_input">
            <input type="number" placeholder="예) 10,320" />
            <span>원</span>
          </div>
        </div>
        <div className="weeklypay_btn">
          <button>계산하기</button>
        </div>
      </div>
      <div className="weeklypay_result">
        {hours >= 15 ? (
          <>
            <div className="answer">
              <div className="answer_inner">
                <CircleCheck color="white" fill="green" strokeWidth={2} />
                <div className="answer_inner_p">
                  <p>주휴수당 지급 대상입니다.</p>
                  <span>주 15이상 근무하여 주휴수당을 받을 수 있습니다.</span>
                </div>
              </div>
            </div>
            <div className="calculate">
              <div className="calculate_inner">
                <h3>계산식</h3>
                <div className="calculate_hour">
                  <p>1일 소정근로시간</p>
                  <span>40 / 5 = 8.0시간</span>
                </div>
                <div className="calculate_result">
                  <p>주휴수당</p>
                  <span>8.0 x 10,320 = 82,560원</span>
                </div>
              </div>
            </div>
            <div className="final_result">
              <div className="final_result_inner">
                <div className="week_money">
                  <p>주간 주휴수당</p>
                  <span>82,560원</span>
                </div>
                <div className="month_money">
                  <p>월 환산 주휴수당</p>
                  <span>358,723원</span>
                </div>
              </div>
            </div>
            <div className="calculate_notice">
              <div className="calculate_notice_inner">
                <CircleAlert className="check_point_icon" />
                <p>
                  주휴수당은 1주일 동안 소정근로일을 개근한 근로자에게
                  유급휴일을 주는 제도입니다
                  <br />월 환산 주휴수당은 1년 평균 주 수(52,14주 / 12개월 =
                  4.345주)를 기준으로 계산됩니다.
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="fail">
            <div className="fail_inner">
              <CircleAlert color="white" fill="red" strokeWidth={2} />
              <div className="fail_inner_p">
                <p>주휴수당 지급 대상이 아닙니다</p>
                <span>주휴수당은 주 15시간 이상 근무 시 지급됩니다.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weeklypay;
