import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class DragonglassMine extends DrawCard {
    // Dragonglass Mine (27509)
    // Challenges Action: If you have 5 or more power on your faction card, kneel Dragonglass Mine
    // to choose a character you control. Until the end of the phase, that character is immune to
    // opponent's character abilities.
    setupCardAbilities(ability) {
        this.action({
            title: 'Grant Immunity',
            cost: ability.costs.kneelSelf(),
            phase: 'challenge',
            condition: (context) => context.player.faction.power >= 5,
            target: {
                cardCondition: (card, context) =>
                    card.location === 'play area' &&
                    card.getType() === 'character' &&
                    card.controller === context.player,
                gameAction: GameActions.lastingEffect((context) => ({
                    duration: 'untilEndOfPhase',
                    match: context.target,
                    effect: ability.effects.immuneTo(
                        (card, _abilityContext, effectContext) =>
                            card.controller !== effectContext.source.controller &&
                            card.getType() === 'character'
                    )
                }))
            },
            message:
                '{player} kneels {costs.kneel} to grant {target} immunity to opponent character abilities until the end of the phase'
        });
    }
}

DragonglassMine.code = '27509';
DragonglassMine.version = '1.0.1';

export default DragonglassMine;
