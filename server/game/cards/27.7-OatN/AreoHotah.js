import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';
import { ChallengeTracker } from '../../EventTrackers/index.js';

class AreoHotah extends DrawCard {
    setupCardAbilities(ability) {
        this.tracker = ChallengeTracker.forPhase(this.game);

        this.interrupt({
            when: {
                onPhaseEnded: (event) => event.phase === 'challenge'
            },
            cost: ability.costs.kneelFactionCard(),
            handler: (context) => {
                const challengeTypesAgainstMe = ['military', 'intrigue', 'power'].filter((type) =>
                    this.tracker.some({
                        challengeType: type,
                        defendingPlayer: this.controller
                    })
                );
                const powerGain = 3 - challengeTypesAgainstMe.length;

                this.game.addMessage(
                    '{0} uses {1} and kneels their faction card to have {1} gain {2} power',
                    context.player,
                    this,
                    powerGain
                );

                if (powerGain > 0) {
                    this.game.resolveGameAction(
                        GameActions.gainPower({ card: this, amount: powerGain }),
                        context
                    );
                }
            }
        });
    }
}

AreoHotah.code = '27537';
AreoHotah.version = '1.1.0';

export default AreoHotah;
