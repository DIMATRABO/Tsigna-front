import Draggable from "react-draggable"; // The default
import "./operation.scss";

const Operation = ({ id, updateXarrow }) => {
  return (
    <Draggable onDrag={updateXarrow} onStop={updateXarrow}>
      <div id={id} className="draggable-operation">
        {id}
      </div>
    </Draggable>
  );
};

export default Operation;
