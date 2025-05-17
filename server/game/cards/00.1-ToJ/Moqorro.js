import DrawCard from '../../drawcard.js';

class Moqorro extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                onCardOutOfShadows: (event) => event.card === this
            },
            target: {
                cardCondition: { location: 'play area', type: 'character' }
            },
            message:
                '{player} uses {source} to to give {target} an intrigue icon and stealth until the end of the phase',
            handler: (context) => {
                this.untilEndOfPhase((ability) => ({
                    match: context.target,
                    effect: [
                        ability.effects.addIcon('intrigue'),
                        ability.effects.addKeyword('stealth')
                    ]
                }));
            }
        });
    }
}

Moqorro.code = '00135';
Moqorro.version = '1.0.0';

export default Moqorro;
