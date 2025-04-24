import { swapCSS } from "../Utilities/swapCSS.js";
import { main } from "../Utilities/variables.js";
import { agents } from "../API/gamecenter.js";

export function rendertimeLine(){

        let placedCard = [];

        swapCSS("timeLine");
        main.id = "timeLine";
        main.replaceChildren();

        main.innerHTML = `
        <div class="top-container">
            <div class="line"></div>
        </div>
        <div class="btn-container"> </div>
        `;

    let CurrAgents = agents;

    let btnCnt =  document.querySelector(".btn-container");
    let line = document.querySelector(".line");


    for(let i = 0; i < 2; i++){
        let randAgent = newCard(CurrAgents)
        if(i === 0){
            createPlacedCard(randAgent, line, placedCard)
        } else {
            createCard(randAgent, btnCnt, placedCard)
        }
    }

    console.log(CurrAgents.length)

    
    line.addEventListener("dragover", (event) => {
        event.preventDefault();
    });

    line.addEventListener("drop", (event) => {
        event.preventDefault();
        event.stopPropagation(); 

        const agent = JSON.parse(event.dataTransfer.getData("text/plain")); 
        console.log(agent)

        createPlacedCard(agent, line, placedCard)
        let item = btnCnt.querySelector(`.a${agent.id}`)

        if(item){
            item.remove()
            let randAgent = newCard(CurrAgents)
            createCard(randAgent, btnCnt, placedCard)
        }
    })
}

function createCard(agent, container){
        let card = document.createElement("div");
        card.classList.add("agent");
        card.classList.add(`a${agent.id}`);
        card.draggable = "true";

        card.innerHTML = `
        <img src=${agent.img} alt="image of ;${agent.name}" crossorigin="anonymous"> 
        <h2>${agent.name}</h2>
        `;
        container.append(card);  

        // dropzoner mellan varje element

       let sendAgent = JSON.stringify(agent)

        card.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text/plain", sendAgent);
        });
}

function createPlacedCard(agent, container, placedCard){

    placedCard.push(agent.date)
    let card = document.createElement("div");
    card.classList.add("placed")
    card.innerText = agent.date;

    card.style.transform = 'translateY(-50px)';
    card.style.opacity = '0';

    container.append(card);


}

function newCard(CurrAgents){
    let randIndex = Math.floor(Math.random() * CurrAgents.length);
    let randAgent = CurrAgents.splice(randIndex, 1)[0];
    return randAgent;
}