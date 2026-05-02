import DrawCard from '../../drawcard.js';

class LordOfWinterfell extends DrawCard {
    setupCardAbilities(ability) {
        this.attachmentRestriction({ faction: 'stark', trait: 'Lord' });
        this.interrupt({
            canCancel: true,
            when: {
                onCharacterKilled: (event) =>
                    event.card === this.parent && this.parent.canBeSaved() && event.allowSave
            },
            cost: [
                ability.costs.kneelSelf(),
                ability.costs.sacrifice(
                    (card) =>
                        card.getType() === 'character' &&
                        card.isFaction('stark') &&
                        card !== this.parent
                )
            ],
            message: {
                format: '{player} kneels {costs.kneel} and sacrifices {costs.sacrifice} to save {parent}',
                args: { parent: () => this.parent }
            },
            handler: (context) => {
                context.event.saveCard();
            }
        });
    }
}

LordOfWinterfell.code = '27568';
LordOfWinterfell.version = '1.0.0';

export default LordOfWinterfell;
