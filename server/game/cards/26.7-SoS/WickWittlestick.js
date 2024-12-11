import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class WickWittlestick extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                onCardOutOfShadows: (event) =>
                    event.card === this &&
                    this.controller.anyCardsInPlay({ type: 'character', participating: true })
            },
            target: {
                choosingPlayer: 'each',
                cardCondition: (card, context) =>
                    card.location === 'play area' &&
                    card.controller === context.choosingPlayer &&
                    card.getType() === 'character' &&
                    card.isParticipating()
            },
            message: '{player} uses {source} to sacrifice {target}',
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.simultaneously(
                        context.target.map((card) => GameActions.sacrificeCard({ card }))
                    ),
                    context
                );
            }
        });
    }
}

WickWittlestick.code = '26551';
WickWittlestick.version = '1.0.0';

export default WickWittlestick;
