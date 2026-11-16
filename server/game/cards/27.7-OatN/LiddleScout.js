import DrawCard from '../../drawcard.js';

class LiddleScout extends DrawCard {
    // Liddle Scout (27565)
    // Stealth.
    // While Liddle Scout is attacking, each character with shadow cannot be declared as a defender.
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: (context) => context.source.isAttacking(),
            match: (card) => card.getType() === 'character' && card.isShadow(),
            targetController: 'any',
            effect: ability.effects.cannotBeDeclaredAsDefender()
        });
    }
}

LiddleScout.code = '27565';
LiddleScout.version = '1.0.1';

export default LiddleScout;
