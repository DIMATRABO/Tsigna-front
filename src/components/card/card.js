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
          <div className="card-title">{card.details?.title}</div>
          {card.details?.form?.map((item, index) => (
            <div className="card-form-element" key={index}>
              <div className="card-item-label">{item.label}</div>
              <div className="card-item-value">{item.value}</div>
            </div>
          ))}
          <div
            id={card?.id + "hhh"}
            className={card.focus ? "card-content" : "card-content hidden"}
          ></div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
