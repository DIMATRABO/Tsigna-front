import "./App.scss";
import Main from "./components/main/main";
import Navbar from "./components/navbar/navbar";
import PopUp from "components/popUp/pop-up";
import { selectPopUpReducer } from "./reducers/selectors";
import { useSelector } from "react-redux";

const App = () => {
  const popUp = useSelector(selectPopUpReducer);
  const reducer = useSelector((reducer) => reducer.MainReducer);

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
