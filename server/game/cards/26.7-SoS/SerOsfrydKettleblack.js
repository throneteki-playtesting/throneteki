import DrawCard from '../../drawcard.js';

class SerOsfrydKettleblack extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: () =>
                this.game
                    .getOpponents(this.controller)
                    .some((player) => this.controller.getHandCount() > player.getHandCount()),
            match: this,
            effect: ability.effects.addKeyword('Renown')
        });
    }
}

SerOsfrydKettleblack.code = '26526';
SerOsfrydKettleblack.version = '1.0.0';

export default SerOsfrydKettleblack;
