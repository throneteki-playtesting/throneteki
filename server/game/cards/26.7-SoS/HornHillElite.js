import DrawCard from '../../drawcard.js';

class HornHillElite extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: () => this.isAttacking(),
            match: this,
            effect: ability.effects.dynamicStrength(() =>
                this.controller.getNumberOfCardsInPlay({
                    faction: 'tyrell',
                    type: 'character',
                    kneeled: false
                })
            )
        });
    }
}

HornHillElite.code = '26588';
HornHillElite.version = '1.0.1';

export default HornHillElite;
