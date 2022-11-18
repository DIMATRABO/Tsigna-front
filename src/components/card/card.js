import Draggable from "react-draggable"; // The default
import "./card.scss";
import { IoIosCloseCircleOutline, IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useDispatch } from "react-redux";
import {
  focusCard,
  removeCard,
  removeFocusCard,
} from "../../actions/mainActions";
import { useEffect } from "react";

const Card = ({ card, updateXarrow }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const cardElemet = document.getElementById(card.id);

    let resizeObserver = new ResizeObserver(() => {
      updateXarrow();
    });

    resizeObserver.observe(cardElemet);
  }, [card.id, updateXarrow]);

  return (
    <Draggable
      onDrag={() => {
        updateXarrow();
      }}
      onStop={updateXarrow}
      bounds="parent"
    >
      {!!card && (
        <div
          id={card?.id}
          onRes={updateXarrow}
          className={`draggable-input ${card.focus ? "focus" : ""}`}
          key={card?.id}
          style={{
            top: card?.top + "px",
            left: card?.left + "px",
          }}
        >
          <IoIosCloseCircleOutline
            className="close"
            color="red"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch(removeCard(card.id));
            }}
          />
          {!card.focus && (
            <IoIosEye
              className="eye"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(focusCard(card.id));
              }}
            />
          )}
          {card.focus && (
            <IoIosEyeOff
              className="eye"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(removeFocusCard());
              }}
            />
          )}
          <div className="card-title">{card.name}</div>
          {card.focus && (
            <div id={card?.id + "hhh"} className="card-content"></div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Card;
