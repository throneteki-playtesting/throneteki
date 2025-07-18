import DeckValidator from './DeckValidator.js';
export { formatDeckAsFullCards } from './formatDeckAsFullCards.js';
export { formatDeckAsShortCards } from './formatDeckAsShortCards.js';

const draftSets = ['VDS', 'ToJ'];

export const validateDeck = (deck, options) => {
    options = Object.assign({ includeExtendedStatus: true }, options);

    const validator = new DeckValidator(
        options.packs,
        options.gameFormats,
        options.restrictedLists,
        options.customRules
    );
    const result = validator.validateDeck(deck);

    if (!options.includeExtendedStatus) {
        delete result.extendedStatus;
    }

    return result;
};

export const isDraftCard = (card) => {
    return card && draftSets.includes(card.packCode);
};
