import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class KnightOfTheSeven extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            match: this,
            effect: ability.effects.dynamicStrength(() => this.controller.getHandCount())
        });
        this.reaction({
            when: {
                afterChallenge: (event) =>
                    event.challenge.winner === this.controller &&
                    this.isParticipating() &&
                    this.getStrength() >= 7
            },
            message: '{player} uses {source} to stand {source}',
            gameAction: GameActions.standCard({ card: this })
        });
    }
}

KnightOfTheSeven.code = '27588';
KnightOfTheSeven.version = '1.0.0';

export default KnightOfTheSeven;
