const uttt = require('./minimax.js');

module.exports = class buttt extends uttt {
    constructor() {
        super();
    }

    // Predicts winning chance for current opponent after the next move
    predictWin () {
        let currentBoard = this.smallBoards[this.move[1]];
        let predictions = currentBoard.forEach((cell, index) => {
            if(cell !== null) {
                for (let i = 0; i < 9; i++) {
                    if (this.smallBoards[index] !== null) {
                        this.smallBoard[index]
                    }
                    else {
                        return "Filled"
                        break;
                    }
                }
            }
        })
    }
}
