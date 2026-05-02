import DrawCard from '../../drawcard.js';
import { ChallengeTracker } from '../../EventTrackers/ChallengeTracker.js';
import GameActions from '../../GameActions/index.js';

class OrtonMerryweather extends DrawCard {
    setupCardAbilities(ability) {
        this.tracker = ChallengeTracker.forRound(this.game);

        this.persistentEffect({
            match: this,
            effect: ability.effects.dynamicDominanceStrength(() => 2 * this.controller.gold)
        });
        this.interrupt({
            when: {
                onPhaseEnded: (event) =>
                    event.phase === 'challenge' &&
                    !this.tracker.some({ loser: this.controller, challengeType: 'intrigue' })
            },
            message: '{player} uses {source} to gain 2 gold',
            gameAction: GameActions.gainGold((context) => ({ player: context.player, amount: 2 }))
        });
    }
}

OrtonMerryweather.code = '27526';
OrtonMerryweather.version = '1.0.0';

export default OrtonMerryweather;
