const DrawCard = require('../../drawcard.js');
const GameActions = require('../../GameActions/index.js');

class DefendingTheWall extends DrawCard {
    setupCardAbilities() {
        this.action({
            title: 'Remove character from challenge',
            phase: 'challenge',
            condition: context => context.player.anyCardsInPlay({ name: ['The Wall', 'Castle Black'] }),
            target: {
                cardCondition: card => card.isAttacking() && card.getType() === 'character' && card.getNumberOfIcons() > 1 
            },
            message: '{player} plays {source} to remove {target} from the challenge',
            handler: context => {
                this.resolveGameAction(
                    GameActions.removeFromChallenge(context => ({
                        card: context.target
                    })).then({
                        condition: context => !(context.parentContext.target.hasTrait('Army') || context.parentContext.target.hasTrait('Wildling')),
                        message: {
                            format: 'Then {player} stands {originalTarget}',
                            args: { originalTarget: context => context.parentContext.target }
                        },
                        gameAction: GameActions.standCard(context => ({
                            card: context.parentContext.target
                        }))
                    }),
                    context
                );
            }
        });
    }
}

DefendingTheWall.code = '24015';

module.exports = DefendingTheWall;
