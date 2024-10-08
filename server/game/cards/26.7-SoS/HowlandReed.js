import DrawCard from '../../drawcard.js';

class HowlandReed extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            targetController: 'current',
            effect: ability.effects.reduceFirstOutOfShadowsCardCostEachRound(
                2,
                (card) => card.isFaction('stark')
            )
        });
    }
}

HowlandReed.code = '26562';
HowlandReed.version = '1.0.0';

export default HowlandReed;
