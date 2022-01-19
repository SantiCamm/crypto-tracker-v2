import React from "react";
import { Space, Typography } from "antd";
import { Link } from "react-router-dom";

const { Title } = Typography;

const Footer = () => {
  return (
    <div className="footer">
      <Title level={5} style={{ color: "white", textAlign: "center" }}>
        CryptoVision &copy;
        <br />
        All rights reserved
      </Title>
      <Space>
        <Link to="/">Home</Link>
        <Link to="/exchanges">Exchanges</Link>
        {/* <Link to="/news">News</Link> */}
      </Space>
    </div>
  );
};

export default Footer;
