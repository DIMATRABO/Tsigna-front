import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";
import Draggable from "react-draggable"; // The default
import "./App.scss";
import Input from "./components/input/input";
import Operation from "./components/operation/operation";
import Action from "./components/action/action";

const App = () => {
  const updateXarrow = useXarrow();

  const inputs = ["input1"];
  const operations = ["operation1"];
  const actions = ["action1"];

  return (
    <div className="App">
      <Xwrapper>
        {inputs.map((input) => {
          return <Input id={input} updateXarrow={updateXarrow} />;
        })}
        {operations.map((op) => {
          return <Operation id={op} updateXarrow={updateXarrow} />;
        })}
        {actions.map((action) => {
          return <Action id={action} updateXarrow={updateXarrow} />;
        })}
        <Xarrow start={"input1"} end="operation1" showHead={false} />
        <Xarrow start={"input1"} end="action1" showHead={true} />
        {/* <Xarrow start={"elem1"} end="elem2" />
        <Xarrow start={"elem3"} end="elem2" /> */}
      </Xwrapper>
    </div>
  );
};

export default App;
