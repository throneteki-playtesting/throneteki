import DrawCard from '../../drawcard.js';

class HornHillElite extends DrawCard {
    setupCardAbilities(ability) {
        const numStandingCharacters = () =>
            this.game.getNumberOfCardsInPlay(
                (card) => !card.kneeled && card.controller === this.controller
            );

        this.persistentEffect({
            condition: () => this.isAttacking(),
            match: this,
            effect: ability.effects.dynamicStrength(numStandingCharacters)
        });
    }
}

HornHillElite.code = '26588';
HornHillElite.version = '1.0.0';

export default HornHillElite;
