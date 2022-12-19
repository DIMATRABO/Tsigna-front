import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";
import Card from "../card/card";
import "./main.scss";
import { useDispatch, useSelector } from "react-redux";
import { setDragOverItem } from "../../actions/mainActions";
import { useState } from "react";

const Main = () => {
  const updateXarrow = useXarrow();
  const dispatch = useDispatch();
  const [botName, setBotName] = useState();
  const reducer = useSelector((reducer) => reducer.MainReducer);

  const dragEnter = (e) => {
    const dragOver = e.target.id;
    dispatch(setDragOverItem(dragOver));
    e.target.style.backgroundColor = "rgb(233, 233, 233)";
  };

  const dragExit = (e) => {
    e.target.style.backgroundColor = null;
  };

  const saveBot = () => {
    if (!!botName) {
      const bot = {
        name: botName,
        is_on: true,
        cards: reducer.cards?.map((card) => {
          return {
            id: card.id,
            templateId: card.templateId,
            positionTop: card.positionTop,
            positionLeft: card.positionLeft,
            form: card.form?.map((field) => {
              return {
                id: field.id,
                key: field.key,
                value:
                  !field.value &&
                  field.type === "SELECT" &&
                  field.options?.length > 0
                    ? field.options[0].key
                    : field.value,
                fromCard: field.fromCard,
              };
            }),
          };
        }),
      };
      reducer.arrows?.forEach((arrow) => {
        bot.cards.forEach((card) => {
          if (arrow.end.includes(card.id)) {
            card.form.forEach((field) => {
              if (arrow.end.includes(field.key)) {
                field.value = arrow.start;
              }
            });
          }
        });
      });
      console.log(JSON.stringify(bot));
    }
  };
  return (
    <div
      className="main"
      id="cards-container"
      onDragEnter={(e) => dragEnter(e)}
      onDragLeave={(e) => dragExit(e)}
    >
      <div className="bot-name-label">Bot name</div>

      <input
        className="bot-name-input"
        type="text"
        onChange={(e) => setBotName(e.target.value)}
      ></input>

      {botName && (
        <div className="save-button" onClick={saveBot}>
          Save
        </div>
      )}
      <Xwrapper>
        {reducer.cards?.map((card) => {
          return <Card key={card.id} card={card} updateXarrow={updateXarrow} />;
        })}
        {reducer.arrows?.length > 0 &&
          reducer.arrows.map((arrow) => {
            return (
              <Xarrow
                key={arrow.id}
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
