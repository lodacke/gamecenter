import { swapCSS } from "../Utilities/swapCSS.js";
import { main } from "../Utilities/variables.js"

export function TicTac() {

    swapCSS("tic-tac")
    main.replaceChildren()

    const existingBoard = document.querySelector("#tic-tac");
    if (existingBoard) {
        console.log("Tic-Tac-Toe is already rendered.");
        return; 
    }

    main.id = "tic-tac";
    const status = document.createElement("p");
    status.classList.add("status");
    let container = document.createElement("div");
    container.classList.add("tic-tac-container");
    let boardStatus = document.createElement("div");
    boardStatus.classList.add("tic-tac-boardStatus");
    let board = document.createElement("div");
    board.classList.add("tic-tac-board");
    let intro = document.createElement("div");
    intro.classList.add("intro-tic-tac");
    intro.innerHTML = `<h1>Let's play Tic-Tac-Toe</h1> <br> <p>Drag and drop the options on the board to start</p>`;
    main.append(container)
    boardStatus.append(intro)
    container.append(boardStatus)
    boardStatus.append(board);
    boardStatus.append(status)

    let navBoard = document.createElement("div");
    navBoard.classList.add("nav-tic-tac");
    container.append(navBoard);

    let gamefield = {
        board, navBoard, status
    }

    renderGameLogic(gamefield)
}

function renderGameLogic(gamefield){

    const { board, navBoard, status } = gamefield;
    status.innerHTML = `X starts`;

    const score = [];

    if(board.hasChildNodes() && navBoard.hasChildNodes){
        board.replaceChildren()
        navBoard.replaceChildren()
    }

    let retryButton = document.createElement("div");
    retryButton.classList.add("retry")
    retryButton.style.opacity = "0";
    navBoard.append(retryButton)
    
    for (let i = 1; i < 10; i++) {
        let space = document.createElement("div");
        space.classList.add(`tic-tac-space`);
        board.append(space);
        score.push({ space: `${i}`, value: null });  
    }
    const keyValues = {
        X: `<svg width="70" height="70" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><line y1="-1" x2="111.353" y2="-1" transform="matrix(0.695677 0.718355 -0.808826 0.588048 4.53467 2)" stroke="black" stroke-width="2"/><line y1="-1" x2="111.353" y2="-1" transform="matrix(0.695677 -0.718355 0.808826 0.588049 2 82)" stroke="black" stroke-width="2"/></svg>`,
        O: `<svg width="70" height="70" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="39" stroke="black" stroke-width="2"/></svg>`
    };

    let activeOption = "X";  

    Object.keys(keyValues).forEach(key => {
        let keyOption = document.createElement("div");
        keyOption.innerHTML = keyValues[key];
        keyOption.classList.add("tic-tac-option");
        keyOption.dataset.key = key;

        if (key === activeOption) {
            keyOption.setAttribute("draggable", "true");
        } else {
            keyOption.setAttribute("draggable", "false");
        }
       
        navBoard.append(keyOption);

        keyOption.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("key", key);

            activeOption = key === "X" ? "O" : "X";
        });
    });

    const spaces = document.querySelectorAll(".tic-tac-space");
    spaces.forEach((space, i) => {
        space.addEventListener("dragover", (e) => {
            e.preventDefault();
        });

        space.addEventListener("drop", (e) => {
            e.preventDefault();
            updateDraggableState(activeOption, status);
            
            const draggedValue = e.dataTransfer.getData("key");

            if (!space.innerHTML) {
                space.innerHTML = keyValues[draggedValue];
                score[i].value = draggedValue;  
                space.style.pointerEvents = "none";

                if (checkWinner(draggedValue, score)) {
                    status.innerHTML = `${draggedValue} wins!`;
                    spaces.forEach(space => space.style.pointerEvents = "none"); 
                    winMove(gamefield)
                        
                } else if (score.every(s => s.value !== null)) {
                    status.innerHTML = "It's a tie!";
                    winMove(gamefield)
                }
            }
        });
    });   
}

function winMove(gamefield){
    let retryButton = document.querySelector(".retry")

    let allOptions = document.querySelectorAll(".tic-tac-option");
        allOptions.forEach(option => {
        option.setAttribute("draggable", "false");
    });
    retryButton.style.opacity = "1";
    retryButton.addEventListener("click", () => {
        renderGameLogic(gamefield)
    })
}

function checkWinner(player, score) {

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

function updateDraggableState(activeOption, status) {

    let allOptions = document.querySelectorAll(".tic-tac-option");
    allOptions.forEach(option => {
        if (option.dataset.key === activeOption) {
            console.log("true option is draggable")
            option.setAttribute("draggable", "true");
            status.innerHTML = `${option.dataset.key}'s turn`;
        } else {
            option.setAttribute("draggable", "false");
        }
    });
}