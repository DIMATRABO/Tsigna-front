import {
  ADD_CARD,
  FOCUS_CARD,
  REMOVE_CARD,
  ADD_ARROW,
  REMOVE_ARROW,
  REMOVE_FOCUS_CARD,
  SET_DRAG_OVER_ITEM,
} from "../actions/mainActions";

const initialState = {
  cards: [],
  arrows: [],
  ACTIONS: [
    {
      title: "Action1",
    },
    {
      title: "Action2",
    },
    {
      title: "Action3",
    },
    {
      title: "Action4",
    },
  ],
  OPERATIONS: [
    {
      title: "a < b",
      operation: "<",
      form: [
        {
          label: "a",
          type: "number",
        },
        {
          label: "b",
          type: "number",
        },
      ],
    },
    {
      title: "a > b",
      operation: ">",
      form: [
        {
          label: "a",
          type: "number",
        },
        {
          label: "b",
          type: "number",
        },
      ],
    },
  ],
  INDICATORS: [
    {
      title: "Indicator1",
    },
    {
      title: "Indicator2",
    },
    {
      title: "Indicator3",
    },
    {
      title: "Indicator4",
    },
  ],
  dragOverItem: null,
};

export const MainReducer = (
  state = initialState,
  { type, card, arrow, id }
) => {
  switch (type) {
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
      return {
        ...state,
        cards: state.cards.filter((card) => card.id !== id),
      };
    case ADD_ARROW:
      arrow.id += Date.now();
      return {
        ...state,
        arrows: [...state.arrows, arrow],
      };
    case REMOVE_ARROW:
      return {
        ...state,
        arrows: [...state.arrows].map((arrow) => {
          arrow.focus = false;
          return card;
        }),
      };
    default:
      return state;
  }
};
