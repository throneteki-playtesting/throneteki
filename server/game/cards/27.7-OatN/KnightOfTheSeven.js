import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class KnightOfTheSeven extends DrawCard {
    // Knight of the Seven (27588)
    // Knight of the Seven gets +1 STR for each card in your hand.
    // Reaction: After you win a challenge in which Knight of the Seven is participating, if it has
    // 7 or more STR, stand it. (Limit once per phase.)
    setupCardAbilities(ability) {
        this.persistentEffect({
            match: (card, context) => card === context.source,
            effect: ability.effects.dynamicStrength((card, context) =>
                context.source.controller.getHandCount()
            )
        });
        this.reaction({
            when: {
                afterChallenge: (event, context) =>
                    event.challenge.winner === context.player &&
                    context.source.isParticipating() &&
                    context.source.getStrength() >= 7
            },
            limit: ability.limit.perPhase(1),
            message: '{player} uses {source} to stand {source}',
            gameAction: GameActions.standCard((context) => ({ card: context.source }))
        });
    }
}

KnightOfTheSeven.code = '27588';
KnightOfTheSeven.version = '1.0.0';

export default KnightOfTheSeven;
