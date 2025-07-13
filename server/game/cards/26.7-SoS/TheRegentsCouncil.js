import DrawCard from '../../drawcard.js';
import DetermineDominance from '../../gamesteps/DetermineDominance.js';

class TheRegentsCouncil extends DrawCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                afterChallenge: (event) =>
                    event.challenge.challengeType === 'intrigue' &&
                    this.controller.anyCardsInPlay(
                        (card) =>
                            card.isParticipating() &&
                            (card.hasTrait('Small Council') || card.name === 'Cersei Lannister')
                    )
            },
            max: ability.limit.perChallenge(),
            handler: () => {
                this.game.queueStep(DetermineDominance(this.game, this));
            }
        });
    }
}

TheRegentsCouncil.code = '26536';
TheRegentsCouncil.version = '1.1.0';

export default TheRegentsCouncil;
