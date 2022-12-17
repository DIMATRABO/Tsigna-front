import { setDragOverItem } from "actions/mainActions";
import TabList from "components/tabList/tab-list";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "./navbar.scss";

const Navbar = () => {
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState();
  const [left, setLeft] = useState(10);

  return (
    <>
      <div
        className="navbar"
        onDragEnter={() => dispatch(setDragOverItem(null))}
      >
        <div
          className={`tab ${activeTab === "ACTION" ? "active" : ""}`}
          onClick={(e) => {
            setActiveTab("ACTION");
            setLeft(5);
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          Ations
        </div>
        <div
          className={`tab ${activeTab === "OPERATION" ? "active" : ""}`}
          onClick={(e) => {
            setActiveTab("OPERATION");
            setLeft(105);
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          Operations
        </div>
        <div
          className={`tab ${activeTab === "INPUT" ? "active" : ""}`}
          onClick={(e) => {
            setActiveTab("INPUT");
            setLeft(205);
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          Indicateurs
        </div>
      </div>
      {activeTab && (
        <TabList type={activeTab} close={() => setActiveTab()} left={left} />
      )}
    </>
  );
};

export default Navbar;
