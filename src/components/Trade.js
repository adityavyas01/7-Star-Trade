import React, { useState, useEffect } from "react";
import axios from "axios";

const Trade = () => {
  const [trades, setTrades] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    axios.get("/api/trades").then((response) => {
      setTrades(response.data);
    });
  }, []);

  const handleBalanceChange = (e) => {
    setBalance(e.target.value);
  };

  const handleSubmit = () => {
    axios.post("/api/trades", { balance }).then((response) => {
      setTrades([...trades, response.data]);
    });
  };

  return (
    <div>
      <nav>
        <h1>7 STAR TRADE</h1>
        <input
          type="number"
          placeholder="Balance"
          value={balance}
          onChange={handleBalanceChange}
        />
        <button onClick={handleSubmit}>Submit</button>
      </nav>
      <div className="main">
        {trades.map((trade) => (
          <div key={trade._id}>
            <h2>{trade.colm1}</h2>
            <h2>{trade.colm2}</h2>
            <h2>{trade.colm3}</h2>
            <h2>{trade.colm4}</h2>
            <img src={trade.img} alt="Trade" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trade;
