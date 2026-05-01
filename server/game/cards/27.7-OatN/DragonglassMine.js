import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class DragonglassMine extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Grant Immunity',
            cost: ability.costs.kneelSelf(),
            phase: 'challenge',
            condition: (context) => context.player.faction.power >= 5,
            target: {
                cardCondition: {
                    type: 'character',
                    participating: true
                }
            },
            message:
                '{player} kneels {costs.kneel} to grant {target} immunity to opponents character abilities until the end of the challenge',
            handler: (context) => {
                this.untilEndOfChallenge((ability) => ({
                    match: context.target,
                    effect: ability.effects.immuneTo(
                        (card) =>
                            card.controller !== this.controller && card.getType() === 'character'
                    )
                }));
            }
        });
    }
}

DragonglassMine.code = '27509';
DragonglassMine.version = '1.0.0';

export default DragonglassMine;
