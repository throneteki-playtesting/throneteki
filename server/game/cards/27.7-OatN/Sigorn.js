import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class Sigorn extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                afterChallenge: (event) =>
                    event.challenge.isMatch({
                        challengeType: 'military',
                        winner: this.controller
                    }) && this.isAttacking()
            },
            target: {
                cardCondition: {
                    type: 'character',
                    location: 'play area',
                    controller: 'current',
                    trait: 'Wildling',
                    condition: (card) => card !== this && GameActions.standCard({ card }).allow()
                }
            },
            message: '{player} uses {source} to stand {target}',
            handler: (context) => {
                this.game
                    .resolveGameAction(GameActions.standCard({ card: context.target }))
                    .thenExecute(() => {
                        if (
                            context.target.name === 'Alys Karstark' &&
                            GameActions.standCard({ card: this }).allow()
                        ) {
                            this.game.resolveGameAction(GameActions.standCard({ card: this }));
                            this.game.addMessage('Then, {0} stands {1}', context.player, this);
                        }
                    });
            }
        });
    }
}

Sigorn.code = '27598';
Sigorn.version = '1.1.1';

export default Sigorn;
