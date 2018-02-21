var inquirer = require("inquirer");
var word = require('./word.js');
var secretWord = ["baseball","basketball","soccer","golf","tennis","football","goal","touchdown","win","loss","points","hit",];
var winCount = 0;
var lossCount = 0;
var gameCount = 0;
var count = 0;
var guessCount = 10;
var alreadyGuessed = [];
var hiddenGuessed = [];
var displayWord = new word();
var actualWord = secretWord[Math.floor(Math.random() * secretWord.length)];
displayWord.makeWord(actualWord);

function startGame() {
	var test = true;
	if (count === 0) {
		displayWord.display();
		count ++;
	}
	inquirer.prompt([
	{
		message: "Guess a letter.",
		name: "letter"
	}
	]).then(function(res) {
		if (alreadyGuessed.length > 0) {
			console.log("\nLetters already guessed: " + alreadyGuessed.join(", "))
		}
		for (var i = 0; i < alreadyGuessed.length; i++) {
			if (alreadyGuessed[i] === res.letter || hiddenGuessed[i] === res.letter) {
				test = false;
			}
		}
		if (test) {
			displayWord.guess(res.letter);
			displayWord.display();
			if (displayWord.current) {
				console.log("You guessed right.\n", "Guesses left: " + guessCount)
				hiddenGuessed.push(res.letter);
			}
			else {
				guessCount --;
				console.log("You guessed wrong.\n", "Guesses left: " + guessCount);
				alreadyGuessed.push(res.letter);
				if (alreadyGuessed.length > 0) {
					console.log("Letters already guessed: " + alreadyGuessed.join(", ") + "\n");
				}
			}
			if (guessCount > 0 && displayWord.gameEnd) {
				startGame();
			}
			else if (guessCount < 1) {
				gameLost();
			}
			else {
				gameWon();
			}
		}
		else {
			displayWord.display();
			console.log('You have already guessed that. Pick another letter!');
			startGame();
		}
	})
}

function gameLost() {
	lossCount ++;
	gameCount ++;
	if (winCount > 0) {
		console.log('Wins: ' + winCount);
	}
	console.log('Losses: ' + lossCount);
	console.log("Games Played: " + gameCount);
	console.log("You have run out of guesses and lost.");
	inquirer.prompt([
	{
		type: "confirm",
		message: "Would you like to play again?",
		default: true,
		name: "confirm"
	}
	]).then(function(res) {
		if (res.confirm) {
			resetGame();
			startGame();
		}
		else {
			console.log('Thank You for playing!');
		}
	})
}

function gameWon() {
	winCount ++;
	gameCount ++;
	if (lossCount > 0) {
		console.log('Losses: ' + lossCount);
	}
	console.log('Wins: ' + winCount);
	console.log("Games Played: " + gameCount);
	console.log("You guessed the word correctly!");
	inquirer.prompt([
	{
		type: "confirm",
		message: "Would you like to play again?",
		default: true,
		name: "confirm"
	}
	]).then(function(res) {
		if (res.confirm) {
			resetGame();
			startGame();
		}
		else {
			console.log('Thank You for playing!');
		}
	})
}

function resetGame() {
	guessCount = 10;
	count = 0;
	alreadyGuessed = [];
	hiddenGuessed = [];
	actualWord = secretWord[Math.floor(Math.random() * secretWord.length)];
	displayWord.makeWord(actualWord);
	displayWord.gameEnd = true;
}


startGame();