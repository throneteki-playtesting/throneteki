import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class CheesemongersGalley extends DrawCard {
    // Cheesemonger's Galley (27582)
    // Shadow (1).
    // Interrupt: When you collect income, return Cheesemonger's Galley to shadows to gain 1 gold.
    setupCardAbilities(ability) {
        this.interrupt({
            when: {
                onIncomeCollected: (event, context) => event.player === context.player
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
