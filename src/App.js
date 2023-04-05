import "./App.css";
import { useEffect, useState } from "react";
import { tenureData } from "./utils/constants";
import { numberWithCommas } from "./utils/config";
import TextInput from "./components/TextInput";
import SliderInput from "./components/SliderInput";

function App() {
  const [cost, setCost] = useState(0);
  const [interest, setInterest] = useState(10);
  const [fee, setFee] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [tenure, setTenure] = useState(12);
  const [emi, setEmi] = useState(0);

  const calculateEMI = (downpayment) => {
    // EMI amount = (P x R x (1+R)^N)/((1+R)^N-1)

    if (!cost) return;

    const loanAmount = cost - downpayment;
    const rateOfInterest = interest / 10;
    const numberOfYears = tenure / 12;

    const EMI =
      (loanAmount * rateOfInterest * (1 + rateOfInterest) ** numberOfYears) /
      ((1 + rateOfInterest) ** numberOfYears - 1);

    return Number(EMI / 12).toFixed(0);
  };

  const calculateDownPayment = (emi) => {
    if (!cost) return;

    const downPaymentPercent = 100 - (emi / calculateEMI(0)) * 100;

    return Number((downPaymentPercent / 100) * cost).toFixed(0);
  };

  useEffect(() => {
    if (!(cost > 0)) {
      setDownPayment(0);
      setEmi(0);
    }

    const emi = calculateEMI(downPayment);
    setEmi(emi);
  }, [tenure, cost]);

  const updateEMI = (e) => {
    if (!cost) return;

    const dp = Number(e.target.value);
    setDownPayment(dp.toFixed(0));

    // Calculate EMI and update it.
    const emi = calculateEMI(dp);
    setEmi(emi);
  };

  const updateDownPayment = (e) => {
    if (!cost) return;

    const emi = Number(e.target.value);
    setEmi(emi.toFixed(0));

    // Calculate DownPayment and update it.
    const dp = calculateDownPayment(emi);
    setDownPayment(dp);
  };

  const totalDownPayment = () =>
    numberWithCommas(
      Number(downPayment) + (cost - downPayment) * (fee / 100).toFixed(0)
    );

  const totalLoanAmount = () =>
    numberWithCommas(Number(emi * tenure).toFixed(0));

  return (
    <div className="App">
      <span className="title" style={{ fontSize: 30, margin: 10 }}>
        EMI Calculator
      </span>

      <TextInput
        title={"Total Cost of Asset"}
        state={cost}
        setState={setCost}
      />

      <TextInput
        title={"Interest Rate (in %)"}
        state={interest}
        setState={setInterest}
        max={100}
      />

      <TextInput
        title={"Processing Fee (in %)"}
        state={fee}
        setState={setFee}
        max={100}
      />

      <SliderInput
        title={"Down Payment"}
        underlineTitle={`Total Down Payment - ₹${totalDownPayment()}`}
        onChange={updateEMI}
        state={downPayment}
        min={0}
        max={cost}
        labelMin={"0%"}
        labelMax={"100%"}
      />

      <SliderInput
        title={"Loan Per Month"}
        underlineTitle={`Total Loan Amount - ₹${totalLoanAmount()}`}
        onChange={updateDownPayment}
        state={emi}
        min={calculateEMI(cost)}
        max={calculateEMI(0)}
      />

      <span className="title">Tenure</span>
      <div className="tenureContainer">
        {tenureData.map((t, index) => (
          <button
            className={`tenure ${t === tenure ? "selected" : ""}`}
            onClick={() => setTenure(t)}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
