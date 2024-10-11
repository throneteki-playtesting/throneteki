import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class Melisandre extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                afterChallenge: (event) =>
                    event.challenge.winner === this.controller && this.isAttacking()
            },
            target: {
                type: 'select',
                activePromptTitle: 'Select a card',
                cardCondition: {
                    location: 'shadows',
                    condition: (card, context) => card.controller === context.event.challenge.loser
                }
            },
            message: '{player} uses {source} to reveal a shadow card',
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.revealCards((context) => ({
                        player: context.player,
                        cards: [context.target]
                    })).then((context) => ({
                        condition: () => context.target.getType() === 'character',
                        gameAction: GameActions.may({
                            player: context.player,
                            title: `Put ${context.target.name} into play?`,
                            message: {
                                format: '{player} kneels their faction card to put {shadowCard} into play',
                                args: { shadowCard: () => context.target }
                            },
                            // TODO: This should really be a cost
                            gameAction: GameActions.kneelCard({
                                card: context.player.faction
                            }).then({
                                gameAction: GameActions.putIntoPlay({
                                    player: context.player,
                                    card: context.target
                                })
                            })
                        })
                    })),
                    context
                );
            }
        });
    }
}

Melisandre.code = '26501';
Melisandre.version = '1.0.0';

export default Melisandre;
