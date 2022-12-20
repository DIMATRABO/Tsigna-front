export const SET_TEMPLATES = "SET_TEMPLATES";
export const ADD_CARD = "ADD_CARD";
export const REMOVE_CARD = "REMOVE_CARD";
export const REMOVE_ARROW = "REMOVE_ARROW";
export const REMOVE_DRAFT = "REMOVE_DRAFT";
export const FOCUS_CARD = "FOCUS_CARD";
export const REMOVE_FOCUS_CARD = "REMOVE_FOCUS_CARD";
export const SET_DRAG_OVER_ITEM = "SET_DRAG_OVER_ITEM";
export const SET_FROM_CARD = "SET_FROM_CARD";
export const BUILD_ARROW = "BUILD_ARROW";
export const SET_TOP_LEFT = "SET_TOP_LEFT";
export const SET_FIELD_VALUE = "SET_FIELD_VALUE";
export const SET_AUTHENTICATED = "SET_AUTHENTICATED";
export const SET_USER_INFO = "SET_USER_INFO";

export const setTemplates = (list) => ({ type: SET_TEMPLATES, list });
export const addCard = (card) => ({ type: ADD_CARD, card });
export const removeCard = (id) => ({ type: REMOVE_CARD, id });
export const removeArrow = (id) => ({ type: REMOVE_ARROW, id });
export const removeDraft = () => ({ type: REMOVE_DRAFT });
export const focusCard = (id) => ({ type: FOCUS_CARD, id });
export const removeFocusCard = () => ({ type: REMOVE_FOCUS_CARD });
export const setDragOverItem = (id) => ({ type: SET_DRAG_OVER_ITEM, id });
export const setFromCard = (details) => ({ type: SET_FROM_CARD, details });
export const buildArrow = (startId) => ({ type: BUILD_ARROW, startId });
export const setTopLeft = (details) => ({ type: SET_TOP_LEFT, details });
export const setFieldValue = (details) => ({ type: SET_FIELD_VALUE, details });
export const setUserInfo = (userInfo) => ({ type: SET_USER_INFO, userInfo });
export const setAuthenticated = (authenticated) => ({
  type: SET_AUTHENTICATED,
  authenticated,
});
