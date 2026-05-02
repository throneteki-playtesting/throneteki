// Generated with Claude Code - claude-opus-4-5-20250101
// - 2026-02-01: Created implementation for Hot Pie
// - 2026-02-28: Refactored to use message:

import DrawCard from '../../drawcard.js';

class HotPie extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Give STR bonus based on keywords',
            phase: 'challenge',
            cost: ability.costs.kneelSelf(),
            target: {
                cardCondition: (card) =>
                    card.location === 'play area' &&
                    card.getType() === 'character' &&
                    (!card.isLoyal() || card.name === 'Arya Stark')
            },
            message: {
                format: '{player} uses {source} to give {target} +{keywords} STR until the end of the phase',
                args: { keywords: (context) => context.target.getKeywords().length }
            },
            handler: (context) => {
                this.untilEndOfPhase((ability) => ({
                    match: context.target,
                    effect: ability.effects.dynamicStrength((card) => card.getKeywords().length)
                }));
            }
        });
    }
}

HotPie.code = '27599';
HotPie.version = '1.0.0';

export default HotPie;
