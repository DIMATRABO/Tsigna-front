import {
  HIDE_POP_UP,
  SET_AUTHENTICATED,
  SET_LABELS,
  SET_PREFERENCES,
  SET_SEARCH_VALUE,
  SET_USER_INFO,
  SHOW_LOADING,
  SHOW_NO_NETWOEK,
  SHOW_POP_UP,
  UPDATE_CONTEXT,
  UPDATE_PLANNINGS_MONTH,
  UPDATE_PLANNINGS_YEAR
} from '../actions/mainActions';
import store from 'store';

const initialState = {
  // FIXME: Deprecated; no need for this context after introducing ReactRouterV6
  context: store.get('context') ? store.get('context') : 'AgentsTrackPositions',
  showPopUp: false,
  loading: false,
  noNetwork: false,
  popUpMessage: '',
  preferences: [],
  labels: [],
  month: `${new Date().toLocaleString('en', { month: 'long' })}`,
  year: new Date().getFullYear(),
  authenticated: false,
  searchValue: undefined
};

export const MainReducer = (
  state = initialState,
  {
    type,
    newContext,
    message,
    userInfo,
    month,
    year,
    value,
    authenticated,
    searchValue,
    preferences,
    labels
  }
) => {
  switch (type) {
    case SET_PREFERENCES:
      return {
        ...state,
        preferences: preferences
      };
    case SET_LABELS:
      return {
        ...state,
        labels: labels
      };
    case UPDATE_CONTEXT:
      store.set('context', newContext, { path: '/' });
      return {
        ...state,
        context: newContext,
        noNetwork: false
      };
    case SHOW_POP_UP:
      return {
        ...state,
        showPopUp: true,
        popUpMessage: message
      };
    case HIDE_POP_UP:
      return {
        ...state,
        showPopUp: false
      };
    case SHOW_LOADING:
      return {
        ...state,
        loading: value
      };
    case SHOW_NO_NETWOEK:
      return {
        ...state,
        noNetwork: value
      };
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: authenticated
      };
    case SET_USER_INFO:
      return {
        ...state,
        userInfo: userInfo
      };
    case UPDATE_PLANNINGS_MONTH:
      return {
        ...state,
        month: month
      };
    case UPDATE_PLANNINGS_YEAR:
      return {
        ...state,
        year: year
      };
    case SET_SEARCH_VALUE:
      return {
        ...state,
        searchValue: searchValue?.toLowerCase()
      };
    default:
      return state;
  }
};
