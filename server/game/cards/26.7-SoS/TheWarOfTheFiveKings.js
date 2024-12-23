import PlotCard from '../../plotcard.js';

class TheWarOfTheFiveKings extends PlotCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            match: this,
            // TODO: Properly implement X claim
            effect: ability.effects.setClaim(
                () =>
                    this.game
                        .getOpponents(this.controller)
                        .filter((player) => !this.controller.isSupporter(player)).length
            )
        });
    }
}

TheWarOfTheFiveKings.code = '26613';
TheWarOfTheFiveKings.version = '1.0.0';

export default TheWarOfTheFiveKings;
