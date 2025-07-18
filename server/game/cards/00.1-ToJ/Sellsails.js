import DrawCard from '../../drawcard.js';

class Sellsails extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Stand Mercenary or Warship',
            cost: ability.costs.discardGold(),
            limit: ability.limit.perPhase(1),
            target: {
                cardCondition: (card) =>
                    card.location === 'play area' &&
                    card.kneeled &&
                    (card.hasTrait('Mercenary') || card.hasTrait('Warship')),
                gameAction: 'stand'
            },
            message: '{player} discards 1 gold from {source} to stand {target}',
            handler: (context) => {
                context.target.controller.standCard(context.target);
            }
        });
    }
}

Sellsails.code = '00121';

export default Sellsails;
