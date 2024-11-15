import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class GhostHillElite extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                onCardEntersPlay: (event) => event.card === this
            },
            target: {
                cardCondition: (card) =>
                    card.location === 'play area' &&
                    card.getType() === 'character' &&
                    card.getNumberOfIcons() === 0
            },
            message: '{player} uses {source} to kill {target}',
            gameAction: GameActions.kill((context) => ({ card: context.target }))
        });
    }
}

GhostHillElite.code = '26540';
GhostHillElite.version = '1.0.0';

export default GhostHillElite;
