import React from 'react';

import Tabs from "antd/es/tabs";
import "antd/es/tabs/style/css";

import Search from "./components/Search";
import Favorites from "./components/Favorites";
import './App.css';

function App() {

  return (
    <div className="container">
      <Tabs
        defaultActiveKey="1"
        onTabClick={() =>
          (document.querySelector(
            ".ant-tabs.ant-tabs-top.ant-tabs-line"
          ).scrollTop = 0)
        }
      >
        <Tabs.TabPane tab="SEARCH" key="1">
          <Search />
        </Tabs.TabPane>
        <Tabs.TabPane tab="FAVORITES" key="2">
          <Favorites />
        </Tabs.TabPane>
        <Tabs.TabPane tab="LOGIN" key="3">
          Content of Tab Pane 3
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
  // return (
  //   <div className="container">
  //     <div className="row">
  //       {prevData.length > 0 && (
  //         <div className="icon return" onClick={() => goBack()}>
  //           <i className="fas fa-arrow-left"></i>
  //         </div>
  //       )}
  //       <input onKeyPress={handleSearch} placeholder="Digite o nome do jogo" />
  //       <div className="icon favorites" onClick={() => setData(favorites)}>
  //         <i className="fas fa-star"></i>
  //       </div>
  //     </div>
  //     <div className="row">
  //       <div className="col">
  //         {!loading && data.length === 0 ? (
  //           <div className="no-record">Nenhum registro encontrado</div>
  //         ) : (
  //           ""
  //         )}
  //         {loading ? (
  //           <Loader />
  //         ) : (
  //           data.map((e, index) => (
  //             <Item
  //               onClick={
  //                 e.url ? () => handleRules(e.url) : () => downloadPDF(e.id)
  //               }
  //               key={index}
  //               {...e}
  //             />
  //           ))
  //         )}
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default App;
