document.addEventListener("DOMContentLoaded", () => {
    const userScoreEl = document.querySelector("#box2Score");
    const computerScoreEl = document.querySelector("#box1Score");
    const rulesButton = document.querySelector("#RuleBtn .btn");
    const rulesBox = document.querySelector(".RuleBox");
    const closeRulesButton = document.querySelector(".CloseBtn");
    const handIcons = document.querySelectorAll(".triangle-container .hand-icon img");
    const nextButtons = document.querySelectorAll(".next");
    let userScore = 0;
    let computerScore = 0;

    // Show rules box
    rulesButton.addEventListener("click", () => {
        rulesBox.style.display = "block";
    });

    // Close rules box
    closeRulesButton.addEventListener("click", () => {
        rulesBox.style.display = "none";
    });

    // Map user clicks to game logic
    handIcons.forEach((icon) => {
        icon.addEventListener("click", () => {
            const userChoice = icon.alt.toLowerCase(); // User's choice
            const computerChoice = generateComputerChoice(); // Random computer choice
            playGame(userChoice, computerChoice);
        });
    });

    // Generate computer choice
    function generateComputerChoice() {
        const choices = ["rock", "paper", "scissor"];
        return choices[Math.floor(Math.random() * choices.length)];
    }

    // Play the game and show the correct section
    function playGame(userChoice, computerChoice) {
        const result = determineOutcome(userChoice, computerChoice);

        // Hide all pre-written sections
        const allSections = document.querySelectorAll(".MainFrame > div, .P1-GameConsole, .P4-GameConsole, .P5-GameConsole, .P6-GameConsole, .P7-GameConsole, .P8-GameConsole, .P9-GameConsole");
        allSections.forEach((section) => (section.style.display = "none"));

        // Show the appropriate game section
        if (result === "tie") {
            document.querySelector(".P1-GameConsole").style.display = "flex";
        } else if (result === "win") {
            if (userChoice === "rock" && computerChoice === "scissor") {
                document.querySelector(".P8-GameConsole").style.display = "flex";
            } else if (userChoice === "paper" && computerChoice === "rock") {
                document.querySelector(".P9-GameConsole").style.display = "flex";
            } else if (userChoice === "scissor" && computerChoice === "paper") {
                document.querySelector(".P7-GameConsole").style.display = "flex";
            }
        } else if (result === "lose") {
            if (userChoice === "rock" && computerChoice === "paper") {
                document.querySelector(".P6-GameConsole").style.display = "flex";
            } else if (userChoice === "paper" && computerChoice === "scissor") {
                document.querySelector(".P4-GameConsole").style.display = "flex";
            } else if (userChoice === "scissor" && computerChoice === "rock") {
                document.querySelector(".P5-GameConsole").style.display = "flex";
            }
        }

        // Update scores
        updateScores(result);

        // Show Next button only when user wins
        nextButtons.forEach((btn) => {
            btn.style.display = result === "win" ? "block" : "none";
        });
    }

    // Determine the outcome
    function determineOutcome(user, computer) {
        if (user === computer) return "tie";
        if (
            (user === "rock" && computer === "scissor") ||
            (user === "paper" && computer === "rock") ||
            (user === "scissor" && computer === "paper")
        ) {
            return "win";
        }
        return "lose";
    }

    // Update scores
    function updateScores(result) {
        if (result === "win") {
            userScore++;
            userScoreEl.textContent = userScore;
        } else if (result === "lose") {
            computerScore++;
            computerScoreEl.textContent = computerScore;
        }
    }
});
