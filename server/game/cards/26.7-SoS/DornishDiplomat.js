import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class DornishDiplomat extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                onCardOutOfShadows: (event) => event.card === this
            },
            message:
                '{player} uses {source} to search the top 10 cards of their deck for up to 3 martell attachments with printed cost 1 or lower',
            gameAction: GameActions.search({
                title: 'Select up to 3 attachments',
                numToSelect: 3,
                topCards: 10,
                match: {
                    type: 'attachment',
                    printedCostOrLower: 1,
                    faction: 'martell',
                    controller: 'current'
                },
                reveal: false,
                message: '{player} {gameAction}',
                gameAction: GameActions.simultaneously((context) =>
                    context.searchTarget.map((card) =>
                        GameActions.putIntoPlay({
                            card
                        })
                    )
                )
            })
        });
    }
}

DornishDiplomat.code = '26541';
DornishDiplomat.version = '1.0.0';

export default DornishDiplomat;
