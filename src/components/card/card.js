import Draggable from "react-draggable"; // The default
import "./card.scss";
import { IoIosCloseCircleOutline, IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { buildArrow, removeCard, setFromCard } from "../../actions/mainActions";
import { useEffect } from "react";

const Card = ({ card, updateXarrow }) => {
  const dispatch = useDispatch();
  const reducer = useSelector((reducer) => reducer.MainReducer);

  useEffect(() => {
    console.log(card);
    const cardElemet = document.getElementById(card.id);

    let resizeObserver = new ResizeObserver(() => {
      updateXarrow();
    });

    resizeObserver.observe(cardElemet);
  }, [card.id]);

  const fromCard = (cardId, label, value) => {
    dispatch(setFromCard({ cardId, label, value }));
  };

  const cardClass = (card) => {
    let className = "draggable-input";
    if (card.focus) {
      className += " focus";
    }
    if (reducer.headFromCard) {
      if (!reducer.headFromCard.includes(card.id)) {
        className += " wink up";
      } else {
        className += " up";
      }
    }
    return className;
  };

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
          className={cardClass(card)}
          onClick={() => {
            if (
              reducer.headFromCard &&
              !reducer.headFromCard.includes(card.id)
            ) {
              dispatch(buildArrow(card.id));
            }
          }}
          key={card?.id}
          style={{
            top: card?.top + "px",
            left: card?.left + "px",
          }}
        >
          {!reducer.headFromCard && (
            <IoIosCloseCircleOutline
              className="close"
              color="red"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                dispatch(removeCard(card.id));
              }}
            />
          )}
          {/* {!card.focus && (
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
          )} */}
          <div className="card-title">{card.details?.title}</div>
          {card.details?.type === "ACTION" && (
            <span>
              <label>
                <input
                  type="checkbox"
                  onChange={(e) => fromCard(card.id, null, e.target.checked)}
                />
                From card
              </label>
            </span>
          )}
          {card.details?.form &&
            card.details.form.map((item, index) => (
              <div className="card-form-element" key={index}>
                <div className="card-item-label">{item.label}:</div>
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      fromCard(card.id, item.label, e.target.checked)
                    }
                  />
                  From card
                </label>
                <div
                  className="card-item-value"
                  id={card?.id + "-" + item.label}
                >
                  {item.type === "STRING" && (
                    <input className="input" type="text"></input>
                  )}
                  {item.type === "BOOLEAN" && (
                    <>
                      <input
                        type="radio"
                        id="true"
                        name={"boolean" + index}
                        value="true"
                      />
                      <label for="true">True</label>
                      <input
                        type="radio"
                        id="false"
                        name={"boolean" + index}
                        value="false"
                      />
                      <label for="false">False</label>
                    </>
                  )}
                  {item.type === "SELECT" && item.options?.length > 0 && (
                    <select
                      className="input"
                      name="Options"
                      id={"options" + index}
                    >
                      {item.options.map((option) => (
                        <option value={option}>{option}</option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
            ))}
        </div>
      )}
    </Draggable>
  );
};

export default Card;
