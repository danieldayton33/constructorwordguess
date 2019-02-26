const Letter = require("./letter");

const Word = function (word){
    this.letterArr = [];
    this.letterCreator = function() {
        let wordArr = word.split("");
        wordArr.forEach(letter =>{
        const newLetter = new Letter(letter);
        this.letterArr.push(newLetter);
        });
        // console.log(JSON.stringify(this.letterArr, null, 2));
    }
    this.stringMaker = ()=>{
        let stringArr = []
        this.letterArr.forEach(letter =>{
            stringArr.push(letter.export());
        });
        let wordGuessed = stringArr.join("");
        return wordGuessed;
    }   
    this.guessChecker = (guess)=> {
        this.letterArr.forEach(letter => {
            // console.log("GUESSED LETTER from word.guessChecker", guess);
             letter.checker(guess); 
            //  console.log("BOOLEAN FOR GUESSED LETTER FROM WORD.guessCHecker", letter.guessed);
        });
    }
}

// const test = new Word("Abraham");
// test.letterCreator();
// // console.log(test);
// test.stringMaker();
// test.guessChecker("a");
// test.stringMaker();

module.exports = Word;
