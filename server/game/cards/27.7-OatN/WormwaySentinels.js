import DrawCard from '../../drawcard.js';
import CardEntersPlayTracker from '../../EventTrackers/CardEntersPlayTracker.js';

class WormwaySentinels extends DrawCard {
    setupCardAbilities(ability) {
        this.tracker = CardEntersPlayTracker.forPhase(this.game);

        this.persistentEffect({
            condition: () => this.isDefendingIntrigueOrPower(),
            match: this,
            effect: ability.effects.canBeDeclaredWithoutIcon()
        });

        this.persistentEffect({
            condition: () =>
                this.isDefendingIntrigueOrPower() && this.tracker.hasComeOutOfShadows(this),
            match: this,
            effect: ability.effects.canBeDeclaredWhileKneeling()
        });
    }

    isDefendingIntrigueOrPower() {
        return this.game.isDuringChallenge({
            challengeType: ['intrigue', 'power'],
            defendingPlayer: this.controller
        });
    }
}

WormwaySentinels.code = '27552';
WormwaySentinels.version = '1.1.0';

export default WormwaySentinels;
