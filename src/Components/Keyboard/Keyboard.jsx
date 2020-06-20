import React from "react";
import "./Keyboard.css";

import solve from "../../Algorithms/Solver.js";
import Key from "./Key/Key.jsx";
import { SolveIcon, DeleteIcon, ResetIcon } from "../../SVGs/Icons.jsx";
import { checkValidity } from "../../Algorithms/ValidityChecker.js";

export default function Keyboard(props) {
   const {
      gridNumbers,
      setGridNumbers,
      selectedCell,
      createNewGridNumbers,
      setCurrentlyAnimating,
      isAnimating,
      setIsAnimating,
   } = props;

   // animate the changes in the grid when executing the backtracking algorithm
   const animateGrid = (changesInOrder, cellsChanged) => {
      setIsAnimating(true);

      for (let i = 0; i < changesInOrder.length; i++) {
         setTimeout(() => {
            setGridNumbers(changesInOrder[i]);
            setCurrentlyAnimating([cellsChanged[i][0], cellsChanged[i][1]]);
         }, 20 * i);
      }

      // clean up the currently animating cell
      setTimeout(() => {
         setCurrentlyAnimating([null, null]);
         setIsAnimating(false);
      }, 20 * changesInOrder.length + 20);
   };

   // this function creates a keyboard consisting of 9 keys with the numbers from 1 to 9
   const createKeyboard = () => {
      const grid = [];

      for (let i = 1; i <= 9; i++)
         grid.push(
            <Key
               number={i}
               gridNumbers={gridNumbers}
               setGridNumbers={setGridNumbers}
               selectedCell={selectedCell}
               key={i}
            />
         );

      return grid;
   };

   // uses the Solver.js file from the Algorithms folder in order to solve the puzzle
   // and the ValidityChecker.js file in order to check the validity of the grid before starting
   const solvePuzzle = () => {
      const copy = gridNumbers.map((r) => [...r]);

      const invalidCells = checkValidity(copy);

      // if there are invalid cells, highlight them for a period of time
      if (invalidCells.length) {
         for (let cell of invalidCells) {
            document
               .querySelector(".cell-" + cell[0] + "-" + cell[1])
               .classList.add("invalid");
            setTimeout(
               () =>
                  document
                     .querySelector(".cell-" + cell[0] + "-" + cell[1])
                     .classList.remove("invalid"),
               2000
            );
         }
         // otherwise animate the solving algorithm
      } else {
         const [changesInOrder, cellsChanged] = solve(copy);
         animateGrid(changesInOrder, cellsChanged);
      }
   };

   // resets every cell in the grid
   const reset = () => {
      setGridNumbers(createNewGridNumbers());
   };

   // erases the number from the selected cell
   const erase = () => {
      if (selectedCell[0] === null) return;

      const [x, y] = selectedCell;
      const newGridNumbers = gridNumbers.map((r) => [...r]);

      newGridNumbers[x][y] = null;
      setGridNumbers(newGridNumbers);
   };

   return (
      <div className="keyboard-and-overlay">
         <div className={"animating-overlay" + (isAnimating ? "" : " hidden ")}>
            <h2>Solving...</h2>
         </div>
         <div className="keyboard">
            <button className="solve-button" onClick={solvePuzzle}>
               <SolveIcon />
               <h4>Solve</h4>
            </button>

            {createKeyboard()}

            <button className="delete-button" onClick={erase}>
               <DeleteIcon />
               <h4>Delete</h4>
            </button>

            <button className="reset-button" onClick={reset}>
               <ResetIcon />
               <h4>Reset</h4>
            </button>
         </div>
      </div>
   );
}
