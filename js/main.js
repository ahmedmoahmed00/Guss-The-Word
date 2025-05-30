//Setting Game Name
let gameName = "Guss The Word"

document.title = gameName;
document.querySelector("h1").textContent = gameName;
document.querySelector("footer").textContent = `${gameName} Game Created By Ahmed Mohammed`;

// Setting Game Options

let numbersOfTries = 6;
let numbersOfLetter = 6;
let currentTry = 1;
let numberOfHints= 2;

// Manage Words

let wordToGuess = "";
const words = ["Create","Update","Delete","Master","Branch","Mainly","Elzero","School"]
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
let messageArea = document.querySelector(".message");
console.log(wordToGuess)

// Manage Hints
document.querySelector(".hint span").innerHTML = numberOfHints;
const getHintButton = document.querySelector(".hint");
getHintButton.addEventListener("click",gitHint);


// Manage New Game

let elementnewGame = document.querySelector(".new-game");
elementnewGame.addEventListener("click",newGame);


function generateInput()
{
    const inputsContainer = document.querySelector(".inputs");

    for (let i = 1; i <= numbersOfTries; i++) 
    {
        const tryDiv = document.createElement("div");
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML = `<span>Try ${i}</span>`;

        if(i !== 1) tryDiv.classList.add("disabled-inputs");


        for (let j = 1; j <= numbersOfLetter; j++) 
        {
            const input = document.createElement("input");
            input.type = "text";
            input.id = `guess-${i}-letter-${j}`;
            input.setAttribute("maxlength","1");
            tryDiv.append(input);
        }


        inputsContainer.appendChild(tryDiv);
    }
    inputsContainer.children[0].children[1].focus();

    // Disable All Inputs Except First One
    const inputsInDisabledDiv = document.querySelectorAll(".disabled-inputs input")
    inputsInDisabledDiv.forEach((input) => input.disabled = true);

    const inputs = document.querySelectorAll("input");

    inputs.forEach((input, index)=>
    {
        input.addEventListener("input", function()
        {
            this.value = this.value.toUpperCase();
            const nextInput = inputs[index + 1];

            if (nextInput) nextInput.focus();
        });  
        
        input.addEventListener("keydown", function(event)
        {
            const currentIndex = Array.from(inputs).indexOf(event.target);
            if (event.key === "ArrowRight") 
            {
                const nextInput = currentIndex + 1;
                if (nextInput < inputs.length) inputs[nextInput].focus();
            }
            if (event.key === "ArrowLeft" ) 
            {
                const prevInput = currentIndex - 1;
                if (prevInput >= 0) inputs[prevInput].focus();
            }
            if (event.key === "Backspace") 
            {
                const prevInput = currentIndex - 1;
                
                if (Array.from(inputs)[currentIndex].value !== "") 
                {
                    Array.from(inputs)[currentIndex].value = "";
                    return;
                }
                
                const element = Array.from(inputs)[prevInput];
                if (element)
                {
                    inputs[prevInput].focus()
                    element.value = "";
                };
            }
        });  
    })
}

const guessButton = document.querySelector(".check");
guessButton.addEventListener("click",handleGuesses);

function handleGuesses()
{
    let successGuess = true;
    
    for (let i = 1; i <= numbersOfLetter; i++) 
    {
        const inputField = document.querySelector(`#guess-${currentTry}-letter-${i} `);
        const letter = inputField.value.toLowerCase();
        const actualLatter = wordToGuess[i - 1];

        // Game Logic

        if (letter === actualLatter && letter !== "") 
        {
            inputField.classList.add("yes-in-place");    
        }
        else if (wordToGuess.includes(letter) && letter !== "")
        {
            inputField.classList.add("not-in-place");
            successGuess = false;
        }
        else
        {
            inputField.classList.add("no");
            successGuess = false;
        }
    }

    if (successGuess)
    {
        messageArea.innerHTML = `You Win The Word Is <span>${wordToGuess}</span>`;

        let allTries = document.querySelectorAll(".input > div");
        allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));

        guessButton.disabled = true;
        getHintButton.disabled = true;
        elementnewGame.style.display = "inline";
    }else
    {
        let element = document.querySelector(`.try-${currentTry}`);
        element.classList.add("disabled-inputs");

        for (let i = 0; i < numbersOfLetter; i++) 
        {
            element.children[i].disabled = true;
        }
        
        currentTry++;
        element = document.querySelector(`.try-${currentTry}`);

        if (element) 
        {
            element.className = `try-${currentTry}`;
            for (let i = 0; i <= numbersOfLetter; i++) 
            {
                element.children[i].disabled = false;
            }

            element.children[1].focus();
        }
        else
        {
            guessButton.disabled = true;
            getHintButton.disabled = true;
            messageArea.innerHTML = `You Lose The Word Is <span>${wordToGuess}</span>`;
            elementnewGame.style.display = "inline";
        }
    }
}

function gitHint()
{
    if (numberOfHints > 0) 
    {
        numberOfHints--;    
        document.querySelector(".hint span").innerHTML = numberOfHints;
    }
    if (numberOfHints === 0) 
    {
        getHintButton.disabled = true;    
    }

    const enabledInputs = document.querySelectorAll("input:not([disabled])");

    const emptyEnabledInputs = Array.from(enabledInputs).filter((input) => input.value === "");

    if (emptyEnabledInputs.length > 0) 
    {
        const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
        const randomInput = emptyEnabledInputs[randomIndex];  
        const indexToFill = Array.from(enabledInputs).indexOf(randomInput);

        if (indexToFill !== -1) 
        {
            randomInput.value = wordToGuess[indexToFill].toUpperCase();    
        }
    }
}

function newGame()
{
    console.log(window);  
    window.location.reload();  
}

window.onload = function()
{
    generateInput();
};

