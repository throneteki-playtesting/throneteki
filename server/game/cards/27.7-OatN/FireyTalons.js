import DrawCard from '../../drawcard.js';

class FireyTalons extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Give character -1 STR',
            location: 'hand',
            phase: 'challenge',
            cost: [
                ability.costs.expendEvent(),
                ability.costs.kneel(
                    (card) => card.hasTrait("R'hllor") && card.getType() === 'character'
                )
            ],
            target: {
                cardCondition: (card) =>
                    card.location === 'play area' &&
                    card.getType() === 'character' &&
                    card.isParticipating()
            },
            message:
                '{player} kneels {costs.kneel} to give {target} -1 STR until the end of the phase, placing it in shadows if its STR is 0',
            handler: (context) => {
                this.untilEndOfPhase((ability) => ({
                    match: context.target,
                    effect: ability.effects.putInShadowsByStrength(-1)
                }));
            }
        });
    }
}

FireyTalons.code = '27511';
FireyTalons.version = '1.0.1';

export default FireyTalons;
