import LeftShoulder from "components/leftShoulder/leftshoulder";
import httpClient from "httpClient/httpClient";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.scss";

function Home() {
  const navigate = useNavigate();
  const [bots, setBots] = useState([]);

  useEffect(() => {
    httpClient
      .get("/bot/all/me")
      .then((response) => {
        setBots(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="home">
      <LeftShoulder />
      <div className="main">
        <div className="title">Bots</div>
        <div className="content">
          {bots.map((bot) => {
            return (
              <div
                key={bot.id}
                className="bot-container"
                onClick={() => navigate(`/workspace/bot/${bot.id}`)}
              >
                <div className="icon-container">
                  <img className="icon" src="/images/bot.png" alt="bot" />
                </div>
                <div className="title">{bot.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
