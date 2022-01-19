import React from "react";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
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

const { Title: TTitle } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamps = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
    const coin = coinHistory.data.history[i];
    coinPrice.push(coin.price);
    coinTimestamps.push(new Date(coin.timestamp * 1000).toLocaleDateString());
    // coinTimestamps.push(moment.unix(coin.timestamp).format("YYYY-MM-DD"));
  }

  const data = {
    labels: coinTimestamps,
    datasets: [
      {
        label: "Price in USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: {
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <>
      <Row className="chart-header">
        <TTitle level={2} className="chart-title">
          {coinName} Price Chart
        </TTitle>
        <Col className="price-container">
          <TTitle level={5} className="price-change">
            {coinHistory?.data?.change}%
          </TTitle>
          <TTitle level={5} className="current-price">
            Current {coinName} price: $ {currentPrice}
          </TTitle>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
