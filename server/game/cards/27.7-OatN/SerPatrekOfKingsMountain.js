import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class SerPatrekOfKingsMountain extends DrawCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                afterChallenge: (event) =>
                    event.challenge.winner === this.controller &&
                    this.game.anyPlotHasTrait('Winter') &&
                    this.isParticipating()
            },
            limit: ability.limit.perPhase(2),
            message: '{player} uses {source} to stand {source}',
            gameAction: GameActions.standCard({ card: this })
        });
    }
}

SerPatrekOfKingsMountain.code = '27503';
SerPatrekOfKingsMountain.version = '1.0.1';

export default SerPatrekOfKingsMountain;
