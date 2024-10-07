import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class ANewHand extends DrawCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onCharacterKilled: (event) =>
                    event.cardStateWhenKilled.hasTrait('Small Council') &&
                    event.cardStateWhenKilled.controller === this.controller
            },
            cost: ability.costs.kneelFactionCard(),
            gameAction: GameActions.search({
                title: 'Select a character',
                match: {
                    type: 'character',
                    trait: 'Small Council',
                    condition: (card, context) =>
                        card.name !== context.event.cardStateWhenKilled.name
                },
                message: '{player} {gameAction}',
                gameAction: GameActions.putIntoPlay((context) => ({
                    card: context.searchTarget,
                    kneeled: true
                }))
            })
        });
    }
}

ANewHand.code = '26511';
ANewHand.version = '1.0.0';

export default ANewHand;
