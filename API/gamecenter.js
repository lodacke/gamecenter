import { TicTac } from '../games/tictac.js';
import { renderLanding } from '../index.js';

export const gameBase = [
    {
        name: "Landing",
        render: renderLanding
    },
    {
        name: "Tic-Tac-Toe",
        render: TicTac,
    },

]