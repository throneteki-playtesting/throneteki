import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class GuerrillaTactics extends DrawCard {
    setupCardAbilities(ability) {
        this.attachmentRestriction({ faction: 'martell', controller: 'current' });
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

GuerrillaTactics.code = '26544';
GuerrillaTactics.version = '1.0.0';

export default GuerrillaTactics;
