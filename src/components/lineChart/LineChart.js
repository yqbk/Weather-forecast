import React from "react";
import ChartistGraph from "react-chartist";
import "./style.css";

const LineChart = ({ data, options, title }) => {
  const type = "Line";

  const generalOptions = {
    width: "70%",
    height: "150px",
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
      <ChartistGraph
        data={data}
        options={{ ...generalOptions, ...options }}
        type={type}
      />
    </div>
  );
};

export default LineChart;
