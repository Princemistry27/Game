const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// Winning Patterns
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Box Click Function
const handleBoxClick = (e) => {
    const index = e.target.dataset.index;

    if (!gameBoard[index] && gameActive) {
        gameBoard[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        e.target.classList.add("clicked");

        checkWinner();
        togglePlayer();
    }
};

// Switch Players
const togglePlayer = () => {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
};

// Check for Winner
const checkWinner = () => {
    for (let combo of winningCombinations) {
        let [a, b, c] = combo;

        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            highlightWinner(combo);
            displayMessage(`${gameBoard[a]} Wins!`);
            return;
        }
    }

    if (!gameBoard.includes("")) {
        displayMessage("It's a Draw!");
        gameActive = false;
    }
};

// Highlight Winning Combination
const highlightWinner = (combo) => {
    combo.forEach(index => {
        boxes[index].classList.add("win");
    });
};

// Display Message
const displayMessage = (text) => {
    msg.textContent = text;
    msgContainer.classList.remove("hide");
};

// Reset Game
const resetGame = () => {
    gameBoard.fill("");
    gameActive = true;
    currentPlayer = "X";

    boxes.forEach(box => {
        box.textContent = "";
        box.classList.remove("win", "clicked");
    });

    msgContainer.classList.add("hide");
};

// Event Listeners
boxes.forEach((box, index) => {
    box.dataset.index = index;
    box.addEventListener("click", handleBoxClick);
});

resetBtn.addEventListener("click", resetGame);
newBtn.addEventListener("click", resetGame);
