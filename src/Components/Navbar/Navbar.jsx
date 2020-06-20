import React from "react";
import "./Navbar.css";

import { QuestionMarkIcon } from "../../SVGs/Icons.jsx";

export default function Navbar({ showTutorial, setShowTutorial }) {
   const handleButtonClick = () => {
      setShowTutorial(!showTutorial);
   };

   return (
      <nav>
         <h2 className="title">SUDOKU SOLVER</h2>
         <button className="tutorial-button" onClick={handleButtonClick}>
            <QuestionMarkIcon />
         </button>
      </nav>
   );
}
