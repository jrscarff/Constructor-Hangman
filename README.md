# Constructor Hangman

This terminal application allows you to play a sports themed game of hangman as many times as you want and tracks your score.

## Getting Started

In order to run the program, navigate to it in terminal and then install the dependencies in the package.json file using npm install.

### Prerequisites

You need to install the node module inquirer in order for the game to function. 

If your package.json file is in your folder:

```
npm install
```

If you don't have a package.json file:
```
npm init -y
npm install inquirer
```

## Starting the game

To start the game run the program in terminal and enter a letter and press enter. Repeat this until you run out of guesses or complete the hangman word.

After the game ends, you will be prompted to start a new game. Default is to start a new game. At any point in time you should be able to exit the game using CTRL+C.

### Explaining Functionality

The game uses construtor functions to create a Word for the answer and then a Letter for each letter of the answer word. Each letter has a boolean value that is changed when that letter is guessed.

The Letter constructor function is in the letter.js and exported to the word.js for the wWord constructor function to use. The Word constructor function is then exported to index.js for the game. 

## Built With

* [Inquirer](https://www.npmjs.com/package/inquirer) - The prompting framework used 
* [PurpleBooth](https://github.com/PurpleBooth) - The ReadME style used

## Authors

* **Ryan Scarff** - *Initial work* - [PurpleBooth](https://github.com/jrscarff/Constructor-Hangman)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
