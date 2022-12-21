import { removeDraft } from "actions/mainActions";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import store from "store";
import "./leftshoulder.scss";

function LeftShoulder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="left-shoulder">
      <div
        className="section"
        onClick={() => {
          navigate("/workspace/newBot");
        }}
      >
        Create new bot
      </div>
      <div
        className="section"
        onClick={() => {
          store.remove("token");
          store.remove("flag");
          dispatch(removeDraft());
        }}
      >
        Logout
      </div>
    </div>
  );
}

export default LeftShoulder;
