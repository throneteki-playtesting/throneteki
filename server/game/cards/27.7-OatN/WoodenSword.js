import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class WoodenSword extends DrawCard {
    // Wooden Sword (27604)
    // While you are the defending player, attached character gains a [military] icon.
    // Challenges Action: Sacrifice Wooden Sword to choose and discard another Weapon attachment.
    setupCardAbilities(ability) {
        this.whileAttached({
            condition: (context) =>
                context.game.isDuringChallenge({ defendingPlayer: context.source.controller }),
            effect: ability.effects.addIcon('military')
        });

        this.action({
            title: 'Discard a Weapon',
            phase: 'challenge',
            cost: ability.costs.sacrificeSelf(),
            target: {
                cardCondition: (card, context) =>
                    card.location === 'play area' &&
                    card.getType() === 'attachment' &&
                    card.hasTrait('Weapon') &&
                    card !== context.source,
                gameAction: GameActions.discardCard((context) => ({ card: context.target }))
            },
            message: '{player} sacrifices {source} to discard {target}'
        });
    }
}

WoodenSword.code = '27604';
WoodenSword.version = '1.1.0';

export default WoodenSword;
