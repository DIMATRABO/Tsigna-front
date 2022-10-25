export const UPDATE_CONTEXT = 'UPDATE_CONTEXT';
export const SHOW_POP_UP = 'SHOW_POP_UP';
export const HIDE_POP_UP = 'HIDE_POP_UP';
export const SHOW_LOADING = 'SHOW_LOADING';
export const SHOW_NO_NETWOEK = 'SHOW_NO_NETWOEK';
export const SET_USER_INFO = 'SET_USER_INFO';
export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
export const UPDATE_PLANNINGS_MONTH = 'UPDATE_PLANNINGS_MONTH';
export const UPDATE_PLANNINGS_YEAR = 'UPDATE_PLANNINGS_YEAR';
export const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE';
export const SET_PREFERENCES = 'SET_PREFERENCES';
export const SET_LABELS = 'SET_LABELS';

/**
 * Deprecated:
 *  we use a Router to navigate between pages, instead of an app context
 */
// export const updateContext = (newContext) => ({ type: UPDATE_CONTEXT, newContext });
export const showPopUp = (message) => ({ type: SHOW_POP_UP, message });
export const hidePopUp = () => ({ type: HIDE_POP_UP });
export const showLoading = (value) => ({ type: SHOW_LOADING, value });
export const showNoNetwork = (value) => ({ type: SHOW_NO_NETWOEK, value });
export const setUserInfo = (userInfo) => ({ type: SET_USER_INFO, userInfo });
export const setAuthenticated = (authenticated) => ({
  type: SET_AUTHENTICATED,
  authenticated
});
export const updatePlanningsMonth = (month) => ({
  type: UPDATE_PLANNINGS_MONTH,
  month
});
export const updatePlanningsYear = (year) => ({
  type: UPDATE_PLANNINGS_YEAR,
  year
});
export const setSearchValue = (searchValue) => ({
  type: SET_SEARCH_VALUE,
  searchValue
});
export const setPreferences = (preferences) => ({
  type: SET_PREFERENCES,
  preferences
});
export const setLabels = (labels) => ({ type: SET_LABELS, labels });
