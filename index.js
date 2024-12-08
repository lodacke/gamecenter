import { gameBase } from "./API/gamecenter.js";
import { main, nav } from "./Utilities/variables.js"
import { swapCSS } from "./Utilities/swapCSS.js";

function renderNav (){

    gameBase.forEach(game => {
        let option = document.createElement("div"); 
        option.textContent = game.name;

        option.addEventListener("click",() => {
            game.render()
        })
        nav.append(option); 
    });
}

renderNav()
renderLanding();

export function renderLanding(){

    swapCSS("landing");
    main.replaceChildren()

    main.setAttribute("id", "landing");

    main.innerHTML = `
    <div class="container">
        <div class="static-line"></div>
        <div class="welcome-mess">
            <h1>Welcome to my <br> Try-Out game site</h1>
            <p>his page is just for playing around with learning logic and CSS. The fact that it is in English and even has this text is a sign of my Napoleon syndrome. <br>
            Or maybe it's just me being tired of lorem ipsum. Who knows?<br><br> 
            Anyway, if you navigate through the menu on your right, you'll be able to see all my attempts at trying to be creative in game creation.
            Ugh.</p>
        </div>

    </div>`
    


}

