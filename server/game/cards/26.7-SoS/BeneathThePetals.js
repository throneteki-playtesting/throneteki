import DrawCard from '../../drawcard.js';

class BeneathThePetals extends DrawCard {
    setupCardAbilities(ability) {
        this.interrupt({
            location: ['hand', 'shadows'],
            when: {
                onCardRevealed: (event) =>
                    event.card == this && ['draw deck', 'hand'].includes(event.card.location)
            },
            target: {
                cardCondition: {
                    location: 'play area',
                    type: 'character'
                }
            },
            message: '{player} plays {source} to give {target} +3 STR and stealth',
            handler: (context) => {
                this.untilEndOfPhase((ability) => ({
                    match: context.target,
                    effect: [
                        ability.effects.modifyStrength(3),
                        ability.effects.addKeyword('stealth')
                    ]
                }));
            },
            max: ability.limit.perPhase(1)
        });
    }
}

BeneathThePetals.code = '26595';
BeneathThePetals.version = '1.0.0';

export default BeneathThePetals;
