import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class ScreamingHorde extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                onCardOutOfShadows: (event) => event.card === this
            },
            target: {
                cardCondition: (card) =>
                    (card.location === 'hand' || card.location === 'discard pile') &&
                    card.controller === this.controller &&
                    card.getType() === 'character' &&
                    card.hasTrait('Dothraki') &&
                    GameActions.putIntoPlay({ card }).allow()
            },
            message: {
                format: '{player} uses {source} to put {target} into play',
                args: {}
            },
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.putIntoPlay((context) => ({ card: context.target })).thenExecute(
                        (event) => {
                            this.atEndOfPhase((ability) => ({
                                match: event.card,
                                condition: () => event.card.location === 'play area',
                                targetLocation: 'any',
                                effect: ability.effects.returnToHandIfStillInPlay()
                            }));
                        }
                    ),
                    context
                );
            }
        });
    }
}

ScreamingHorde.code = '27576';
ScreamingHorde.version = '2.0.0';

export default ScreamingHorde;
