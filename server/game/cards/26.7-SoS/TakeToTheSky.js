import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class TakeToTheSky extends DrawCard {
    setupCardAbilities() {
        const allowTrigger = (event) =>
            event.allowSave &&
            event.card.isMatch({ trait: ['Dragon', 'Stormborn'] }) &&
            event.card.controller.anyCardsInPlay({ trait: 'Dragon' });

        this.interrupt({
            canCancel: true,
            when: {
                onCharacterKilled: allowTrigger,
                onCardDiscarded: (event) =>
                    event.card.location == 'play area' && allowTrigger(event)
            },
            message: {
                format: '{player} plays {source} to save {card} and return it to hand',
                args: { card: (context) => context.event.card }
            },
            gameAction: GameActions.simultaneously((context) => [
                GameActions.genericHandler(() => {
                    context.event.saveCard();
                }),
                GameActions.returnCardToHand({
                    card: context.event.card
                })
            ])
        });
    }
}

TakeToTheSky.code = '26583';
TakeToTheSky.version = '1.0.0';

export default TakeToTheSky;
