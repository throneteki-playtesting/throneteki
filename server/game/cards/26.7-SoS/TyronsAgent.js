import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class TyronsAgent extends DrawCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                afterChallenge: (event) =>
                    event.challenge.winner === this.controller && this.isParticipating()
            },
            cost: ability.costs.putSelfIntoShadows(),
            message: {
                format: "{player} returns {source} to shadows to put a card at random from {loser}'s hand on top of their deck",
                args: { loser: (context) => context.event.challenge.loser }
            },
            gameAction: GameActions.returnCardToDeck((context) => ({
                card: context.event.challenge.loser.hand[
                    Math.floor(Math.random() * context.event.challenge.loser.hand.length)
                ]
            }))
        });
    }
}

TyronsAgent.code = '26529';
TyronsAgent.version = '1.0.0';

export default TyronsAgent;
