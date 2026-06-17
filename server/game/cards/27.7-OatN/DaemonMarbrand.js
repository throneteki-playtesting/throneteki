import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class DaemonMarbrand extends DrawCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onCardDiscarded: (event) =>
                    event.card.getType() === 'character' &&
                    event.cardStateWhenDiscarded.controller !== this.controller &&
                    event.cardStateWhenDiscarded.location === 'hand'
            },
            limit: ability.limit.perPhase(2),
            message: {
                format: '{player} uses {source} to force {opponent} to return a character to their hand',
                args: { opponent: (context) => context.event.cardStateWhenDiscarded.controller }
            },
            handler: (context) => {
                const opponent = context.event.cardStateWhenDiscarded.controller;
                const eligibleCards = this.game.filterCardsInPlay(
                    (card) => card.getType() === 'character' && card.controller === opponent
                );
                if (eligibleCards.length === 0) {
                    return;
                }
                this.game.promptForSelect(opponent, {
                    activePromptTitle: 'Select a character to return to hand',
                    source: this,
                    cardCondition: (card) =>
                        card.location === 'play area' &&
                        card.getType() === 'character' &&
                        card.controller === opponent,
                    onSelect: (player, card) => {
                        this.game.resolveGameAction(GameActions.returnCardToHand({ card }));
                        this.game.addMessage('{0} returns {1} to their hand', player, card);
                        return true;
                    },
                    onCancel: () => true
                });
            }
        });
    }
}

DaemonMarbrand.code = '27525';
DaemonMarbrand.version = '1.0.1';

export default DaemonMarbrand;
