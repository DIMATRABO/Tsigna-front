/**
 * Example: deriving-data-selectors
 *
 * In a typical Redux application, the logic for deriving data is usually written as functions we call selectors.
 *
 * Selectors are primarily used to encapsulate logic for looking up specific values from state,
 * logic for actually deriving values, and improving performance by avoiding unnecessary recalculations.
 *
 * You are not required to use selectors for all state lookups, but they are a standard pattern and widely used.
 */

export const selectMainReducer = (state) => state.MainReducer;
export const selectCards = (state) => state.MainReducer.cards;
export const selectArrows = (state) => state.MainReducer.arrows;
export const selectPopUpReducer = (state) => state.PopUpReducer;
export const selectAuthenticated = (state) => state.MainReducer.authenticated;
