import React from "react";
import "./TutorialPanel.css";

import { XIcon } from "../Keyboard/Icons.jsx";

export default function TutorialPanel({ show, setShow }) {
   const handleClick = () => {
      setShow(!show);
   };

   return (
      <div className={"tutorial-panel" + (show ? " " : " hide ")}>
         <div className="black-overlay"></div>
         <div className="panel">
            <button onClick={handleClick}>
               <XIcon />
            </button>
            <h1 className="title">This is my Sudoku Solver app!</h1>
            <h3 className="text-1">
               This app can solve any Sudoku puzzle using the backtracking
               algorithm.
            </h3>
            <h3 className="text-2">
               You just need to enter the numbers using the on-screen or the
               physical keyboard and click on the solve button.
            </h3>
            <h3 className="text-3">
               The app will highlight any wrongly placed numbers, so don't worry
               about making mistakes, as you can correct them after.
            </h3>
            <h3 className="text-4">Good luck!</h3>
         </div>
      </div>
   );
}
