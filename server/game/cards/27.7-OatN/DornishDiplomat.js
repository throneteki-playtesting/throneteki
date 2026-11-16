import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class DornishDiplomat extends DrawCard {
    // Dornish Diplomat (27541)
    // Shadow (3).
    // Reaction: After Dornish Diplomat comes out of shadows, search the top 10 cards of your deck
    // for up to 3 [martell] attachments with printed cost 1 or lower, and put them into play.
    setupCardAbilities() {
        this.reaction({
            when: {
                onCardOutOfShadows: (event, context) => event.card === context.source
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

DornishDiplomat.code = '27541';
DornishDiplomat.version = '1.0.0';

export default DornishDiplomat;
