function Visualizer({prop2, hl}) {
    return (
    <div className="visualizer">
      {/* <h2 className="visualizer-title">Sorting Visualizer</h2> */}
      <div className="bars">
        {prop2.map((ele, i) => {
            let color = "linear-gradient(180deg, #3b82f6, #1e3a8a)";
            if (i === hl[0]) color = "linear-gradient(180deg, #ef4444, #991b1b)";
            if (i === hl[1]) color = "linear-gradient(180deg, #22c55e, #065f46)";

            return (
            <div key={i} className="bar-container">
                <div
                className="bar"
                style={{ height: `${ele}px`, background: color }}
                ></div>
            </div>
            );
        })}
        </div>

    </div>
  );
}

export default Visualizer;