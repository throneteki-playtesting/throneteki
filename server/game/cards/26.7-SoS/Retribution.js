import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class Retribution extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                onCharacterKilled: (event) =>
                    event.card.controller === this.controller &&
                    this.isApplyingClaim('military') &&
                    this.controlsFewerCharacters()
            },
            target: {
                choosingPlayer: (player, context) =>
                    player === context.event.challenge.attackingPlayer,
                cardCondition: (card) =>
                    card.location === 'play area' &&
                    card.getType() === 'character' &&
                    card.isAttacking() &&
                    GameActions.kill({ card }).allow()
            },
            message: {
                format: '{player} plays {source} to have {attackingPlayer} choose and kill {target}',
                args: { attackingPlayer: (context) => context.event.challenge.attackingPlayer }
            },
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.kill((context) => ({ card: context.target })),
                    context
                );
            }
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
Retribution.version = '1.0.1';

export default Retribution;
