import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

interface DataMonth {
  day: string;
  amount: string;
}

interface DataSets {
  label: string;
  data: string[];
  tension: number;
  borderColor: string;
  pointBorderColor: string;
  backgroundColor: CanvasGradient;
  fill: boolean;
  spanGaps: boolean;
}

interface ChartData {
  labels: string[];
  datasets: DataSets[];
}

const dataList: DataMonth[] = [
  { day: "Thứ 2", amount: "130.0" },
  { day: "Thứ 3", amount: "186.0" },
  { day: "Thứ 4", amount: "140.0" },
  { day: "Thứ 5", amount: "248.0" },
  { day: "Thứ 6", amount: "210.0" },
  { day: "Thứ 7", amount: "260.0" },
  { day: "CN", amount: "200.0" },
];

function LineChartComponent() {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        tension: 0.5,
        borderColor: "",
        pointBorderColor: "",
        backgroundColor: {} as CanvasGradient,
        fill: true,
        spanGaps: true,
      },
    ],
  });

  useEffect(() => {
    setChartData({
      labels: dataList.map((month) => month.day),
      datasets: [
        {
          label: "",
          data: dataList.map((month) => month.amount),
          tension: 0.5,
          borderColor: "#FF993C",
          pointBorderColor: "transparent",
          backgroundColor: createLinearGradient(),
          fill: true,
          spanGaps: true,
        },
      ],
    });
  }, []);

  const createLinearGradient = () => {
    const ctx = document.createElement("canvas").getContext("2d");
    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, 0, 190);
      gradient.addColorStop(0, "#FAA05F");
      gradient.addColorStop(1, "#FFFFFF");
      return gradient;
    }
    return {} as CanvasGradient;
  };

  const options = {
    scales: {
      y: {
        ticks: {
          stepSize: 40,
        },
      },
      x: {
        grid: {
          display: false,
          drawOnChartArea: false,
          drawTicks: false,
          drawBorder: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false, 
      },
    },
  };

  return <Line width={400} data={chartData} height={80} options={options} />;
}

export default LineChartComponent;
