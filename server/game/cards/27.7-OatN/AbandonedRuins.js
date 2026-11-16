import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class AbandonedRuins extends DrawCard {
    // Abandoned Ruins (27546)
    // While you control fewer characters than an opponent, each character you control gets +1 STR.
    // Challenges Action: Kneel and sacrifice Abandoned Ruins to return a [martell] character you
    // control to your hand.
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: (context) =>
                context.game.getOpponents(context.source.controller).some(
                    (opponent) =>
                        opponent.getNumberOfCardsInPlay({ type: 'character' }) >
                        context.source.controller.getNumberOfCardsInPlay({
                            type: 'character'
                        })
                ),
            match: (card, context) =>
                card.getType() === 'character' && card.controller === context.source.controller,
            targetController: 'current',
            effect: ability.effects.modifyStrength(1)
        });
        this.action({
            title: 'Return a Martell character to hand',
            phase: 'challenge',
            cost: [ability.costs.kneelSelf(), ability.costs.sacrificeSelf()],
            target: {
                cardCondition: (card, context) =>
                    card.location === 'play area' &&
                    card.getType() === 'character' &&
                    card.controller === context.player &&
                    card.isFaction('martell'),
                gameAction: GameActions.returnCardToHand((context) => ({ card: context.target }))
            },
            message: '{player} kneels and sacrifices {source} to return {target} to hand'
        });
    }
}

AbandonedRuins.code = '27546';
AbandonedRuins.version = '2.0.0';

export default AbandonedRuins;
