import React from "react";
import "./Cell.css";

export default function Cell(props) {
   const {
      x,
      y,
      gridNumbers,
      selectedCell,
      setSelectedCell,
      currentlyAnimating,
   } = props;

   // when the user clicks on a cell, it will become the selected cell
   const handleClick = () => {
      setSelectedCell([x, y]);
   };

   return (
      <div
         className={
            "cell cell-" +
            x +
            "-" +
            y +
            (y === 0 ? " cell-left " : "") +
            (x === 0 ? " cell-top " : "") +
            (y === 8 ? " cell-right " : "") +
            (x === 8 ? " cell-bottom " : "") +
            (y === 2 || y === 5 ? " cell-box-vertical " : "") +
            (x === 2 || x === 5 ? " cell-box-horizontal " : "") +
            (selectedCell[0] === x && selectedCell[1] === y
               ? " cell-selected "
               : "") +
            (currentlyAnimating[0] === x && currentlyAnimating[1] === y
               ? " animating "
               : "")
         }
         onClick={handleClick}
      >
         <h3>{gridNumbers[x][y]}</h3>
      </div>
   );
}
