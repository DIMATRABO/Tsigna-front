import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";
import Card from "../card/card";
import "./main.scss";
import { useDispatch, useSelector } from "react-redux";
import { setDragOverItem } from "../../actions/mainActions";

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
        {reducer.cards.length > 1 && (
          <Xarrow
            start={reducer.cards[1].id}
            end={reducer.cards[0].id + "hhh"}
            showHead={false}
            zIndex={3}
          />
        )}
        {/* <Xarrow start={"input1"} end="action1" showHead={true} /> */}
      </Xwrapper>
    </div>
  );
};

export default Main;
