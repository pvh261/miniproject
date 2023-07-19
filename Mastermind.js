let reset = document.getElementById("reset");
let submit = document.getElementById("submit");
reset.addEventListener('click', resetGame, false);
submit.addEventListener('click', submitGuess, false);
let secretCode = null;
let colors = ["red", "blue", "yellow", "green", "orange", "purple"];
let guessNum = 0
/****  WRITE A COMMAND HERE THAT WILL RESET THE GAME USING resetGame() *****/
resetGame()
function resetGame() {
    /****  WRITE A COMMAND HERE THAT WILL PICK A RANDOM CODE THE GAME *****/
    /****  USING THE FUNCTION YOU DEFINE BELOW *****/
    createCode()
    console.log(secretCode)
    while (document.getElementById("feedback").firstChild) {
        document.getElementById("feedback").removeChild(document.getElementById("feedback").firstChild)
    }
    submit.addEventListener('click', submitGuess, false);
    guessNum = 0
    document.getElementById("guessNum").textContent = "You have guessed " + guessNum + " times."
    for (let guess of document.getElementsByTagName("select")) {
        guess.value = "red"
    }
}

/*** CREATE A FUNCTION HERE THAT WILL PICK A RANDOM 4-COLOR CODE AND ****/
/***** STORE IT AS AN ARRAY IN THE VARIABLE NAMED secretCode. ******/
//For example, a valid value for secretCode could be ["blue", "red", "green", "blue"]
function createCode() {
    //first make sure there is nothing in the secretCode array by making it an empty array
    secretCode = []
    //push 4 random strings from the colors array into the secretCode array
    for (let i = 0 ; i < 4 ; i++) {
        secretCode.push(colors[Math.floor(Math.random()*colors.length)])
    }
} 

function submitGuess() {
    let correct = true
    let colored = 0
    let white = 0
    let guesses = []
    for (let guess of document.getElementsByTagName("select")) {
        guesses.push(guess.value)
    }
    for (let color of colors) {
        let colorInCode = 0
        let colorInGuess = 0
        for (let i = 0; i < 4; i++) {
            if (secretCode[i]==color) {colorInCode+=1}
            if (guesses[i]==color) {colorInGuess+=1}
        }
        white += Math.min(colorInCode, colorInGuess)
    }
    for (let i = 0; i < guesses.length; i++) {
        if (guesses[i] == secretCode[i]) {
            colored +=1
        }
    }
    white -= colored
    let result = document.createElement("div")
    result.className = "result"
    for (let guess of guesses) {
        let colorOrb = document.createElement("div") 
        colorOrb.className = "colorOrb"
        colorOrb.style.setProperty("background-color", guess)
        result.appendChild(colorOrb)
    }
    let pegs = document.createElement("div")
    pegs.className = "pegsBox"
    for (let i = 0; i < colored; i++) {
        let peg = document.createElement("div") 
        peg.className = "red pegs"
        pegs.appendChild(peg)
    }
    for (let i = 0; i < white; i++) {
        let peg = document.createElement("div") 
        peg.className = "white pegs"
        pegs.appendChild(peg)
    }
    result.appendChild(pegs)
    document.getElementById("feedback").appendChild(result)
    guessNum += 1
    if (colored == 4) {
        let result = document.createElement("div")
        result.className = "result"
        result.textContent = "You win!"
        submit.removeEventListener('click', submitGuess, false);
        document.getElementById("feedback").appendChild(result)
    }
    document.getElementById("guessNum").textContent = "You have guessed " + guessNum + " times."
}

