import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class DeepwoodMotte extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                onCardKneeled: (event) =>
                    event.source.controller === this.controller && event.reason === 'assault'
            },
            target: {
                type: 'select',
                activePromptTitle: 'Select a card',
                cardCondition: (card) =>
                    card.location === 'play area' &&
                    card.kneeled &&
                    card.getType() === 'character' &&
                    (card.name === 'Asha Greyjoy' || card.hasTrait('Raider')),
                gameAction: 'stand'
            },
            message: '{player} uses {source} to stand {target}',
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.standCard((context) => ({ card: context.target })),
                    context
                );
            }
        });
    }
}

DeepwoodMotte.code = '27521';
DeepwoodMotte.version = '1.0.0';

export default DeepwoodMotte;
