import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./login.scss";
import { setAuthenticated, setUserInfo } from "actions/mainActions";
import store from "store";
import jwt_decode from "jwt-decode";
import httpClient from "httpClient/httpClient";

const Login = () => {
  const dispatch = useDispatch();

  const savedUsername = store.get("su");
  const [username, setUsername] = useState(savedUsername);
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
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="login-form__title">Login</h1>
        <div className="login-form__field">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="login-form__field">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="login-form__subtitle">
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
          <label htmlFor="rememberme">Remember me</label>
        </div>
        {!loading && (
          <button
            type="submit"
            className="login-form__button"
            disabled={!username || !password}
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
        {loading && <div>Loading...</div>}
      </form>
      <div className="footer">Powered By Anas l3adim</div>
    </>
  );
};

export default Login;
