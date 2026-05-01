import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class PaxterRedwyne extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                afterChallenge: (event) =>
                    event.challenge.winner === this.controller && this.isParticipating()
            },
            target: {
                cardCondition: {
                    location: 'play area',
                    type: 'location',
                    controller: 'current'
                }
            },
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.ifCondition({
                        condition: (context) => !context.target.hasTrait('Warship'),
                        thenAction: {
                            message: '{player} uses {source} to {gameAction}',
                            gameAction: GameActions.returnCardToHand((context) => ({
                                card: context.target
                            }))
                        },
                        elseAction: GameActions.choose({
                            title: 'Place location in shadows?',
                            message: '{player} uses {source} to {gameAction}',
                            choices: {
                                'Return to hand': GameActions.returnCardToHand((context) => ({
                                    card: context.target
                                })),
                                'Put in shadows': GameActions.putIntoShadows((context) => ({
                                    card: context.target
                                }))
                            }
                        })
                    }),
                    context
                );
            }
        });
    }
}

PaxterRedwyne.code = '27585';
PaxterRedwyne.version = '1.1.0';

export default PaxterRedwyne;
