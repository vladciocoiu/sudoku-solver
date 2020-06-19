import React, { useState, useEffect } from "react";
import "./App.css";

import SudokuGrid from "./Components/SudokuGrid/SudokuGrid.jsx";
import Keyboard from "./Components/Keyboard/Keyboard.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import TutorialPanel from "./Components/TutorialPanel/TutorialPanel.jsx";

export default function App() {
   const [gridNumbers, setGridNumbers] = useState(createNewGridNumbers());
   const [selectedCell, setSelectedCell] = useState([null, null]);
   const [currentlyAnimating, setCurrentlyAnimating] = useState([null, null]);
   const [isAnimating, setIsAnimating] = useState(false);
   const [showTutorial, setShowTutorial] = useState(true);

   // a function that changes the selected cell based on the key pressed by the user
   const changeSelectedCell = (e) => {
      let [x, y] = [...selectedCell];
      if (x === null || y === null) return;

      if (e.code === "ArrowDown" && x < 8) x++;
      else if (e.code === "ArrowUp" && x > 0) x--;
      if (e.code === "ArrowLeft" && y > 0) y--;
      else if (e.code === "ArrowRight" && y < 8) y++;

      setSelectedCell([x, y]);
   };

   // a function that chagnes the number in a cell by pressing keys
   const changeNumberInCell = (e) => {
      let [x, y] = [...selectedCell];
      if (x === null || y === null) return;

      const gridCopy = gridNumbers.map((r) => [...r]);
      let value = gridCopy[x][y];
      for (let i = 1; i <= 9; i++)
         if (e.code === "Digit" + i || e.code === "Numpad" + i) value = i;
      if (e.code === "Backspace") value = null;

      gridCopy[x][y] = value;
      setGridNumbers(gridCopy);
   };

   useEffect(() => {
      document.addEventListener("keydown", changeSelectedCell);
      return () => document.removeEventListener("keydown", changeSelectedCell);
   });

   useEffect(() => {
      document.addEventListener("keydown", changeNumberInCell);
      return () => document.removeEventListener("keydown", changeNumberInCell);
   });

   return (
      <div className="App">
         <TutorialPanel show={showTutorial} setShow={setShowTutorial} />
         <Navbar
            gridNumbers={gridNumbers}
            setGridNumbers={setGridNumbers}
            showTutorial={showTutorial}
            setShowTutorial={setShowTutorial}
         />
         <SudokuGrid
            gridNumbers={gridNumbers}
            selectedCell={selectedCell}
            setSelectedCell={setSelectedCell}
            currentlyAnimating={currentlyAnimating}
         />
         <Keyboard
            gridNumbers={gridNumbers}
            setGridNumbers={setGridNumbers}
            selectedCell={selectedCell}
            createNewGridNumbers={createNewGridNumbers}
            setCurrentlyAnimating={setCurrentlyAnimating}
            isAnimating={isAnimating}
            setIsAnimating={setIsAnimating}
         />
      </div>
   );
}

// this creates a 9x9 matrix with null elements
const createNewGridNumbers = () => {
   const numbers = [];

   for (let i = 0; i < 9; i++) {
      numbers.push([]);
      for (let j = 0; j < 9; j++) numbers[i].push(null);
   }

   return numbers;
};
