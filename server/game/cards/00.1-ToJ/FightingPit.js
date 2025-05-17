import DrawCard from '../../drawcard.js';

class FightingPit extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Put character into play',
            phase: 'challenge',
            // TODO BD do the rules support putting the same card into play that was discarded for cost?
            target: {
                cardCondition: (card, context) =>
                    card.location === 'discard pile' &&
                    card.controller === context.player &&
                    card.getType() === 'character' &&
                    card.getPrintedCost() <= 3 &&
                    context.player.canPutIntoPlay(card)
            },
            cost: [ability.costs.discardFromHand(), ability.costs.sacrificeSelf()],
            message: '{player} sacrifices {source} and discards a card to put {target} into play',
            handler: (context) => {
                context.target.controller.putIntoPlay(context.target);
                this.atEndOfPhase((ability) => ({
                    match: context.target,
                    condition: () => ['play area', 'duplicate'].includes(context.target.location),
                    targetLocation: 'any',
                    effect: ability.effects.returnToHandIfStillInPlay(true)
                }));
            }
        });
    }
}

FightingPit.code = '00260';

export default FightingPit;
