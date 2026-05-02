import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class RosbyRoad extends DrawCard {
    setupCardAbilities(ability) {
        this.plotModifiers({
            initiative: 1
        });
        this.action({
            title: 'Kneel and sacrifice',
            clickToActivate: true,
            cost: [ability.costs.kneelSelf(), ability.costs.sacrificeSelf()],
            message: '{player} kneels and sacrifices {source} to gain 3 gold',
            gameAction: GameActions.gainGold((context) => ({ player: context.player, amount: 3 }))
        });
    }
}

RosbyRoad.code = '27534';
RosbyRoad.version = '1.0.0';

export default RosbyRoad;
