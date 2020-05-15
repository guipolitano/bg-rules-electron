import React, {useState, useEffect} from "react";
import axios from "axios";

import List from "antd/es/list/";
import "antd/es/list/style/css";

import Row from "antd/es/row/";
import "antd/es/row/style/css";

import Col from "antd/es/col/";
import "antd/es/col/style/css";

import Input from "antd/es/input/";
import "antd/es/input/style/css";

import Spin from "antd/es/spin/";
import "antd/es/spin/style/css";

import { LeftOutlined, LoadingOutlined } from "@ant-design/icons";

import Item from "../Item";
import { checkFavorites } from "../../util"

function Search() {
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [prevData, setPrevData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      setLoading(true);
      const response = await axios.get(
        `https://bg-rules-crawler.herokuapp.com/search?game=${e.target.value}`
        );
      const addFav = checkFavorites(response.data, "search");
      setData(addFav);
      setLoading(false);
    }
  };

  const handleRules = async (e) => {
    setLoading(true);
    const response = await axios.get(
      `https://bg-rules-crawler.herokuapp.com/rules?url=${e}`
    );
    setPrevData(data);
    const addFav = checkFavorites(response.data, "rule");
    setData(addFav);
    setLoading(false);
  };

  const downloadPDF = async (e) => {
    setLoading(true);
    const response = await axios.get(
      `https://bg-rules-crawler.herokuapp.com/pdf?id=${e}`
    );
    window.open(response.data, "_blank");
    setLoading(false);
  };

  const goBack = () => {
    setData(prevData);
    setPrevData([]);
  };

  const renderItem = () =>
    data.map((e, index) => (
      <Item
        setData={setData}
        index={index}
        onClick={e.url ? () => handleRules(e.url) : () => downloadPDF(e.id)}
        key={index}
        {...e}
      />
    ));
  useEffect(()=>{
    setList(renderItem)
  }, [data]);

  return (
    <div className="container">
      <Row gutter={[8, 8]}>
        <Col>
          <div
            className="return"
            style={{ cursor: "pointer" }}
            onClick={() => goBack()}
          >
            <LeftOutlined /> Voltar
          </div>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Input
            size="large"
            allowClear
            onKeyPress={handleSearch}
            placeholder="Digite o nome do jogo"
          />
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={24} style={{display:"flex"}}>
          {loading ? (
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 50, marginTop: "50px" }} spin />}
            />
          ) : (
            <List size="large">
              {!loading && data.length === 0 ? (
                <div>Nenhum registro encontrado</div>
              ) : (
                ""
              )}
              {list}
            </List>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default Search;
