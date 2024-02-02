import React from 'react'

const FinishScreen = ({ points, maxPoints, highScore ,dispatch}) => {
  const percentage = (points / maxPoints) * 100;
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPoints} (
        {Math.ceil(percentage)}%)
      </p>
      <p className='highscore'>(Highscore: {highScore} points)</p>
      <button className='btn btn-ui' onClick={()=>dispatch({type:'reset'})}>Reset</button>
    </>
  );
};

export default FinishScreen