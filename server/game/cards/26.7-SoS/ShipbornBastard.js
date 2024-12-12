import DrawCard from '../../drawcard.js';

class ShipbornBastard extends DrawCard {
    setupCardAbilities(ability) {
        this.plotModifiers({
            initiative: 1
        });
        this.persistentEffect({
            match: this,
            effect: ability.effects.dynamicStrength(() => this.getSTR())
        });
    }

    getSTR() {
        return this.controller.getNumberOfCardsInPlay(
            (card) => !!card.printedPlotModifiers.initiative
        );
    }
}

ShipbornBastard.code = '26517';
ShipbornBastard.version = '1.0.0';

export default ShipbornBastard;
