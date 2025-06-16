import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class CastleGate extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Kneel to gain 1 gold',
            phase: 'marshal',
            cost: ability.costs.kneelSelf(),
            message: '{player} kneels {source} to gain 1 gold',
            gameAction: GameActions.gainGold((context) => ({ player: context.player, amount: 1 }))
        });

        this.action({
            title: 'Sacrifice to draw 1 card',
            cost: ability.costs.sacrificeSelf(),
            message: '{player} sacrifices {costs.sacrifice} to draw 1 card',
            gameAction: GameActions.drawCards((context) => ({ player: context.player, amount: 1 }))
        });
    }
}

CastleGate.code = '00364';

export default CastleGate;
