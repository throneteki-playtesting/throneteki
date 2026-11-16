import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class TorghenFlint extends DrawCard {
    // Torghen Flint (27561)
    // Stealth.
    // Reaction: After a Winter plot card is revealed, put a Clansman character into play from your
    // hand. (Limit once per round.)
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onPlotRevealed: (event) => event.plot.hasTrait('Winter')
            },
            target: {
                cardCondition: (card, context) =>
                    card.controller === context.player &&
                    card.location === 'hand' &&
                    card.getType() === 'character' &&
                    card.hasTrait('Clansman'),
                gameAction: GameActions.putIntoPlay((context) => ({ card: context.target }))
            },
            limit: ability.limit.perRound(1),
            message: '{player} uses {source} to put {target} into play from their hand'
        });
    }
}

TorghenFlint.code = '27561';
TorghenFlint.version = '1.0.0';

export default TorghenFlint;
