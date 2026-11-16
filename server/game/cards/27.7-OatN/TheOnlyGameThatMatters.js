import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class TheOnlyGameThatMatters extends DrawCard {
    // The Only Game That Matters (27536)
    // Challenges Action: Choose a defending character without an [intrigue] icon. That character
    // does not contribute is STR to this challenge.
    setupCardAbilities(ability) {
        this.action({
            title: 'Remove character STR',
            phase: 'challenge',
            target: {
                cardCondition: (card) =>
                    card.location === 'play area' &&
                    card.getType() === 'character' &&
                    card.isDefending() &&
                    !card.hasIcon('intrigue'),
                gameAction: GameActions.lastingEffect((context) => ({
                    duration: 'untilEndOfChallenge',
                    match: context.target,
                    effect: ability.effects.doesNotContributeStrength()
                }))
            },
            message: '{player} plays {source} to remove the STR of {target} from the challenge'
        });
    }
}

TheOnlyGameThatMatters.code = '27536';
TheOnlyGameThatMatters.version = '1.0.0';

export default TheOnlyGameThatMatters;
