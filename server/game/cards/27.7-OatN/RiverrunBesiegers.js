import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';
import { ChallengeTracker } from '../../EventTrackers/index.js';

class RiverrunBesiegers extends DrawCard {
    setupCardAbilities() {
        this.tracker = ChallengeTracker.forPhase(this.game);

        this.reaction({
            when: {
                onCardKneeled: (event) =>
                    event.reason === 'assault' &&
                    event.card.getType() === 'location' &&
                    event.source.controller === this.controller &&
                    this.isParticipating() &&
                    this.isAttacking() &&
                    this.tracker.count({ attackingPlayer: this.controller }) === 3
            },
            handler: (context) => {
                const location = context.event.card;
                const freyAttackers = this.game.currentChallenge
                    ? this.game.currentChallenge.attackers.filter((card) =>
                          card.hasTrait('House Frey')
                      ).length
                    : 0;

                if (freyAttackers >= 2) {
                    this.game.addMessage(
                        '{0} uses {1} to take control of {2}',
                        this.controller,
                        this,
                        location
                    );
                    this.game.resolveGameAction(
                        GameActions.takeControl(() => ({
                            card: location,
                            player: this.controller
                        })),
                        context
                    );
                } else {
                    this.game.addMessage(
                        '{0} uses {1} to discard {2}',
                        this.controller,
                        this,
                        location
                    );
                    this.game.resolveGameAction(
                        GameActions.discardCard({ card: location }),
                        context
                    );
                }
            }
        });
    }
}

RiverrunBesiegers.code = '27528';
RiverrunBesiegers.version = '1.1.0';

export default RiverrunBesiegers;
