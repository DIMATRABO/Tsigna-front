import "./App.scss";
import PopUp from "components/popUp/pop-up";
import {
  selectAuthenticated,
  selectPopUpReducer,
  selectMainReducer,
} from "./reducers/selectors";
import store from "store";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setAuthenticated, setUserInfo } from "actions/mainActions";
import Login from "components/login/login";
import Gateway from "components/gateway/gateway";

const App = () => {
  const popUp = useSelector(selectPopUpReducer);
  const reducer = useSelector(selectMainReducer);
  const dispatch = useDispatch();

  const authenticated = useSelector(selectAuthenticated);
  const storeToken = store.get("token");

  useEffect(() => {
    if (storeToken) {
      try {
        const decoded_token = jwt_decode(storeToken);
        dispatch(setAuthenticated(true));
        dispatch(setUserInfo(decoded_token));
      } catch {
        console.log("error");
        store.remove("token");
      }
    }
  }, [dispatch, storeToken]);

  return (
    <div className="App">
      {(!storeToken || !authenticated) && <Login />}
      {storeToken && authenticated && (
        <>
          <Gateway />
          {popUp.show && <PopUp content={popUp.content} />}
          {reducer.headFromCard && <div className="blur-layer" />}
        </>
      )}
    </div>
  );
};

export default App;
