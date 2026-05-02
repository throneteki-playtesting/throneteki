import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class WhoresbaneUmber extends DrawCard {
    setupCardAbilities() {
        this.forcedReaction({
            when: {
                afterChallenge: (event) =>
                    event.challenge.winner === this.controller && this.isParticipating()
            },
            message: {
                format: '{player} is forced to discard the top {amount} cards of their deck for {source}',
                args: { amount: (context) => context.player.getNumberOfUsedPlots() }
            },
            gameAction: GameActions.discardTopCards((context) => ({
                player: context.player,
                amount: context.player.getNumberOfUsedPlots()
            }))
        });
    }
}

WhoresbaneUmber.code = '27563';
WhoresbaneUmber.version = '1.0.0';

export default WhoresbaneUmber;
