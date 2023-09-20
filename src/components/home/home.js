import { removeDraft } from "actions/mainActions";
import httpClient from "httpClient/httpClient";
import React, { useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import store from "store";
import "./home.scss";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [bots, setBots] = useState([]);

  useEffect(() => {
    httpClient
      .get("/bots/me")
      .then((response) => {
        setBots(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="home">
      <div className="header">
        <div
          className="header-menu"
          onClick={() => {
            navigate("/workspace/newBot");
          }}
        >
          <div className="text">New bot</div>
        </div>
        <div
          className="header-menu"
          onClick={() => {
            store.remove("token");
            store.remove("flag");
            dispatch(removeDraft());
          }}
        >
          <div className="text">Log out</div>
        </div>
      </div>
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
              <IoIosCloseCircleOutline
                className="delete"
                color="red"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  //delete bot
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
