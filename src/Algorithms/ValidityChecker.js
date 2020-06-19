// this function returns all the cells that have invalid numbers in them
export const checkValidity = (grid) => {
   const invalidCells = [];

   for (let i = 0; i < 9; i++)
      for (let j = 0; j < 9; j++) {
         if (!valid(i, j, grid) && grid[i][j]) invalidCells.push([i, j]);
      }

   return invalidCells;
};

// this function checks if the current choice for grid[row][col] is valid
export const valid = (row, col, grid) => {
   // check the row for the same number
   for (let j = 0; j < 9; j++)
      if (grid[row][col] === grid[row][j] && j !== col) return false;

   // check the column
   for (let i = 0; i < 9; i++)
      if (grid[row][col] === grid[i][col] && i !== row) return false;

   // check the smaller "box"

   // the number of the box that the current element is in
   const verticalNumber = Math.floor(row / 3);
   const horizontalNumber = Math.floor(col / 3);

   // iterate through the whole grid
   for (let i = 0; i < 9; i++)
      for (let j = 0; j < 9; j++) {
         const vertical = Math.floor(i / 3);
         const horizontal = Math.floor(j / 3);

         // if the elements are not in the same box or the element is the current element, skip it
         if (
            vertical !== verticalNumber ||
            horizontal !== horizontalNumber ||
            (i === row && j === col)
         )
            continue;

         if (grid[i][j] === grid[row][col]) return false;
      }

   // otherwise it's ok
   return true;
};
