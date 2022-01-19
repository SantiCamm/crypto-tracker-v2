import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import {
  Navbar,
  Homepage,
  Cryptocurrencies,
  Exchanges,
  CoinDetail,
  // News,
} from "./components";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route exact path="/" element={<Homepage />} />
              <Route
                exact
                path="/cryptocurrencies"
                element={<Cryptocurrencies />}
              />
              <Route exact path="/exchanges" element={<Exchanges />} />
              <Route exact path="/crypto/:coinId" element={<CoinDetail />} />
              {/* <Route exact path="/news" element={<News />} /> */}
            </Routes>
          </div>
        </Layout>
        <Footer />
      </div>
    </div>
  );
};

export default App;
