import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class EyesOfTheWolf extends DrawCard {
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
                    card.getType() === 'character'
            },
            message:
                '{player} plays {source} and kneels {costs.kneel} to stand {target} and have it gain each of its challenge icons until the end of the phase',
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.simultaneously(
                        GameActions.standCard((context) => ({ card: context.target })),
                        GameActions.genericHandler((context) => {
                            this.untilEndOfPhase((ability) => ({
                                match: context.target,
                                effect: context.costs.kneel
                                    .getIcons()
                                    .map((icon) => ability.effects.addIcon(icon))
                            }));
                        })
                    ),
                    context
                );
            }
        });
    }
}

EyesOfTheWolf.code = '27572';
EyesOfTheWolf.version = '1.0.0';

export default EyesOfTheWolf;
