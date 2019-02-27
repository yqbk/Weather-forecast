import React from "react";
import ChartistGraph from "react-chartist";
import "./style.css";

const LineChart = ({ data, title }) => {
  const type = "Line";

  const options = {
    width: "70%",
    height: "150px",
    hight: Math.max(...data.series.flat()) + 5,
    low: Math.min(...data.series.flat()) - 5,
    axisX: {
      offset: 70,
      labelInterpolationFnc: function(value, index) {
        return index % 8 === 0 ? value : null;
      }
    }
  };

  return (
    <div>
      <h4>{title}</h4>
      <ChartistGraph data={data} options={options} type={type} />
    </div>
  );
};

export default LineChart;
