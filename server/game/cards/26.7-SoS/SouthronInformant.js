import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class SouthronInformant extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                onCardEntersPlay: (event) =>
                    event.card === this && this.game.currentPhase === 'challenge'
            },
            chooseOpponent: true,
            message: '{player} uses {source} to give control of {source} to {opponent}',
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.takeControl({ card: this, player: context.opponent }).then({
                        message: {
                            format: "Then, {player} discards 1 card at random from {opponent}'s hand and draws 1 card",
                            args: { opponent: (context) => context.opponent }
                        },
                        gameAction: GameActions.simultaneously((context) => [
                            GameActions.discardAtRandom({
                                player: context.parentContext.opponent,
                                amount: 1
                            }),
                            GameActions.drawCards({ player: context.player, amount: 1 })
                        ])
                    }),
                    context
                );
            }
        });
    }
}

SouthronInformant.code = '26542';
SouthronInformant.version = '1.0.1';

export default SouthronInformant;
