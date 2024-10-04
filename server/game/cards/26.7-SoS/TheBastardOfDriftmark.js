import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class TheBastardOfDriftmark extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Search your deck',
            phase: 'taxation',
            limit: ability.limit.perPhase(1),
            message: '{player} uses {source} to search their deck for a Warship location',
            gameAction: GameActions.search({
                title: 'Select a location',
                match: { type: 'location', trait: 'Warship' },
                message: '{player} {gameAction}',
                gameAction: GameActions.addToHand((context) => ({
                    card: context.searchTarget
                }))
            })
        });
    }
}

TheBastardOfDriftmark.code = '26599';
TheBastardOfDriftmark.version = '1.0.0';

export default TheBastardOfDriftmark;
