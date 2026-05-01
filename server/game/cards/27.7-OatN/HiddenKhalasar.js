import DrawCard from '../../drawcard.js';
import { ChallengeTracker } from '../../EventTrackers/ChallengeTracker.js';

class HiddenKhalasar extends DrawCard {
    setupCardAbilities() {
        this.tracker = ChallengeTracker.forPhase(this.game);

        this.reaction({
            when: {
                onCardOutOfShadows: (event) => event.card === this
            },
            message: {
                format: '{player} uses {source} to have {characters} gain stealth during the next challenge you initiate this phase',
                args: { characters: () => this.getApplicableCharacters() }
            },
            handler: () => {
                let currentTotalNumber = Math.max(
                    ...this.tracker.challenges.map((challenge) => challenge.totalNumber),
                    0
                );

                this.untilEndOfPhase((ability) => ({
                    condition: () =>
                        this.game.isDuringChallenge({ totalNumber: currentTotalNumber + 1 }),
                    match: this.getApplicableCharacters(),
                    effect: ability.effects.addKeyword('stealth')
                }));
            }
        });
    }

    getApplicableCharacters() {
        return this.controller.filterCardsInPlay(
            (card) => card.getType() === 'character' && card.hasTrait('Dothraki')
        );
    }
}

HiddenKhalasar.code = '27576';
HiddenKhalasar.version = '1.0.0';

export default HiddenKhalasar;
