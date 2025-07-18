import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class HillsideRiver extends DrawCard {
    setupCardAbilities(ability) {
        this.plotModifiers({
            gold: 1
        });

        this.reaction({
            when: {
                onClaimApplied: (event) =>
                    event.challenge &&
                    event.challenge.isMatch({
                        winner: this.controller,
                        challengeType: 'intrigue'
                    }) &&
                    event.challenge.loser.getHandCount() < this.controller.getHandCount()
            },
            cost: ability.costs.sacrificeSelf(),
            message: '{player} sacrifices {source} to gain 1 power',
            gameAction: GameActions.gainPower((context) => ({
                card: context.player.faction,
                amount: 1
            }))
        });
    }
}

HillsideRiver.code = '00167';

export default HillsideRiver;
