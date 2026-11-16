import DrawCard from '../../drawcard.js';

class TourneySteed extends DrawCard {
    // Tourney Steed (27591)
    // Limit 1 copy per character.
    // Knight character only.
    // Attached character gets +1 STR (+3 STR instead if it is attacking or defending alone.)
    setupCardAbilities(ability) {
        this.attachmentRestriction(
            (card, context) =>
                card.getType() === 'character' &&
                card.hasTrait('Knight') &&
                card.attachments.every(
                    (attachment) =>
                        attachment === context.source || attachment.name !== 'Tourney Steed'
                )
        );

        this.whileAttached({
            effect: ability.effects.dynamicStrength((card, context) =>
                context.game.isDuringChallenge({ attackingAlone: card }) ||
                context.game.isDuringChallenge({ defendingAlone: card })
                    ? 3
                    : 1
            )
        });
    }
}

TourneySteed.code = '27591';
TourneySteed.version = '1.0.0';

export default TourneySteed;
