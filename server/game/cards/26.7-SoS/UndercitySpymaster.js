import DrawCard from '../../drawcard.js';

class UndercitySpymaster extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            match: this,
            effect: ability.effects.dynamicStrength(() =>
                this.game.getPlayers().reduce((acc, player) => acc + player.shadows.length, 0)
            )
        });
    }
}

UndercitySpymaster.code = '26589';
UndercitySpymaster.version = '1.0.1';

export default UndercitySpymaster;
