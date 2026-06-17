import DrawCard from '../../drawcard.js';

class Yunkai extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Give participating character -2 STR',
            phase: 'challenge',
            cost: [ability.costs.kneelSelf(), ability.costs.discardFromHand()],
            target: {
                cardCondition: (card) =>
                    card.location === 'play area' &&
                    card.getType() === 'character' &&
                    card.isParticipating()
            },
            message: {
                format: '{player} kneels {costs.kneel} and discards {costs.discardFromHand} from their hand to give {target} -2 STR until the end of the phase',
                args: {}
            },
            handler: (context) => {
                const target = context.target;
                const player = context.player;

                this.untilEndOfPhase((ability) => ({
                    match: target,
                    effect: ability.effects.modifyStrength(-2)
                }));

                const killHandler = (event) => {
                    if (event.card !== target) {
                        return;
                    }
                    this.game.removeListener('onCharacterKilled', killHandler);
                    this.game.removeListener('onPhaseEnded', phaseEndHandler);
                    player.drawCardsToHand(2);
                    this.game.addMessage('{0} uses {1} to draw 2 cards', player, this);
                };

                const phaseEndHandler = () => {
                    this.game.removeListener('onCharacterKilled', killHandler);
                };

                this.game.on('onCharacterKilled', killHandler);
                this.game.once('onPhaseEnded', phaseEndHandler);
            }
        });
    }
}

Yunkai.code = '27581';
Yunkai.version = '1.1.0';

export default Yunkai;
