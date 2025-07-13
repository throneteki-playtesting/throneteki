import PlotCard from '../../plotcard.js';

class TheWarOfTheFiveKings extends PlotCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            match: this,
            effect: ability.effects.modifyClaim(() => this.getNumberOfRivals().length)
        });
    }

    getNumberOfRivals() {
        return this.game
            .getOpponents(this.controller)
            .map((player) => player.isRival(this.controller));
    }
}

TheWarOfTheFiveKings.code = '26613';
TheWarOfTheFiveKings.version = '1.0.1';

export default TheWarOfTheFiveKings;
