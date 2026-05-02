import DrawCard from '../../drawcard.js';

class DrapedInSeaweed extends DrawCard {
    setupCardAbilities(ability) {
        this.attachmentRestriction({ trait: 'Drowned God' });

        this.interrupt({
            canCancel: true,
            when: {
                onCharacterKilled: (event) =>
                    event.card.controller === this.controller &&
                    event.card.canBeSaved() &&
                    event.allowSave
            },
            cost: ability.costs.killParent(),
            handler: (context) => {
                context.event.saveCard();
                this.game.addMessage(
                    '{0} uses {1} and kills {2} to save {3}',
                    context.player,
                    this,
                    context.costs.kill,
                    context.event.card
                );
            }
        });
    }
}

DrapedInSeaweed.code = '27520';
DrapedInSeaweed.version = '1.0.0';

export default DrapedInSeaweed;
