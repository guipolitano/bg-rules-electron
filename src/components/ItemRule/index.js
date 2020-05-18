import React from "react";

import AntdItem from "antd/es/list/Item";
import "antd/es/list/style/css";

import { findElement } from "../../util";

import { StarOutlined, StarFilled } from "@ant-design/icons";

function ItemRule({
  img,
  game,
  id,
  type,
  url,
  name,
  onClick,
  favorite,
  setData,
  index,
  updateFav,
}) {
  const fav = () => {
    const favorites = localStorage.getItem("favorites")
      ? JSON.parse(localStorage.getItem("favorites"))
      : [];
    setData((prev) => {
      const origin = [...prev];
      origin[index].favorite = !favorite;
      return origin;
    });
    if (!favorite) {
      localStorage.setItem(
        "favorites",
        JSON.stringify([
          ...favorites,
          {
            url,
            name,
            id,
            img,
            type,
            game,
            favorite: true,
          },
        ])
      );
    } else {
      const favIndex = findElement(favorites, "url", url);
      favorites.splice(favIndex, 1);
      localStorage.setItem("favorites", JSON.stringify([...favorites]));
    }
    updateFav();
  };

  return (
    <AntdItem
      actions={[
        favorite ? (
          <StarFilled
            onClick={fav}
            style={{ fontSize: 30, color: "#ffb100" }}
          />
        ) : (
          <StarOutlined onClick={fav} style={{ fontSize: 30 }} />
        ),
      ]}
    >
      <AntdItem.Meta
        avatar={<img style={{width: "75px"}} src={img} alt="board" />}
        title={
          <a onClick={onClick}>
            {name}
          </a>
        }
        description={<span>{game}</span>}
      />
    </AntdItem>
  );
}

export default ItemRule;
