import GameActions from '../../GameActions/index.js';
import PlotCard from '../../plotcard.js';

class TheAgeOfHeroes extends PlotCard {
    setupCardAbilities() {
        this.whenRevealed({
            message: '{player} uses {source} to search their deck for an attachment',
            gameAction: GameActions.search({
                title: 'Select an attachment',
                match: { type: 'attachment' },
                gameAction: GameActions.ifCondition({
                    condition: (context) =>
                        (context.searchTarget.hasTrait('Legacy') ||
                            context.searchTarget.hasTrait('Valyrian Steel')) &&
                        context.player.canPutIntoPlay(context.searchTarget),
                    thenAction: GameActions.choose({
                        title: 'Put card into play?',
                        message: '{player} {gameAction}',
                        choices: {
                            'Add to hand': GameActions.addToHand((context) => ({
                                card: context.searchTarget
                            })),
                            'Put in play': GameActions.putIntoPlay((context) => ({
                                card: context.searchTarget
                            }))
                        }
                    }),
                    elseAction: {
                        message: '{player} {gameAction}',
                        gameAction: GameActions.addToHand((context) => ({
                            card: context.searchTarget
                        }))
                    }
                })
            })
        });
    }
}

TheAgeOfHeroes.code = '26615';
TheAgeOfHeroes.version = '1.0.1';

export default TheAgeOfHeroes;
