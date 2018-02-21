console.log("Welcome to Hangman!");

var inquirer = require("inquirer");
var word = require('./word.js');
var secretWord = ["baseball","basketball","soccer","golf","tennis","football","goal","touchdown","win","loss","points","hit", "victory", "winner", "loser", "score", "par", "stadium", "field", "pitch", "catch", "kick", "pass", "bounce pass", "match point", "home team", "away team", "favorite", "underdog", "champion", "excessive celebration", "foul", "penalty", "margin of victory", "runs batted in", "statistics", "highlights", "amateur", "professional", "contact", "free agent", "trade", "field goal", "shutout", "undefeated", "playoffs", "quarterback", "position", "player", "practice", "cover the spread", "game", "watch the game", "fans", "referees", "ball", "victory parade", "trophy", "title", "equipment", "helmet", "gloves", "run", "special teams", "offense", "defense", "in transition", "substitution", "sub", "starter"];
var winCount = 0;
var lossCount = 0;
var gameCount = 0;
var count = 0;
var guessCount = 10;
var letterArray = "qwertyuioplkjhgfdaszxcvbnm";
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
		var letterTest = true
		for (var i = 0; i < letterArray.length; i++) {
			if (letterArray[i] === res.letter) {
				letterTest = false;
			}
		}
		if (res.letter.length > 1 || letterTest) {
			console.log("Sorry that is not a valid letter. Try again.");
			startGame();
		}
		else {
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