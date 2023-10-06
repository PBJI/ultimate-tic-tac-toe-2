# Ultimate Tic Tac Toe 2

This is a revised version of the game [I](https://github.com/PBJI) previously developed back in 2021. Ultimate Tic Tac Toe is a board game composed of nine tic-tac-toe boards arranged in a 3 × 3 grid. Players take turns playing on the smaller tic-tac-toe boards until one of them wins on the larger board. Compared to traditional tic-tac-toe, strategy in this game is conceptually more difficult and has proven more challenging for computers.

## Features

The main features of this project are:

- Rich and friendly UI
- Multiplayer mode
- Unbeatable bot using minimax algorithm

## Development

This project is divided into four branches:

- [`modules`](https://github.com/PBJI/ultimate-tic-tac-toe-2/tree/modules): Main branch where every production-ready changes get merged. Also, it keeps track of the repository's important branches, releases, actions, issues, and pull requests.
- [`bot`](https://github.com/PBJI/ultimate-tic-tac-toe-2/tree/bot): The experimental branch where tests and simulations are run on different bots.
- [`backend`](): The development environment with Express, Node.js with Firebase as database, to serve the frontend React build files from the frontend branch and also save games history.
- [`frontend`](): This branch contains the React development environment again with Firebase.

To ensure no merge conflicts occur when developing these separate features, each of this branches will contain only one sub-directory under which their development would take place, except for the modules (main) branch:
- bot: Game/
- backend: Backend/
- frontend: Frontend/

Your workflow should ideally look like this:
```
// Step-1: If you want to work on any feature, then execute following cmds first from root directory.

git switch <branch-name>
cd <branch-sub-directory>
//Make some changes.
git add .
git commit "use [commits_conventions](https://www.conventionalcommits.org/en/v1.0.0"/)"



// Step-2: If you are ready to merge your changes into the (main branch) modules branch as production ready, then from root directory follow below cmds.

git switch modules
git checkout <branch-name> ./<branch-directory> //Only adds changes made in the Game directory of bot branch
git add .
git commit "use [commits_conventions](https://www.conventionalcommits.org/en/v1.0.0"/)"
```

e.g.:
```
Step-1:
git switch bot
cd Game
//Made some changes
git add .
git commit "change: the reason for changes"

Step-2:
git switch modules
git checkout bot ./Game //Only adds changes made in the /Game of bot branch ---> modules branch
git add .
git commit "change: the reason for changes"
```

## How to play

To play the game, you need to clone this repository and install the dependencies using `npm install`. Then, you can run the game using `npm start`. You can choose to play against another human player or against the bot. The rules of the game are as follows:

- The first player is X and the second player is O.
- On each turn, the player marks one of the small squares within one of the nine sub-boards.
- The choice of sub-board for the next move is determined by the previous move.
- If the sub-board where the next move must be made is already won or tied, then the player can choose any other sub-board instead.
- The game is won by the player who wins three sub-boards in a row (horizontally, vertically, or diagonally), or by the player who wins the most sub-boards if all of them are filled.

## Details on Contribution

[Contribution guidelines for this project.](./contributors.md)

## License

This project is licensed under the `{placeholder}` License - see the [LICENSE](^1^) file for details.

<!-- (^1^): Input link to license file in place of that.-->
<!-- [`backend`](): Input link to backend branch in place of that.-->
<!-- [`frontend`](): Input link to frontend branch in place of that.-->
<!-- Please, improve the how to play section.-->
