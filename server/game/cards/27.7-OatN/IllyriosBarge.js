import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class IllyriosBarge extends DrawCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onIncomeCollected: (event) => event.player === this.controller
            },
            cost: ability.costs.putSelfIntoShadows(),
            message: '{player} returns {costs.putIntoShadows} to shadows to gain 1 gold',
            gameAction: GameActions.gainGold((context) => ({ player: context.player, amount: 1 }))
        });
    }
}

IllyriosBarge.code = '27582';
IllyriosBarge.version = '1.0.0';

export default IllyriosBarge;
