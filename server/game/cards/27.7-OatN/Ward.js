import DrawCard from '../../drawcard.js';

class Ward extends DrawCard {
    // Ward (27532)
    // Shadow (1).
    // Character with printed STR 3 or lower only.
    // Attached character contributes its STR to your side during [intrigue] challenges in which you
    // control a participating character.
    setupCardAbilities(ability) {
        this.attachmentRestriction(
            (card) => card.getType() === 'character' && card.getPrintedStrength() <= 3
        );
        this.persistentEffect({
            condition: (context) =>
                !!context.source.parent &&
                context.game.isDuringChallenge({ challengeType: 'intrigue' }) &&
                context.source.controller.anyCardsInPlay({
                    type: 'character',
                    participating: true
                }),
            effect: ability.effects.contributeCharacterStrength((context) => context.source.parent)
        });
    }
}

Ward.code = '27532';
Ward.version = '1.0.0';

export default Ward;
