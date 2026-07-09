import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class JadeCompendium extends DrawCard {
    setupCardAbilities(ability) {
        this.whileAttached({
            condition: () =>
                this.parent && (this.parent.name === 'Jon Snow' || this.parent.hasTrait('Maester')),
            effect: ability.effects.dynamicStrength(() => {
                if (!this.controller.agenda) {
                    return 0;
                }
                return Math.floor(
                    this.controller.agenda.underneath.filter((c) => c.facedown).length / 2
                );
            })
        });
        this.reaction({
            when: {
                afterChallenge: (event) =>
                    event.challenge.winner === this.controller &&
                    event.challenge.challengeType === 'intrigue' &&
                    this.parent &&
                    event.challenge.isParticipating(this.parent)
            },
            cost: ability.costs.kneelSelf(),
            message: '{player} kneels {costs.kneel} to draw 2 cards',
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.drawCards({ player: context.player, amount: 2 }).then({
                        target: {
                            activePromptTitle: 'Select a card',
                            cardCondition: (card, context) =>
                                card.location === 'hand' && card.controller === context.player
                        },
                        message:
                            'Then, {player} places a card from their hand facedown under their agenda',
                        handler: (context) => {
                            this.game.resolveGameAction(
                                GameActions.placeCardUnderneath({
                                    card: context.target,
                                    parentCard: context.player.agenda,
                                    facedown: true
                                }),
                                context
                            );
                        }
                    }),
                    context
                );
            }
        });
    }
}

JadeCompendium.code = '27555';
JadeCompendium.version = '1.0.1';

export default JadeCompendium;
