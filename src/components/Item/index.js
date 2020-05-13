import React from 'react';


function Item({img, name, onClick}) {
  return (
        <div onClick={onClick} className="card">
            <div>
                <img src={img}/>                
            </div>
            <div>
                <h4>{name}</h4>
            </div>
        </div>
    );
}

export default Item;