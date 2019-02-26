const Word = require("./word");
const inquirer = require("inquirer");

let guesses = 7;
let wordGuessed = false;
let guessedWord;
let currentWord;


const wordOptions = [
    "trumpet", "ukulele", "piano", "vibrophone", "guitar", "saxophone", "harpsichord", "harp"
];

const newWordCreator = ()=>{
    let randomNum = Math.floor(Math.random()* wordOptions.length);
    // console.log("RANDOM NUMBER", randomNum)
    let newWord = new Word(wordOptions[randomNum]);
    newWord.letterCreator();
    currentWord = newWord;
    // console.log("GLOBAL CURRENTWORD OBJECT", currentWord);
    guessedWord = newWord.stringMaker();
    console.log(guessedWord);
    playGame();  
}

const checkPlayerGuess = (letter)=>{
    currentWord.guessChecker(letter);
    guessedWord = currentWord.stringMaker();
}
//function to check if word has been guessed
const checkWordGuessed = ()=> {
    // console.log(currentWord.letterArr);
    let falseArr = [];
    currentWord.letterArr.forEach(letter =>{
            // console.log("LETTER BOOLEAN", letter.guessed);
        if(letter.guessed === false){
           falseArr.push(letter.letter);;
        //    throw BreakException;
        // }
        // else {
        //     console.log('Words been Guessed!');
        //     wordGuessed = true;
        }
       
        
    });
    // console.log(falseArr);
    if(falseArr.length < 1){
        wordGuessed = true;
    }
}

const playGame = ()=> {
    checkWordGuessed();
    // console.log("GUESSEWORD-PLAYGAME 1", guessedWord);
    //if word not guessed get letter
    if(!wordGuessed){
        inquirer.prompt([
            {
                type: "input",
                message: "Choose a letter!",
                name: "letter"
            }
        ]).then(letter =>{
            // console.log("LETTER FROM INQUIRER", letter.letter);
        let previousWord = guessedWord;
        // console.log("CURRENT WORD", previousWord);
        checkPlayerGuess(letter.letter);
        //check to see if the guess was right
        if(previousWord === guessedWord ){
            guesses--;
            //check to see if any guesses are remaining
            if(guesses > 0){
            console.log("INCORRECT! Guesses remaining: " + guesses);
            console.log(guessedWord);
            playGame();
            }
            //if not ask if they want to play again.
            else{
                console.log("You're out of guesses!");
                inquirer.prompt([
                {
                    type: "confirm",
                    message: "Game over! Do you want to play again?",
                    name: "playAgain"
                }
            ]).then(answer =>{
                if(answer.playAgain === true){
                    guesses = 7;
                    newWordCreator();
                }
                else{
                    console.log("Thanks for playing!");
                }
            });
            }
        }
        else{
            console.log("Correct!!!");
            console.log(guessedWord);
            playGame();
        }
    });
    }
    else{
        console.log("You win! Next word.");
        guesses = 7;
        wordGuessed = false;
        newWordCreator();
    }
}
newWordCreator();
