export const ADD_CARD = "ADD_CARD";
export const REMOVE_CARD = "REMOVE_CARD";
export const REMOVE_ARROW = "REMOVE_ARROW";
export const FOCUS_CARD = "FOCUS_CARD";
export const REMOVE_FOCUS_CARD = "REMOVE_FOCUS_CARD";
export const SET_DRAG_OVER_ITEM = "SET_DRAG_OVER_ITEM";
export const SET_FROM_CARD = "SET_FROM_CARD";
export const BUILD_ARROW = "BUILD_ARROW";

export const addCard = (card) => ({ type: ADD_CARD, card });
export const removeCard = (id) => ({ type: REMOVE_CARD, id });
export const removeArrow = (id) => ({ type: REMOVE_ARROW, id });
export const focusCard = (id) => ({ type: FOCUS_CARD, id });
export const removeFocusCard = () => ({ type: REMOVE_FOCUS_CARD });
export const setDragOverItem = (id) => ({ type: SET_DRAG_OVER_ITEM, id });
export const setFromCard = (details) => ({ type: SET_FROM_CARD, details });
export const buildArrow = (startId) => ({ type: BUILD_ARROW, startId });
