import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class HotPie extends DrawCard {
    // Hot Pie (27599)
    // Challenges Action: Kneel Hot Pie to choose a non-loyal character or Arya Stark. Until the end
    // of the phase, that character gets +1 STR for each keyword it has.
    setupCardAbilities(ability) {
        this.action({
            title: 'Give STR bonus based on keywords',
            phase: 'challenge',
            cost: ability.costs.kneelSelf(),
            target: {
                cardCondition: (card) =>
                    card.location === 'play area' &&
                    card.getType() === 'character' &&
                    (!card.isLoyal() || card.name === 'Arya Stark'),
                gameAction: GameActions.lastingEffect((context) => ({
                    duration: 'untilEndOfPhase',
                    match: context.target,
                    effect: ability.effects.dynamicStrength((card) => card.getKeywords().length)
                }))
            },
            message: {
                format: '{player} uses {source} to give {target} +{keywords} STR until the end of the phase',
                args: { keywords: (context) => context.target.getKeywords().length }
            }
        });
    }
}

HotPie.code = '27599';
HotPie.version = '1.0.0';

export default HotPie;
