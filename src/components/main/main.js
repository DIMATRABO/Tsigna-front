import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";
import Card from "../card/card";
import "./main.scss";
import { useDispatch, useSelector } from "react-redux";
import { setDragOverItem } from "../../actions/mainActions";
import { useEffect } from "react";

const Main = () => {
  const updateXarrow = useXarrow();
  const dispatch = useDispatch();

  const reducer = useSelector((reducer) => reducer.MainReducer);

  const dragEnter = (e) => {
    const dragOver = e.target.id;
    dispatch(setDragOverItem(dragOver));
    e.target.style.backgroundColor = "rgb(233, 233, 233)";
  };

  const dragExit = (e) => {
    e.target.style.backgroundColor = null;
  };

  useEffect(() => {
    console.log("reducer", reducer);
    console.log(reducer.arrows?.length > 0);
    reducer.arrows.map((arrow) => {
      console.log("arrow", arrow);
    });
  }, [reducer]);
  return (
    <div
      className="main"
      id="cards-container"
      onDragEnter={(e) => dragEnter(e)}
      onDragLeave={(e) => dragExit(e)}
    >
      <Xwrapper>
        {reducer.cards?.map((card) => {
          return <Card key={card.id} card={card} updateXarrow={updateXarrow} />;
        })}
        {reducer.arrows?.length > 0 &&
          reducer.arrows.map((arrow) => {
            return (
              <Xarrow
                start={arrow.start}
                end={arrow.end}
                showHead={true}
                zIndex={5}
              />
            );
          })}
      </Xwrapper>
    </div>
  );
};

export default Main;
