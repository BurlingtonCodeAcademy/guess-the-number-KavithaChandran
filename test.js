//Function to use verbage for async/await
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });

}
//Function validates the user input  Yes or No for all the guess
async function ValidateYesNo() {
  ResponseYN = await ask('okay! is it...' + " " + number + ' (Y/N)?:');
  // this is done to check whether the response is gonna be yes or no
  while (true) {
    if (ResponseYN === "y" || ResponseYN === "Y") {
      break;
    }
    else if (ResponseYN === "n" || ResponseYN === "N") {

      break;
    }
    else {
      //
      ResponseYN = await ask('Please input either "y" or "n" : ');

    }

  }
  return ResponseYN;
}

// Function Generates the range based on median
// set up the min and max range
let min = 1
let max = 100
// function which is used to find the range of all the guesses
function RangeFinder(min, max) {

  let range = (max + min) / 2
  return Math.floor(range);
}
let number = RangeFinder(min, max)

//Main Async Function that fetches the User input and Guesses the number
async function start() {
  console.log("Let's play a game where you think a number and I try to guess it.")
  //user can set the max guess range 
  max = await ask('What is your max range?: ')
// done so that the player enter a number and not any other letters
  max = parseInt(max)
  while (isNaN(max)) {

    max = await ask("Let's try this again. \nPlease enter a number:\n ")
    max = parseInt(max)
  }
  min = 0
  //User Input Initialization 
// comp asks the user to think of a number and also enter a max range 
  let secretNumber = await ask("Think of a secret number between 1 " + "and " + max + "?" + "\n Please type in below for your reference, I won't peek, I promise...\n")
  //parseInt is done for the reply to be an integer and not any thing else
  secretNumber = parseInt(secretNumber)
  while (isNaN(secretNumber)) {

    secretNumber = await ask("Let's try this again. \nPlease enter a number:\n ")
    secretNumber = parseInt(secretNumber)
  }

  console.log('You entered: ' + secretNumber);
  //  parseInt was called to return string argument to Integers
  if (secretNumber > max) {
    console.log("Your secret number is outside the maximum range, please play again")
    playAgain()
  }

  number = RangeFinder(min, max++)

  //Game Initialization & Evaluation

  let UserResponse = await ValidateYesNo();

  let numOfGuess = 1

  //Main logic= simple math -where it finds the new median and compares with the already stored median number 
  // median is find using the range function which was explained under RangeFinder function
  while (UserResponse === 'N' || UserResponse === 'n' && min !== max) {
    let responseHiLo = await ask("Is it Higher (h) or Lower (l) than" + " " + number + " " + "(H/L)?:")
    if (responseHiLo === 'H' || responseHiLo === 'h' && min !== number) {
      min = number
      max = Math.floor(parseInt(max))
      number = RangeFinder(min, max)
      UserResponse = await ValidateYesNo();
    }
    else if (responseHiLo === 'L' || responseHiLo === 'l' && max !== number) {
      max = number
      min = Math.floor(parseInt(min))
      number = RangeFinder(min, max)
      UserResponse = await ValidateYesNo();

    }

    //returns the number of guess taken to guess the number
    numOfGuess++
    console.log(number+''+min+' '+max)
  }
  // returns the output when the right number is guessed
  if (UserResponse === 'Y' || UserResponse === 'y') {

    console.log("Tadddddaa! Your number is " + number + ", I won in " + numOfGuess + " guesses")
    playAgain()
  }
  //if any one of this condition becomes true, then computer understands user is cheating 
  else if (min === max || min === number || max === number) {
    console.log("Haha!!! Don't try to cheat me ;)")
    playAgain()

  }

}
// Async function to play the game again
async function playAgain() {
  let playAgain = await ask("Would you like to play again (Y/N):")
  if (playAgain === "Y" || playAgain === "y") {
    start()
  } else {
    console.log("See you soon")
    process.exit()
  }
}

//calling the Main Async Function
start();