import React, { useState } from "react";
import { useParams } from "react-router-dom";
import HTMLReactParser from "html-react-parser";
import millify from "millify";
import { Col, Row, Typography, Select } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import {
  useGetCoinDetailsQuery,
  useGetCoinHistoryQuery,
} from "../services/cryptoApi";
import LineChart from "./LineChart";
import { Loader } from ".";

const { Title, Text } = Typography;
const { Option } = Select;

const CoinDetail = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");
  const { data, isFetching } = useGetCoinDetailsQuery(coinId);
  const { data: coinHistory } = useGetCoinHistoryQuery({
    coinId,
    timePeriod,
  });

  const coinDetails = data?.data?.coin;

  if (isFetching) return <Loader />;

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${coinDetails?.price && millify(coinDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: coinDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${coinDetails?.["24hVolume"] && millify(coinDetails?.["24hVolume"])}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${coinDetails?.marketCap && millify(coinDetails?.marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        coinDetails?.allTimeHigh?.price &&
        millify(coinDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: coinDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: coinDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Approved Supply",
      value: coinDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        coinDetails?.supply?.total && millify(coinDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        coinDetails?.supply?.circulating &&
        millify(coinDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];
  return (
    <>
      <Col className="coin-detail-container">
        <Col className="coin-heading-container">
          <Title level={2} className="coin-name">
            {coinDetails?.name} ({coinDetails?.symbol})
          </Title>
          <p>
            {coinDetails?.name} live price in US Dollar (USD). View value
            statistics, market cap and supply.
          </p>
        </Col>
        <Select
          defaultValue="7d"
          className="select-timeperiod"
          placeholder="Select time period"
          onChange={(value) => setTimePeriod(value)}
        >
          {time.map((date) => (
            <Option key={date}>{date}</Option>
          ))}
        </Select>
        <LineChart
          coinHistory={coinHistory}
          currentPrice={millify(coinDetails.price)}
          coinName={coinDetails.name}
        />
        <Col className="stats-container">
          <Col className="coin-value-statistics">
            <Col className="coin-value-statistics-heading">
              <Title level={3} className="coin-details-heading">
                {coinDetails.name} Value Statistics
              </Title>
              <p>An overview showing the statistics of {coinDetails.name}</p>
            </Col>
            {stats.map(({ icon, title, value }, index) => (
              <Col className="coin-stats" key={index}>
                <Col className="coin-stats-name">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className="stats">{value}</Text>
              </Col>
            ))}
          </Col>

          <Col>
            <Col className="coin-value-statistics-heading">
              <Title level={3} className="coin-details-heading">
              Miscellaneous Statistics
              </Title>
              <p>An overview miscellaneous statistics of {coinDetails?.name}</p>
            </Col>
            {genericStats.map(({ icon, title, value }, index) => (
              <Col className="coin-stats" key={index}>
                <Col className="coin-stats-name">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className="stats">{value}</Text>
              </Col>
            ))}
          </Col>
        </Col>
        <Col className="coin-desc-link">
          <Row className="coin-desc">
            <Title level={3} className="coin-details-heading">
              What is {coinDetails.name}
            </Title>
            {HTMLReactParser(coinDetails.description)}
          </Row>
          <Col className="coin-links">
            <Title level={3} className="coin-details-heading">
              {coinDetails.name} Links
              {coinDetails.links.map((link, index) => (
                <Row className="coin-link" key={index}>
                  <Title level={5} className="link-name">
                    {link.type}
                  </Title>
                  <a href={link.url} target="_blank" rel="noreferrer">
                    {link.name}
                  </a>
                </Row>
              ))}
            </Title>
          </Col>
        </Col>
      </Col>
    </>
  );
};

export default CoinDetail;
