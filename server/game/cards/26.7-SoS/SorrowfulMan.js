import DrawCard from '../../drawcard.js';

class SorrowfulMan extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                onCardOutOfShadows: (event) => event.card === this
            },
            targets: {
                discardCard: {
                    cardCondition: {
                        type: 'character',
                        location: 'discard pile',
                        condition: (card, context) => card.controller !== context.player
                    }
                },
                deadCard: {
                    cardCondition: {
                        type: 'character',
                        location: 'dead pile',
                        condition: (card, context) =>
                            !context.targets.discardCard ||
                            card.controller === context.targets.discardCard.controller
                    }
                }
            },
            message: {
                format: "{player} uses {source} to swap {discardCard} in {controller}'s discard pile with {deadCard} in their dead pile",
                args: {
                    discardCard: (context) => context.targets.discardCard,
                    deadCard: (context) => context.targets.deadCard,
                    controller: (context) => context.targets.discardCard.controller
                }
            },
            handler: (context) => {
                const opponent = context.targets.discardCard.controller;
                const discardIndex = opponent.discardPile.indexOf(context.targets.discardCard);
                const deadIndex = opponent.discardPile.indexOf(context.targets.discardCard);

                opponent.discardPile[discardIndex] = context.targets.deadCard;
                context.targets.deadCard.moveTo('discard pile');

                opponent.deadPile[deadIndex] = context.targets.discardCard;
                context.targets.discardCard.moveTo('dead pile');
            }
        });
    }
}

SorrowfulMan.code = '26577';
SorrowfulMan.version = '1.0.0';

export default SorrowfulMan;
