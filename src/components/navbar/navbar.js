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
          className={`tab ${activeTab === "ACTIONS" ? "active" : ""}`}
          onClick={(e) => {
            setActiveTab("ACTIONS");
            setLeft(5);
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          Ations
        </div>
        <div
          className={`tab ${activeTab === "OPERATIONS" ? "active" : ""}`}
          onClick={(e) => {
            setActiveTab("OPERATIONS");
            setLeft(105);
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          Operations
        </div>
        <div
          className={`tab ${activeTab === "INDICATORS" ? "active" : ""}`}
          onClick={(e) => {
            setActiveTab("INDICATORS");
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
