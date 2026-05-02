import DrawCard from '../../drawcard.js';

class KingsmootClaimant extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: () => this.isAttacking() && this.defendingPlayerHasNoKings(),
            match: this,
            effect: [ability.effects.addTrait('King'), ability.effects.addKeyword('Renown')]
        });
    }

    defendingPlayerHasNoKings() {
        if (!this.game.currentChallenge) {
            return false;
        }
        return !this.game.currentChallenge.defender.anyCardsInPlay(
            (card) => card.getType() === 'character' && card.hasTrait('King')
        );
    }
}

KingsmootClaimant.code = '27517';
KingsmootClaimant.version = '1.0.0';

export default KingsmootClaimant;
