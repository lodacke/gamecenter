import { swapCSS } from "../Utilities/swapCSS.js";
import { main } from "../Utilities/variables.js";
import { renderDeck } from "../API/gamecenter.js";

let globalDeck = [];
let createdCards = [];

export function renderSolitare () {

    swapCSS("solitare");
    main.setAttribute("id", "solitare");
    main.replaceChildren();

    main.innerHTML = `
    <div class="top-row">
        <div class="deck-view">
            <div class="deck"></div>
            <div class="deck-preview"></div>
        </div>
        <div class="suit-collection"></div>
    </div>
    <div class="card-container"></div>
    `;
    
    if (globalDeck.length === 0) {
        globalDeck = renderDeck();
        shuffleDeck(globalDeck);
    }

    const cards = globalDeck.slice(0, 28);
    globalDeck = globalDeck.slice(28);

    let cardContainer = document.querySelector(".card-container");
    for(let i = 1; i <= 7; i++){
       let cardPosition = document.createElement("div");
       cardPosition.classList.add(`card-position`);
       cardContainer.append(cardPosition);

        for (let j = 0; j < i; j++) { 
            let cardType = (j === i - 1) ? "faceUp" : "faceDown";    
            let card = getCard(cardType, cards);
            cardPosition.append(card);
        }
    }

    let color = ["hearts", "diamonds", "clubs", "spades"]

    let suitCollection = document.querySelector(".suit-collection"); //totalt 28 kort här
    for(let i = 0; i < color.length; i++){
        let cardContainer = document.createElement("div");
        cardContainer.classList.add("suit-container")
        cardContainer.classList.add(`suit-container_${color[i]}`)
        cardContainer.setAttribute("draggable", "true");
        suitCollection.append(cardContainer)
    }  

    deckDisplay();

    let suitContainers = document.querySelectorAll(".suit-container");
    suitContainers.forEach((container, i) => {
        container.addEventListener("dragover", (e) => {
            e.preventDefault(); 
        });

        container.addEventListener("drop", (e) => {
            e.preventDefault();

            const draggedValue = e.dataTransfer.getData("key");

            console.log("Dropped value:", draggedValue);
            });
    });  
}

function checkCard(){
    let deck = renderDeck();
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]]; 
    } 

    const cards = deck.slice(0, 28); 
    const remainingDeck = deck.slice(28); 

    return {cards, remainingDeck}
}

function getCard(typeofCard, array){

    let cardDom; 

    for (let card of array) {
        if (!createdCards.find((c) => c.suit === card.suit && c.value === card.value)) {
            createdCards.push(card);
       
            let dressedCard;
            let dressedImg;

            cardDom = document.createElement("div");

            switch(card.value) {
                case 11: dressedCard = 'J'; break;
                case 12: dressedCard = 'Q'; break;
                case 13: dressedCard = 'K'; break;
                case 1: dressedCard = 'A'; break;
                default: dressedCard = card.value;
            }
            switch(card.suit) {
                case "diamonds": dressedImg = "../media/diamond.svg"; break;
                case "clubs": dressedImg = "../media/cloves.svg"; break;
                case "spades": dressedImg = "../media/spades.svg"; break;
                case "hearts": dressedImg = "../media/heart.svg"; break;
            }

            cardDom.innerHTML = `
            <div>
                <p>${dressedCard}</p>
                <img src="${dressedImg}"></img>
            </div>
            <div class="card-img"></div>
            <div class="card-bottom">
                <p>${dressedCard}</p>
                <img src="${dressedImg}"></img>
            </div>`;

            cardDom.classList.add(`${card.suit}`, `${card.color}`);
            if(typeofCard === "faceUp"){
                cardDom.classList.add(`${card.suit}`, `${card.color}`);
                cardDom.classList.add("card");
                cardDom.setAttribute("draggable", "true");
            } else {
                cardDom.classList.add("faceDown");
                cardDom.classList.add("card");
            }
            return cardDom;
        }
    }
}

function deckDisplay() {
    if (globalDeck.length === 0) {
        console.log("Deck is empty!");
        return;
    }


    let faceUpCard = getCard("faceUp", globalDeck);

    let deckDom = document.querySelector(".deck");
    let previewDom = document.querySelector(".deck-preview");
    let faceDownCard = getCard("faceDown", globalDeck);

    previewDom.append(faceUpCard)
    deckDom.append(faceDownCard);
}


function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}