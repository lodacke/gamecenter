import { TicTac } from '../games/tictac.js';
import { renderLanding } from '../index.js';
import { renderSolitare } from '../games/solitare.js';

export const gameBase = [
    {
        name: "Landing",
        render: renderLanding
    },
    {
        name: "Tic-Tac-Toe",
        render: TicTac,
    },

    {
        name: "Solitare",
        render: renderSolitare
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