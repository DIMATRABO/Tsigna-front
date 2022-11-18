export const ADD_CARD = "ADD_CARD";
export const REMOVE_CARD = "REMOVE_CARD";
export const ADD_ARROW = "ADD_ARROW";
export const REMOVE_ARROW = "REMOVE_ARROW";
export const FOCUS_CARD = "FOCUS_CARD";
export const REMOVE_FOCUS_CARD = "REMOVE_FOCUS_CARD";
export const SET_DRAG_OVER_ITEM = "SET_DRAG_OVER_ITEM";

export const addCard = (card) => ({ type: ADD_CARD, card });
export const removeCard = (id) => ({ type: REMOVE_CARD, id });
export const addArrow = (arrow) => ({ type: ADD_ARROW, arrow });
export const removeArrow = (id) => ({ type: REMOVE_ARROW, id });
export const focusCard = (id) => ({ type: FOCUS_CARD, id });
export const removeFocusCard = () => ({ type: REMOVE_FOCUS_CARD });
export const setDragOverItem = (id) => ({ type: SET_DRAG_OVER_ITEM, id });
