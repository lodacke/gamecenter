import { TicTac } from '../games/tictac.js';
import { renderLanding } from '../index.js';
import { renderSolitare } from '../games/solitare.js';
import { dropPuzzle } from '../games/dropPuzzle.js';

export const gameBase = [
    {
        name: "Landing",
        render: renderLanding
    },
    {
        name: "Tic-Tac-Toe",
        render: TicTac
    },

    {
        name: "Solitare",
        render: renderSolitare
    }, 
    {
        name: "Puzzle",
        render: dropPuzzle
    }

]

export function renderDeck (){
        let deck = [];
        const suits = [
        {
            color: "red",
            suit: "hearts"
        },
             {
            color: "red",
            suit: "diamonds"
        },
             {
            color: "black",
            suit: "clubs"
        },
             {
            color: "black",
            suit: "spades"
        }
    ]

    suits.forEach( suit => {
        for(let i = 1; i <= 13; i++){
            let card = {
                value: i,
                color: suit.color,
                suit: suit.suit,
                id: crypto.randomUUID()
            }
        deck.push(card)
        }
    })

    return deck;
}

export const puzzle = [
`<svg width="41" height="41" id="pzl1" draggable="true" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2_418)">
<rect width="41" height="41" fill="white"/>
<rect y="-123" width="164" height="164" fill="#2A2A2A"/>
<circle cx="82" cy="-41" r="82" fill="white"/>
<rect x="25.3485" y="-97.6515" width="114.297" height="114.297" fill="#2A2A2A" stroke="black"/>
<circle cx="82.994" cy="-41" r="55.1636" fill="white"/>
</g>
<defs>
<clipPath id="clip0_2_418">
<rect width="41" height="41" fill="white"/>
</clipPath>
</defs>
</svg>
`,
 `<svg width="41" height="41" id="pzl2" draggable="true" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3_419)">
<rect width="41" height="41" fill="white"/>
<rect x="-41" y="-123" width="164" height="164" fill="#2A2A2A"/>
<circle cx="41" cy="-41" r="82" fill="white"/>
<rect x="-15.6515" y="-97.6515" width="114.297" height="114.297" fill="#2A2A2A" stroke="black"/>
<circle cx="41.994" cy="-41" r="55.1636" fill="white"/>
</g>
<defs>
<clipPath id="clip0_3_419">
<rect width="41" height="41" fill="white"/>
</clipPath>
</defs>
</svg>`
,
`<svg width="41" height="41" id="pzl3" draggable="true" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3_425)">
<rect width="41" height="41" fill="white"/>
<rect x="-82" y="-123" width="164" height="164" fill="#2A2A2A"/>
<circle cy="-41" r="82" fill="white"/>
<rect x="-56.6515" y="-97.6515" width="114.297" height="114.297" fill="#2A2A2A" stroke="black"/>
<circle cx="0.993958" cy="-41" r="55.1636" fill="white"/>
</g>
<defs>
<clipPath id="clip0_3_425">
<rect width="41" height="41" fill="white"/>
</clipPath>
</defs>
</svg>
`,
 `<svg width="41" height="41" id="pzl4" draggable="true" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3_423)">
<rect x="-123" y="-123" width="164" height="164" fill="#2A2A2A"/>
<circle cx="-41" cy="-41" r="82" fill="white"/>
<rect x="-97.6515" y="-97.6515" width="114.297" height="114.297" fill="#2A2A2A" stroke="black"/>
<circle cx="-40.006" cy="-41" r="55.1636" fill="white"/>
</g>
<defs>
<clipPath id="clip0_3_423">
<rect width="41" height="41" fill="white"/>
</clipPath>
</defs>
</svg>
`,
`<svg width="41" height="41" id="pzl5" draggable="true" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3_421)">
<rect width="41" height="41" fill="white"/>
<rect y="-82" width="164" height="164" fill="#2A2A2A"/>
<circle cx="82" r="82" fill="white"/>
<rect x="25.3485" y="-56.6515" width="114.297" height="114.297" fill="#2A2A2A" stroke="black"/>
<circle cx="82.994" r="55.1636" fill="white"/>
</g>
<defs>
<clipPath id="clip0_3_421">
<rect width="41" height="41" fill="white"/>
</clipPath>
</defs>
</svg>
`,
`<svg width="41" height="41" id="pzl6" draggable="true" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3_565)">
<rect x="-41" y="-82" width="164" height="164" fill="#2A2A2A"/>
<circle cx="41" r="82" fill="white"/>
<rect x="-15.6515" y="-56.6515" width="114.297" height="114.297" fill="#2A2A2A" stroke="black"/>
<circle cx="41.994" r="55.1636" fill="white"/>
<rect x="3.72729" y="-38.2667" width="77.5273" height="77.5273" fill="#2A2A2A"/>
<circle cx="42.4909" cy="0.496979" r="36.7758" fill="white"/>
<rect x="41.3396" y="-33.2381" width="47.7091" height="47.7091" transform="rotate(44.7327 41.3396 -33.2381)" fill="#2A2A2A"/>
<circle cx="41.497" cy="0.496964" r="20.8727" fill="#FDFDFD"/>
<rect x="28.5757" y="-12.4243" width="24.8485" height="24.8485" fill="#2A2A2A"/>
<circle cx="41" cy="4.76837e-06" r="11.4303" fill="white"/>
<rect x="40.6805" y="-10.5375" width="14.9091" height="14.9091" transform="rotate(43.2637 40.6805 -10.5375)" fill="#2A2A2A"/>
<circle cx="41" cy="4.29153e-06" r="6.46061" fill="white"/>
<rect x="36.5273" y="-4.47272" width="8.94545" height="8.94545" fill="#2A2A2A"/>
<circle cx="41" cy="-2.38419e-06" r="3.47879" fill="white"/>
<rect x="40.9211" y="-2.48486" width="3.47893" height="3.47893" transform="rotate(43.756 40.9211 -2.48486)" fill="#2A2A2A"/>
</g>
<defs>
<clipPath id="clip0_3_565">
<rect width="41" height="41" fill="white"/>
</clipPath>
</defs>
</svg>
`,
`<svg width="41" id="pzl7" draggable="true" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3_567)">
<rect width="41" height="41" fill="white"/>
<rect x="-82" y="-82" width="164" height="164" fill="#2A2A2A"/>
<circle r="82" fill="white"/>
<rect x="-56.6515" y="-56.6515" width="114.297" height="114.297" fill="#2A2A2A" stroke="black"/>
<circle cx="0.993958" r="55.1636" fill="white"/>
<rect x="-37.2727" y="-38.2667" width="77.5273" height="77.5273" fill="#2A2A2A"/>
<circle cx="1.49091" cy="0.496979" r="36.7758" fill="white"/>
<rect x="0.3396" y="-33.2381" width="47.7091" height="47.7091" transform="rotate(44.7327 0.3396 -33.2381)" fill="#2A2A2A"/>
<circle cx="0.496994" cy="0.496964" r="20.8727" fill="#FDFDFD"/>
<rect x="-12.4243" y="-12.4243" width="24.8485" height="24.8485" fill="#2A2A2A"/>
<circle cx="4.76837e-06" cy="4.76837e-06" r="11.4303" fill="white"/>
<rect x="-0.319458" y="-10.5375" width="14.9091" height="14.9091" transform="rotate(43.2637 -0.319458 -10.5375)" fill="#2A2A2A"/>
<circle cx="-2.6226e-05" cy="4.29153e-06" r="6.46061" fill="white"/>
<rect x="-4.47272" y="-4.47272" width="8.94545" height="8.94545" fill="#2A2A2A"/>
<circle cx="2.81334e-05" cy="-2.38419e-06" r="3.47879" fill="white"/>
<rect x="-0.0788574" y="-2.48486" width="3.47893" height="3.47893" transform="rotate(43.756 -0.0788574 -2.48486)" fill="#2A2A2A"/>
</g>
<defs>
<clipPath id="clip0_3_567">
<rect width="41" height="41" fill="white"/>
</clipPath>
</defs>
</svg>
`,  `<svg width="41" height="41" id="pzl8" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3_569)">
<rect width="41" height="41" fill="white"/>
<rect x="-123" y="-82" width="164" height="164" fill="#2A2A2A"/>
<circle cx="-41" r="82" fill="white"/>
<rect x="-97.6515" y="-56.6515" width="114.297" height="114.297" fill="#2A2A2A" stroke="black"/>
<circle cx="-40.006" r="55.1636" fill="white"/>
</g>
<defs>
<clipPath id="clip0_3_569">
<rect width="41" height="41" fill="white"/>
</clipPath>
</defs>
</svg>
`, `<svg width="41" height="41" id="pzl9" draggable="true" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3_571)">
<rect width="41" height="41" fill="white"/>
<rect y="-41" width="164" height="164" fill="#2A2A2A"/>
<circle cx="82" cy="41" r="82" fill="white"/>
<rect x="25.3485" y="-15.6515" width="114.297" height="114.297" fill="#2A2A2A" stroke="black"/>
<circle cx="82.994" cy="41" r="55.1636" fill="white"/>
</g>
<defs>
<clipPath id="clip0_3_571">
<rect width="41" height="41" fill="white"/>
</clipPath>
</defs>
</svg>
`, `<svg width="41" height="41" id="pzl10" draggable="true" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3_573)">
<rect width="41" height="41" fill="white"/>
<rect x="-41" y="-41" width="164" height="164" fill="#2A2A2A"/>
<circle cx="41" cy="41" r="82" fill="white"/>
<rect x="-15.6515" y="-15.6515" width="114.297" height="114.297" fill="#2A2A2A" stroke="black"/>
<circle cx="41.994" cy="41" r="55.1636" fill="white"/>
<rect x="3.72729" y="2.73334" width="77.5273" height="77.5273" fill="#2A2A2A"/>
<circle cx="42.4909" cy="41.497" r="36.7758" fill="white"/>
<rect x="41.3396" y="7.7619" width="47.7091" height="47.7091" transform="rotate(44.7327 41.3396 7.7619)" fill="#2A2A2A"/>
<circle cx="41.497" cy="41.497" r="20.8727" fill="#FDFDFD"/>
<rect x="28.5757" y="28.5757" width="24.8485" height="24.8485" fill="#2A2A2A"/>
<circle cx="41" cy="41" r="11.4303" fill="white"/>
<rect x="40.6805" y="30.4625" width="14.9091" height="14.9091" transform="rotate(43.2637 40.6805 30.4625)" fill="#2A2A2A"/>
<circle cx="41" cy="41" r="6.46061" fill="white"/>
<rect x="36.5273" y="36.5273" width="8.94545" height="8.94545" fill="#2A2A2A"/>
<circle cx="41" cy="41" r="3.47879" fill="white"/>
<rect x="40.9211" y="38.5151" width="3.47893" height="3.47893" transform="rotate(43.756 40.9211 38.5151)" fill="#2A2A2A"/>
</g>
<defs>
<clipPath id="clip0_3_573">
<rect width="41" height="41" fill="white"/>
</clipPath>
</defs>
</svg>
`, `<svg width="41" height="41" id="pzl11" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3_575)">
<rect width="41" height="41" fill="white"/>
<rect x="-82" y="-41" width="164" height="164" fill="#2A2A2A"/>
<circle cy="41" r="82" fill="white"/>
<rect x="-56.6515" y="-15.6515" width="114.297" height="114.297" fill="#2A2A2A" stroke="black"/>
<circle cx="0.993958" cy="41" r="55.1636" fill="white"/>
<rect x="-37.2727" y="2.73334" width="77.5273" height="77.5273" fill="#2A2A2A"/>
<circle cx="1.49091" cy="41.497" r="36.7758" fill="white"/>
<rect x="0.3396" y="7.7619" width="47.7091" height="47.7091" transform="rotate(44.7327 0.3396 7.7619)" fill="#2A2A2A"/>
<circle cx="0.496994" cy="41.497" r="20.8727" fill="#FDFDFD"/>
<rect x="-12.4243" y="28.5757" width="24.8485" height="24.8485" fill="#2A2A2A"/>
<circle cx="4.76837e-06" cy="41" r="11.4303" fill="white"/>
<rect x="-0.319458" y="30.4625" width="14.9091" height="14.9091" transform="rotate(43.2637 -0.319458 30.4625)" fill="#2A2A2A"/>
<circle cx="-2.6226e-05" cy="41" r="6.46061" fill="white"/>
<rect x="-4.47272" y="36.5273" width="8.94545" height="8.94545" fill="#2A2A2A"/>
<circle cx="2.81334e-05" cy="41" r="3.47879" fill="white"/>
<rect x="-0.0788574" y="38.5151" width="3.47893" height="3.47893" transform="rotate(43.756 -0.0788574 38.5151)" fill="#2A2A2A"/>
</g>
<defs>
<clipPath id="clip0_3_575">
<rect width="41" height="41" fill="white"/>
</clipPath>
</defs>
</svg>
`, `<svg width="41" height="41" id="pzl12" draggable="true" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3_577)">
<rect width="41" height="41" fill="white"/>
<rect x="-123" y="-41" width="164" height="164" fill="#2A2A2A"/>
<circle cx="-41" cy="41" r="82" fill="white"/>
<rect x="-97.6515" y="-15.6515" width="114.297" height="114.297" fill="#2A2A2A" stroke="black"/>
<circle cx="-40.006" cy="41" r="55.1636" fill="white"/>
</g>
<defs>
<clipPath id="clip0_3_577">
<rect width="41" height="41" fill="white"/>
</clipPath>
</defs>
</svg>
`, `<svg width="41" id="pzl13" height="41" draggable="true" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3_719)">
<rect width="41" height="41" fill="white"/>
<rect width="164" height="164" fill="#2A2A2A"/>
<circle cx="82" cy="82" r="82" fill="white"/>
<rect x="25.3485" y="25.3485" width="114.297" height="114.297" fill="#2A2A2A" stroke="black"/>
<circle cx="82.994" cy="82" r="55.1636" fill="white"/>
</g>
<defs>
<clipPath id="clip0_3_719">
<rect width="41" height="41" fill="white"/>
</clipPath>
</defs>
</svg>
`, 
`<svg width="41" height="41" id="id="pzl14"" draggable="true" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3_717)">
<rect width="41" height="41" fill="white"/>
<rect x="-41" width="164" height="164" fill="#2A2A2A"/>
<circle cx="41" cy="82" r="82" fill="white"/>
<rect x="-15.6515" y="25.3485" width="114.297" height="114.297" fill="#2A2A2A" stroke="black"/>
<circle cx="41.994" cy="82" r="55.1636" fill="white"/>
</g>
<defs>
<clipPath id="clip0_3_717">
<rect width="41" height="41" fill="white"/>
</clipPath>
</defs>
</svg>
`, `<svg width="41" height="41" id="pzl15" draggable="true" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3_715)">
<rect width="41" height="41" fill="white"/>
<rect x="-82" width="164" height="164" fill="#2A2A2A"/>
<circle cy="82" r="82" fill="white"/>
<rect x="-56.6515" y="25.3485" width="114.297" height="114.297" fill="#2A2A2A" stroke="black"/>
<circle cx="0.993958" cy="82" r="55.1636" fill="white"/>
</g>
<defs>
<clipPath id="clip0_3_715">
<rect width="41" height="41" fill="white"/>
</clipPath>
</defs>
</svg>
`, `<svg width="41" height="41" id="pzl16" draggable="true" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3_563)">
<rect width="41" height="41" fill="white"/>
<rect x="-123" width="164" height="164" fill="#2A2A2A"/>
<circle cx="-41" cy="82" r="82" fill="white"/>
<rect x="-97.6515" y="25.3485" width="114.297" height="114.297" fill="#2A2A2A" stroke="black"/>
<circle cx="-40.006" cy="82" r="55.1636" fill="white"/>
</g>
<defs>
<clipPath id="clip0_3_563">
<rect width="41" height="41" fill="white"/>
</clipPath>
</defs>
</svg>
`
];