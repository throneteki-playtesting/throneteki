import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class BlindBeron extends DrawCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                afterChallenge: (event) =>
                    event.challenge.winner === this.controller &&
                    this.isParticipating() &&
                    event.challenge.strengthDifference >= 5
            },
            cost: ability.costs.killSelf(),
            target: {
                cardCondition: {
                    controller: 'current',
                    type: 'character',
                    trait: 'Drowned God',
                    location: 'dead pile',
                    condition: (card) => card !== this && GameActions.putIntoPlay({ card }).allow()
                }
            },
            message: '{player} kills {costs.kill} to put {target} into play from their dead pile',
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.putIntoPlay((context) => ({ card: context.target })),
                    context
                );
            }
        });
    }
}

BlindBeron.code = '27515';
BlindBeron.version = '1.0.0';

export default BlindBeron;
