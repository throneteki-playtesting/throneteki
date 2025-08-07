import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class OrkmontElite extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                onCardDiscarded: (event) =>
                    event.isPillage &&
                    event.source === this &&
                    event.card.getType() === 'attachment'
            },
            target: {
                activePromptTitle: 'Select an attachment',
                cardCondition: (card, context) => this.cardCondition(card, context)
            },
            message: {
                format: "{player} uses {source} to put {target} into play from their opponent's discard pile",
                args: { attachment: (context) => context.event.card }
            },
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.putIntoPlay((context) => ({
                        player: context.player,
                        card: context.target
                    })),
                    context
                );
            }
        });
    }

    cardCondition(card, context) {
        return (
            card.controller !== context.player &&
            card.getType() === 'attachment' &&
            card.location === 'discard pile' &&
            this.controller.canPutIntoPlay(card)
        );
    }
}

OrkmontElite.code = '26516';
OrkmontElite.version = '1.0.1';

export default OrkmontElite;
