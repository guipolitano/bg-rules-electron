import React, {useState} from 'react';
import axios from "axios";
import Item from "./components/Item";
import Loader from "./components/Loader";
import './App.css';

function App() {
  const [data, setData] = useState([]);
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

  return (
    <div className="container">
      <div className="row">
        <input onKeyPress={handleSearch} placeholder="Digite o nome do jogo" />
      </div>
      <div className="row">
        <div className="col">
          {!loading && data.length === 0 ? <div className="no-record">Nenhum registro encontrado</div> : ""}
          { loading ? <Loader/> : data.map((e, index) => <Item onClick={e.url ? ()=>handleRules(e.url) : () => downloadPDF(e.id)} key={index} {...e}/>)}
        </div>
      </div>
    </div>
  );
}

export default App;
