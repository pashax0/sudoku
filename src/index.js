module.exports = function solveSudoku(matrix) {
  function connector(obj, keyCon, iCon, numCon) {
    let objConnections = [
      [['y_0'], [7], ['x_7'], [0]],
      [['y_0'], [8], ['x_8'], [0]]
    ];
    for (let i = 0; i < objConnections.length; i++) {
      for (let j = 0; j < objConnections[i].length; j++) {
        if (keyCon == objConnections[i][j] && iCon == objConnections[i][j + 1]) {
          let rowCon = i;
          let k = 0;
          while (k < objConnections[rowCon].length) {
            let rowResObj = objConnections[rowCon][k];
            let iResObj = objConnections[rowCon][k + 1];
            obj[rowResObj][iResObj] = numCon;
            k += 2;
          }
          // for (let k = 0; k < objConnections[rowCon].length; k + 2) {
            //let rowResObj = objConnections[rowCon][k];
            //let iResObj = objConnections[rowCon][k + 1];
            //obj[rowResObj][iResObj] = numCon;
            // for (let key in obj) {
            //   if (key == objConnections[rowCon][k]) {
            //     obj[key][k + 1] = numCon;
            //   }
            // }
          // }
        }
      }
    }
    solveObj(obj);
  }

  function formBlocks() {
    let obj = {};
    for (let y = 0; y < matrix.length; y++) {
      obj['y_' + y] = matrix[y];
      for (let x = 0; x < matrix[y].length; x++) {
        if (!obj['x_' + x]) {
          obj['x_' + x] = [];
        }
        obj['x_' + x].push(matrix[y][x]);
      }
    }
    return obj;
  }
  
  //Замена 0 цифрами, возможными в данном ключе объекта
  function variantsObj(obj) {
    for (let key in obj) {
      for (let i = 0; i < obj[key].length; i++) {
        if (obj[key][i] == 0) {
          obj[key][i] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
          for (let j = 0; j < 9; j++) {
            for (let k = 0; k < obj[key][i].length; k++) {
              if (i != j && obj[key][j] == obj[key][i][k]) {
                obj[key][i].splice(k, 1);
              }
            }
          }
        }
      }
    }
    return obj;
  }

  function solveObj(obj) {
    for (let key in obj) {
      for (let i = 0; i < obj[key].length; i++) {
        if (obj[key][i].length) { // if position is array
          if (obj[key][i].length == 1) {
            obj[key][i] = obj[key][i][0];
            let keyCon = key;
            let iCon = i;
            let numCon = obj[key][i];
            connector(obj, keyCon, iCon, numCon);
          }
        }
      }
    }
    return obj;
  }

  function convertObjToMatrix(obj) {
    let solvedMatrix = [];
    for (key in obj) {
      if (key.charAt(0) == 'y') {
        solvedMatrix.push(obj[key]);
      }
    }
    return solvedMatrix;
  }
  // for (let y = 0; y < matrix.length; y++) {
  //   for (let x = 0; x < matrix[y].length; x++) {
  //     if (matrix[y][x] == 0) {
  //       zeroMatrix[y][x] = 'zero';
  //     }
  //   }
  // }
  let objWithZero = formBlocks();
  let objWithVar = variantsObj(objWithZero);
  let solvedObj = solveObj(objWithVar);
  let solvedSudoku = convertObjToMatrix(solvedObj);
  return solvedSudoku;
}
