import { useRef, useState } from "react";
import "./App.scss";
import Main from "./components/main/main";
import Navbar from "./components/navbar/navbar";

const App = () => {
  
  return (
    <div className="App">
      <Navbar/>
      <Main/>
    </div>
  );
};

export default App;
