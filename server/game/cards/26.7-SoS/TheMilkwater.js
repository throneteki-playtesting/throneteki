import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class TheMilkwater extends DrawCard {
    setupCardAbilities(ability) {
        this.plotModifiers({
            initiative: 1
        });
        this.reaction({
            when: {
                onPhaseBegins: () => true
            },
            cost: [ability.costs.kneelSelf(), ability.costs.sacrificeSelf()],
            message:
                '{player} kneels and sacrifices {costs.sacrifice} to have each character lose all keywords and immunities until the end of the phase',
            gameAction: GameActions.genericHandler(() => {
                this.untilEndOfPhase((ability) => ({
                    targetController: 'any',
                    match: this.game.filterCardsInPlay((card) => card.getType() === 'character'),
                    effect: [
                        ability.effects.losesAllKeywords(),
                        ability.effects.losesAllImmunities()
                    ]
                }));
            })
        });
    }
}

TheMilkwater.code = '26607';
TheMilkwater.version = '1.0.0';

export default TheMilkwater;
