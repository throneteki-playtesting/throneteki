import DrawCard from '../../drawcard.js';

class HouseUmberBerserkers extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            targetController: 'current',
            effect: ability.effects.increaseCost({
                playingTypes: ['outOfShadows'],
                amount: () => Math.max(this.controller.getNumberOfUsedPlots(), 1),
                match: this
            })
        });
    }
}

HouseUmberBerserkers.code = '26564';
HouseUmberBerserkers.version = '1.0.0';

export default HouseUmberBerserkers;
