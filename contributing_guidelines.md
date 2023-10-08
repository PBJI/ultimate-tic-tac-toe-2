# Contributing Guidelines

Thank you for your interest in contributing to the Ultimate Tic Tac Toe project. We appreciate your efforts and welcome your feedback and suggestions.

Before you start contributing, please read and follow these guidelines:

- Check the [issues](https://github.com/PBJI/ultimate-tic-tac-toe-2/issues) page to see if there is an existing issue related to your contribution. If not, you can create a new issue and describe what you want to work on.
- Fork the repository and create a new branch for your feature or bug fix.
- Follow the standard code style and naming conventions of the project. Use descriptive and meaningful variable names and comments.
- Write clear and concise commit messages that explain what you have done and why. Use the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification for your commit messages.
- Open a pull request and describe the changes you have made. Reference the issue number if applicable.
- Wait for the project maintainers to review your pull request. Be responsive to their feedback and suggestions.

We value your time and effort in improving this project. Thank you for your contribution!

**NOTE: To develop in this project, your workflow would ideally include the following git workflow:**

Step-1: If you want to work on any of the main features, then first execute following commands from the root directory of the project.
> b: ```git switch <feature-branch-name>```<br>
> sd: ```cd <feature-branch-sub-directory>```<br>
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
> branch-name: the feature branch in which changes were committed in step-1 <br>
> branch-directory: the directory in which the commits were performed in step-1<br>
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
