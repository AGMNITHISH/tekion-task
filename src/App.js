import React from "react";
import {
  increment,
  decrement,
  incrementByValue,
} from "./redux/slice/counterSlice";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.counter);

  console.log("data", data);

  return (
    <div>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <input
        value={data?.value}
        type="number"
        placeholder="enter some number"
        onChange={(e) => dispatch(incrementByValue(Number(e.target.value)))}
      />
    </div>
  );
};

export default App;
