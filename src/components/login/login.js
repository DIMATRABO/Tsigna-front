import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./login.scss";
import { setAuthenticated, setUserInfo } from "actions/mainActions";
import store from "store";
import jwt_decode from "jwt-decode";
import httpClient from "httpClient/httpClient";
import SignIn from "components/signIn/SignIn";

const Login = () => {
  const dispatch = useDispatch();

  const savedUsername = store.get("su");
  const [username, setUserName] = useState(savedUsername);
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(!!savedUsername);

  const handleSubmit = () => {
    if (!loading) {
      setLoading(true);
      httpClient
        .post("user/auth", {
          login: username,
          passwd: password,
        })
        .then((response) => {
          const decoded_token = jwt_decode(response.data);
          store.set("token", response.data);
          if (rememberMe) store.set("su", username);
          store.set("flag", "show");
          dispatch(setUserInfo(decoded_token));
          dispatch(setAuthenticated(true));
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && username && password) {
      handleSubmit();
    }
  };

  return (
    <div className="login-wrapper">
      <div className="form-container">
        <div className="fields">
          <div className="title">Login</div>
          <div className="field">
            <input
              className="login-input"
              type="text"
              id="username"
              defaultValue={username}
              placeholder="Username"
              onChange={(e) => setUserName(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="field">
            <input
              className="login-input"
              id="password"
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="checkbox-field">
            <input
              id="rememberme"
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked === false) store.remove("su");
                setRememberMe(e.target.checked);
              }}
              checked={rememberMe}
              label="Se souvenir de moi"
              color="white"
            />
            <label htmlFor="rememberme">Remember username</label>
          </div>
          <div className="field">
            <>
              {!loading && (
                <SignIn
                  label={"Se connecter"}
                  handleSubmit={handleSubmit}
                  isDisabled={!username || !password}
                  backgroundColor="white"
                  color="black"
                />
              )}
              {loading && <div>Loading...</div>}
            </>
          </div>
          <div className="footer">Powered By Anas l3adim</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
