import PlotCard from '../../plotcard.js';

class WraithsInTheirMidst extends PlotCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            targetController: 'opponent',
            match: (card) => card === card.controller.activePlot,
            effect: ability.effects.modifyReserve(-2)
        });
        this.persistentEffect({
            targetController: 'opponent',
            effect: ability.effects.setMinReserve(2)
        });
    }
}

WraithsInTheirMidst.code = '02080';

export default WraithsInTheirMidst;
