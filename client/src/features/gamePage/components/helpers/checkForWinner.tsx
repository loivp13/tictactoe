function generateWinningCondition() {
  let result = [];
  let baseNums: Array<number> = [0, 1, 2, 3, 6];

  //create winning condition for rows and column O(n^2)
  for (let i = 0; i < baseNums.length; i++) {
    let num = baseNums[i];
    let subresult = [];

    //win condition for rows
    if (num % 3 === 0) {
      for (let k = 0; k < 3; k++) {
        subresult.push(num + k);
      }
      result.push(subresult);
      subresult = [];
    }
    // win condition for columns
    if (num === 0 || num % 3 !== 0) {
      for (let k = 0; k < 3; k++) {
        subresult.push(num + k * 3);
      }
      result.push(subresult);
      subresult = [];
    }
    //win condition for diagonal top-left to bot-right
    if (num === 0) {
      for (let k = 0; k < 3; k++) {
        subresult.push(num + k * 4);
      }
      result.push(subresult);
      subresult = [];
    }
    //win condition for diagonal top-right to bot-left
    if (num === 2) {
      for (let k = 0; k < 3; k++) {
        subresult.push(num + k * 2);
      }
      result.push(subresult);
      subresult = [];
    }
  }
  return result;
}
let winCondition = generateWinningCondition();

export default function checkForWinner(array: any) {
  if (!array) {
    return false;
  }

  let mergeArray = [...array[0], ...array[1], ...array[2]];

  for (let i = 0; i < winCondition.length; i++) {
    let idx1 = winCondition[i][0];
    let idx2 = winCondition[i][1];
    let idx3 = winCondition[i][2];
    let val1 = mergeArray[idx1];
    let val2 = mergeArray[idx2];
    let val3 = mergeArray[idx3];
    if (val1 === null || val2 == null || val3 === null) {
      continue;
    }
    if (val1 === val2 && val2 === val3) {
      return val1;
    }
  }
  return false;
}
