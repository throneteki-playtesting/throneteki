import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class OrkmontElite extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                onCardDiscarded: (event) =>
                    event.isPillage &&
                    event.source === this &&
                    event.card.getType() === 'attachment'
            },
            message: {
                format: '{player} uses {source} to put {attachment} into play',
                args: { attachment: (context) => context.event.card }
            },
            gameAction: GameActions.putIntoPlay((context) => ({
                player: context.player,
                card: context.event.card
            }))
        });
    }
}

OrkmontElite.code = '26516';
OrkmontElite.version = '1.0.0';

export default OrkmontElite;
