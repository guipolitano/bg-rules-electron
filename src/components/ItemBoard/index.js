import React from 'react';

import AntdItem from "antd/es/list/Item";
import "antd/es/list/style/css";

import { findElement } from "../../util"

import { StarOutlined, StarFilled } from "@ant-design/icons";


function Item({img, url, name, onClick, favorite, setData, index}) {
  const fav = () => {
    const favorites = localStorage.getItem("favorites")
      ? JSON.parse(localStorage.getItem("favorites"))
      : [];
    setData(prev => {
      const origin = [...prev];
      origin[index].favorite = !favorite;
      return origin;
    });
    if(!favorite){
      localStorage.setItem("favorites", JSON.stringify([...favorites, {
        url,name, img, "favorite": true
      }]))
    }else{
      const favIndex = findElement(favorites, "url", url);
      favorites.splice(favIndex, 1);
      localStorage.setItem("favorites", JSON.stringify([...favorites]))
    }
  }

  return (
    <AntdItem
      actions={[
        favorite ? (
          <StarFilled onClick={fav} style={{ fontSize: 30, color: "#ffb100" }} />
        ) : (
          <StarOutlined onClick={fav} style={{ fontSize: 30 }} />
        ),
      ]}
    >
      <AntdItem.Meta
        avatar={<img src={img} alt="board" />}
        title={<a href="#" onClick={onClick}>{name}</a>}
      />
    </AntdItem>
  );
//   return (
//         <div onClick={onClick} className="card">
//             <div>
//                 <img src={img}/>                
//             </div>
//             <div>
//                 <h4>{name}</h4>
//             </div>
//         </div>
//     );
}

export default Item;