import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class CheesemongersGalley extends DrawCard {
    setupCardAbilities(ability) {
        this.interrupt({
            when: {
                onIncomeCollected: (event) => event.player === this.controller
            },
            cost: ability.costs.putSelfIntoShadows(),
            message: '{player} returns {costs.putIntoShadows} to shadows to gain 1 gold',
            gameAction: GameActions.gainGold((context) => ({ player: context.player, amount: 1 }))
        });
    }
}

CheesemongersGalley.code = '27582';
CheesemongersGalley.version = '1.0.1';

export default CheesemongersGalley;
