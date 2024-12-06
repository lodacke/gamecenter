import { gameBase } from "./API/gamecenter.js";
import { main, nav } from "./API/variables.js"
import { TicTac } from "./games/tictac.js";

function renderNav (){

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

export function renderLanding(){

    main.setAttribute("id", "landing");
    main.innerHTML = ``;
    


}

