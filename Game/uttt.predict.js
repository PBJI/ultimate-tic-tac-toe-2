const tuttt = require('./uttt.test.js');

// Syntactical sugar for copying object using JSON.
function deepCopy(obj) {
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (e) {
    console.log('Failed to deeply copy: ', obj, '\nError: ', e);
    return null;
  }
}

module.exports = class buttt extends tuttt {
  constructor() {
    super();
  }

  // Predicts winning chance for current opponent after the next move
  listCurrentWeights() {
    const currentSmallBoards = deepCopy(this.smallGameBoards);
    // const currentLargeBoard = deepCopy(super.largeBoard);
    const currentBoard = deepCopy(currentSmallBoards[this.currentMove[1]]);
    const currentSmallWeights = {
      X: deepCopy(this.xPlayerWeightsSmall),
      O: deepCopy(this.oPlayerWeightsSmall),
    };
    const currentPlayer = this.currentPlayer;
    const currentCellWeights = [];
    // Player Turn: X, move: 4, currentBoard: 4
    // CheckWin on each move
    // List weights with currentsmallboard cell data
    currentBoard.forEach((cell, index) => {
      currentCellWeights.push([cell, currentSmallWeights[currentPlayer][this.currentMove[1]][index]]);
    });
    return currentCellWeights;
  }

  minimax() {
    // NEW PRINCIPLE: deep copy vs shallow copy in js.

  }
};
