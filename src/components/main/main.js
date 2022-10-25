import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";
import Draggable from "react-draggable"; // The default
import Input from "../input/input";
import Operation from "../operation/operation";
import Action from "../action/action";
import "./main.scss";
import { useRef, useState } from "react";

const Main = () => {

  const updateXarrow = useXarrow();

  const [inputs, setInputs] = useState([]);

  const dragItem = useRef();
  const dragOverItem = useRef();
  const [list, setList] = useState(['Item 1','Item 2','Item 3','Item 4','Item 5','Item 6']);
 
  const dragStart = (e, position) => {
    dragItem.current = position;
  };
 
  const dragEnter = (e) => {
    dragOverItem.current = e.target.id;
    e.target.style.backgroundColor = 'gray';
  };

  const dragExit = (e) => {
    e.target.style.backgroundColor = 'lightblue';
  };
 
  const drop = (e) => {
    // get e left and top
    if(dragOverItem.current === "cards-container"){
      dragOverItem.current = null;
      const copyListItems = [...inputs];
      copyListItems.push(e.target.innerHTML)
      setInputs([...inputs, {
        id: e.target.innerHTML,
        top: 30,
        left: 30
      }]);
    }
  };

  return (
    <div className="main">
      <div className="container" 
          id="cards-container"
          onDragEnter={(e) => dragEnter(e)}
          onDragLeave={(e) => dragExit(e)}>
        <Xwrapper>
          {inputs.map((input) => {
            return <Input id={input.id} left={input.left} top={input.top} updateXarrow={updateXarrow} />;
          })}
          {/* <Xarrow start={"input1"} end="operation1" showHead={false} />
          <Xarrow start={"input1"} end="action1" showHead={true} /> */}
        </Xwrapper>
      </div>
      <div className="items">
        {list && list.map((item, index) => (
          <div style={{backgroundColor:'lightblue', margin:'20px 25%', textAlign:'center', fontSize:'40px'}}
            onDragStart={(e) => dragStart(e, index)}
            onDragEnd={drop}
            key={index}
            draggable>
              {item}
          </div>
          ))}
      </div>
    </div>
  );

 
};

export default Main;
