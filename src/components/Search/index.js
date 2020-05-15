import React, { useState, useEffect, useRef } from "react";

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

import ItemGame from "../ItemGame";
import ItemRule from "../ItemRule";

function Search({
  updateFav,
  favorites,
  loading,
  data,
  setData,
  handleRules,
  downloadPDF,
  handleSearch,
  goBack
}) {
  const [list, setList] = useState([]);
  
  const inputEl = useRef(null);

  const renderItem = () =>
    data.map((e, index) => {
      if (e.type === "game") {
        return (
          <ItemGame
            updateFav={updateFav}
            setData={setData}
            index={index}
            onClick={() => handleRules(e)}
            key={index}
            {...e}
          />
        );
      } else {
        return (
          <ItemRule
            updateFav={updateFav}
            setData={setData}
            index={index}
            onClick={() => downloadPDF(e.id)}
            key={index}
            {...e}
          />
        );
      }
    });
  useEffect(() => {
    setList(renderItem);
  }, [data]);

  useEffect(() => {
    const e = { key: "Enter", target: { value: inputEl.current.state.value } };
    handleSearch(e);
  }, [favorites]);

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
            ref={inputEl}
            size="large"
            allowClear
            onKeyPress={handleSearch}
            placeholder="Digite o nome do jogo"
          />
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={24} style={{ display: "flex" }}>
          {loading ? (
            <Spin
              indicator={
                <LoadingOutlined
                  style={{ fontSize: 50, marginTop: "50px" }}
                  spin
                />
              }
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
