import React, {useState, useEffect} from 'react';
import axios from "axios";
import Item from "./components/Item";
import Loader from "./components/Loader";
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [prevData, setPrevData] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);


  const handleSearch = async (e) => {
    if(e.key === "Enter"){
      setLoading(true);
      const response = await axios.get(
        `https://bg-rules-crawler.herokuapp.com/search?game=${e.target.value}`
      );
      setData(response.data);
      setLoading(false);
    }
  }

  const handleRules = async (e) => {
    setLoading(true);
    const response = await axios.get(
      `https://bg-rules-crawler.herokuapp.com/rules?url=${e}`
    );
    setPrevData(data);
    setData(response.data);
    setLoading(false);
  }

  const downloadPDF = async (e) => {
    setLoading(true);
    const response = await axios.get(
      `https://bg-rules-crawler.herokuapp.com/pdf?id=${e}`
    );
    window.open(response.data, "_blank");
    setLoading(false);
  }
  
  const goBack = () => {
    setData(prevData);
    setPrevData([]);
  };
  
  useEffect(()=> {
    // const favorites = JSON.parse(localStorage.getItem("favorites"));
    // console.log(...favorites)
    // localStorage.setItem("favorites", JSON.stringify([...favorites, { img: "", name: "", url: "" }]),
    // );
    setFavorites(JSON.parse(localStorage.getItem("favorites")));
  }, []);

  return (
    <div className="container">
      <div className="row">
        {prevData.length > 0 && (
          <div className="icon return" onClick={() => goBack()}>
            <i className="fas fa-arrow-left"></i>
          </div>
        )}
        <input onKeyPress={handleSearch} placeholder="Digite o nome do jogo" />
        <div className="icon favorites" onClick={() => setData(favorites)}>
          <i className="fas fa-star"></i>
        </div>
      </div>
      <div className="row">
        <div className="col">
          {!loading && data.length === 0 ? (
            <div className="no-record">Nenhum registro encontrado</div>
          ) : (
            ""
          )}
          {loading ? (
            <Loader />
          ) : (
            data.map((e, index) => (
              <Item
                onClick={
                  e.url ? () => handleRules(e.url) : () => downloadPDF(e.id)
                }
                key={index}
                {...e}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
