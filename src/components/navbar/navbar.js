import { setDragOverItem } from "actions/mainActions";
import TabList from "components/tabList/tab-list";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./navbar.scss";

const Navbar = () => {
  const dispatch = useDispatch();

  const reducer = useSelector((reducer) => reducer.MainReducer);
  const [activeTab, setActiveTab] = useState();
  const [left, setLeft] = useState(10);
  const [actionIsThere, setActionIsThere] = useState();

  useEffect(() => {
    setActionIsThere(
      reducer.cards.find((card) => card?.templateType === "ACTION")
    );
  }, [reducer.cards]);

  return (
    <>
      <div
        className="navbar"
        onDragEnter={() => dispatch(setDragOverItem(null))}
      >
        <div
          className={`tab ${activeTab === "ACTION" ? "active" : ""} ${
            !!actionIsThere ? "disabled" : ""
          }`}
          onClick={(e) => {
            if (!actionIsThere) {
              setActiveTab("ACTION");
              setLeft(5);
              e.preventDefault();
              e.stopPropagation();
            }
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
