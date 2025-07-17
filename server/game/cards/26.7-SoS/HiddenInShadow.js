import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class HiddenInShadow extends DrawCard {
    setupCardAbilities(ability) {
        this.attachmentRestriction({ controller: 'current' });
        this.action({
            title: 'Return attached to shadows',
            cost: ability.costs.sacrificeSelf(),
            message: {
                format: '{player} sacrifices {costs.sacrifice} to return {parent} to shadows',
                args: { parent: (context) => this.parent || context.cardStateWhenInitiated.parent }
            },
            gameAction: GameActions.putIntoShadows((context) => ({
                card: this.parent || context.cardStateWhenInitiated.parent
            }))
        });
    }
}

HiddenInShadow.code = '26544';
HiddenInShadow.version = '1.0.1';

export default HiddenInShadow;
