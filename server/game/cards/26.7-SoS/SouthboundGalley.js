import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class SouthboundGalley extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                onCardOutOfShadows: (event) => event.card === this
            },
            chooseOpponent: true,
            message: '{player} uses {source} to choose {opponent} and name a card',
            handler: (context) => {
                this.game.promptForCardName({
                    player: context.player,
                    onSelect: (player, cardName) => this.selectCardName(cardName, context),
                    source: context.source
                });
            }
        });
    }

    selectCardName(cardName, context) {
        this.game.addMessage('{0} names {1}', cardName);
        this.game.resolveGameAction(
            GameActions.revealTopCards((context) => ({
                player: context.player
            })).then({
                condition: (context) => context.event.cards[0].name === cardName,
                message: '{player} {gameAction}',
                gameAction: GameActions.simultaneously([
                    GameActions.putIntoPlay((context) => ({
                        card: context.event.cards[0],
                        player: context.player
                    })),
                    GameActions.genericHandler((context) => {
                        this.untilEndOfPhase((ability) => ({
                            match: context.event.cards[0],
                            effect: ability.effects.takeControl(this.controller)
                        }));
                    })
                ])
            }),
            context
        );
    }
}

SouthboundGalley.code = '26522';
SouthboundGalley.version = '1.0.0';

export default SouthboundGalley;
