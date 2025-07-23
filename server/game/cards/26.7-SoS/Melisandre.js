import DrawCard from '../../drawcard.js';

class Melisandre extends DrawCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                afterChallenge: (event) =>
                    event.challenge.winner === this.controller &&
                    this.controller.anyCardsInPlay({ participating: true, shadow: true })
            },
            target: {
                cardCondition: (card) =>
                    card.location === 'play area' && card.getType() === 'character'
            },
            limit: ability.limit.perPhase(3),
            message: '{player} uses {source} to give {target} -1 STR until the end of the phase',
            handler: (context) => {
                this.untilEndOfPhase((ability) => ({
                    match: context.target,
                    effect: ability.effects.putInShadowsByStrength(-1)
                }));
            }
        });
    }
}

Melisandre.code = '26501';
Melisandre.version = '1.2.0';

export default Melisandre;
