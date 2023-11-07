import React, { useEffect, useState } from "react";
import InputSlider from "./components/InputSlider";
import EmiPieChart from "./components/EmiPieChart";
import { loan, marks, percentage } from "../../constants";

const EMICalculator = () => {
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [inputValue3, setInputValue3] = useState("");
  const [pieData, setPieData] = useState([]);
  const [totalIntrset, setTotalIntrset] = useState(0);
  const [totalEMi, setTotalEmi] = useState(0);

  // Calculating interest per month
  const calcInterest = (amount, rate, months) => {
    if (amount > 0 && rate > 0 && months > 0) {
      const interest = (amount * (rate * 0.01)) / months;
      const result = interest.toFixed(2);

      return result;
    } else {
      return 0;
    }
  };
  // Calculating total payment
  const calcTotal = (amount, rate, months) => {
    const interest = (amount * (rate * 0.01)) / months;
    const result = interest.toFixed(2);
    const totalResult = (
      Number(amount) / Number(months) +
      Number(result)
    ).toFixed(2);
    const makePieData = [
      {
        name: "interest",
        value: Number(result),
      },
      { name: "total", value: Number(totalResult) },
    ];
    setPieData(makePieData);
    return totalResult;
  };

  useEffect(() => {
    if (inputValue1 !== "" && inputValue2 !== "" && inputValue3 !== "") {
      setTotalIntrset(calcInterest(inputValue1, inputValue2, inputValue3));
      setTotalEmi(calcTotal(inputValue1, inputValue2, inputValue3));
    }
  }, [inputValue1, inputValue2, inputValue3]);

  return (
    <>
      <div className="text-center text-3xl py-4 border-black italic font-serif font-medium">
        EMI calculator
      </div>
      <div className="border h-full min-h-screen	 rounded-md bg-slate-100   mx-16 py-10 px-20">
        <InputSlider
          label="Loan Amount"
          inputValue1={inputValue1}
          setInputValue1={setInputValue1}
          marks={marks}
          max={1000000}
          steps={1}
        />
        <InputSlider
          label="Interest Rate"
          inputValue1={inputValue2}
          setInputValue1={setInputValue2}
          marks={percentage}
          max={10}
          steps={0.1}
        />
        <InputSlider
          label="Loan Tenure"
          inputValue1={inputValue3}
          setInputValue1={setInputValue3}
          marks={loan}
          max={30}
          steps={1}
        />
        <div>
          <div>
            <div>
              {inputValue1 !== "" &&
              inputValue2 !== "" &&
              inputValue3 !== "" ? (
                <div className="grid grid-cols-3 gap-4 justify-center items-center">
                  <div className="flex flex-col items-center justify-center text-2xl font-medium font-mono">
                    EMI
                    <div className="text-xl font-semibold	 text-green-600">
                      INR {totalIntrset}
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center text-2xl font-medium font-mono">
                    Total
                    <div className="text-xl font-semibold	 text-green-600">
                      INR {totalEMi}
                    </div>
                  </div>
                  <div>
                    {pieData.length > 0 ? (
                      <>
                        <EmiPieChart pieData={pieData} />
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-3 gap-4 justify-center items-center">
                    <div className="flex flex-col items-center justify-center text-2xl font-medium font-mono">
                      EMI
                      <div className="text-xl font-semibold	 text-green-600">
                        INR {0}
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center text-2xl font-medium font-mono">
                      Total
                      <div className="text-xl font-semibold	 text-green-600">
                        INR {0}
                      </div>
                    </div>
                    <div>{pieData.length > 0 ? <></> : <></>}</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EMICalculator;
