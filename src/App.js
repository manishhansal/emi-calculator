import "./App.css";
import { useState } from "react";
import { tenureData } from "./utils/constants";

function App() {
  const [cost, setCost] = useState(0);
  const [interest, setInterest] = useState(10);
  const [fee, setFee] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [tenure, setTenure] = useState(12);
  const [emi, setEmi] = useState(0);

  const calculateEMI = (cost) => {};

  const updateEMI = (e) => {
    if (!cost) return;

    const dp = Number(e.target.value);
    setDownPayment(dp.toFixed(0));

    // Calculate EMI and update it.
  };

  const updateDownPayment = (e) => {
    if (!cost) return;

    const dp = Number(e.target.value);
    setEmi(dp.toFixed(0));

    // Calculate DownPayment and update it.
  };

  return (
    <div className="App">
      <span className="title" style={{ fontSize: 30, margin: 10 }}>
        EMI Calculator
      </span>

      <span className="title">Total Cost of Asset</span>
      <input
        type="number"
        value={cost}
        onChange={(e) => setCost(e.target.value)}
        placeholder="Total Cost of Asset"
      />

      <span className="title">Interest Rate (in %)</span>
      <input
        type="number"
        value={interest}
        onChange={(e) => setInterest(e.target.value)}
        placeholder="Interest Rate (in %)"
      />

      <span className="title">Processing Fee (in %)</span>
      <input
        type="number"
        value={fee}
        onChange={(e) => setFee(e.target.value)}
        placeholder="Processing Fee (in %)"
      />

      <span className="title">Down Payment</span>
      <div>
        <input
          type="range"
          min={0}
          max={cost}
          className="slider"
          value={downPayment}
          onChange={updateEMI}
        />

        <div className="labels">
          <label>0%</label>
          <label>{downPayment}</label>
          <label>100%</label>
        </div>
      </div>

      <span className="title">Loan Per Month</span>
      <div>
        <input
          type="range"
          min={calculateEMI(cost)}
          max={calculateEMI(0)}
          className="slider"
          value={emi}
          onChange={updateDownPayment}
        />
        <div className="labels">
          <label>{calculateEMI(cost)}</label>
          <label>{downPayment}</label>
          <label>{calculateEMI(0)}</label>
        </div>
      </div>

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
