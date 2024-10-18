import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class HarryStrickland extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                onCardOutOfShadows: (event) => event.card === this
            },
            target: {
                cardCondition: {
                    location: 'discard pile',
                    type: 'character',
                    trait: ['Army', 'Mercenary'],
                    printedCostOrLower: 5,
                    controller: 'current'
                }
            },
            message: '{player} uses {source} to put {target} into play from their discard pile',
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.putIntoPlay((context) => ({
                        card: context.target
                    })).thenExecute((event) => {
                        this.atEndOfPhase((ability) => ({
                            match: event.card,
                            condition: () =>
                                ['play area', 'duplicate'].includes(event.card.location),
                            targetLocation: 'any',
                            effect: ability.effects.returnToHandIfStillInPlay(true)
                        }));
                    }),
                    context
                );
            }
        });
    }
}

HarryStrickland.code = '26574';
HarryStrickland.version = '1.0.0';

export default HarryStrickland;
