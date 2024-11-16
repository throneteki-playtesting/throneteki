import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class GuerrillaTactics extends DrawCard {
    setupCardAbilities(ability) {
        this.attachmentRestriction({ faction: 'martell', controller: 'current' });
        this.action({
            title: 'Return attached to shadows',
            cost: ability.costs.sacrificeSelf(),
            gameAction: GameActions.putIntoShadows({ card: this.parent })
        });
    }
}

GuerrillaTactics.code = '26544';
GuerrillaTactics.version = '1.0.0';

export default GuerrillaTactics;
