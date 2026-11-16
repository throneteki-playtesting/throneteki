import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class EyesOfTheWolf extends DrawCard {
    // Eyes of the Wolf (27572)
    // Challenges Action: Kneel a non-Direwolf character to choose and stand a Direwolf character.
    // Until the end of the phase, it gains each challenge icon the knelt character has.
    setupCardAbilities(ability) {
        this.action({
            title: 'Stand and give Direwolf icon',
            cost: ability.costs.kneel(
                (card) => card.getType() === 'character' && !card.hasTrait('Direwolf')
            ),
            target: {
                cardCondition: (card) =>
                    card.location === 'play area' &&
                    card.hasTrait('Direwolf') &&
                    card.getType() === 'character',
                gameAction: GameActions.simultaneously([
                    GameActions.standCard((context) => ({ card: context.target })),
                    GameActions.lastingEffect((context) => ({
                        duration: 'untilEndOfPhase',
                        match: context.target,
                        effect: context.costs.kneel
                            .getIcons()
                            .map((icon) => ability.effects.addIcon(icon))
                    }))
                ])
            },
            message:
                '{player} plays {source} and kneels {costs.kneel} to stand {target} and have it gain each of its challenge icons until the end of the phase'
        });
    }
}

EyesOfTheWolf.code = '27572';
EyesOfTheWolf.version = '1.0.0';

export default EyesOfTheWolf;
