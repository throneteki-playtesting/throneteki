import DrawCard from '../../drawcard.js';

class RedwyneMerchanter extends DrawCard {
    setupCardAbilities() {
        this.plotModifiers({
            gold: 1
        });
        this.reaction({
            when: {
                onCardOutOfShadows: (event) => event.card === this
            },
            target: {
                cardCondition: {
                    location: 'play area',
                    type: 'character'
                }
            },
            message: '{player} uses {source} to give +2 STR to {target} until the end of the phase',
            handler: (context) => {
                this.untilEndOfPhase((ability) => ({
                    match: context.target,
                    effect: ability.effects.modifyStrength(2)
                }));
            }
        });
    }
}

RedwyneMerchanter.code = '26594';
RedwyneMerchanter.version = '1.1.2';

export default RedwyneMerchanter;
