import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class AbandonedRuins extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: () =>
                this.game
                    .getOpponents(this.controller)
                    .some(
                        (opponent) =>
                            opponent.getNumberOfCardsInPlay({ type: 'character' }) >
                            this.controller.getNumberOfCardsInPlay({ type: 'character' })
                    ),
            match: (card) => card.getType() === 'character' && card.controller === this.controller,
            targetController: 'current',
            effect: ability.effects.modifyStrength(1)
        });
        this.action({
            title: 'Return a Martell character to hand',
            phase: 'challenge',
            cost: [ability.costs.kneelSelf(), ability.costs.sacrificeSelf()],
            target: {
                cardCondition: (card) =>
                    card.location === 'play area' &&
                    card.getType() === 'character' &&
                    card.controller === this.controller &&
                    card.isFaction('martell')
            },
            message: '{player} kneels and sacrifices {source} to return {target} to hand',
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.returnCardToHand((context) => ({ card: context.target })),
                    context
                );
            }
        });
    }
}

AbandonedRuins.code = '27546';
AbandonedRuins.version = '2.0.0';

export default AbandonedRuins;
