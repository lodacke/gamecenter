import { swapCSS } from "../Utilities/swapCSS.js";
import { main } from "../Utilities/variables.js";
import { puzzle } from "../API/gamecenter.js";


export function dropPuzzle(){
     swapCSS("puzzle");
     main.id = "puzzle";

     main.innerHTML = `
     <div class="puzzle-display"></div>
     <div class="puzzle-pieces"></div>
     `;

     puzzle.forEach((element, i) => {
        let div = document.createElement("div");
        div.innerHTML = element;
        div.classList.add("piece")
        div.draggable = "true";
        div.id = `pzl${i + 1}`;
        main.querySelector(".puzzle-pieces").append(div);
     });

     let pzlPieces = main.querySelectorAll(".piece");
     let outline = main.querySelector(".puzzle-display");

    pzlPieces.forEach(piece => {
        piece.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text/plain", event.target.id);
        });
    });

    outline.addEventListener("dragover", (event) => {
        event.preventDefault();
    });

    outline.addEventListener("drop", (event) => {
        event.preventDefault();
    
        let pieceId = event.dataTransfer.getData("text/plain");
        console.log(pieceId)
        let piece = document.getElementById(pieceId);

        const dropX = event.clientX;
        const dropY = event.clientY;

        const piecePositions = {
            pzl1: { left: 0, top: 123 },
            pzl2: { left: 41, top: 123 },
            pzl3: { left: 82, top: 123 },
            pzl4: { left: 123, top: 123 },
            pzl5: { left: 0, top: 82 },
            pzl6: { left: 41, top: 82 },
            pzl7: { left: 82, top: 82 },
            pzl8: { left: 123, top: 82 },
            pzl9: { left: 0, top: 41 },
            pzl10: { left: 41, top: 41 },
            pzl11: { left: 82, top: 41 },
            pzl12: { left: 123, top: 41 },
            pzl13: { left: 0, top: 0 },
            pzl14: { left: 41, top: 0},
            pzl15: { left: 82, top: 0 },
            pzl16: { left: 123, top: 0},
        };

        let containerRect = outline.getBoundingClientRect();
        let pieceRect = piece.getBoundingClientRect();
        
        let pieceWidth = pieceRect.width;
        let pieceHeight = pieceRect.height;

        let targetPosition = piecePositions[piece.id];

        let dropArea = {
            left: containerRect.left + targetPosition.left,  
            top: containerRect.top + targetPosition.top,
            right: containerRect.left + targetPosition.left + pieceWidth,
            bottom: containerRect.top + targetPosition.top+ pieceHeight
        };

        let corrArea = dropX >= dropArea.left && dropX <= dropArea.right &&
                              dropY >= dropArea.top && dropY <= dropArea.bottom;

        if (corrArea) {
            piece.style.position = "absolute";
            piece.style.left = `${targetPosition.left}px`; 
            piece.style.top = `${targetPosition.top}px`;    
            outline.append(piece);
            counter++;

            let pieceCount = 0;
            for (let key in piecePositions[character.theme]) {
                pieceCount++;
            }
            if (counter === pieceCount) {
                console.log("Puzzle completed!");
            }

        } else {
            console.log("Piece placed in the wrong area.");
        }
    });
}