import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

function getOnlyKingInPlay(game, player) {
    const kings = game.filterCardsInPlay(
        (card) => card.hasTrait('King') && card.getType() === 'character'
    );
    if (kings.length === 1 && kings[0].controller === player) {
        return kings[0];
    }
    return undefined;
}

class SerAxelFlorent extends DrawCard {
    // Ser Axell Florent (27502)
    // Reaction: After you win dominance, if you control the only King character in play, that
    // character gains 1 power.
    setupCardAbilities() {
        this.reaction({
            when: {
                onDominanceDetermined: (event, context) =>
                    context.player === event.winner &&
                    !!getOnlyKingInPlay(context.game, context.player)
            },
            message: {
                format: '{player} uses {source} to have {character} gain 1 power',
                args: { character: (context) => getOnlyKingInPlay(context.game, context.player) }
            },
            gameAction: GameActions.gainPower((context) => ({
                card: getOnlyKingInPlay(context.game, context.player)
            }))
        });
    }
}

SerAxelFlorent.code = '27502';
SerAxelFlorent.version = '1.0.2';

export default SerAxelFlorent;
