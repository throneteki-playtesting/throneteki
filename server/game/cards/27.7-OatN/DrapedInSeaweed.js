import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class DrapedInSeaweed extends DrawCard {
    // Draped in Seaweed (27520)
    // Drowned God character only.
    // Interrupt: When a character you control is killed, kill attached character to save it.
    setupCardAbilities(ability) {
        this.attachmentRestriction({ trait: 'Drowned God' });

        this.interrupt({
            canCancel: true,
            when: {
                onCharacterKilled: (event, context) =>
                    event.card.controller === context.player &&
                    event.card.canBeSaved() &&
                    event.allowSave
            },
            cost: ability.costs.killParent(),
            message: {
                format: '{player} uses {source} and kills {costs.kill} to save {saved}',
                args: { saved: (context) => context.event.card }
            },
            gameAction: GameActions.saveCard((context) => ({ event: context.event }))
        });
    }
}

DrapedInSeaweed.code = '27520';
DrapedInSeaweed.version = '1.0.0';

export default DrapedInSeaweed;
