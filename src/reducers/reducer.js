import { combineReducers } from "redux";
import { MainReducer } from "./main-reducer";
import { PopUpReducer } from "./pop-up-reducer";

const Reducer = combineReducers({
  MainReducer,
  PopUpReducer,
});

export default Reducer;
