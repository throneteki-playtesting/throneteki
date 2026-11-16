import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class SerPatrekOfKingsMountain extends DrawCard {
    // Ser Patrek of King's Mountain (27503)
    // Reaction: After you win a challenge in which Ser Patrek of King’s Mountain is participating,
    // if there is a Winter plot revealed, stand him. (Limit twice per phase.)
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                afterChallenge: (event, context) =>
                    event.challenge.winner === context.player &&
                    context.game.anyPlotHasTrait('Winter') &&
                    context.source.isParticipating()
            },
            limit: ability.limit.perPhase(2),
            message: '{player} uses {source} to stand {source}',
            gameAction: GameActions.standCard((context) => ({ card: context.source }))
        });
    }
}

SerPatrekOfKingsMountain.code = '27503';
SerPatrekOfKingsMountain.version = '1.0.1';

export default SerPatrekOfKingsMountain;
