import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class TheMermansShield extends DrawCard {
    // The Merman's Shield (27564)
    // Shadow (4).
    // Reaction: After The Merman's Shield comes out of shadows, choose and stand a character that
    // shares a Trait with it. If that character is defending, it gains renown until the end of the
    // phase.
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onCardOutOfShadows: (event, context) => event.card === context.source
            },
            target: {
                cardCondition: (card, context) =>
                    card !== context.source &&
                    card.location === 'play area' &&
                    card.getType() === 'character' &&
                    context.source.getTraits().some((trait) => card.hasTrait(trait)),
                gameAction: GameActions.simultaneously([
                    GameActions.standCard((context) => ({ card: context.target })),
                    GameActions.ifCondition({
                        condition: (context) => context.target.isDefending(),
                        thenAction: GameActions.lastingEffect((context) => ({
                            duration: 'untilEndOfPhase',
                            match: context.target,
                            effect: ability.effects.addKeyword('renown')
                        }))
                    })
                ])
            },
            message: '{player} uses {source} to stand {target}'
        });
    }
}

TheMermansShield.code = '27564';
TheMermansShield.version = '1.1.1';

export default TheMermansShield;
