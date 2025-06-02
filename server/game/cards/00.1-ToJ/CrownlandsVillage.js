import DrawCard from '../../drawcard.js';
import SatisfyClaim from '../../gamesteps/challenge/SatisfyClaim.js';

class CrownlandsVillage extends DrawCard {
    setupCardAbilities(ability) {
        this.plotModifiers({
            gold: 1
        });

        this.interrupt({
            when: {
                onClaimApplied: (event) =>
                    event.challenge &&
                    event.challenge.winner === this.controller &&
                    event.challenge.attackingPlayer === this.controller &&
                    event.challenge.challengeType === 'intrigue' &&
                    event.challenge.defendingPlayer.getHandCount() === 0
            },
            cost: ability.costs.sacrificeSelf(),
            handler: (context) => {
                let opponent = context.event.challenge.defendingPlayer;

                this.game.addMessage(
                    '{0} uses {1} to have {2} apply {3} claim instead of {4} claim',
                    this.controller,
                    this,
                    opponent,
                    'power',
                    'intrigue'
                );

                context.replaceHandler((event) => {
                    event.claim.challengeType = 'power';

                    this.game.queueStep(new SatisfyClaim(this.game, event.claim));
                });
            }
        });
    }
}

CrownlandsVillage.code = '00167';

export default CrownlandsVillage;
