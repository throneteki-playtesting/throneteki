import DrawCard from '../../drawcard.js';

class RobbStark extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Kneel location to increase STR',
            target: {
                cardCondition: {
                    type: 'character',
                    location: 'play area',
                    participating: true
                }
            },
            cost: ability.costs.kneel((card) => !card.isLimited() && card.getType() === 'location'),
            handler: (context) => {
                let str = this.getSTRIncrease(context);
                this.untilEndOfPhase(() => ({
                    match: context.target,
                    effect: ability.effects.modifyStrength(str)
                }));
            }
        });
    }

    getSTRIncrease(context) {
        let str = context.costs.kneel.getPrintedCost();
        return this.controller.anyCardsInPlay((card) => card.name === 'Grey Wind') ? str + 1 : str;
    }
}

RobbStark.code = '00216';

export default RobbStark;
