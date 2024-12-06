import { main } from "../API/variables.js"

export function TicTac() {

    const existingBoard = document.querySelector("#tic-tac");
    if (existingBoard) {
        console.log("Tic-Tac-Toe is already rendered.");
        return; 
    }

    const score = [];

    main.setAttribute("id", "tic-tac")
    const status = document.createElement("p");
    status.innerHTML = `X starts`;
    let container = document.createElement("div");
    container.classList.add("tic-tac-container");
    let board = document.createElement("div");
    board.classList.add("tic-tac-board");
    let intro = document.createElement("div");
    intro.classList.add("intro-tic-tac");
    intro.innerHTML = `<h1>Welcome to a game of Tic-Tac-Toe!</h1> <br> <p>Drag and drop the options on the board to start</p>`;
    main.append(intro)
    main.append(container)
    container.append(board);
    main.append(status);

    for (let i = 1; i < 10; i++) {
        let space = document.createElement("div");
        space.classList.add(`tic-tac-space`);
        space.classList.add(`score_${i}`);
        board.append(space);
        score.push({ space: `score_${i}`, value: null });  
    }

    let navBoard = document.createElement("div");
    navBoard.classList.add("nav-board");
    container.append(navBoard);

    let keyValues = ["X", "O"];
    let activeOption = "X";  

    keyValues.forEach(key => {
        let keyOption = document.createElement("div");
        keyOption.textContent = key;
        keyOption.classList.add("tic-tac-option");

        if (key === activeOption) {
            keyOption.setAttribute("draggable", "true");
        } else {
            keyOption.setAttribute("draggable", "false");
        }

        navBoard.append(keyOption);

        keyOption.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text", key);

            if (key === "X") {
                activeOption = "O";
            } else {
                activeOption = "X";
            }
        });
    });

    function updateDraggableState() {
        let allOptions = document.querySelectorAll(".tic-tac-option");
        allOptions.forEach(option => {
            if (option.textContent === activeOption) {
                option.setAttribute("draggable", "true");
                status.innerHTML = `${option.textContent}'s turn`;
            } else {
                option.setAttribute("draggable", "false");
            }
        });
    }

    const spaces = document.querySelectorAll(".tic-tac-space");
    spaces.forEach((space, i) => {
        space.addEventListener("dragover", (e) => {
            e.preventDefault();
        });

        space.addEventListener("drop", (e) => {
            e.preventDefault();
            updateDraggableState();
            
            const draggedValue = e.dataTransfer.getData("text");

            if (!space.textContent) {
                space.textContent = draggedValue;
                score[i].value = draggedValue;  
                space.style.pointerEvents = "none";

                if (checkWinner(draggedValue)) {
                    status.innerHTML = `${draggedValue} wins!`;
                    spaces.forEach(space => space.style.pointerEvents = "none"); 
                } else if (score.every(s => s.value !== null)) {

                    status.innerHTML = "It's a tie!";
                }
            }
        });
    });

    function checkWinner(player) {

        const winConditions = [
            [0, 1, 2], 
            [3, 4, 5], 
            [6, 7, 8], 
            [0, 3, 6], 
            [1, 4, 7],
            [2, 5, 8], 
            [0, 4, 8], 
            [2, 4, 6], 
        ];

        return winConditions.some(condition => {
            return condition.every(index => score[index].value === player);
        });
    }
}