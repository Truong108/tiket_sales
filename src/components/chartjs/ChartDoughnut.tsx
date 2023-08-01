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

interface PropsData {
  unUse: any
  haveUse: any
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

function ChartDoughnut(props: PropsData) {
  const [chartDemo, setChart] = useState<TypeChart>(chartData);

  useEffect(() => {
    const data = [props.unUse, props.haveUse];
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
  }, [props.unUse, props.haveUse]);



  return <Doughnut  data={chartDemo} width={100} height={100} />;
}

export default ChartDoughnut;