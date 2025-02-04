import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class RoastBoar extends DrawCard {
    setupCardAbilities() {
        this.attachmentRestriction({ controller: 'opponent' });
        this.reaction({
            when: {
                onCardKneeled: (event) => event.card === this.parent
            },
            message: '{player} uses {source} to draw 1 card',
            gameAction: GameActions.drawCards({ amount: 1 })
        });
    }
}

RoastBoar.code = '26508';
RoastBoar.version = '2.0.0';

export default RoastBoar;
