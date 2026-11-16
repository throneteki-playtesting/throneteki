import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';
import { ChallengeTracker } from '../../EventTrackers/index.js';

class RiverrunBesiegers extends DrawCard {
    // Riverrun Besiegers (27528)
    // Assault. No attachments.
    // Reaction: After a location is knelt using assault, if it is the third challenge you initiated
    // this phase, discard it (take control of it instead if you control 2 or more attacking House
    // Frey characters).
    setupCardAbilities() {
        const tracker = ChallengeTracker.forPhase(this.game);

        this.reaction({
            when: {
                onCardKneeled: (event, context) =>
                    event.reason === 'assault' &&
                    event.card.getType() === 'location' &&
                    event.source.controller === context.player &&
                    context.source.isParticipating() &&
                    context.source.isAttacking() &&
                    tracker.count({ attackingPlayer: context.player }) === 3
            },
            message: {
                format: '{player} uses {source} on {location}',
                args: { location: (context) => context.event.card }
            },
            gameAction: GameActions.ifCondition({
                condition: (context) =>
                    context.game.currentChallenge.attackers.filter((card) =>
                        card.hasTrait('House Frey')
                    ).length >= 2,
                thenAction: GameActions.takeControl((context) => ({
                    card: context.event.card,
                    player: context.player
                })),
                elseAction: GameActions.discardCard((context) => ({ card: context.event.card }))
            })
        });
    }
}

RiverrunBesiegers.code = '27528';
RiverrunBesiegers.version = '1.1.0';

export default RiverrunBesiegers;
