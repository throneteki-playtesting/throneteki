// Generated with Claude Code - claude-opus-4-5-20250101
// - 2026-02-01: Created implementation for Sigorn

import DrawCard from '../../drawcard.js';

class Sigorn extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: () => this.controlsLadyCharacter(),
            match: this,
            effect: [ability.effects.addTrait("R'hllor"), ability.effects.addKeyword('renown')]
        });

        this.persistentEffect({
            condition: () => !this.kneeled && this.hasOtherAttackingWildling(),
            match: this,
            effect: ability.effects.consideredToBeAttacking()
        });
    }

    controlsLadyCharacter() {
        return this.controller.anyCardsInPlay(
            (card) => card.getType() === 'character' && card.hasTrait('Lady')
        );
    }

    hasOtherAttackingWildling() {
        return this.controller.anyCardsInPlay(
            (card) =>
                card.isAttacking() &&
                card.hasTrait('Wildling') &&
                card.getType() === 'character' &&
                card !== this
        );
    }
}

Sigorn.code = '27598';
Sigorn.version = '1.0.0';

export default Sigorn;
