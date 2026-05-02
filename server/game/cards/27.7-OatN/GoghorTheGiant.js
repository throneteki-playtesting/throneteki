import DrawCard from '../../drawcard.js';
class GoghorTheGiant extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: () =>
                this.controller.anyCardsInPlay(
                    (card) =>
                        card.parent === this &&
                        card.getType() === 'attachment' &&
                        card.hasTrait('Weapon')
                ),
            match: this,
            effect: [ability.effects.modifyStrength(2), ability.effects.addKeyword('intimidate')]
        });
    }
}

GoghorTheGiant.code = '27575';
GoghorTheGiant.version = '1.0.0';

export default GoghorTheGiant;
