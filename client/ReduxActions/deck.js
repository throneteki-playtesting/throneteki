import { formatDeckAsShortCards } from '../../deck-helper';

export function loadDecks() {
    return {
        types: ['REQUEST_DECKS', 'RECEIVE_DECKS'],
        shouldCallAPI: (state) => {
            return state.cards.singleDeck || state.cards.decks.length === 0;
        },
        APIParams: { url: '/api/decks', cache: false }
    };
}

export function loadDeck(deckId) {
    return {
        types: ['REQUEST_DECK', 'RECEIVE_DECK'],
        shouldCallAPI: (state) => {
            let ret =
                state.cards.decks.length === 0 ||
                !state.cards.decks.some((deck) => {
                    return deck._id === deckId;
                });

            return ret;
        },
        APIParams: { url: `/api/decks/${deckId}`, cache: false }
    };
}

export function selectDeck(deck) {
    return {
        type: 'SELECT_DECK',
        deck: deck
    };
}

export function addDeck() {
    return {
        type: 'ADD_DECK'
    };
}

export function updateDeck(deck) {
    return {
        type: 'UPDATE_DECK',
        deck: deck
    };
}

export function deleteDeck(deck) {
    return {
        types: ['DELETE_DECK', 'DECK_DELETED'],
        shouldCallAPI: () => true,
        APIParams: {
            url: `/api/decks/${deck._id}`,
            type: 'DELETE'
        }
    };
}

export function saveDeck(deck) {
    let formattedDeck = formatDeckAsShortCards(deck);
    formattedDeck.deckName = deck.name;

    let str = JSON.stringify({
        deck: formattedDeck
    });

    return {
        types: ['SAVE_DECK', 'DECK_SAVED'],
        shouldCallAPI: () => true,
        APIParams: {
            url: `/api/decks/${deck._id || ''}`,
            type: deck._id ? 'PUT' : 'POST',
            data: str
        }
    };
}

export function clearDeckStatus() {
    return {
        type: 'CLEAR_DECK_STATUS'
    };
}
