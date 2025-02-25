import DrawCard from '../../drawcard.js';
import { ChallengeTracker } from '../../EventTrackers/ChallengeTracker.js';

class RaidersScythe extends DrawCard {
    setupCardAbilities(ability) {
        this.tracker = ChallengeTracker.forPhase(this.game);
        this.attachmentRestriction({ unique: false, faction: 'greyjoy' });
        this.whileAttached({
            condition: () =>
                !!this.game.currentChallenge &&
                this.hasMoreAttachmentsThanDefender(this.game.currentChallenge.defendingPlayer) &&
                !this.tracker.some({ attackingPlayer: this.controller }),
            match: this.parent,
            effect: ability.effects.doesNotKneelAsAttacker()
        });
    }

    hasMoreAttachmentsThanDefender(defendingPlayer) {
        return (
            this.controller.getNumberOfCardsInPlay({ type: 'attachment' }) >
            defendingPlayer.getNumberOfCardsInPlay({ type: 'attachment' })
        );
    }
}

RaidersScythe.code = '26520';
RaidersScythe.version = '1.0.1';

export default RaidersScythe;
