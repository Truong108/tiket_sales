import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, LineElement } from "chart.js/auto";
Chart.register(LineElement);

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
interface valueTuan {
  tuan1: string;
  tuan2: string;
  tuan3: string;
  tuan4: string;
  tuan5: string;
}

const LineChartComponent: React.FC<valueTuan> = ({
  tuan1,
  tuan2,
  tuan3,
  tuan4,
  tuan5,
}) => {
  const dataList: DataMonth[] = [
  { day: "01 - 07", amount: tuan1.toString() },
  { day: "08 - 14", amount: tuan2.toString() },
  { day: "15 - 21", amount: tuan3.toString() },
  { day: "22 - 28", amount: tuan4.toString() },
  { day: "29 - 31", amount: tuan5.toString() },
];
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
  }, [tuan1, tuan2, tuan3, tuan4, tuan5]);

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

  return <Line width={420} data={chartData} height={90} options={options} />;
}

export default LineChartComponent;
