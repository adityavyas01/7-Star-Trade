import React, { useEffect, useState } from "react";
import axios from "axios";

const MainContent = () => {
  const [balance, setBalance] = useState(0);
  const [trades, setTrades] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    "/images/suraj [1].jpg",
    "/images/budh 2.jpg",
    "/images/SHUKR 3.jpg",
    "/images/PRTHAVI 4.jpg",
    "/images/MANGAL 5.jpg",
    "/images/BRHASPATI 6.jpg",
    "/images/SHANI 7.jpg",
    "/images/ARUN 8.jpg",
    "/images/VARUN 9.jpg",
    "/images/YAM 10.jpg",
  ];

  useEffect(() => {
    axios.get("/api/trades").then((response) => {
      setTrades(response.data);
    });

    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const sliderInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 1000);

    return () => clearInterval(sliderInterval);
  }, [slides.length]);

  const handleBalanceChange = (e) => {
    setBalance(e.target.value);
  };

  const handleSubmit = () => {
    axios.post("/api/trades", { balance }).then((response) => {
      setTrades([...trades, response.data]);
    });
  };

  const formatTime = (date) => {
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  };

  const formatDate = (date) => {
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  return (
    <div>
      <div className="nav">
        <nav>
          <h1>
            __________ <mark>7 STAR TRADE</mark> __________
          </h1>
          <input
            className="inputnav"
            type="number"
            placeholder="  Balance/-"
            id="balance"
            style={{ borderRadius: "5px", height: "30px" }}
            value={balance}
            onChange={handleBalanceChange}
          />
          <button onClick={handleSubmit}>Submit</button>
        </nav>
      </div>

      <div className="main">
        <img
          className="mainimg"
          src="/images/nebula-space-galaxy-colorful-4k-f7.jpg"
          alt=""
          height="625px"
          width="100%"
        />

        <div className="colm1">
          <h2 id="colm1">{formatTime(currentTime)}</h2>
        </div>
        <div className="colm2">
          <h2 id="colm2">{formatDate(currentTime)}</h2>
        </div>
        <div className="colm3">
          <h2 id="colm3">{/* Timer logic here */}</h2>
        </div>
        <div className="colm4">
          <h2 id="colm4">{/* Another timer logic here */}</h2>
        </div>

        <div className="mainbox">
          <img id="img" src={slides[currentIndex]} alt="Slide" />
        </div>
        <div className="mainbox2">
          {slides.map((slide, index) => (
            <div key={index} className={`box${index + 1}`}>
              <img src={slide} alt="" width="100%" height="100%" />
              <input
                className="input"
                id={`box${index + 1}`}
                type="number"
                min="0"
                step="10"
                defaultValue="0"
              />
            </div>
          ))}
        </div>

        <div className="resultbox1">
          <img
            style={{ width: "100%", height: "220px" }}
            src="/images/nebula-space-galaxy-colorful-4k-f7.jpg"
            alt=""
          />
          {slides.slice(0, 5).map((slide, index) => (
            <div key={index} className={`box${index + 11}`}>
              <img
                style={{ width: "100%", height: "150px" }}
                src={slide}
                alt=""
              />
              <input type="date" name="" id="" />
              <br />
              <input type="time" name="" id="" />
            </div>
          ))}
          <div className="box16">
            <img
              style={{ width: "100%", height: "150px" }}
              id="result"
              src={slides[currentIndex]}
              alt=""
            />
            <input type="date" name="" id="" />
            <br />
            <input type="time" name="" id="" />
          </div>
        </div>
      </div>

      <div className="footer">
        <mark>F4:</mark>{" "}
        <button className="btn" type="button">
          Cancel
        </button>
        <mark>F3:</mark>{" "}
        <button className="btn" type="button">
          Reprint
        </button>
        <mark>F6:</mark>{" "}
        <button className="btn" type="button">
          Print
        </button>
        <mark>F5:</mark>{" "}
        <button className="btn" type="button">
          Reset
        </button>
        <input
          className="idnumber"
          placeholder="ID Number"
          type="email"
          name=""
          id=""
        />
      </div>
    </div>
  );
};

export default MainContent;
