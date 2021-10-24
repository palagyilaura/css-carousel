import "./style/style.css";
import json from "./adaptiveTest.json";
import { useState } from "react";

function App() {
  let [data, setData] = useState(json);
  let [toggle, setToggle] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobile, setMobile] = useState(false);

  const updateIndex = (newIndex) => {
    window.innerWidth < 520 ? setMobile(true) : setMobile(false);
    if (newIndex < 0 && mobile === true) {
      newIndex = data.length - 1;
    } else if (newIndex < 0 && mobile === false) {
      newIndex = 4;
    } else if (newIndex >= 5 && mobile === false) {
      newIndex = 0;
    } else if (newIndex >= data.length && mobile === true) {
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };

  const handleCardOrder = () => {
    setToggle(!toggle);
    data.sort((a, b) => {
      if (a.id > b.id && toggle === true) {
        return 1;
      } else return -1;
    });
    setData(data);
  };
  return (
    <div className="App">
      <div className="carousel">
        <div
          className="inner"
          style={{
            transform:
              window.innerWidth < 520
                ? `translateX(-${activeIndex * 100}%)`
                : activeIndex < 5
                ? `translateX(-${activeIndex * 25}%)`
                : null,
          }}
        >
          {data.map((data, i) => (
            <div className="card" key={i}>
              <div className="content">
                <p className="site"> {data.site}</p>
                <div>
                  <p className="plannedImpression">{data.palnnedImpression}</p>
                  <p
                    className="factImpressions"
                    onClick={() => {
                      alert(data.lastUpdate);
                    }}
                  >
                    {Math.round(data.factImpressions)}
                  </p>
                  <p className="diff">
                    {Math.round(data.factImpressions) > data.palnnedImpression
                      ? Math.round(
                          (data.palnnedImpression / data.factImpressions) * 100
                        )
                      : Math.round(
                          (data.factImpressions / data.palnnedImpression) * 100
                        )}{" "}
                    %
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="btn-group">
          <button
            className="prev"
            onClick={() => {
              updateIndex(activeIndex - 1);
            }}
          >
            {toggle ? "Előre >" : "< Hátra"}
          </button>
          <button className="cardOrder" onClick={handleCardOrder}>
            Sorrend
          </button>
          <button
            className="next"
            onClick={() => {
              updateIndex(activeIndex + 1);
            }}
          >
            {toggle ? "< Hátra" : "Előre >"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
