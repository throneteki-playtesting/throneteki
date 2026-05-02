import DrawCard from '../../drawcard.js';

class TourneySteed extends DrawCard {
    setupCardAbilities(ability) {
        this.attachmentRestriction(
            (card) =>
                card.getType() === 'character' &&
                card.hasTrait('Knight') &&
                card.attachments.every(
                    (attachment) => attachment === this || attachment.name !== 'Tourney Steed'
                )
        );

        this.whileAttached({
            effect: ability.effects.dynamicStrength(() => this.getSTRAmount())
        });
    }

    getSTRAmount() {
        return this.game.isDuringChallenge({ attackingAlone: this.parent }) ||
            this.game.isDuringChallenge({ defendingAlone: this.parent })
            ? 3
            : 1;
    }
}

TourneySteed.code = '27591';
TourneySteed.version = '1.0.0';

export default TourneySteed;
