import DrawCard from '../../drawcard.js';

class TheVipersSpear extends DrawCard {
    setupCardAbilities(ability) {
        this.attachmentRestriction({ trait: 'Sand Snake' }, { name: 'The Red Viper' });
        this.whileAttached({
            condition: () =>
                this.parent.isAttacking() &&
                this.game.currentChallenge &&
                this.hasFewerCharactersThanDefender(this.game.currentChallenge.defendingPlayer),
            match: (card) => card === this.parent,
            effect: ability.effects.doesNotKneelAsAttacker()
        });
    }

    hasFewerCharactersThanDefender(defendingPlayer) {
        return (
            this.controller.getNumberOfCardsInPlay({ type: 'character' }) <
            defendingPlayer.getNumberOfCardsInPlay({ type: 'character' })
        );
    }
}

TheVipersSpear.code = '26543';
TheVipersSpear.version = '1.0.0';

export default TheVipersSpear;
