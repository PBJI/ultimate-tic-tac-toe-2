[# ABOUT THE GAME](https://en.wikipedia.org/wiki/Ultimate_tic-tac-toe#)
### Ultimate TicTacToe
Ultimate tic-tac-toe (also known as super tic-tac-toe, meta tic-tac-toe or (tic-tac-toe)²[1]) is a board game composed of nine tic-tac-toe boards arranged in a 3 × 3 grid.[2][3] Players take turns playing on the smaller tic-tac-toe boards until one of them wins on the larger board. Compared to traditional tic-tac-toe, strategy in this game is conceptually more difficult and has proven more challenging for computers.

### UTTT APP - Vision:
The biggest feature for this project would be:
- Rich and Friendly UI
- Multiplayer
- Unbeatable Agent

### Checkout list of games similar to UTTT:

[Checkout this wikipedia list of abstract games](https://en.wikipedia.org/wiki/Category:Abstract_strategy_games) <br>
[Checkout this wikipedia list of mathematical games](https://en.wikipedia.org/wiki/Category:Mathematical_games) <br>
[Checkout this wikipedia list of paper and pencial games](https://en.wikipedia.org/wiki/Category:Paper-and-pencil_games) <br>

### Discuss:
[Discussion](https://github.com/PBJI/ultimate-tic-tac-toe-2/discussions)

Creating documentation for your code is a valuable step in making it understandable and accessible to other developers who may want to contribute or use your code. Below, I'll provide a template for documenting your `uttt` class in JavaScript. You can include this documentation in your README.md file or in a separate documentation file.

---

# Ultimate Tic-Tac-Toe (UTTT) Class Documentation

The `uttt` class is a JavaScript implementation of the Ultimate Tic-Tac-Toe game with added features such as weighted cells and a game engine suitable for two players or an AI bot. This documentation provides an overview of the class, its methods, properties, and usage instructions.

## Table of Contents

1. [Overview](#overview)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Methods](#methods)
5. [Properties](#properties)
6. [Contributing](#contributing)
7. [License](#license)

## 1. Overview

The `uttt` class represents an instance of the Ultimate Tic-Tac-Toe game. It includes features such as weighted cells for strategic gameplay and is designed to facilitate contributions and customization.

## 2. Installation

You can use the `uttt` class by including it in your JavaScript project. There are no external dependencies to install. Simply import the class and create an instance to start using it in your project.

```javascript
const UTTT = require('./uttt'); // Adjust the import path as needed
const game = new UTTT();
```

## 3. Usage

Here is a basic example of how to use the `uttt` class to play the Ultimate Tic-Tac-Toe game:

```javascript
const UTTT = require('./uttt');

// Create a new game instance
const game = new UTTT();

// Make moves for two players (X and O)
game.makeMove(0, 0); // Player X makes a move at position (0, 0)
game.makeMove(1, 1); // Player O makes a move at position (1, 1)

// Continue making moves until a winner is determined or the game ends
```

## 4. Methods

### `makeMove(x, y, debug)`

Makes a move on the game board.

- `x`: The row index (0 to 8) of the cell in which the move is made.
- `y`: The column index (0 to 8) of the cell in which the move is made.
- `debug` (optional): Set to `true` to enable debug mode.

Returns `true` if the move is valid and successful; otherwise, it returns `false`.

## 5. Properties

The uttt class has several properties, including smallBoards, largeBoard, turn, winner, and more, which store information about the game state, player turns, and board conditions. Please refer to the code comments for detailed descriptions of these properties.
