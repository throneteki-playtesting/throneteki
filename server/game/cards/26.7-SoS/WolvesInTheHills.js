import ChallengeTypes from '../../ChallengeTypes.js';
import DrawCard from '../../drawcard.js';
import SatisfyClaim from '../../gamesteps/challenge/SatisfyClaim.js';

class WolvesInTheHills extends DrawCard {
    setupCardAbilities(ability) {
        this.interrupt({
            when: {
                onClaimApplied: (event) =>
                    event.challenge && event.challenge.isMatch({ challengeType: 'military' })
            },
            cost: ability.costs.returnToHand((card) => this.isAttackingDirewolf(card)),
            message:
                '{player} plays {source} and returns {costs.returnToHand} to their hand to change the apply intrigue or power claim instead',
            handler: (context) => {
                this.context = context;
                this.game.promptWithMenu(context.player, this, {
                    activePrompt: {
                        menuTitle: 'Name a challenge type',
                        buttons: ChallengeTypes.asButtons({ method: 'challengeSelected' })
                    },
                    source: this
                });
            }
        });
    }

    isAttackingDirewolf(card) {
        return card.getType() === 'character' && card.hasTrait('Direwolf') && card.isAttacking();
    }

    challengeSelected(player, challenge) {
        this.game.addMessage(
            '{0} applies {1} claim instead of {2} claim',
            player,
            challenge,
            'military'
        );

        this.context.replaceHandler((event) => {
            event.claim.challengeType = challenge;

            this.game.queueStep(new SatisfyClaim(this.game, event.claim));
        });

        return true;
    }
}

WolvesInTheHills.code = '26572';
WolvesInTheHills.version = '1.0.0';

export default WolvesInTheHills;
