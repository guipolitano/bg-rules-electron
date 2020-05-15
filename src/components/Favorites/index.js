import React, { useEffect, useState } from "react";

import List from "antd/es/list/";
import "antd/es/list/style/css";

import Row from "antd/es/row/";
import "antd/es/row/style/css";

import Col from "antd/es/col/";
import "antd/es/col/style/css";

import ItemFav from "../ItemFav";
import { findElement } from "../../util";

function Favorites({ favorites, updateFav, setActiveKey, handleRules, downloadPDF }) {
  const [list, setList] = useState([]);

  const unFav = (url) => {
    const favIndex = findElement(favorites, "url", url);
    favorites.splice(favIndex, 1);
    localStorage.setItem("favorites", JSON.stringify([...favorites]));
    updateFav();
  };

  const handleClickGame = (e) => {
    setActiveKey("1");
    handleRules(e);
  }

  const renderItem = () =>
    favorites.map((e, index) => (
      <ItemFav
        unFav={unFav}
        onClick={e.type === "game" ? () => handleClickGame(e) : () => downloadPDF(e.id)}
        key={index}
        {...e}
      />
    ));
  useEffect(() => {
    setList(renderItem);
  }, [favorites]);
  return (
    <div className="container">
      <Row gutter={[8, 8]}>
        <Col span={24} style={{ display: "flex" }}>
          <List size="large">
            {favorites && favorites.length === 0 ? (
              <div>Nenhum favorito registrado</div>
            ) : (
              ""
            )}
            {list}
          </List>
        </Col>
      </Row>
    </div>
  );
}

export default Favorites;
