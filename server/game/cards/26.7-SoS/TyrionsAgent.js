import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class TyrionsAgent extends DrawCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                afterChallenge: (event) =>
                    event.challenge.winner === this.controller && this.isParticipating()
            },
            cost: ability.costs.putSelfIntoShadows(),
            message: {
                format: '{player} returns {source} to shadows to have {loser} choose a card in their hand and place it on top of their deck',
                args: { loser: (context) => context.event.challenge.loser }
            },
            handler: (context) => {
                this.game.promptForSelect(context.event.challenge.loser, {
                    activePromptTitle: 'Select a card',
                    source: this,
                    cardCondition: (card) =>
                        card.location === 'hand' &&
                        card.controller === context.event.challenge.loser,
                    onSelect: (player, card) => {
                        this.game.addMessage(
                            '{0} places a card from their hand on top of their deck',
                            player
                        );
                        this.game.resolveGameAction(GameActions.returnCardToDeck({ card }));
                    }
                });
            }
        });
    }
}

TyrionsAgent.code = '26529';
TyrionsAgent.version = '1.0.1';

export default TyrionsAgent;
