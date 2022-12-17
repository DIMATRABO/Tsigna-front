import {
  SET_TEMPLATES,
  ADD_CARD,
  FOCUS_CARD,
  REMOVE_CARD,
  REMOVE_ARROW,
  REMOVE_FOCUS_CARD,
  SET_DRAG_OVER_ITEM,
  SET_FROM_CARD,
  BUILD_ARROW,
} from "../actions/mainActions";

const initialState = {
  headFromCard: null,
  cards: [],
  arrows: [],
  templates: [],
  dragOverItem: null,
};

export const MainReducer = (
  state = initialState,
  { list, type, card, id, details, startId }
) => {
  switch (type) {
    case SET_TEMPLATES:
      return {
        ...state,
        templates: list,
      };
    case ADD_CARD:
      card.id += Date.now();
      return {
        ...state,
        cards: [...state.cards, card],
      };
    case FOCUS_CARD:
      const cardsCopy = [...state.cards].map((card) => {
        if (card.id === id) {
          card.focus = true;
        } else {
          card.focus = false;
        }
        return card;
      });
      return {
        ...state,
        cards: cardsCopy,
      };
    case REMOVE_FOCUS_CARD:
      return {
        ...state,
        cards: [...state.cards].map((card) => {
          card.focus = false;
          return card;
        }),
      };
    case SET_DRAG_OVER_ITEM:
      return {
        ...state,
        dragOverItem: id,
      };
    case REMOVE_CARD:
      let newArrows = [...state.arrows];
      newArrows = newArrows.filter(
        (arrow) =>
          (!arrow.start.includes(id) && !arrow.end.includes(id))
      );
      return {
        ...state,
        cards: state.cards.filter((card) => card.id !== id),
        arrows: newArrows
      };
    case REMOVE_ARROW:
      return {
        ...state,
        arrows: [...state.arrows].map((arrow) => {
          arrow.focus = false;
          return card;
        }),
      };
    case SET_FROM_CARD:
      let arrows = [...state.arrows];
      let cards = [...state.cards];
      let arrowEnds = null;
      if (!details.value) {
        arrows = arrows.filter(
          (arrow) =>
            arrow.end !==
            details.cardId + (details.key ? "-" + details.key : "")
        );
        cards = cards.map((card) => {
          if (card.id === details.cardId && card.details?.form?.length > 0) {
            card.details.form.map((item) => {
              if (item.key === details.key) {
                item.fromCard = false;
              }
              return item;
            });
          }
          return card;
        });
      } else {
        arrowEnds = details.cardId + (details.key ? "-" + details.key : "");
        cards = cards.map((card) => {
          if (card.id === details.cardId && card.details?.form?.length > 0) {
            card.details.form.map((item) => {
              if (item.key === details.key) {
                item.fromCard = true;
              }
              return item;
            });
          }
          return card;
        });
      }
      return {
        ...state,
        arrows,
        cards,
        headFromCard: arrowEnds,
      };
    case BUILD_ARROW:
      const arrowId = Date.now();
      const arrowStart = startId;
      const arrowEnd = state.headFromCard;
      return {
        ...state,
        arrows: [
          ...state.arrows,
          { id: arrowId, start: arrowStart, end: arrowEnd },
        ],
        headFromCard: null,
      };
    default:
      return state;
  }
};
