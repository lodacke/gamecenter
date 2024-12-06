import { TicTac } from '../games/tictac.js';
import { renderLanding } from '../index.js';

export const gameBase = [
    {
        name: "landing",
        render: renderLanding
    },
    {
        name: "Tic-Tac-Toe",
        render: TicTac,
    },

]