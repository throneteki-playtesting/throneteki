import DrawCard from '../../drawcard.js';

class DragonglassMine extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Grant Immunity',
            cost: ability.costs.kneelSelf(),
            phase: 'challenge',
            condition: (context) => context.player.faction.power >= 5,
            target: {
                cardCondition: (card) =>
                    card.location === 'play area' &&
                    card.getType() === 'character' &&
                    card.controller === this.controller
            },
            message:
                '{player} kneels {costs.kneel} to grant {target} immunity to opponents character abilities until the end of the phase',
            handler: (context) => {
                this.untilEndOfPhase((ability) => ({
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
DragonglassMine.version = '1.0.1';

export default DragonglassMine;
