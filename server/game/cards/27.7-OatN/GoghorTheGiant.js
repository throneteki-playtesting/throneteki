import DrawCard from '../../drawcard.js';

class GoghorTheGiant extends DrawCard {
    // Goghor the Giant (27575)
    // No attachments except Weapon.
    // While there is a Weapon attachment attached to Goghor the Giant, he gains intimidate.
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: (context) =>
                context.source.attachments.some((attachment) => attachment.hasTrait('Weapon')),
            match: (card, context) => card === context.source,
            effect: ability.effects.addKeyword('intimidate')
        });
    }
}

GoghorTheGiant.code = '27575';
GoghorTheGiant.version = '1.0.1';

export default GoghorTheGiant;
