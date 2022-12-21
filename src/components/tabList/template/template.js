import { addCard, setDragOverItem } from "actions/mainActions";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./template.scss";

const Template = ({ details, key, closeList }) => {
  const dispatch = useDispatch();

  const reducer = useSelector((reducer) => reducer.MainReducer);

  const dragItem = useRef();

  const dragStart = (position) => {
    dragItem.current = position;
  };

  const drop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeList();
    if (reducer.dragOverItem === "cards-container") {
      dispatch(setDragOverItem(null));
      dispatch(
        addCard({
          id: details?.id + Date.now(),
          title: details?.title,
          templateId: details?.id,
          templateType: details?.templateType,
          initialTop: e.pageY - 60,
          initialLeft: e.pageX,
          positionTop: e.pageY - 60,
          positionLeft: e.pageX,
          form: details?.form?.map((field) => {
            return {
              ...field,
              fromCard: false,
            };
          }),
          focus: true,
        })
      );
    }
  };

  return (
    <div
      className="item"
      onDragStart={() => dragStart(key)}
      onDragEnd={drop}
      key={key}
      onDragEnter={() => dispatch(setDragOverItem(null))}
      draggable
    >
      {details?.title}
    </div>
  );
};
export default Template;
