import {
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
          type: "STRING",
          options: [],
          fromCard: false,
        },
        {
          label: "b",
          type: "STRING",
          options: [],
          fromCard: false,
        },
      ],
    },
    {
      title: "a > b",
      operation: ">",
      form: [
        {
          label: "a",
          type: "STRING",
          options: [],
          fromCard: false,
        },
        {
          label: "b",
          type: "BOOLEAN",
          options: [],
          fromCard: false,
        },
        {
          label: "c",
          type: "SELECT",
          options: ["opt1", "op2", "opt3"],
          fromCard: false,
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
  { type, card, id, details, startId }
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
          (arrow) => arrow.end !== details.cardId + "-" + details.label
        );
        cards = cards.map((card) => {
          if (card.id === details.cardId && card.details?.form?.length > 0) {
            card.details.form.map((item) => {
              if (item.label === details.label) {
                item.fromCard = false;
              }
              return item;
            });
          }
          return card;
        });
      } else {
        arrowEnds = details.cardId + "-" + details.label;
        cards = cards.map((card) => {
          if (card.id === details.cardId && card.details?.form?.length > 0) {
            card.details.form.map((item) => {
              if (item.label === details.label) {
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
