import Draggable from "react-draggable"; // The default
import "./input.scss";

const Input = ({ id, updateXarrow, top = 10, left = 10 }) => {
  return (
    <Draggable onDrag={updateXarrow} onStop={updateXarrow} bounds='parent'>
      <div id={id} className="draggable-input" 
      style={{
        top: top + "px",
        left: left + "px"
      }}>
        {id}
      </div>
    </Draggable>
  );
};

export default Input;
