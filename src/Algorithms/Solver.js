import { valid } from "./ValidityChecker.js";

let grid = [],
   newGrid = [],
   changesInOrder = [],
   cellsChanged = [];

// a variable that becomes true if we find a solution to the puzzle
let found = false;

// this function checks if the algorithm is finished
const stop = (row, col) => {
   return row > 8;
};

const backtracking = (row, col) => {
   if (found) return;
   // if the algorithm finished, print the completed puzzle
   if (stop(row, col)) {
      //console.log(newGrid);
      found = true;
      return;
   }

   // if the current cell already has a number, skip it
   if (grid[row][col]) {
      if (col === 8) backtracking(row + 1, 0);
      else backtracking(row, col + 1);

      // otherwise check every single possibility, and if it is valid go to the next cell
   } else {
      for (let i = 1; i <= 9 && !found; i++) {
         newGrid[row][col] = i;

         changesInOrder.push(newGrid.map((r) => [...r]));
         cellsChanged.push([row, col]);

         if (valid(row, col, newGrid)) {
            if (col === 8) backtracking(row + 1, 0);
            else backtracking(row, col + 1);
         }
      }

      // before we go back, we should reset the number in the current cell
      // only if we didn't already find a solution
      if (!found) {
         newGrid[row][col] = null;
         changesInOrder.push(newGrid.map((r) => [...r]));
         cellsChanged.push([row, col]);
      }
   }
};

// this is the function that executes the backtracking algorithm and returns every single
// change in the grid, in order to animate the algorithm
export default function solve(parameterGrid) {
   //reset all the arrays and variables
   grid = [];
   newGrid = [];
   changesInOrder = [];
   cellsChanged = [];
   found = false;

   // make copies of the state
   grid = parameterGrid.map((r) => [...r]);
   newGrid = grid.map((r) => [...r]);

   // execute the algorithm
   backtracking(0, 0);

   // return the changes
   return [changesInOrder, cellsChanged];
}
