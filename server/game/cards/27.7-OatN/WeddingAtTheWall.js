import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class WeddingAtTheWall extends DrawCard {
    setupCardAbilities(_ability) {
        this.reaction({
            when: {
                onChallengeInitiated: (event) =>
                    event.challenge.challengeType === 'power' && this.controller.shadows.length > 0
            },
            message: {
                format: "{player} uses {source} to reveal their shadow area and have their R'hllor and Wildling characters gain the R'hllor and Wildling traits until the end of the phase",
                args: {}
            },
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.revealCards((context) => ({
                        cards: context.player.shadows.slice()
                    })),
                    context
                );
                this.untilEndOfPhase((ability) => ({
                    match: (card) =>
                        card.getType() === 'character' &&
                        card.controller === this.controller &&
                        (card.hasTrait("R'hllor") || card.hasTrait('Wildling')),
                    effect: [
                        ability.effects.addTrait("R'hllor"),
                        ability.effects.addTrait('Wildling')
                    ]
                }));
            }
        });
    }
}

WeddingAtTheWall.code = '27512';
WeddingAtTheWall.version = '1.1.0';

export default WeddingAtTheWall;
