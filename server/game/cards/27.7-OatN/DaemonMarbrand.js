import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class DaemonMarbrand extends DrawCard {
    // Damon Marbrand (27525)
    // Reaction: After a character is discarded from an opponent's hand, that player must choose a
    // character they control and return it to their hand. (Limit twice per phase.)
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onCardDiscarded: (event, context) =>
                    event.card.getType() === 'character' &&
                    event.cardStateWhenDiscarded.controller !== context.player &&
                    event.cardStateWhenDiscarded.location === 'hand'
            },
            limit: ability.limit.perPhase(2),
            message: {
                format: '{player} uses {source} to force {opponent} to return a character to their hand',
                args: { opponent: (context) => context.event.cardStateWhenDiscarded.controller }
            },
            gameAction: GameActions.chooseCards({
                player: (context) => context.event.cardStateWhenDiscarded.controller,
                title: 'Select a character',
                cardCondition: (card, context) =>
                    card.location === 'play area' &&
                    card.getType() === 'character' &&
                    card.controller === context.choosingPlayer,
                gameAction: (card) => GameActions.returnCardToHand({ card })
            })
        });
    }
}

DaemonMarbrand.code = '27525';
DaemonMarbrand.version = '1.0.1';

export default DaemonMarbrand;
