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
        cardContainer.setAttribute("draggable", "true");
        suitCollection.append(cardContainer)
    }  

    let dropContainers = document.querySelectorAll(".suit-container");

    // create cards for deck displat
    let deckDom = document.querySelector(".deck");

    for(let i = 0; i < globalDeck.length; i++){
        let faceDownCard = getCard("faceDown", globalDeck); 
        deckDom.append(faceDownCard);
    }

    rotateDeck(deckDom)
    dropSuit(dropContainers)
}

// find id that isnt string to send to get correct card
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

    for (let card of array) {
        if (!createdCards.find((c) => c.suit === card.suit && c.value === card.value)) {
            createdCards.push(card);
            if(typeofCard === "faceDown"){
                return createClosedCard(card)
            } else {
                return createOpenCard(card)
            }
        }
    }
}

function getCorrectCard(domID) {

    let card = globalDeck.find(card => card.id === domID);
    return card;
}

function createOpenCard(card){

    let dressedCard;
    let dressedImg;

    if(typeof card === "string"){
        console.log("typ of object is a dom") 
        card = getCorrectCard(card)
    }

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

    cardDom.dataset.cardInfo = JSON.stringify(card);
    cardDom.classList.add(`${card.suit}`);
    cardDom.setAttribute("id", `${card.id}`)
    cardDom.classList.add("card");
    cardDom.setAttribute("draggable", "true");
    dragstart(cardDom, card)
    dropStack(cardDom, card)

    return cardDom;   
}

function createClosedCard(card){

    let cardDom;
    let id;
    if(typeof card === "object"){
        id = card.id
        cardDom = document.createElement("div");
    } else {
        cardDom = card;
        id = document.getElementById(`${id}`)
    }

    if(!cardDom.dataset.cardData){
        console.log("card lacks data")
    }

    cardDom.classList.add("card", "faceDown")
    cardDom.setAttribute("id", id)
    cardDom.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("application/custom-data", JSON.stringify(card));
    });
    dragstart(cardDom, card)
    return cardDom;
}


function rotateDeck(deckDom){

    let facingDownDeck = deckDom.querySelectorAll(".card");
    let previewDom = document.querySelector(".deck-preview");

    for (let i = 0; i < globalDeck.length; i++) {
        let card = facingDownDeck[i];
        card.addEventListener("click", () => {
            let openCard = createOpenCard(card.id)   
            previewDom.append(openCard);
            card.remove()
        });
        deckDom.children[0].addEventListener("click", () => {  
            for(let i = 0; i < previewDom.children.length; i++){
                createClosedCard(globalDeck[i])
            }    
        }) 
    }
    deckDom.querySelector("p").addEventListener("click", () => {
        while (previewDom.children.length > 0) {
            const card = previewDom.children[0];
            const cardData = JSON.parse(card.dataset.cardInfo);
            const newCard = createClosedCard(cardData); // can i acess it like this?
            deckDom.append(newCard);
            card.remove(); 
        }
        rotateDeck(deckDom)
    });
}


function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function dropSuit(dropContainers) {
    dropContainers.forEach((container) => {
        container.addEventListener("dragover", (e) => {
            e.preventDefault(); 
            e.stopPropagation(); 
        });

        container.addEventListener("drop", (e) => {
            e.preventDefault();
            e.stopPropagation(); 

            const rawData = e.dataTransfer.getData("application/custom-data"); // Retrieve raw data
            const dropValue = JSON.parse(rawData); 
            console.log(dropValue)

            const children = container.children;
            if (children.length > 0) {
              
                if (dropValue.value + 1 === card.value) {
                    matchedCard(container, dropValue)
                } else {
                    console.log("Card cannot be added in this order.");
                }
            } else {
                if (dropValue.value === 1) {
                    matchedCard(container, dropValue)
                } else {
                    console.log("You must start with an Ace.");
                }
            }
        });
    });
}

function dragstart(element, data){
    element.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("application/custom-data", JSON.stringify(data)); 

     }); 
}

function dropStack(cardDom, card){

    cardDom.addEventListener("dragover", (e) => {
            e.preventDefault(); 
            e.stopPropagation(); 
        });

     cardDom.addEventListener("drop", (e) => {
        e.preventDefault();
        e.stopPropagation(); 

        const rawData = e.dataTransfer.getData("application/custom-data");
        const dropValue = JSON.parse(rawData);     
        console.log(dropValue.value, card.value)

        console.log(dropValue.id)

        if(dropValue.color !== card.color && dropValue.value + 1 === card.value){
            matchedCard(cardDom, dropValue)
        }   
     })
}

function matchedCard(container, drop){

    console.log(drop)

    let card = createOpenCard(drop)
    if (container.classList.contains("suit-container")){ 
        console.log("container is suit collector")
        container.append(card)
    } else {
        container.parentNode.append(card) 
    }

    const draggedCard = document.getElementById(`${drop.id}`);
        if (draggedCard) {
            console.log("Removing:", draggedCard);
            draggedCard.remove(); // this only works in some cases, but i always get console.log. why?
            turnCard(drop)
        }
}

function turnCard(drop){

    const draggedElement = document.getElementById(drop.id);
    const previousSibling = draggedElement.previousElementSibling; // this renders the current simbling, i want to know the sibling of the meent before element was deopped. is that possible? 
    console.log(previousSibling)
}