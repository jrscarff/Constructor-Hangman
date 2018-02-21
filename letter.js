function Letter(letter) {
	this.secret = letter;
	this.isGuessed = false;
	this.right = false;
	this.whatShown = function() {
		if (this.secret === " ") {
			this.isGuessed = true;
			return this.secret
		}
		if (this.isGuessed) {
			return this.secret
		}
		else {
			return "_"
		}
	};
	this.letterCheck = function(a) {
		this.right = false;
		if (a === this.secret) {
			this.isGuessed = true;
			this.right = true;
		}
	}
}

module.exports = Letter;