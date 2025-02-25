import DrawCard from '../../drawcard.js';

class HouseUmberBerserkers extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            targetController: 'current',
            effect: ability.effects.addKeyword(
                `Shadow (${Math.max(this.controller.getNumberOfUsedPlots(), 1)})`
            )
        });
    }
}

HouseUmberBerserkers.code = '26564';
HouseUmberBerserkers.version = '1.0.1';

export default HouseUmberBerserkers;
