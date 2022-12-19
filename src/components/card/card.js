import Draggable from "react-draggable"; // The default
import "./card.scss";
import { IoIosCloseCircleOutline, IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  buildArrow,
  removeCard,
  setFieldValue,
  setFromCard,
  setTopLeft,
} from "../../actions/mainActions";
import { useEffect } from "react";

const Card = ({ card, updateXarrow }) => {
  const dispatch = useDispatch();
  const reducer = useSelector((reducer) => reducer.MainReducer);

  // useEffect(() => {
  //   const cardElemet = document.getElementById(card.id);

  //   let resizeObserver = new ResizeObserver(() => {
  //     updateXarrow();
  //   });

  //   resizeObserver.observe(cardElemet);
  // }, [card.id]);

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

  const saveTopLeft = () => {
    const cardElemet = document.getElementById(card.id);
    const cardTop = cardElemet.offsetTop;
    const cardLeft = cardElemet.offsetLeft;
    var style = window.getComputedStyle(cardElemet);
    const matrix =
      style.transform || style.webkitTransform || style.mozTransform;
    const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(", ");
    const x = matrixValues[4];
    const y = matrixValues[5];
    dispatch(
      setTopLeft({
        cardId: card.id,
        top: parseInt(cardTop) + parseInt(y),
        left: parseInt(cardLeft) + parseInt(x),
      })
    );
  };

  const s = (e) => {
    console.log(e);
  };
  return (
    <Draggable onDrag={updateXarrow} onStop={saveTopLeft} bounds="parent">
      {!!card && (
        <div
          id={card?.id}
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
            top: card?.initialTop + "px",
            left: card?.initialLeft + "px",
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
          <div className="card-title">{card?.title}</div>
          {card?.form &&
            card?.form.map((field, index) => (
              <div className="card-form-element" key={index}>
                <div className="card-item-label">{field.key}:</div>
                {card?.templateType !== "INPUT" && (
                  <label>
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        dispatch(
                          setFromCard({
                            cardId: card.id,
                            key: field.key,
                            value: e.target.checked,
                          })
                        )
                      }
                    />
                    From card
                  </label>
                )}
                <div
                  className="card-item-value"
                  id={card?.id + "-" + field.key}
                >
                  {(field.type === "STRING" ||
                    field.type === "INTEGER" ||
                    field.type === "FLOAT") && (
                    <input
                      className="input"
                      type="text"
                      disabled={field.fromCard}
                      onChange={(e) =>
                        dispatch(
                          setFieldValue({
                            cardId: card.id,
                            key: field.key,
                            value: e.target.value,
                          })
                        )
                      }
                    ></input>
                  )}
                  {field.type === "BOOLEAN" && (
                    <>
                      <input
                        type="radio"
                        id="true"
                        name={"boolean" + index}
                        value="true"
                        disabled={field.fromCard}
                      />
                      <label htmlFor="true">True</label>
                      <input
                        type="radio"
                        id="false"
                        name={"boolean" + index}
                        value="false"
                        disabled={field.fromCard}
                      />
                      <label htmlFor="false">False</label>
                    </>
                  )}
                  {field.type === "SELECT" && field.options?.length > 0 && (
                    <select
                      className="input"
                      name="Options"
                      id={"options" + index}
                      disabled={field.fromCard}
                      onChange={(e) =>
                        dispatch(
                          setFieldValue({
                            cardId: card.id,
                            key: field.key,
                            value: e.target.value,
                          })
                        )
                      }
                    >
                      {field.options?.map((option) => (
                        <option key={option.id} value={option.key}>
                          {option.label}
                        </option>
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
