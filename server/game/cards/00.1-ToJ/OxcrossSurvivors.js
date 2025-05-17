import DrawCard from '../../drawcard.js';

class OxcrossSurvivors extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: () =>
                this.controller.anyCardsInPlay({
                    type: 'character',
                    trait: ['Lord', 'Commander']
                }),
            match: this,
            effect: [ability.effects.modifyStrength(3), ability.effects.addKeyword('Assault')]
        });
    }
}

OxcrossSurvivors.code = '00164';

export default OxcrossSurvivors;
