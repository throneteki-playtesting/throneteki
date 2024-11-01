import DrawCard from '../../drawcard.js';

class Aggo extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Stand a Bloodrider',
            condition: () => this.game.anyPlotHasTrait('Summer'),
            target: {
                cardCondition: (card) =>
                    card.location === 'play area' &&
                    card.getType() === 'character' &&
                    card.hasTrait('Bloodrider')
            },
            limit: ability.limit.perRound(1),
            handler: (context) => {
                this.game.addMessage(
                    '{0} uses {1} to stand {2}',
                    context.player,
                    this,
                    context.target
                );
                this.controller.standCard(context.target);
            }
        });
    }
}

Aggo.code = '03035';

export default Aggo;
