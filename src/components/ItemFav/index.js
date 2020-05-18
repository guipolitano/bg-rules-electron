import React from 'react';

import AntdItem from "antd/es/list/Item";
import "antd/es/list/style/css";

import { StarOutlined, StarFilled } from "@ant-design/icons";


function ItemFav({img, url, name, type, game, onClick, favorite, unFav}) {
  return (
    <AntdItem
      actions={[
        favorite ? (
          <StarFilled
            onClick={() => unFav(url)}
            style={{ fontSize: 30, color: "#ffb100" }}
          />
        ) : (
          <StarOutlined onClick={() => unFav(url)} style={{ fontSize: 30 }} />
        ),
      ]}
    >
      <AntdItem.Meta
        avatar={<img style={{ width: "75px" }} src={img} alt="board" />}
        title={
          <a onClick={onClick}>
            {name}
          </a>
        }
        description={type === "rules" ? <span>{game}</span> : null}
      />
    </AntdItem>
  );
}

export default ItemFav;