import React, { useState, useEffect } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
  // MoneyCollectOutlined,
  // BulbOutlined,
  FundOutlined,
  MenuOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import icon from "../images/cryptocurrency.png";

const { Item } = Menu;
const { Title } = Typography;

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(false);
  const [screenSize, setScreenSize] = useState(undefined);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="navbar">
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large"/>
        <Title level={2} className="logo">
          <Link to="/">CryptoVision</Link>
        </Title>
        <Button
          className="menu-control-container"
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <MenuOutlined style={{color: "white"}}/>
        </Button>
      </div>
      {activeMenu && (
        <Menu theme="dark">
          <Item icon={<HomeOutlined />} key="home">
            <Link to="/">Home</Link>
          </Item>

          <Item icon={<FundOutlined />} key="cryptocurrencies">
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
          </Item>

          {/* <Item icon={<MoneyCollectOutlined/>} key={3}>
            <Link to="/exchanges">Exchanges</Link>
          </Item> */}

          {/* <Item icon={<BulbOutlined/>} key={4}>
            <Link to="/news">News</Link>
          </Item> */}
        </Menu>
      )}
    </div>
    </div>
  );
};

export default Navbar;
