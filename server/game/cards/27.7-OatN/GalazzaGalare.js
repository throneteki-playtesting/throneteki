import GameActions from '../../GameActions/index.js';
import DrawCard from '../../drawcard.js';
import GenericTracker from '../../EventTrackers/GenericTracker.js';

class GalazzaGalare extends DrawCard {
    // Galazza Galare (27574)
    // Interrupt: When the challenge phase ends, gain 1 power for your faction for each player who
    // did not apply [military] claim this phase.
    setupCardAbilities() {
        const tracker = GenericTracker.forPhase(this.game, 'onClaimApplied');
        const playersWithoutMilitaryClaim = (game) =>
            game
                .getPlayers()
                .filter(
                    (player) =>
                        !tracker.some(
                            (event) =>
                                event.player === player && event.claim.challengeType === 'military'
                        )
                );

        this.interrupt({
            when: {
                onPhaseEnded: (event) => event.phase === 'challenge'
            },
            condition: (context) => playersWithoutMilitaryClaim(context.game).length > 0,
            message: {
                format: '{player} uses {source} to gain {amount} power for their faction',
                args: { amount: (context) => playersWithoutMilitaryClaim(context.game).length }
            },
            gameAction: GameActions.gainPower((context) => ({
                card: context.player.faction,
                amount: playersWithoutMilitaryClaim(context.game).length
            }))
        });
    }
}

GalazzaGalare.code = '27574';
GalazzaGalare.version = '1.0.1';

export default GalazzaGalare;
