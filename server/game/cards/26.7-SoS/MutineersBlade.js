import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class MutineersBlade extends DrawCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                afterChallenge: (event) =>
                    event.challenge.winner === this.controller && this.parent.isParticipating()
            },
            cost: [ability.costs.kneelSelf(), ability.costs.sacrificeParent()],
            target: {
                cardCondition: {
                    participating: true,
                    condition: (card, context) =>
                        card.controller === context.event.challenge.loser &&
                        GameActions.kill({ card }).allow()
                }
            },
            message:
                '{player} kneels {costs.kneel} and sacrifices {costs.sacrifice} to kill {target}',
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.kill((context) => ({ card: context.target })),
                    context
                );
            }
        });
    }
}

MutineersBlade.code = '26555';
MutineersBlade.version = '1.0.0';

export default MutineersBlade;
