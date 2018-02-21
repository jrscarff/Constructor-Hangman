var letter = require('./letter.js');

var secretWord = "baseball";

function Word() {
	this.array = [];
	this.gameEnd = true;
	this.current = false;
	this.makeWord = function(secret) {
		for (var i = 0; i < secret.length; i++) {
			var added = new letter(secret[i]);
			this.array.push(added);
		}
	};
	this.display = function() {
		var displayArray = [];
		var count = 0;
		for (var i = 0; i < this.array.length; i++) {
			var displayLetter = this.array[i].whatShown();
			if (displayLetter == "_") {
				count ++;
			}
			displayArray.push(displayLetter);
		}
		console.log(displayArray.join(" "));
		if (count === 0) {
			this.gameEnd = false;
		}
	};
	this.guess = function(a) {
		var count = 0;
		for (var i = 0; i < this.array.length; i++) {
			this.array[i].letterCheck(a);
			if (this.array[i].right) {
				count ++;
			}
		}
		if (count > 0) {
			this.current = true;
		}
		else {
			this.current = false;
		}
	};
}

module.exports = Word;