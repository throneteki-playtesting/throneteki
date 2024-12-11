import DrawCard from '../../drawcard.js';

class AboveTheRest extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Gain additional renown',
            cost: ability.costs.kneelFactionCard(),
            target: {
                cardCondition: { type: 'character', trait: 'House Tully' }
            },
            handler: (context) => {
                this.untilEndOfPhase((ability) => ({
                    targetController: 'any',
                    match: context.target,
                    effect: ability.effects.modifyKeywordTriggerAmount('renown', 1)
                }));
            }
        });
    }
}

AboveTheRest.code = '26571';
AboveTheRest.version = '1.0.0';

export default AboveTheRest;
