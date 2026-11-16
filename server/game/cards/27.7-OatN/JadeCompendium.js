import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class JadeCompendium extends DrawCard {
    // Jade Compendium (27555)
    // If attached character is Jon Snow or has the Maester trait, it gets +1 STR for every 2
    // facedown cards under your agenda.
    // Reaction: After you win an [intrigue] challenge in which attached character is participating,
    // kneel Jade Compendium to draw 2 cards. Then, place 1 card from your hand under your agenda.
    setupCardAbilities(ability) {
        this.whileAttached({
            condition: (context) =>
                context.source.parent.name === 'Jon Snow' ||
                context.source.parent.hasTrait('Maester'),
            effect: ability.effects.dynamicStrength((card, context) => {
                const agenda = context.source.controller.agenda;
                if (!agenda) {
                    return 0;
                }
                return Math.floor(agenda.underneath.filter((c) => c.facedown).length / 2);
            })
        });
        this.reaction({
            when: {
                afterChallenge: (event, context) =>
                    event.challenge.winner === context.player &&
                    event.challenge.challengeType === 'intrigue' &&
                    !!context.source.parent &&
                    event.challenge.isParticipating(context.source.parent)
            },
            cost: ability.costs.kneelSelf(),
            message: '{player} kneels {costs.kneel} to draw 2 cards',
            gameAction: GameActions.drawCards((context) => ({
                player: context.player,
                amount: 2
            })).then({
                target: {
                    type: 'select',
                    activePromptTitle: 'Select a card',
                    cardCondition: (card, context) =>
                        card.location === 'hand' && card.controller === context.player,
                    gameAction: GameActions.placeCardUnderneath((context) => ({
                        card: context.target,
                        parentCard: context.player.agenda,
                        facedown: true
                    }))
                },
                message: 'Then {player} places a card from their hand facedown under their agenda'
            })
        });
    }
}

JadeCompendium.code = '27555';
JadeCompendium.version = '1.0.1';

export default JadeCompendium;
