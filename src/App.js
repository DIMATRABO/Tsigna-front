import "./App.scss";
import Main from "./components/main/main";
import Navbar from "./components/navbar/navbar";
import PopUp from "components/popUp/pop-up";
import { selectPopUpReducer } from "./reducers/selectors";
import httpClient from "httpClient/httpClient";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setTemplates } from "actions/mainActions";

const App = () => {
  const popUp = useSelector(selectPopUpReducer);
  const reducer = useSelector((reducer) => reducer.MainReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    //fill templates
    httpClient
      .get("/template/all")
      .then((res) => {
        dispatch(setTemplates(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Main />
      {popUp.show && <PopUp content={popUp.content} />}
      {reducer.headFromCard && <div className="blur-layer" />}
    </div>
  );
};

export default App;
