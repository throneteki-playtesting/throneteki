import DrawCard from '../../drawcard.js';

class PurpleGraces extends DrawCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onChallengeInitiated: (event) => event.challenge.challengeType === 'military'
            },
            cost: ability.costs.kneelSelf(),
            target: {
                cardCondition: (card) =>
                    card.location === 'play area' &&
                    card.getType() === 'character' &&
                    card.isAttacking()
            },
            message: '{player} kneels {costs.kneel} to give {target} -2 STR until end of phase',
            handler: (context) => {
                this.untilEndOfPhase((ability) => ({
                    match: context.target,
                    effect: ability.effects.modifyStrength(-2)
                }));
            }
        });
    }
}

PurpleGraces.code = '27577';
PurpleGraces.version = '1.1.0';

export default PurpleGraces;
