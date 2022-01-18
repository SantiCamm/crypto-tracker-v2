import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import millify from "millify";
import { cryptoApi, useGetCryptosQuery } from "../services/cryptoApi";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: coinList, isFetching } = useGetCryptosQuery(count);
  const [coins, setCoins] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  console.log(coins);

  useEffect(() => {
    const filteredCoins = coinList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setCoins(filteredCoins);
  }, [coinList, searchQuery]);

  if (isFetching) return "Loading...";

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search coins"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {coins?.map((coin) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={coin.uuid}>
            <Link to={`/crypto/${coin.uuid}`}>
              <Card
                title={`${coin.rank}. ${coin.name}`}
                extra={<img className="crypto-image" src={coin.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(coin.price)}</p>
                <p>Market Cap: {millify(coin.marketCap)}%</p>
                <p>Daily Change: {millify(coin.change)}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
