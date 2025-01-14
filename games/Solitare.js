import { swapCSS } from "../Utilities/swapCSS.js";
import { main } from "../Utilities/variables.js";
import { renderDeck } from "../API/gamecenter.js";

let globalDeck = [];
let createdCards = [];

export function renderSolitare () {

    swapCSS("solitare");
    main.id = "solitare";
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

    let cardContainer = document.querySelector(".card-container");
    for(let i = 1; i <= 7; i++){
       let cardPosition = document.createElement("div");
       cardPosition.setAttribute("id", `card-position`);
       cardContainer.append(cardPosition);

        for (let j = 0; j < i; j++) { 
            let cardType = (j === i - 1) ? "faceUp" : "faceDown";    
            let card = distributeCards(cardType, globalDeck);
            cardPosition.append(card)
        }
    }

    let color = ["hearts", "diamonds", "clubs", "spades"]

    let suitCollection = document.querySelector(".suit-collection"); 
    for(let i = 0; i < color.length; i++){
        let cardContainer = document.createElement("div");
        cardContainer.setAttribute("id", "suit-container")
        suitCollection.append(cardContainer)
    }  

    let cardPositions = document.querySelectorAll(".card-position")
    let dropContainers = document.querySelectorAll(".suit-container");

    let deckDom = document.querySelector(".deck");

    for(let i = 0; i < globalDeck.length; i++){
        let faceDownCard = distributeCards("faceDown", globalDeck); 
        deckDom.append(faceDownCard);
    }

    rotateDeck(deckDom)
    dropSuit(dropContainers)
    dropCardPositions(cardPositions)
}

function distributeCards(typeofCard, array) {
    for (let i = 0; i < array.length; i++) {
        const card = array[i];
        if (!createdCards.find((c) => c.suit === card.suit && c.value === card.value)) {
            createdCards.push(card);
            array.splice(i, 1); 
            if (typeofCard === "faceDown") {
                return createClosedCard(card);
            }
            if(typeofCard === "faceUp") {
                return createOpenCard(card);
            }
        }
    }
}

function createOpenCard(card){

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
    let id = card.id
    cardDom = document.createElement("div");

    cardDom.classList.add("card", "faceDown")
    cardDom.setAttribute("id", id)
    cardDom.dataset.cardInfo = JSON.stringify(card)
    dragstart(cardDom, card)

    if(!cardDom.dataset.cardInfo){
        console.log("card lacks data")
    }
    return cardDom;
}

function rotateDeck(deckDom){
    console.log(globalDeck.length);
    let facingDownDeck = deckDom.querySelectorAll(".card");
    let previewDom = document.querySelector(".deck-preview");

    for (let i = 0; i < globalDeck.length; i++) {
        let card = facingDownDeck[i];
        card.addEventListener("click", () => {
            console.log(card.dataset.cardInfo)
            let cardInfo = JSON.parse(card.dataset.cardInfo)
            let openCard = createOpenCard(cardInfo)   
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
            let dropValue = JSON.parse(rawData)
            console.log(dropValue)


            const children = container.children;
            if (children.length > 0) {
              
                if (dropValue.value + 1 === container.node.value) { // need to add a correct term here for containr latest child dateset value
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

        const parent = element.parentNode;
        if (parent && parent.id) {
            e.dataTransfer.setData("source-container-id", parent.id);
        } else {
            console.warn("Parent container does not have an ID.");
        }
     }); 
}

function dropStack(cardDom){

    cardDom.addEventListener("dragover", (e) => {
            e.preventDefault(); 
            e.stopPropagation(); 
        });

     cardDom.addEventListener("drop", (e) => {
        e.preventDefault();
        e.stopPropagation(); 

        const rawData = e.dataTransfer.getData("application/custom-data");
        const dropValue = JSON.parse(rawData);    

        const sourceId = e.dataTransfer.getData("source-container-id"); 
        const source = document.getElementById(sourceId); // this returns null
        console.log(source)

        let dataInfo = JSON.parse(cardDom.dataset.cardInfo); 
        console.log(dataInfo)
        console.log(dropValue.value, dataInfo.value)

        if(dropValue.color !== dataInfo.color && dropValue.value + 1 === dataInfo.value){
            matchedCard(cardDom, dropValue);
        }   
     })
}

function dropCardPositions(containers){
    containers.forEach((container) => {
        container.addEventListener("dragover", (e) => {
            e.preventDefault(); 
            e.stopPropagation(); 
        });

        container.addEventListener("drop", (e) => {
            e.preventDefault();
            e.stopPropagation(); 

            const rawData = e.dataTransfer.getData("application/custom-data"); 
                let dropValue = JSON.parse(rawData)

               console.log(dropValue)
               if(dropValue.value === 13){
                    matchedCard(container, dropValue)
               } else {
                console.log(dropValue.value)
               }
            })
        });
}

function matchedCard(container, drop){

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

        }
}

function turnCard(drop){

    const draggedElement = document.getElementById(drop.id);
    const previousSibling = draggedElement.previousElementSibling; 
    
}