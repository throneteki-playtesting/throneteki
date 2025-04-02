import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class QartheenGalleas extends DrawCard {
    setupCardAbilities(ability) {
        // TODO: If this ability is released, probably worth a proper check of all abilities it affects & maybe a proper implement.
        // Notably, it should affect anything which counts/compares hand size, but nothing which interacts with cards in hand
        this.persistentEffect({
            targetController: 'current',
            effect: ability.effects.modifyHandCount(-1)
        });
        this.reaction({
            when: {
                onCardOutOfShadows: (event) => event.card === this
            },
            target: {
                cardCondition: {
                    location: 'discard pile',
                    controller: 'current',
                    condition: (card) => card.isShadow()
                }
            },
            message:
                '{player} uses {source} to return {target} to their hand from their discard pile',
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.returnCardToHand((context) => ({ card: context.target })),
                    context
                );
            }
        });
    }
}

QartheenGalleas.code = '26582';
QartheenGalleas.version = '1.1.1';

export default QartheenGalleas;
