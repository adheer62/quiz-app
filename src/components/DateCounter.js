import { useReducer } from "react";

const reducer = (state,action)=>{
  switch (action.type) {
    case "inc":
      return { ...state, count: state.count + state.step };
      break;
    case "dec":
      return { ...state, count: state.count - state.step };
      break;
    case "setCount":
      return { ...state, count: action.payload };
      break;
    case "setStep":
      return { ...state, step: action.payload };
      break;
    case "reset":
      return { ...state, count: 0, step: 1 };
      break;
    default:
      throw new Error("Unknown action");
  }
}
function DateCounter() {
  // const [count, setCount] = useState(0);
  const initialState = {
    count:0,
    step:1
  }
  const [state, dispatch] = useReducer(reducer, initialState);
  const {step, count} = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
    dispatch({type:'dec'})
  };

  const inc = function () {
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
    dispatch({ type: "inc" });
  };

  const defineCount = function (e) {
    // setCount(Number(e.target.value));
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    // setStep(Number(e.target.value));
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    // setCount(0);
    dispatch({ type: "reset" });
    // setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
