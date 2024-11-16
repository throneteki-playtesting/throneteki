import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class Retribution extends DrawCard {
    setupCardAbilities(ability) {
        this.interrupt({
            when: {
                onCharacterKilled: (event) =>
                    event.card.controller === this.controller &&
                    event.card.isFaction('martell') &&
                    this.isApplyingClaim('military') &&
                    this.controlsFewerCharacters()
            },
            max: ability.limit.perPhase(1),
            message: {
                format: '{player} plays {source} to gain {amount} power for their faction',
                args: { amount: (context) => this.getAmount(context) }
            },
            gameAction: GameActions.gainPower((context) => ({ amount: this.getAmount(context) }))
        });
    }

    isApplyingClaim(type) {
        return (
            this.game.currentChallenge &&
            this.game.claim.isApplying &&
            this.game.claim.type === type
        );
    }

    controlsFewerCharacters() {
        this.controller.getNumberOfCardsInPlay({ type: 'character' }) <
            this.game.currentChallenge.attackingPlayer.getNumberOfCardsInPlay({
                type: 'character'
            });
    }
}

Retribution.code = '26548';
Retribution.version = '1.0.0';

export default Retribution;
