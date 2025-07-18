import { isDraftCard } from '../index.js';

const MeleeFormat = {
    name: 'melee',
    requiredDraw: 60,
    requiredPlots: 7,
    maxDoubledPlots: 1,
    cannotInclude: (card) => isDraftCard(card),
    rules: [
        {
            message: 'You cannot include Draft cards in a normal deck',
            condition: (deck) => {
                return deck.getUniqueCards().every((card) => !isDraftCard(card));
            }
        }
    ]
};

export default MeleeFormat;
