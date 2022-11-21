import { addCard, setDragOverItem } from "actions/mainActions";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./item.scss";

const Item = ({ details }) => {
  const dispatch = useDispatch();

  const reducer = useSelector((reducer) => reducer.MainReducer);

  const dragItem = useRef();

  const dragStart = (position) => {
    dragItem.current = position;
  };

  const drop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (reducer.dragOverItem === "cards-container") {
      dispatch(setDragOverItem(null));
      dispatch(
        addCard({
          id: details.item?.title,
          details: details.item,
          top: e.pageY - 60,
          left: e.pageX,
        })
      );
    }
  };

  return (
    <div
      className="item"
      onDragStart={() => dragStart(details.index)}
      onDragEnd={drop}
      key={details.index}
      onDragEnter={() => dispatch(setDragOverItem(null))}
      draggable
    >
      {details.item?.title}
    </div>
  );
};
export default Item;
