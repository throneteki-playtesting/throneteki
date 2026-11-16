import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';
import { ChallengeTracker } from '../../EventTrackers/index.js';

class AreoHotah extends DrawCard {
    // Areo Hotah (27537)
    // Ambush (6).
    // Interrupt: When the challenges phase ends, kneel your faction card to have Areo Hotah gain 1
    // power for each challenge type not initiated against you this phase.
    setupCardAbilities(ability) {
        const tracker = ChallengeTracker.forPhase(this.game);
        const uninitiatedTypes = (context) =>
            ['military', 'intrigue', 'power'].filter(
                (challengeType) => !tracker.some({ challengeType, defendingPlayer: context.player })
            );

        this.interrupt({
            when: {
                onPhaseEnded: (event) => event.phase === 'challenge'
            },
            cost: ability.costs.kneelFactionCard(),
            message: {
                format: '{player} uses {source} and kneels their faction card to have {source} gain {amount} power',
                args: { amount: (context) => uninitiatedTypes(context).length }
            },
            gameAction: GameActions.gainPower((context) => ({
                card: context.source,
                amount: uninitiatedTypes(context).length
            }))
        });
    }
}

AreoHotah.code = '27537';
AreoHotah.version = '1.1.0';

export default AreoHotah;
