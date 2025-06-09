import DrawCard from '../../drawcard.js';

class QuentynMartell extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Put a character into play',
            target: {
                cardCondition: (card, context) =>
                    (card.location === 'hand' || card.location === 'discard pile') &&
                    card.controller === context.player &&
                    card.getType() === 'character' &&
                    context.player.canPutIntoPlay(card) &&
                    (card.getPrintedStrength() < this.getStrength() ||
                        card.getPrintedStrength() < this.lastKnownStrength)
            },
            max: ability.limit.perRound(1),
            cost: ability.costs.putSelfIntoShadows(),
            handler: (context) => {
                let targetCharacter = context.target;
                let origin = targetCharacter.location;
                context.player.putIntoPlay(targetCharacter);
                this.atEndOfPhase((ability) => ({
                    match: targetCharacter,
                    condition: () => ['play area', 'duplicate'].includes(targetCharacter.location),
                    targetLocation: 'any',
                    effect: ability.effects.returnToHandIfStillInPlay(true)
                }));

                this.game.addMessage(
                    '{0} returns {1} to shadows to put {2} into play from their {3}',
                    context.player,
                    this,
                    targetCharacter,
                    origin
                );
            }
        });
    }
}

QuentynMartell.code = '00243';

export default QuentynMartell;
