import DrawCard from '../../drawcard.js';

class Satin extends DrawCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onCardKneeled: (event) => event.card === this
            },
            limit: ability.limit.perPhase(2),
            target: {
                cardCondition: (card) =>
                    card !== this &&
                    card.location === 'play area' &&
                    card.hasTrait('Steward') &&
                    card.getType() === 'character' &&
                    card.kneeled
            },
            handler: (context) => {
                context.target.controller.standCard(context.target);
                this.game.addMessage(
                    '{0} uses {1} to stand {2}',
                    this.controller,
                    this,
                    context.target
                );
            }
        });
    }
}

Satin.code = '07013';

export default Satin;
