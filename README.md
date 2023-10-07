# Ultimate Tic Tac Toe 2

This is a revised version of the game [I](https://github.com/PBJI) previously developed back in 2021. Ultimate Tic Tac Toe is a board game composed of nine tic-tac-toe boards arranged in a 3 × 3 grid. Players take turns playing on the smaller tic-tac-toe boards until one of them wins on the larger board. Compared to traditional tic-tac-toe, strategy in this game is conceptually more difficult and has proven more challenging for computers.

## Features

The main features of this project are:

- Rich and friendly UI
- Multiplayer mode
- Unbeatable bot using minimax algorithm

## Development 
<!-- Hi, owner you should keep updating this section after major or minor change -->
<!-- 
  What will be considered a major or minor change? 
  A minor change would introduce a feature addition and a major change would introduce a breaking change.
  Where older versions of the application would not be compatible with the new one.
  
  In our case for example, a major change would be to re-design the data model in the database application.
  Or re-develop the application with other tech stack.
  This change will render front-end or back-end partially or in rare case completely non-functional.
  Hence README.md should notify the contributors about these changes, especially Major ones.

  For example if in future the (contributors) decide to change the applications database management system from Firebase to MongoDB,
  then the README.md should reflect that decision and an issue must be referred for the same.
-->

This project is divided into four main branches, reflecting the four main features:

- [`modules`](https://github.com/PBJI/ultimate-tic-tac-toe-2/tree/modules): Main branch where every production-ready changes get merged. Also, it keeps track of the repository's important branches, releases, actions, issues, and pull requests.
- [`bot`](https://github.com/PBJI/ultimate-tic-tac-toe-2/tree/bot): The experimental branch where tests and simulations are run on different bots.
- [`backend`](): The development environment with Express library, Node.js runtime with Firebase as database to save games history or help connect two players in real-time. It will also serve the frontend files from the frontend branch.
- [`frontend`](): This branch contains the React development environment with build and production files.

To ensure no merge conflicts occur when developing these separate features, each of this branches will contain only one sub-directory under which their development would take place, except for the modules (main) branch:
- bot: Game/
- backend: Backend/
- frontend: Frontend/
<br>

**NOTE: To develop in this project, your workflow should ideally include the following git workflow:**

Step-1: If you want to work on any of the main features, then first execute following commands from the root directory of the project.
> b: ```git switch <branch-name>```<br>
> sd: ```cd <branch-sub-directory>```<br>
Make some changes, like adding features or fixing a bug.<br>
> a: ```git add .```<br>
> c:```git commit "use [commits_conventions](https://www.conventionalcommits.org/en/v1.0.0"/)"```<br>
> Acronym: b-sd-a-c<br>

<br>
Example:

> b: ```git switch bot```<br>
> sd: ```cd Game```<br>
> Made some changes<br>
> a: ```git add .```<br>
> c: ```git commit "change: the reason for changes"```<br>
> Acronym: b-sd-a-c <br>

<br><br>

Step-2: If you are ready to merge your changes into the (main branch) modules branch as production ready, then from root directory follow below cmds.
> m: ```git switch modules```<br>
> branch-name: the branch in which changes are committed in step-1 <br>
> branch-directory: the directory in which the commits are performed <br>
> ch: ```git checkout <branch-name> ./<branch-directory>```<br>
> a: ```git add .```<br>
> c: ```git commit "use [commits_conventions](https://www.conventionalcommits.org/en/v1.0.0"/)"```<br>
> Acronym: m-ch-a-c <br>

<br>
Example:

> m: ```git switch modules```<br>
> ch: ```git checkout bot ./Game ```<br>
> a: ```git add .```<br>
> c: ```git commit "change: the reason for changes"```<br>
> Acronym: m-ch-a-c

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
