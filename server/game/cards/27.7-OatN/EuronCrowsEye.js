import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class EuronCrowsEye extends DrawCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onCardOutOfShadows: (event) =>
                    this.game.currentPhase === 'challenge' &&
                    event.card.controller === this.controller
            },
            target: {
                cardCondition: (card) =>
                    card.location === 'play area' && card.getType() === 'location'
            },
            limit: ability.limit.perPhase(2),
            message: '{player} uses {source} to choose {target}',
            handler: (context) => {
                const location = context.target;
                const kneel = () => {
                    this.game.addMessage('{0} kneels {1}', context.player, location);
                    this.game.resolveGameAction(GameActions.kneelCard({ card: location }), context);
                    return true;
                };

                if (location.getPrintedCost() <= context.player.getInitiative()) {
                    kneel();
                    return;
                }

                this.game.promptWithMenu(
                    context.player,
                    {
                        kneel,
                        stand: () => {
                            this.game.addMessage('{0} stands {1}', context.player, location);
                            this.game.resolveGameAction(
                                GameActions.standCard({ card: location }),
                                context
                            );
                            return true;
                        }
                    },
                    {
                        activePrompt: {
                            menuTitle: `Kneel or stand ${location.name}?`,
                            buttons: [
                                { text: 'Kneel', method: 'kneel' },
                                { text: 'Stand', method: 'stand' }
                            ]
                        },
                        source: this
                    }
                );
            }
        });
    }
}

EuronCrowsEye.code = '27513';
EuronCrowsEye.version = '1.2.0';

export default EuronCrowsEye;
