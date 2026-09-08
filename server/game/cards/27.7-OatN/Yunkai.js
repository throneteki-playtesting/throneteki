import DrawCard from '../../drawcard.js';

class Yunkai extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Give up to 2 participating characters -1 STR',
            phase: 'challenge',
            cost: [ability.costs.kneelSelf(), ability.costs.discardFromHand()],
            target: {
                mode: 'upTo',
                numCards: 2,
                cardCondition: (card) =>
                    card.location === 'play area' &&
                    card.getType() === 'character' &&
                    card.isParticipating()
            },
            message: {
                format: '{player} kneels {costs.kneel} and discards {costs.discardFromHand} from their hand to give {target} -1 STR until the end of the phase',
                args: {}
            },
            handler: (context) => {
                const targets = context.target;
                const player = context.player;

                targets.forEach((target) => {
                    this.untilEndOfPhase((ability) => ({
                        match: target,
                        effect: ability.effects.modifyStrength(-1)
                    }));

                    const killHandler = (event) => {
                        if (event.card !== target) {
                            return;
                        }
                        this.game.removeListener('onCharacterKilled', killHandler);
                        this.game.removeListener('onPhaseEnded', phaseEndHandler);
                        player.drawCardsToHand(1);
                        this.game.addMessage('{0} uses {1} to draw 1 card', player, this);
                    };

                    const phaseEndHandler = () => {
                        this.game.removeListener('onCharacterKilled', killHandler);
                    };

                    this.game.on('onCharacterKilled', killHandler);
                    this.game.once('onPhaseEnded', phaseEndHandler);
                });
            }
        });
    }
}

Yunkai.code = '27581';
Yunkai.version = '1.1.1';

export default Yunkai;
