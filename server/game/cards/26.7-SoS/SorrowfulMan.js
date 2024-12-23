import DrawCard from '../../drawcard.js';

class SorrowfulMan extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                onCardOutOfShadows: (event) =>
                    event.card === this &&
                    // TODO: Clean target logic up on release
                    this.game
                        .getOpponents(this.controller)
                        .some(
                            (player) => player.discardPile.length > 0 && player.deadPile.length > 0
                        )
            },
            target: {
                mode: 'exactly',
                numCards: 2,
                activePromptTitle: 'Select 2 characters',
                singleController: true,
                cardCondition: (card, context) =>
                    card.controller !== this.controller &&
                    ['discard pile', 'dead pile']
                        .filter(
                            (location) =>
                                !context.selectedCards.some((card) => card.location === location)
                        )
                        .includes(card.location)
            },
            message: {
                format: "{player} uses {source} to swap {discardCard} in {controller}'s discard pile with {deadCard} in their dead pile",
                args: {
                    discardCard: (context) =>
                        context.target.find((card) => card.location === 'discard pile'),
                    deadCard: (context) =>
                        context.target.find((card) => card.location === 'dead pile'),
                    controller: (context) => context.target[0].controller
                }
            },
            handler: (context) => {
                const discardCard = context.target.find((card) => card.location === 'discard pile');
                const deadCard = context.target.find((card) => card.location === 'dead pile');
                const opponent = context.target[0].controller;
                const discardIndex = opponent.discardPile.indexOf(discardCard);
                const deadIndex = opponent.discardPile.indexOf(discardCard);

                opponent.discardPile[discardIndex] = deadCard;
                deadCard.moveTo('discard pile');

                opponent.deadPile[deadIndex] = discardCard;
                discardCard.moveTo('dead pile');
            }
        });
    }
}

SorrowfulMan.code = '26577';
SorrowfulMan.version = '1.0.0';

export default SorrowfulMan;
