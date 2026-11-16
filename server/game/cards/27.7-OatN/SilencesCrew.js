import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

const getCharactersWithPillage = (player) =>
    player.filterCardsInPlay(
        (card) => card.getType() === 'character' && card.hasKeyword('pillage')
    );

class SilencesCrew extends DrawCard {
    // Silence's Crew (27516)
    // Shadow (5). Pillage.
    // Reaction: After Silence's Crew comes out of shadows, if you are the first player, stand each
    // character you control with pillage.
    setupCardAbilities() {
        this.reaction({
            when: {
                onCardOutOfShadows: (event, context) =>
                    event.card === context.source && context.player.firstPlayer
            },
            message: {
                format: '{player} uses {source} to stand {cards}',
                args: { cards: (context) => getCharactersWithPillage(context.player) }
            },
            gameAction: GameActions.simultaneously((context) =>
                getCharactersWithPillage(context.player).map((card) =>
                    GameActions.standCard({ card })
                )
            )
        });
    }
}

SilencesCrew.code = '27516';
SilencesCrew.version = '1.0.0';

export default SilencesCrew;
