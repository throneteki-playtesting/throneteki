import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class JadeCompendium extends DrawCard {
    setupCardAbilities(ability) {
        this.whileAttached({
            match: (card) => card.name === 'Jon Snow' || card.hasTrait('maester'),
            effect: ability.effects.cannotDecreaseStrength(
                (context) => context.resolutionStage === 'effect'
            )
        });
        this.reaction({
            when: {
                afterChallenge: (event) =>
                    event.challenge.winner === this.controller &&
                    event.challenge.challengeType === 'intrigue' &&
                    this.parent &&
                    this.parent.isParticipating()
            },
            cost: ability.costs.kneelSelf(),
            message: '{player} kneels {costs.kneel} to draw 2 cards',
            gameAction: GameActions.drawCards((context) => ({
                player: context.player,
                amount: 2
            })).then({
                target: {
                    cardCondition: {
                        location: 'hand',
                        controller: 'current'
                    }
                },
                message: 'Then, {player} places a card from their hand facedown under their agenda',
                handler: (context) => {
                    this.game.resolveGameAction(
                        GameActions.placeCardUnderneath((context) => ({
                            card: context.target,
                            parentCard: context.player.agenda,
                            facedown: true
                        })),
                        context
                    );
                }
            })
        });
    }
}

JadeCompendium.code = '27555';
JadeCompendium.version = '1.0.0';

export default JadeCompendium;
