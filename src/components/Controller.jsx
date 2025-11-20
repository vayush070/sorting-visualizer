import { useState } from "react";
import SortAlgo from "./SortAlgo";

function Controller() {
  const [array, setArray] = useState([]);
  const [renderSort, setRenderSort] = useState(false);
  const [canSort, setCanSort] = useState(false);

  function generateArray() {
    setCanSort(true);
    const tempArr = Array.from({ length: 150 }, () =>
      Math.floor(Math.random() * 200)
    );
    console.log(tempArr);
    setArray(tempArr);
  }

  return (
    <div className="controller-container">

      <h1 className="controller-title">Sorting Visualizer</h1>

      <div className="button-group">
        <button onClick={generateArray} className="btn btn-blue">
          Generate Array
        </button>
        {canSort && (<button onClick={() => setRenderSort(true)} className="btn btn-green">
          Sort Array
        </button>)}
      </div>

      <div className="array-box">
        <h2 className="array-title">Current Array:</h2>
        <div className="array-chips">
          {array.map((ele, i) => (
            <span key={i} className="chip">
              {ele}
            </span>
          ))}
        </div>
      </div>
      {renderSort && (
        <div className="visualizer-box">
          <SortAlgo prop1={array} />
        </div>
      )}
    </div>
  );
}

export default Controller;
