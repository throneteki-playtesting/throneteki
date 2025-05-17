import DrawCard from '../../drawcard.js';

class PoisonedArrowhead extends DrawCard {
    setupCardAbilities(ability) {
        this.whileAttached({
            effect: ability.effects.modifyStrength(1)
        });
        this.action({
            cost: [ability.costs.kneelSelf(), ability.costs.sacrificeSelf()],
            target: {
                cardCondition: (card) =>
                    card.getType() === 'character' && card.location === 'play area'
            },
            message:
                '{player} uses {source} to treat the text box of {target} as blank until the end of the phase',
            handler: (context) => {
                this.untilEndOfPhase((ability) => ({
                    match: context.target,
                    effect: ability.effects.blankExcludingTraits
                }));
            }
        });
    }
}

PoisonedArrowhead.code = '00320';

export default PoisonedArrowhead;
