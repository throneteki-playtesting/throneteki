import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class PrayingForLoras extends DrawCard {
    // Praying for Loras (27596)
    // Play only if you control a Lady character.
    // Challenges Action: Choose a unique [tyrell] character in your dead pile and shuffle it into
    // your deck. If it is a Knight character, you may put it into play knelt instead. (Max 1 per
    // round.)
    setupCardAbilities(ability) {
        this.action({
            title: 'Shuffle or return a unique Tyrell character',
            phase: 'challenge',
            condition: (context) =>
                context.player.anyCardsInPlay({ type: 'character', trait: 'Lady' }),
            max: ability.limit.perRound(1),
            target: {
                cardCondition: (card, context) =>
                    card.location === 'dead pile' &&
                    card.controller === context.player &&
                    card.getType() === 'character' &&
                    card.isUnique() &&
                    card.isFaction('tyrell')
            },
            message: '{player} plays {source} to choose {target}',
            gameAction: GameActions.ifCondition({
                condition: (context) => context.target.hasTrait('Knight'),
                thenAction: GameActions.choose({
                    choices: {
                        'Shuffle into deck': {
                            message: '{player} shuffles {target} into their deck',
                            gameAction: GameActions.shuffleIntoDeck((context) => ({
                                cards: [context.target]
                            }))
                        },
                        'Put into play knelt': {
                            message: '{player} puts {target} into play knelt',
                            gameAction: GameActions.putIntoPlay((context) => ({
                                card: context.target,
                                kneeled: true
                            }))
                        }
                    }
                }),
                elseAction: GameActions.shuffleIntoDeck((context) => ({
                    cards: [context.target]
                }))
            })
        });
    }
}

PrayingForLoras.code = '27596';
PrayingForLoras.version = '1.0.0';

export default PrayingForLoras;
