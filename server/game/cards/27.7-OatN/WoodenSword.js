// Generated with Claude Code - claude-opus-4-5-20250101
// - 2026-02-01: Created implementation for Wooden Sword

import DrawCard from '../../drawcard.js';

class WoodenSword extends DrawCard {
    setupCardAbilities(ability) {
        this.whileAttached({
            effect: ability.effects.modifyStrength(1)
        });

        this.persistentEffect({
            condition: () => this.parent && this.parent.isParticipating(),
            match: (card) =>
                card.isParticipating() &&
                card.getType() === 'character' &&
                !this.hasPrintedChallengeIcon(card),
            targetController: 'any',
            effect: ability.effects.doesNotContributeStrength()
        });
    }

    hasPrintedChallengeIcon(card) {
        if (!this.game.currentChallenge) {
            return false;
        }
        let challengeType = this.game.currentChallenge.challengeType;
        return card.getPrintedIcons().includes(challengeType);
    }
}

WoodenSword.code = '27604';
WoodenSword.version = '1.0.0';

export default WoodenSword;
