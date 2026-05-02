import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class RiverrunBesiegers extends DrawCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onCardPowerGained: (event) =>
                    event.card.getType() === 'character' && event.card.controller.faction.power > 0
            },
            limit: ability.limit.perRound(2),
            handler: (context) => {
                this.context = context;
                const player = context.event.card.controller;
                if (player.hand.length < 1) {
                    this.discardPowerFromFaction();
                    return;
                }

                this.game.promptWithMenu(player, this, {
                    activePrompt: {
                        menuTitle: `Discard a card for ${context.source.name}?`,
                        buttons: [
                            { text: 'Yes', method: 'promptToDiscard' },
                            { text: 'No', method: 'discardPowerFromFaction' }
                        ]
                    },
                    source: this
                });
            }
        });
    }

    promptToDiscard(player) {
        this.game.promptForSelect(player, {
            activePrompt: 'Select a card',
            cardCondition: (card) => card.controller === player && card.location === 'hand',
            onSelect: (player, card) => this.discardSelectedCards(player, card),
            onCancel: () => this.discardPowerFromFaction(),
            source: this
        });
        return true;
    }

    discardSelectedCards(player, card) {
        this.game.addMessage('{0} discards {1} from their hand', player, card);
        this.game.resolveGameAction(GameActions.discardCard({ card }));
        return true;
    }

    discardPowerFromFaction() {
        const player = this.context.event.card.controller;
        this.game.resolveGameAction(GameActions.discardPower({ card: player.faction, amount: 1 }));
        this.game.addMessage('{0} discards 1 power from their faction card', player);
        return true;
    }
}

RiverrunBesiegers.code = '27528';
RiverrunBesiegers.version = '1.0.0';

export default RiverrunBesiegers;
