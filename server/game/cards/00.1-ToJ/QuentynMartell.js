import DrawCard from '../../drawcard.js';

class QuentynMartell extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Put a character into play',
            cost: ability.costs.putSelfIntoShadows(),
            target: {
                cardCondition: (card, context) =>
                    (card.location === 'hand' || card.location === 'discard pile') &&
                    card.controller === context.player &&
                    card.getType() === 'character' &&
                    context.player.canPutIntoPlay(card) &&
                    (!context.costs.putIntoShadows ||
                        card.getPrintedStrength() < context.costs.putIntoShadows.getStrength())
            },
            handler: (context) => {
                let origin = context.target.location;
                context.player.putIntoPlay(context.target);
                this.game.addMessage(
                    '{0} returns {1} to shadows to put {2} into play from their {3}',
                    context.player,
                    this,
                    context.target,
                    origin
                );
            }
        });
    }
}

QuentynMartell.code = '00243';

export default QuentynMartell;
