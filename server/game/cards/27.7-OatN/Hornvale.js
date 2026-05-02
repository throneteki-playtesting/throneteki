import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class Hornvale extends DrawCard {
    constructor(owner, cardData) {
        super(owner, cardData);

        this.registerEvents([{ 'onCardLeftPlay:forcedinterrupt': 'onCardLeftPlay' }]);
    }

    setupCardAbilities(ability) {
        this.reaction({
            when: {
                afterChallenge: (event) =>
                    event.challenge.attackingPlayer === this.controller &&
                    event.challenge.winner === this.controller
            },
            cost: ability.costs.kneelSelf(),

            target: {
                choosingPlayer: (player, context) => player === context.event.challenge.loser,
                activePromptTitle: 'Select a card',
                cardCondition: { location: 'hand', controller: 'choosingPlayer' }
            },
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.placeCardUnderneath({
                        card: event.card,
                        parentCard: this,
                        facedown: true
                    }),
                    context
                );
            }
        });
    }

    onCardLeftPlay(event) {
        if (event.card !== this || this.underneath.length === 0) {
            return;
        }

        this.game.resolveGameAction(
            GameActions.simultaneously(
                ...this.underneath.map((card) => GameActions.returnCardToHand({ card }))
            )
        );

        this.game.addMessage(
            '{0} returns {1} to their owners hands',
            this.controller,
            this.underneath
        );
    }
}

Hornvale.code = '27533';
Hornvale.version = '1.0.0';

export default Hornvale;
