import PlotCard from '../../plotcard.js';

class RoyalDecree extends PlotCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            effect: ability.effects.mayInitiateAdditionalChallenge('power')
        });
    }
}

RoyalDecree.code = '00373';

export default RoyalDecree;
