import { useState } from "react";
import Netsalary from "../components/calculators/Netsalary";
import Insurance from "../components/calculators/Insurance";
import Weeklypay from "../components/calculators/Weeklypay";
import "./Calculator.css";

const Calculator = () => {
  const [activeTab, setActiveTab] = useState("insurance");

  return (
    <div className="calculator">
      <div className="calculator_btn">
        <button
          className={activeTab == "insurance" ? "active" : ""}
          onClick={() => setActiveTab("insurance")}
        >
          급여 계산기
        </button>
        <button
          className={activeTab == "weeklypay" ? "active" : ""}
          onClick={() => setActiveTab("weeklypay")}
        >
          주휴수당 계산기
        </button>
        <button
          className={activeTab == "netsalary" ? "active" : ""}
          onClick={() => setActiveTab("netsalary")}
        >
          실수령액 역계산기
        </button>
      </div>
      <div className="calculator_content">
        {activeTab === "netsalary" && <Netsalary />}
        {activeTab === "insurance" && <Insurance />}
        {activeTab === "weeklypay" && <Weeklypay />}
      </div>
    </div>
  );
};

export default Calculator;
