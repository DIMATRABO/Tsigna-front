import { HIDE_POP_UP, SET_CONTENT } from "../actions/popUpActions";

const initialState = {
  show: false,
  content: null,
};

export const PopUpReducer = (state = initialState, { type, content }) => {
  switch (type) {
    case HIDE_POP_UP:
      return {
        ...state,
        show: false,
        content: null,
      };
    case SET_CONTENT:
      return {
        ...state,
        show: true,
        content: content,
      };
    default:
      return state;
  }
};
