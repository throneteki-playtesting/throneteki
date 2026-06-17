import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';
import GenericTracker from '../../EventTrackers/GenericTracker.js';

class ArborLongship extends DrawCard {
    setupCardAbilities(ability) {
        this.tracker = GenericTracker.forPhase(this.game, 'onCardOutOfShadows');

        this.action({
            title: 'Give solo character +2 STR',
            phase: 'challenge',
            cost: ability.costs.kneelSelf(),
            condition: () => this.game.isDuringChallenge(),
            target: {
                cardCondition: (card) =>
                    card.location === 'play area' &&
                    card.getType() === 'character' &&
                    card.isParticipating() &&
                    this.isAlone(card)
            },
            message:
                '{player} kneels {costs.kneel} to give {target} +2 STR until the end of the challenge',
            handler: (context) => {
                this.untilEndOfChallenge((ability) => ({
                    match: context.target,
                    effect: ability.effects.modifyStrength(2)
                }));

                if (this.tracker.some((event) => event.card === this)) {
                    this.game.resolveGameAction(
                        GameActions.standCard({ card: context.target }),
                        context
                    );
                    this.game.addMessage(
                        '{0} uses {1} to also stand {2}',
                        context.player,
                        this,
                        context.target
                    );
                }
            }
        });
    }

    isAlone(card) {
        const challenge = this.game.currentChallenge;
        if (!challenge) {
            return false;
        }
        if (card.isAttacking()) {
            return challenge.attackers.length === 1;
        }
        if (card.isDefending()) {
            return challenge.defenders.length === 1;
        }
        return false;
    }
}

ArborLongship.code = '27594';
ArborLongship.version = '2.0.0';

export default ArborLongship;
