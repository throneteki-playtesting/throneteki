import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class Melisandre extends DrawCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                afterChallenge: (event) =>
                    event.challenge.winner === this.controller && this.isAttacking()
            },
            cost: ability.costs.sacrifice(
                (card) => card.getType() === 'character' && card !== this
            ),
            target: {
                type: 'select',
                cardCondition: (card, context) =>
                    card.location === 'play area' &&
                    card.getType() === 'character' &&
                    card.controller !== this.controller &&
                    !card.isLoyal() &&
                    (!context.costs.sacrifice ||
                        card.getPrintedCost() < context.costs.sacrifice.getPrintedCost())
            },
            limit: ability.limit.perRound(1),
            message: {
                format: '{player} uses {source} and sacrifices {sacrificedCard} to take control of {target}',
                args: { sacrificedCard: (context) => context.costs.sacrifice }
            },
            handler: (context) => {
                this.game.takeControl(context.player, context.target);
            }
        });
    }
}

Melisandre.code = '00194';

export default Melisandre;
