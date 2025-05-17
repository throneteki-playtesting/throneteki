import DrawCard from '../../drawcard.js';

class CruelBrigand extends DrawCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onCardEntersPlay: (event) =>
                    event.card === this && this.game.currentPhase === 'challenge'
            },
            cost: ability.costs.payGold(1),
            cardCondition: (card) =>
                card.location === 'play area' &&
                card.getType() === 'character' &&
                card.getPrintedCost() <= 2,
            handler: (context) => {
                context.target.controller.returnCardToHand(context.target);
                this.game.addMessage(
                    "{0} uses {1} and pays 1 gold to return {2} to {3}'s hand",
                    context.player,
                    this,
                    context.target,
                    context.target.owner
                );
            }
        });
    }
}

CruelBrigand.code = '00166';

export default CruelBrigand;
