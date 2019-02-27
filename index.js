const Word = require("./word");
const inquirer = require("inquirer");

let guesses = 7;
let wordGuessed = false;
let guessedWord;
let currentWordObject;


const wordOptions = [
    "trumpet", "ukulele", "piano", "vibrophone", "guitar", "saxophone", "harpsichord", "harp"
];

const newWordCreator = ()=>{
    //randomnly select number to select word from Arr
    let randomNum = Math.floor(Math.random()* wordOptions.length);
    // console.log("RANDOM NUMBER", randomNum)
    let newWord = new Word(wordOptions[randomNum]);
    newWord.letterCreator();
    //global variable for current word object
    currentWordObject = newWord;
    guessedWord = newWord.stringMaker();
    //show the current word string (alerts user to the number of spaces)
    console.log(guessedWord);
    //start game
    playGame();  
}

const checkPlayerGuess = (letter)=>{
    currentWordObject.guessChecker(letter);
    guessedWord = currentWordObject.stringMaker();
}
//function to check if word has been guessed
const checkWordGuessed = ()=> {
    // arr to hold letters with false boolean for guessed
    let falseArr = [];
    currentWordObject.letterArr.forEach(letter =>{
        //if statement to push letters into array
        if(letter.guessed === false){
           falseArr.push(letter.letter);;
        }
    });
    //if array length less than one change flag to wordGuessed true
    if(falseArr.length < 1){
        wordGuessed = true;
    }
}

const playGame = ()=> {
    //check status of the word
    checkWordGuessed();
    //if word not guessed get letter
    if(!wordGuessed){
        inquirer.prompt([
            {
                type: "input",
                message: "Choose a letter!",
                name: "letter"
            }
        ]).then(letter =>{
        //create temporary variable of the word before checking the letter against the letter object
        let previousWord = guessedWord;
        //check letter from inquirer
        checkPlayerGuess(letter.letter);
        //check to see if the guess was right (is the previous same or different from newly built string)
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
        //start new game if they want to play
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
        //if previous word and newly built word differ than alert user was correct and ask for another letter
        else{
            console.log("Correct!!!");
            console.log(guessedWord);
            playGame();
        }
    });
    }
    //if word is spelled (flag is true), alert them and give them another word
    else{
        console.log("You win! Next word.");
        guesses = 7;
        wordGuessed = false;
        newWordCreator();
    }
}
//start game
newWordCreator();
