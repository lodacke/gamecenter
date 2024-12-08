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
            <div class="deck">
                <p>Repeat</p>
            </div>
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
        dragstart(cardContainer)
        suitCollection.append(cardContainer)
    }  

    deckDisplay();

    let dropContainers = document.querySelectorAll(".suit-container");
    let dropCards= document.querySelectorAll(".faceUp")

    dropSuit(dropContainers)
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
            return createCard(card, typeofCard)
        }
    }
}

function createCard(card, typeofCard){
    let dressedCard;
    let dressedImg;
    let cardDom = document.createElement("div")

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
        cardDom.classList.add("card");
        cardDom.setAttribute("draggable", "true");
        dragstart(cardDom, card)
    } else {
        cardDom.classList.add("faceDown");
        cardDom.classList.add("card");
    }

    return cardDom;   
}

function deckDisplay() {

    let deckDom = document.querySelector(".deck");
    let previewDom = document.querySelector(".deck-preview");

    for(let i = 0; i < globalDeck.length; i++){
        let faceDownCard = getCard("faceDown", globalDeck);
        deckDom.append(faceDownCard);
    }

    let facingDownCards = deckDom.querySelectorAll('.card');

    for (let i = 0; i < facingDownCards.length; i++) {
        let card = facingDownCards[i];
        card.addEventListener("click", () => {
            card.classList.remove("faceDown");
            card.classList.add("card-preview");
            card.setAttribute("draggable", "true")
            previewDom.append(card);
        });

        deckDom.children[0].addEventListener("click", () => { 
            for(let i = 0; i < previewDom.children.length; i++){
                card.classList.add("faceDown");
                card.setAttribute("draggable", "false")
                deckDom.append(card)
            }    
        }) 

    }
}

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function dropSuit(dropContainers) {
    const hierarchy = ["1" ,"2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"];

    dropContainers.forEach((container) => {
        container.addEventListener("dragover", (e) => {
            e.preventDefault(); 
        });

        container.addEventListener("drop", (e) => {
            e.preventDefault();

            const rawData = e.dataTransfer.getData("application/custom-data"); // Retrieve raw data
            const dropValue = JSON.parse(rawData); 
            console.log("Dropped value:", dropValue.value);

            const children = container.children;
            if (children.length > 0) {
                const lastCard = children[children.length - 1];
                const lastCardValue = 13;
                const nextCardValue = getNextCardValue(lastCardValue);
                
                if (hierarchy.indexOf(draggedValue) === hierarchy.indexOf(nextCardValue) + 1) {
                    container.append(draggedValue);
                } else {
                    console.log("Card cannot be added in this order.");
                }
            } else {
                if (dropValue.value === 1) {
                    console.log("value is true")
                    let dropDom = createCard(dropValue, "faceUp")
                    container.append(dropDom)
                } else {
                    console.log("You must start with an Ace.");
                }
            }
        });
    });
}

function getNextCardValue(lastCardValue) {
    const index = hierarchy.indexOf(lastCardValue);
    return index !== -1 && index < hierarchy.length - 1 ? hierarchy[index + 1] : null;
}

function dragstart(element, data){
    element.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("application/custom-data", JSON.stringify(data));
     }); 
}