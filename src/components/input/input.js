import Draggable from "react-draggable"; // The default
import "./input.scss";

const Input = ({ id, updateXarrow }) => {
  return (
    <Draggable onDrag={updateXarrow} onStop={updateXarrow}>
      <div id={id} className="draggable-input">
        {id}
      </div>
    </Draggable>
  );
};

export default Input;
