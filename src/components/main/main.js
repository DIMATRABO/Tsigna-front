import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";
import Card from "../card/card";
import "./main.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  removeDraft,
  setArrows,
  setCards,
  setDragOverItem,
  setTemplates,
} from "../../actions/mainActions";
import { useEffect, useState } from "react";
import httpClient from "httpClient/httpClient";
import { useNavigate, useParams } from "react-router-dom";
import { selectCards, selectMainReducer } from "reducers/selectors";

const Main = () => {
  const updateXarrow = useXarrow();
  const { botId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [botName, setBotName] = useState();
  const [loading, setLoading] = useState(true);
  const reducer = useSelector(selectMainReducer);
  const cards = useSelector(selectCards);

  useEffect(() => {
    //fill templates
    httpClient
      .get("/template/all")
      .then((res) => {
        dispatch(setTemplates(res.data));
      })
      .catch((err) => {
        console.log(err);
      });

    if (!!botId) {
      httpClient
        .get(`/bot/id/${botId}`)
        .then((response) => {
          setBotName(response.data?.name);
          console.log(response.data);
          if (!!response.data.cards) {
            dispatch(
              setCards(
                response.data.cards.map((card) => {
                  return {
                    id: card?.id,
                    title: card?.template?.title,
                    templateId: card?.template?.id,
                    templateType: card?.template?.templateType,
                    initialTop: parseInt(card?.positionTop),
                    initialLeft: parseInt(card?.positionLeft),
                    positionTop: parseInt(card?.positionTop),
                    positionLeft: parseInt(card?.positionLeft),
                    form: [...card?.fieldValues],
                    focus: true,
                  };
                })
              )
            );
          }
        })
        .catch(() => {
          navigate("/");
          dispatch(removeDraft());
        });
    }
  }, []);

  useEffect(() => {
    if (!!botId && cards.length > 0 && loading) {
      let arrows = [];
      cards.forEach((card) => {
        card.form.forEach((field) => {
          if (field.fromCard) {
            arrows.push({
              id: card?.id + "-" + field.key,
              start: field.value,
              end: card?.id + "-" + field.key,
            });
          }
        });
      });
      dispatch(setArrows(arrows));
      setLoading(false);
    }
  }, [botId, cards, loading]);

  const dragEnter = (e) => {
    const dragOver = e.target.id;
    dispatch(setDragOverItem(dragOver));
    e.target.style.backgroundColor = "rgb(233, 233, 233)";
  };

  const dragExit = (e) => {
    e.target.style.backgroundColor = null;
  };

  const saveBot = () => {
    if (!!botName && reducer.cards?.length > 0) {
      const bot = {
        id: botId,
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
              if (arrow.end === card?.id + "-" + field.key) {
                field.value = arrow.start;
              }
            });
          }
        });
      });

      httpClient
        .post("bot/save", bot)
        .then(() => {
          navigate("/");
          dispatch(removeDraft());
        })
        .catch((err) => {
          console.log(err);
        });
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
        value={botName}
        onChange={(e) => setBotName(e.target.value)}
      ></input>

      {botName && reducer.cards?.length > 0 && (
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
