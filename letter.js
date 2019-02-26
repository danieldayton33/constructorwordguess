
const Letter = function(letter){
    this.letter = letter.toString();;
    this.guessed = false;
    this.export = () => {
        if(this.guessed){
           return this.letter;
        }
        else {
            return " _ ";
        }
    }
    this.checker = (guess)=> {
        // console.log("IN LETTER.CHECKER");
        // console.log("THIS.LETTER", this.letter);
        // console.log("THIS.CHECKER Guess", guess);
        if(guess === this.letter){
            this.guessed = true;
            // console.log("GUESSED LETTER FROM LETTER.checker)", this.guessed);
        }
        else {
            return false;
        }
    }
}

// let newLetter = new Letter('a');
// console.log(newLetter);
// newLetter.checker("b");
// console.log(newLetter);

module.exports = Letter;