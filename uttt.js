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
      this.smallBoards.push([
        null, null, null,
        null, null, null,
        null, null, null,
      ]); // Pushing 9 boards
    }

    this.turn = 'X';
    this.winner = undefined;
    this.move = [null, null];
    this.moveCount = 0;
    this.moveHistory = {};

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
    this.oWeightsLarge = this.xWeightsLarge.map((weight) => weight * -1);

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

  // ?? Captures current game state in case something goes wrong.

  // Currently Checks move validity, check wins and ties, updates
  // weights, switches current player, throws only false on failures.
  makeMove(x, y, debug) {
    // Method side validation
    if (x >= 9 || y >= 9) {
      console.log('Out of bound, move should not exceeed board limit');
      return false;
    }

    // Checks if the next move is valid in two ways:

    // Checks if the current board is full or not, if so then skip this
    // condition and let the player play in any of board

    // Else check if the move played is played in the current board or not,
    // also check whether the move is first move of the game, if so skip
    // condition and let the player play in any of board.

    if (this.largeBoard[this.move[1]] === null) {
      if (this.moveCount && this.move[1] !== x) {
        console.log(`Invalid move, the cell should be in ${this.move[1] + 1}`);
        return false;
      }
    }

    if (this.smallBoards[x][y] || this.largeBoard[x] || this.winner) {
      if (debug) {
        console.log(`sb:${this.smallBoards[x][y]} lb:${this.largeBoard[x]} win:${this.winner}`);
      } else {
        console.log('Invalid move, either the cell || the small board is full || won');
      }
      return false;
    }

    // UGS
    this.smallBoards[x][y] = this.turn;
    this.move = [x, y];
    this.moveCount += 1;

    // UGS

    // Checks wins and ties at small board
    console.log('checking small tie or win');
    const smallCheck = this.checkWin(this.turn, this.smallBoards[x], y) ? 'Won' : this.checkTie(this.smallBoards[x]) ? 'Tie' : 'Nothing';
    if (smallCheck === 'Won') {
      this.largeBoard[x] = this.turn;
      console.log('updating weights');
      this.updateWeights(this.turn, [x, y]);
    } else if (smallCheck === 'Tie') {
      this.largeBoard[x] = 'T';
      console.log('updating weights');
      this.updateWeights(this.turn, [x, y]);
    }

    // Checks wins and ties at large board and swtiches current player
    console.log('checking big tie or win');
    const largeCheck = this.checkWin(this.turn, this.largeBoard, y) ? 'Won' : this.checkTie(this.largeBoard) ? 'Tie' : 'Nothing';
    if ((largeCheck === 'Won')) {
      this.winner = this.turn;
    } else if (largeCheck === 'Tie') {
      this.winner = 'T';
    }

    // DEV: Experimental
    if (smallCheck === 'Nothing' && largeCheck === 'Nothing') {
      this.updateWeights(this.turn, [x, y]);
      this.moveHistory[this.moveCount] = [this.turn, x, y];
    } else {
      this.moveHistory[this.moveCount] = [this.turn, x, y, smallCheck, largeCheck];
    }
    this.turn = this.turn === 'X' ? 'O' : 'X';
    return true;
  }

  checkWin(player, board, move) {
    const y = move;
    if (y === undefined || y === null) {
      console.log('move is invalid, check before using checkWin');
      process.exit(1);
    }
    const row = board.slice(y - (y % 3), y - (y % 3) + 3);
    const col = [board[y % 9], board[(y + 3) % 9], board[(y + 6) % 9]];
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

  checkTie(board) {
    return board.every((cell) => cell);
  }

  updateWeights(player, move) {
    const [x, y] = move;

    if (player === 'X') {
      if (this.largeBoard[x] === 'X') {
        if (this.winner === 'X') {
          this.xWeightsLarge[x] += 1000;
        } else {
          this.xWeightsLarge[x] += 100;
        }
      } else if (this.largeBoard[x] === 'T') {
        this.xWeightsLarge[x] = 0;
        this.oWeightsLarge[x] = 0;
      }
      for (let i = 0; i < 9; i += 1) {
        if (this.xWeightsSmall[x][i] !== 0) {
          this.xWeightsSmall[x][i] += this.addWeightsToCell[y][i];
        }
      }
      this.oWeightsSmall[x][y] = 0;
    } else if (player === 'O') {
      if (this.largeBoard[x] === 'O') {
        if (this.winner === 'O') {
          this.oWeightsLarge[x] -= 1000;
        } else {
          this.oWeightsLarge[x] -= 100;
        }
      } else if (this.largeBoard[x] === 'T') {
        this.xWeightsLarge[x] = 0;
        this.oWeightsLarge[x] = 0;
      }
      for (let i = 0; i < 9; i += 1) {
        if (this.oWeightsSmall[x][i] !== 0) {
          this.oWeightsSmall[x][i] += this.subWeightsToCell[y][i];
        }
      }
      this.xWeightsSmall[x][y] = 0;
    }
  }
};
