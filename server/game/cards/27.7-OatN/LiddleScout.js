import DrawCard from '../../drawcard.js';

class LiddleScout extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: () => this.isAttacking(),
            match: (card) => card.getType() === 'character' && card.isShadow(),
            targetController: 'any',
            effect: ability.effects.cannotBeDeclaredAsDefender()
        });
    }
}

LiddleScout.code = '27565';
LiddleScout.version = '1.0.1';

export default LiddleScout;
