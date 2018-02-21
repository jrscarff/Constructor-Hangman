var inquirer = require("inquirer");
var word = require('./word.js');
var secretWord = "baseball";
var guessCount = 10;
var displayWord = new word();
displayWord.makeWord(secretWord);

function startGame() {
	inquirer.prompt([
	{
		message: "Guess a letter.",
		name: "letter"
	}
	]).then(function(res) {
		displayWord.guess(res.letter);
		displayWord.display();
		if (displayWord.current) {
			console.log("You guessed right.\n", guessCount)
		}
		else {
			guessCount --;
			console.log("You guessed wrong.\n", guessCount);
		}
		if (guessCount > 0 && displayWord.gameEnd) {
			startGame();
		}
	})
}

startGame();