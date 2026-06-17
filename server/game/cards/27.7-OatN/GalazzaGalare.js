import GameActions from '../../GameActions/index.js';
import DrawCard from '../../drawcard.js';
import GenericTracker from '../../EventTrackers/GenericTracker.js';

class GalazzaGalare extends DrawCard {
    setupCardAbilities() {
        this.tracker = GenericTracker.forPhase(this.game, 'onClaimApplied');

        this.interrupt({
            when: {
                onPhaseEnded: (event) => event.phase === 'challenge'
            },
            condition: () => this.getPlayersWithoutMilitaryClaim().length > 0,
            message: {
                format: '{player} uses {source} to gain {amount} power for their faction',
                args: { amount: () => this.getPlayersWithoutMilitaryClaim().length }
            },
            gameAction: GameActions.gainPower((context) => ({
                card: context.player.faction,
                amount: this.getPlayersWithoutMilitaryClaim().length
            }))
        });
    }

    getPlayersWithoutMilitaryClaim() {
        return this.game
            .getPlayers()
            .filter(
                (player) =>
                    !this.tracker.some(
                        (event) =>
                            event.player === player && event.claim.challengeType === 'military'
                    )
            );
    }
}

GalazzaGalare.code = '27574';
GalazzaGalare.version = '1.0.1';

export default GalazzaGalare;
