import React from "react";
import "./SudokuGrid.css";
import Cell from "./Cell/Cell.jsx";

export default function SudokuGrid(props) {
   const {
      gridNumbers,
      selectedCell,
      setSelectedCell,
      currentlyAnimating,
   } = props;

   // this creates a new sudoku grid consisting of 9x9 empty
   const createGrid = () => {
      const grid = [];
      for (let i = 0; i < 9; i++) {
         grid.push([]);
         for (let j = 0; j < 9; j++)
            grid[i].push(
               <Cell
                  x={i}
                  y={j}
                  gridNumbers={gridNumbers}
                  selectedCell={selectedCell}
                  setSelectedCell={setSelectedCell}
                  currentlyAnimating={currentlyAnimating}
                  key={9 * i + j}
               />
            );
      }
      return grid;
   };

   return <div className="grid">{createGrid()}</div>;
}
