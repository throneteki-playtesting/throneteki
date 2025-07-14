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
            message: '{player} plays {source} to determine dominance',
            handler: () => {
                this.game.queueStep(new DetermineDominance(this.game, this));
            }
        });
    }
}

TheRegentsCouncil.code = '26536';
TheRegentsCouncil.version = '1.1.0';

export default TheRegentsCouncil;
