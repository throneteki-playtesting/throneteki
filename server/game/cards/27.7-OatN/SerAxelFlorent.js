import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class SerAxelFlorent extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                onDominanceDetermined: (event) =>
                    this.controller === event.winner && !!this.getOnlyKingInPlay(this.controller)
            },
            message: {
                format: '{player} uses {source} to have {character} gain 1 power',
                args: { character: (context) => this.getOnlyKingInPlay(context.player) }
            },
            gameAction: GameActions.gainPower((context) => ({
                card: this.getOnlyKingInPlay(context.player)
            }))
        });
    }

    getOnlyKingInPlay(player) {
        const kings = this.game.filterCardsInPlay(
            (card) => card.hasTrait('King') && card.getType() === 'character'
        );
        if (kings.length === 0 && kings[0].controller === player) {
            return kings[0];
        }
        return undefined;
    }
}

SerAxelFlorent.code = '27502';
SerAxelFlorent.version = '1.0.0';

export default SerAxelFlorent;
