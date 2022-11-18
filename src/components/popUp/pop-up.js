import { useDispatch } from "react-redux";
import { hidePopUp } from "actions/popUpActions";
import "./pop-up.scss";

function PopUp({ content }) {
  const dispatch = useDispatch();

  return (
    <>
      {content && (
        <div
          className="pop-up-background"
          onClick={() => dispatch(hidePopUp())}
        >
          <div
            className="content-container"
            onClick={(e) => e.stopPropagation()}
          >
            {content()}
          </div>
        </div>
      )}
    </>
  );
}

export default PopUp;
