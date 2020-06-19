import React from "react";
import "./Key.css";

export default function Key(props) {
   const { number, gridNumbers, setGridNumbers, selectedCell } = props;

   // when the user clicks on a key
   const handleClick = () => {
      // if there is no selected cell, this won't affect the grid
      if (selectedCell[0] === null) return;

      // otherwise we make a copy of the grid and add a change to the selected cell
      const [x, y] = selectedCell;
      const newGridNumbers = gridNumbers.map((r) => [...r]);

      newGridNumbers[x][y] = number;
      setGridNumbers(newGridNumbers);
   };

   return (
      <div
         className={"key key-" + (number ? number : "delete")}
         onClick={handleClick}
      >
         <h4>{number ? number : "Erase"}</h4>
      </div>
   );
}
