const AgendaCard = require('../../agendacard');
const GameActions = require('../../GameActions');

class TheGoldPrice extends AgendaCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                onCardDiscarded: event => event.card.getType() === 'character' && event.card.owner !== this.controller && event.originalLocation === 'hand' && event.isRandom
            },
            message: {
                format: '{player} uses {source} to put {card} into play under their control',
                args: { card: context => context.event.card }
            },
            gameAction: GameActions.putIntoPlay(context => ({ player: context.player, card: context.event.card }))
                .thenExecute(event => {
                    let context = this.game.currentAbilityContext;
                    this.game.once('onAtEndOfPhase', () => {
                        if(['play area', 'duplicate'].includes(event.card.location)) {
                            const prompt = new PayOrSacrificePrompt({
                                card: event.card,
                                game: this.game,
                                player: context.player,
                                source: context.source
                            });
                            prompt.resolve();
                        }
                    });
                })
        });
    }
}
class PayOrSacrificePrompt {
    constructor({ card, player, game, source }) {
        this.card = card;
        this.player = player;
        this.game = game;
        this.source = source;
    }

    resolve() {
        if(this.player.getSpendableGold() >= this.card.getPrintedCost()) {
            this.game.promptWithMenu(this.player, this, {
                activePrompt: {
                    menuTitle: `Keep ${this.card.name}?`,
                    buttons: [
                        { text: `Pay ${this.card.getPrintedCost()} gold`, method: 'resolvePay' },
                        { text: 'Sacrifice', method: 'resolveSacrifice' }
                    ]
                },
                source: this.source
            });
        } else {
            this.resolveSacrifice();
        }
    }

    resolvePay() {
        this.game.addMessage('{0} pays {1} to keep {2} for {3}', this.player, this.card.getPrintedCost(), this.card, this.source);
        this.game.spendGold({ amount: this.card.getPrintedCost(), player: this.player });
        return true;
    }

    resolveSacrifice() {
        this.game.addMessage('{0} sacrifices {1} for {2}', this.player, this.card, this.source);
        this.game.resolveGameAction(GameActions.sacrificeCard({ card: this.card }));
        return true;
    }
}

TheGoldPrice.code = '25619';
TheGoldPrice.version = '1.1';

module.exports = TheGoldPrice;
