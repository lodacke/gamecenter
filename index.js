import { gameBase } from "./gamecenter.js";

function renderNav (){

    const nav = document.querySelector("nav");
    gameBase.forEach(game => {
        let options = document.createElement("div"); 
        let a = document.createElement("a"); 
        a.textContent = game.name; 
        a.href = `#${game.name}`; 

        a.addEventListener("click",() => {
            game.render()
        })
        options.append(a); 
        nav.append(options); 
    });
}

renderNav()

export function TicTac() {
    const score = [];

    const main = document.querySelector("main");
    const status = document.createElement("p");
    status.innerHTML = `Welcome to a game of Tic-Tac-Toe! <br> X starts`;
    let board = document.createElement("div");
    board.classList.add("tic-tac-board");

    main.append(status);
    main.append(board);

    for (let i = 0; i < 9; i++) {
        let space = document.createElement("div");
        space.classList.add(`tic-tac-space`);
        space.classList.add(`score_${i}`);
        board.append(space);
        score.push({ space: `score_${i}`, value: null });  
    }

    let navBoard = document.createElement("div");
    navBoard.classList.add("nav-board");
    main.append(navBoard);

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