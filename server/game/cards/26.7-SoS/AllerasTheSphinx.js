import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class AllerasTheSphinx extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                afterChallenge: (event) =>
                    event.challenge.loser === this.controller && this.isParticipating()
            },
            gameAction: GameActions.search({
                topCards: 10,
                title: 'Select a card',
                message: '{player} {gameAction}',
                gameAction: GameActions.placeCardUnderneath((context) => ({
                    card: context.searchTarget,
                    parentCard: context.player.agenda,
                    facedown: false
                }))
            })
        });
    }
}

AllerasTheSphinx.code = '26600';
AllerasTheSphinx.version = '1.0.0';

export default AllerasTheSphinx;
