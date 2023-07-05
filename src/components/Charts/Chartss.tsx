import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const LineChart = () => {
  const [data, setData] = useState([]);
  ChartJS.register(CategoryScale);
  const {
    data: queryData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["/all"],
    queryFn: async () => {
      const response = await fetch(
        "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
      );
      const data = await response.json();
      setData(data);
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  const chartData = {
    labels: Object.keys(queryData.cases),
    datasets: [
      {
        label: "Confirmed Cases",
        data: Object.values(queryData.cases),
        fill: false,
        borderColor: "red",
      },
      // {
      //   label: "Recovered Cases",
      //   data: Object.values(queryData.recovered),
      //   fill: false,
      //   borderColor: "green",
      // },
      // {
      //   label: "Deaths",
      //   data: Object.values(queryData.deaths),
      //   fill: false,
      //   borderColor: "black",
      // },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Cases",
        },
      },
    },
  };

  return (
    <div className="flex justify-center">
      <div id="line-chart-container" className="w-4/5" style={{ height: "40vw" }}>
        <h2 className="text-center mb-4">COVID-19 Historical Data</h2>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>

  );
};

export default LineChart;
