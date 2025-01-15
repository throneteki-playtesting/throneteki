import DrawCard from '../../drawcard.js';

class RaidersScythe extends DrawCard {
    setupCardAbilities(ability) {
        this.attachmentRestriction({ trait: 'Raider' });
        this.whileAttached({
            condition: () =>
                !!this.game.currentChallenge &&
                this.hasMoreAttachmentsThanDefender(this.game.currentChallenge.defendingPlayer),
            match: this.parent,
            effect: ability.effects.doesNotKneelAsAttacker()
        });
    }

    hasMoreAttachmentsThanDefender(defendingPlayer) {
        return (
            this.controller.getNumberOfCardsInPlay({ type: 'attachment' }) >
            defendingPlayer.getNumberOfCardsInPlay({ type: 'attachment' })
        );
    }
}

RaidersScythe.code = '26520';
RaidersScythe.version = '1.0.0';

export default RaidersScythe;
