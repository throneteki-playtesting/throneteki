import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class Morningstar extends DrawCard {
    setupCardAbilities(ability) {
        this.whileAttached({
            effect: ability.effects.modifyStrength(2)
        });
        this.reaction({
            when: {
                onRemovedFromChallenge: () => this.parent.isParticipating()
            },
            cost: ability.costs.kneelSelf(),
            target: {
                cardCondition: {
                    type: 'character',
                    participating: true
                }
            },
            message:
                '{player} kneels {costs.kneel} to stand and remove {target} from the challenge',
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.simultaneously(
                        GameActions.standCard((context) => ({ card: context.target })),
                        GameActions.removeFromChallenge((context) => ({ card: context.target }))
                    ),
                    context
                );
            }
        });
    }
}

Morningstar.code = '27592';
Morningstar.version = '1.0.0';

export default Morningstar;
