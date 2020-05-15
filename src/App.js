import React, { useState } from "react";
import axios from "axios";

import Tabs from "antd/es/tabs";
import "antd/es/tabs/style/css";

import Search from "./components/Search";
import Favorites from "./components/Favorites";
import { checkFavorites, getStorage  } from "./util";

import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeKey, setActiveKey] = useState("1");
  const [favorites, setFavorites] = useState(getStorage());

  const [prevData, setPrevData] = useState([]);
  
  const goBack = () => {
    setData(prevData);
    setPrevData([]);
  };

  const updateFav = () => {
    setFavorites(getStorage());
  };

  // const base_url = "https://bg-rules-crawler.herokuapp.com";
  const base_url = "http://localhost:8080";

  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      setLoading(true);
      const response = await axios.get(
        `${base_url}/search?game=${e.target.value}`
      );
      const addFav = checkFavorites(response.data, "search");
      setData(addFav);
      setLoading(false);
    }
  };

  const handleRules = async (e) => {
    setLoading(true);
    const response = await axios.get(
      `${base_url}/rules?url=${e.url}&game=${e.name}`
    );
    setPrevData(data);
    const addFav = checkFavorites(response.data, "rule");
    setData(addFav);
    setLoading(false);
  };

  const downloadPDF = async (e) => {
    setLoading(true);
    const response = await axios.get(`${base_url}/pdf?id=${e}`);
    window.open(response.data, "_blank");
    setLoading(false);
  };

  const backToTop = (e) => {
    setActiveKey(e);
    document.querySelector(
      ".ant-tabs.ant-tabs-top.ant-tabs-line"
    ).scrollTop = 0;
  };

  return (
    <div className="container">
      <Tabs activeKey={activeKey} onTabClick={backToTop}>
        <Tabs.TabPane tab="SEARCH" key="1">
          <Search
            favorites={favorites}
            updateFav={updateFav}
            loading={loading}
            data={data}
            setData={setData}
            handleRules={handleRules}
            downloadPDF={downloadPDF}
            handleSearch={handleSearch}
            goBack={goBack}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="FAVORITES" key="2">
          <Favorites
            setActiveKey={setActiveKey}
            favorites={favorites}
            updateFav={updateFav}
            handleRules={handleRules}
            downloadPDF={downloadPDF}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="LOGIN" key="3">
          Content of Tab Pane 3
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default App;
