import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class WoodenSword extends DrawCard {
    setupCardAbilities(ability) {
        this.whileAttached({
            condition: () => this.game.isDuringChallenge({ defendingPlayer: this.controller }),
            effect: ability.effects.addIcon('military')
        });

        this.action({
            title: 'Select an attachment',
            target: {
                activePromptTitle: 'Select an attachment',
                cardCondition: (card) =>
                    card.location === 'play area' &&
                    card.getType() === 'attachment' &&
                    card.hasTrait('Weapon') &&
                    card !== this
            },
            phase: 'challenge',
            cost: ability.costs.sacrificeSelf(),
            message: '{player} sacrifices {costs.sacrifice} to discard {target} from play',
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.discardCard((context) => ({ card: context.target })),
                    context
                );
            }
        });
    }
}

WoodenSword.code = '27604';
WoodenSword.version = '1.1.0';

export default WoodenSword;
