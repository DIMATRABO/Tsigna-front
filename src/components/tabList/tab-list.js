import { setDragOverItem } from "actions/mainActions";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Item from "./item/item";
import "./tab-list.scss";

const TabList = ({ type, close, left }) => {
  const dispatch = useDispatch();

  const reducer = useSelector((reducer) => reducer.MainReducer);

  useEffect(() => {
    var ignoreClickOnMeElement = document.getElementById("tab-list");

    const clickOutsideFunfunction = (event) => {
      var isClickInsideElement = ignoreClickOnMeElement.contains(event.target);
      if (!isClickInsideElement) {
        close();
      }
    };
    document.addEventListener("click", clickOutsideFunfunction);
    return () => {
      document.removeEventListener("click", clickOutsideFunfunction);
    };
  }, [close]);

  return (
    <div
      id="tab-list"
      className="tab-list"
      style={{ left: left }}
      onClick={(e) => {
        e.stopPropagation();
      }}
      onDragEnter={() => dispatch(setDragOverItem(null))}
    >
      {reducer[type] &&
        reducer[type].map((item, index) => (
          <Item details={{ item, index }} key={index} />
        ))}
    </div>
  );
};
export default TabList;
