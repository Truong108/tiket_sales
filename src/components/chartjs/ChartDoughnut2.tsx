import { useEffect, useState } from "react";
import { Chart as Chartjs, PointElement } from "chart.js/auto";
import { Doughnut  } from "react-chartjs-2";

Chartjs.register(PointElement);

interface DataSets {
  data: number[];
  hoverOffset: number;
  backgroundColor: string[];
}

interface TypeChart {
  datasets: DataSets[];
  labels: string[];
}

const chartData: TypeChart = {
  labels: [],
  datasets: [
    {
      data: [],
      hoverOffset: 0,
      backgroundColor: [],
    },
  ],
};

function PieChartComponent2() {
  const [chartDemo, setChart] = useState<TypeChart>(chartData);

  useEffect(() => {
    const data = [240, 170];
    const backgroundColors = [
      'rgb(255, 138, 72)', //Cam
      'rgb(54, 162, 235)', // Blue 
    ];
    const labels = ['Vé chưa sử dụng', 'Vé đã sử dụng'];

    setChart({
      labels,
      datasets: [
        {
          data,
          hoverOffset: 4,
          backgroundColor: backgroundColors,
        },
      ],
    });
  }, []);

  console.log(chartDemo);

  return <Doughnut  data={chartDemo} width={100} height={100} />;
}

export default PieChartComponent2;