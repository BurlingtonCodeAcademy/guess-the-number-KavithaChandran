//Function to use verbage for async/await
const { Console } = require('console');
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
    return new Promise((resolve, reject) => {
        rl.question(questionText, resolve);
    });
}
//Function to determine range
let min = 0
let max = 100
function randomInteger(min, max) {
    let range = max - min + 1;
    let randInt = Math.floor(Math.random() * range);
    return randInt
}
// Initialize Validate function to make it not accept non integer values
async function Validate(UserVariable) {
   
    UserVariable = parseInt(UserVariable)
    while (isNaN(UserVariable)) {

        UserVariable = await ask("Let's try this again. \nPlease enter a number: ")
        UserVariable = parseInt(UserVariable)
    }
    return UserVariable
}
//Main Brain logic of comparing the user and computer variables
async function start() {
    let CompVariable = randomInteger(min, max)
    console.log('I thought of a number between '+min+'-'+max +  ' ,Now its your time to guess in ten chances....')

    //console.log("I thought : " + CompVariable)
    CompVariable = parseInt(CompVariable)
    let UserVariable = await ask(' What is your guess? ')
    let UserGuess = 1

    UserVariable = await Validate(UserVariable)
    while (UserVariable !== CompVariable && UserGuess < 10) {
        if (UserVariable < CompVariable) {
            UserVariable = await ask('Your guess ' + UserVariable + ' is lower than I thought,Try a new guess: ')

            UserVariable = await Validate(UserVariable)
        }
        else if (UserVariable > CompVariable) {
            UserVariable = await ask('Your guess ' + UserVariable + ' is higher than I thought,Try a new guess: ')

            UserVariable = await Validate(UserVariable)
        }
        // this increases the guess every time after the comparison
        UserGuess++
    } 
    // validates and ends the game after 10 guesses
    if (UserGuess < 10) {
        console.log("Yay!! you got my number " + UserVariable + " in  " + UserGuess + "  guesses")
    } else {
        console.log("You have exceeded the maximum number of guess(" + UserGuess + ") \n I thought " + CompVariable)
    }
    process.exit()
}
//calling the Main Async Function
start();