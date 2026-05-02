import DrawCard from '../../drawcard.js';

class SonsOfTheHarpy extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                onCardOutOfShadows: (event) => event.card === this
            },
            target: {
                cardCondition: {
                    location: 'play area',
                    type: 'character',
                    participating: true
                },
                gameAction: 'decreaseStrength'
            },
            message: '{player} uses {source} to give {target} -2 STR until the end of the phase',
            handler: (context) => {
                this.untilEndOfPhase((ability) => ({
                    match: context.target,
                    effect: ability.effects.modifyStrength(-2)
                }));
            }
        });
    }
}

SonsOfTheHarpy.code = '27578';
SonsOfTheHarpy.version = '1.0.0';

export default SonsOfTheHarpy;
