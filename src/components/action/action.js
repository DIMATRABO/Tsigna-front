import Draggable from "react-draggable"; // The default
import "./action.scss";

const Action = ({ id, updateXarrow }) => {
  return (
    <Draggable onDrag={updateXarrow} onStop={updateXarrow}>
      <div id={id} className="draggable-action">
        {id}
      </div>
    </Draggable>
  );
};

export default Action;
