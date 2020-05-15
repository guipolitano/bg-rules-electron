import React, { useEffect, useState } from "react";

import List from "antd/es/list/";
import "antd/es/list/style/css";

import Row from "antd/es/row/";
import "antd/es/row/style/css";

import Col from "antd/es/col/";
import "antd/es/col/style/css";

import Spin from "antd/es/spin/";
import "antd/es/spin/style/css";

import { LoadingOutlined } from "@ant-design/icons";

import Item from "../Item";

function Favorites() {
  const [favorites, setFavorites] = useState(
    localStorage.getItem("favorites")
      ? JSON.parse(localStorage.getItem("favorites"))
      : []
  );
  const [list, setList] = useState([]);

  const renderItem = () =>
    favorites.map((e, index) => (
      <Item
        // setData={()=>{}}
        index={index}
        onClick={e.url ? () => console.log(e.url) : () => console.log(e.id)}
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
              {favorites.length === 0 ? (
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
