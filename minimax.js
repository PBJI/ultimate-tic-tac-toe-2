// Installing "entr" from pacman for file changes updates.

module.exports = class uttt {
  constructor() {
    this.smallBoards = [];
    this.largeBoard = [
      null, null, null,
      null, null, null,
      null, null, null,
    ];

    for (let i = 0; i < 9; i += 1) {
      this.smallBoards.push(this.largeBoard); // Pushing 9 boards
    }

    this.turn = 'X';
    this.winner = undefined;
    this.move = [null, null];
    this.moveCount = 0;
    this.moveHistory = [];

    // These are algorithm specific data, which will be used by
    // the bot to navigate best moves possible, using minimax
    // Here are some weights and some experimental arrays designed
    // that prioritizes certain blocks or cells.

    // Additive weights
    this.xWeightsSmall = [];
    this.oWeightsSmall = [];
    for (let i = 0; i < 9; i += 1) {
      // Original
      this.xWeightsSmall.push([0.3, 0.1, 0.3, 0.1, 0.5, 0.1, 0.3, 0.1, 0.3]);

      // Inverted
      this.oWeightsSmall.push([-0.3, -0.1, -0.3, -0.1, -0.5, -0.1, -0.3, -0.1, -0.3]);
    }

    // Multiplicative weights
    // Original
    this.xWeightsLarge = [3, 1, 3, 1, 5, 1, 3, 1, 3];

    // Inverted
    this.oWeightsLarge = this.xWeightsLarge.forEach((weight) => weight * -1);

    // Weight dynamics
    // Original
    this.addWeightsToCell = [
      [0.1, 0.2, 0.2, 0.2, 0.2, 0, 0.2, 0, 0.2],
      [0.2, 0.1, 0.2, 0, 0.2, 0, 0, 0.2, 0],
      [0.2, 0.2, 0.1, 0, 0.2, 0.2, 0.2, 0, 0.2],
      [0.2, 0, 0, 0.1, 0.2, 0.2, 0.2, 0, 0],
      [0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.2, 0.2],
      [0, 0, 0.2, 0.2, 0.2, 0.1, 0, 0.2, 0.2],
      [0.2, 0, 0.2, 0.2, 0.2, 0, 0.1, 0.2, 0.2],
      [0, 0.2, 0, 0, 0.2, 0, 0.2, 0.1, 0.2],
      [0.2, 0, 0.2, 0, 0.2, 0.2, 0.2, 0.2, 0.1],
    ];

    // Inverted
    this.subWeightsToCell = this.addWeightsToCell.map((array) => {
      const invert = array.map((weight) => weight * -1);
      return invert;
    });
  }

  // Setup the game logic for two players, then give controlled
  // access to bot algorithm to these methods and properties of the
  // game.

  // Captures current game state in case something goes wrong.
  // captureGameState() {
  //   return {
  //
  //   };
  // }

  // Currently Checks move validity, check wins and ties, updates
  // weights, switches current player, throws only false on failures.
  makeMove(x, y) {
    // Method side validation
    if (x >= 9 || y >= 9) {
      console.log('Out of bound, move should not exceeed board limit');
      return false;
    }

    if (this.smallBoards[x][y] || this.largeBoard[x] || this.winner) {
      console.log('Invalid move, either the cell or the small board is full');
      return false;
    }
    if (this.move[1] !== this.move[0]) {
      console.log(`Invalid move, the cell should be in ${this.move[1] + 1}`);
      return false;
    }

    // UGS
    this.smallBoards[x][y] = this.turn;
    this.move = [x, y];
    this.moveCount += 1;
    this.moveHistory.push([x, y]);
    // UGS

    // Checks wins and ties at small board
    if (this.checkSmallWin(this.turn)) {
      this.largeBoard[x] = this.turn;
      this.updateWeights(this.turn, [x, y]);
    } else if (this.checkSmallTie(this.turn)) {
      this.largeBoard[x] = 'T';
      this.updateWeight(this.turn, [x, y]);
    }

    // Checks wins and ties at large board and swtiches current player
    if (this.checkLargeWin(this.turn)) {
      this.winner = this.turn;
    } else if (this.checkLargeTie()) {
      this.winner = 'T';
    }

    // DEV: Experimental
    this.updateWeights(this.turn, [x, y]);
    this.turn = this.turn === 'X' ? 'O' : 'X';
    return true;
  }

  checkSmallWin(player) {
    const x = this.move[0];
    const y = this.move[1];
    const board = this.smallBoards[x];
    const row = board.slice(y - (y % 3), y - (y % 3) + 3);
    const col = [board[y % 3], board[(y + 3) % 9], board[(y + 6) % 9]];
    const diag1 = [board[0], board[4], board[8]];
    const diag2 = [board[2], board[4], board[6]];
    if (row.every((cell) => cell === player)
            || col.every((cell) => cell === player)
            || diag1.every((cell) => cell === player)
            || diag2.every((cell) => cell === player)) {
      return true;
    }
    return false;
  }

  checkSmallTie() {
    return this.smallBoards[this.move[0]].every((cell) => cell);
  }

  checkLargeWin(player) {
    // const x = this.move[0];
    const y = this.move[1];
    const board = this.largeBoard;
    const row = board.slice(y - (y % 3), y - (y % 3) + 3);
    const col = [board[y % 3], board[(y + 3) % 9], board[(y + 6) % 9]];
    const diag1 = [board[0], board[4], board[8]];
    const diag2 = [board[2], board[4], board[6]];
    if (row.every((cell) => cell === player)
            || col.every((cell) => cell === player)
            || diag1.every((cell) => cell === player)
            || diag2.every((cell) => cell === player)) {
      return true;
    }
    return false;
  }

  checkLargeTie() {
    return this.largeBoard.every((cell) => cell);
  }

  updateWeights(player, move) {
    const [x, y] = move;

    if (player === 'X') {
      if (this.largeBoard[x] === 'X') {
        if (this.winner === 'X') {
          this.xWeightLarge[x] += 1000;
        } else {
          this.xWeightLarge[x] += 100;
        }
      } else if (this.largeBoard[x] === 'T') {
        this.xWeightLarge[x] = 0;
        this.oWeightLarge[x] = 0;
      }
      for (let i = 0; i < 9; i + 1) {
        this.xWeightsSmall[x][i] += this.addWeightsToCell[y][i];
      }
    } else if (player === 'O') {
      if (this.largeBoard[x] === 'O') {
        if (this.winner === 'O') {
          this.oWeightLarge[x] -= 1000;
        } else {
          this.oWeightLarge[x] -= 100;
        }
      } else if (this.largeBoard[x] === 'T') {
        this.xWeightLarge[x] = 0;
        this.oWeightLarge[x] = 0;
      }
      for (let i = 0; i < 9; i += 1) {
        this.oWeightsSmall[x][i] += this.subWeightsToCell[y][i];
      }
    }
  }
};
