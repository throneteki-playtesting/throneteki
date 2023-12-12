const AgendaCard = require('../../agendacard');
const GameActions = require('../../GameActions');
const { Tokens } = require('../../Constants');

class TheGiftOfMercy extends AgendaCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                afterChallenge: event => event.challenge.winner === this.controller
            },
            target: {
                cardCondition: { type: 'character', location: 'play area', condition: (card, context) => card.controller === context.event.challenge.loser }
            },
            message: '{player} uses {source} to place a Valar Morghulis token on {target}',
            handler: context => {
                this.game.resolveGameAction(GameActions.placeToken(context => ({ card: context.target, token: Tokens.valarmorghulis })), context);
            }
        });

        this.interrupt({
            when: {
                onCardLeftPlay: event => event.card.getType() === 'character' && event.card.tokens[Tokens.valarmorghulis] >= 3
            },
            message: {
                format: '{player} uses {source} to gain 2 power for their faction from {card} leaving play',
                args: { card: context => context.event.card }
            },
            gameAction: GameActions.gainPower(context => ({ card: context.player.faction, amount: 2 }))
        });
    }
}

TheGiftOfMercy.code = '25618';
TheGiftOfMercy.version = '1.3';

module.exports = TheGiftOfMercy;
