import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class HarrenhalCupbearer extends DrawCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                afterChallenge: (event) =>
                    event.challenge.winner === this.controller && this.isParticipating()
            },
            cost: ability.costs.putSelfIntoShadows(),
            target: {
                cardCondition: (card, context) =>
                    card.controller === context.event.challenge.loser &&
                    card.getType() === 'character' &&
                    !card.hasTrait('Spy') &&
                    GameActions.kneelCard({ card }).allow()
            },
            message: '{player} returns {costs.putIntoShadows} to shadows to kneel {target}',
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.kneelCard((context) => ({ card: context.target })),
                    context
                );
            }
        });
    }
}

HarrenhalCupbearer.code = '26602';
HarrenhalCupbearer.version = '1.0.0';

export default HarrenhalCupbearer;
