import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class AgentOfTheCitadel extends DrawCard {
    setupCardAbilities(ability) {
        const revealedCost = (context) => context.event.cards[0].getPrintedCost();

        this.reaction({
            when: {
                afterChallenge: (event) =>
                    event.challenge.winner === this.controller && this.isParticipating()
            },
            cost: ability.costs.sacrificeSelf(),
            message: '{player} uses {source} to reveal the top card of their deck',
            gameAction: GameActions.revealCards((context) => ({
                player: context.player,
                cards: [context.source.controller.drawDeck[0]]
            })).then({
                context: (context) => revealedCost(context) > 0,
                message: {
                    format: '{player} reduces the cost of their next shadow card by {revealedCost}',
                    args: { revealedCost }
                },
                gameAction: GameActions.genericHandler((context) => {
                    this.untilEndOfPhase((ability) => ({
                        targetController: 'current',
                        effect: ability.effects.reduceNextOutOfShadowsCardCost(
                            revealedCost(context)
                        )
                    }));
                })
            })
        });
    }
}

AgentOfTheCitadel.code = '26590';
AgentOfTheCitadel.version = '1.0.0';

export default AgentOfTheCitadel;
