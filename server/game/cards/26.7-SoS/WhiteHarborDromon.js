import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class WhiteHarborDromon extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: () => this.game.isDuringChallenge(),
            match: (card) => card.isParticipating(),
            effect: ability.effects.modifyStrength(1)
        });
        this.reaction({
            when: {
                onCardOutOfShadows: (event) =>
                    event.card === this &&
                    this.controller.anyCardsInPlay({ type: 'character', participating: true })
            },
            cost: ability.costs.kneel(
                (card) => card.getType() === 'character' && card.canParticipateInChallenge()
            ),
            message:
                '{player} uses {source} and kneel {costs.kneel} to have it participate in the challenge on their side',
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.addToChallenge(
                        (context) => ({ card: context.costs.kneel }),
                        context
                    )
                );
            }
        });
    }
}

WhiteHarborDromon.code = '26570';
WhiteHarborDromon.version = '1.1.0';

export default WhiteHarborDromon;
