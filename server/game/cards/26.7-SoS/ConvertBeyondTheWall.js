import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class ConvertBeyondTheWall extends DrawCard {
    constructor(owner, cardData) {
        super(owner, cardData);

        this.registerEvents(['onCardEntersPlay', 'onCardLeftPlay']);
    }

    onCardEntersPlay(event) {
        if (event.card === this) {
            this.checkSacrifice();
        }
    }

    onCardLeftPlay(event) {
        if (event.card.controller === this.controller) {
            this.checkSacrifice();
        }
    }

    checkSacrifice() {
        if (
            !this.controller.anyCardsInPlay(
                (card) =>
                    card.getType() === 'character' &&
                    card !== this &&
                    (card.hasTrait('Wildling') || card.name === 'Jon Snow')
            )
        ) {
            this.game.addMessage(
                '{0} is forced to sacrifice {1} as they control no other Wildlings or Jon Snow',
                this.controller,
                this
            );
            this.game.resolveGameAction(GameActions.sacrificeCard({ card: this }));
        }
    }
}

ConvertBeyondTheWall.code = '26554';
ConvertBeyondTheWall.version = '1.0.0';

export default ConvertBeyondTheWall;
