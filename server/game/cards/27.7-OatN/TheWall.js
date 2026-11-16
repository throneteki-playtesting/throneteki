import DrawCard from '../../drawcard.js';

class TheWall extends DrawCard {
    // The Wall (27510)
    // The Wall is considered out-of-faction for all card effects.
    // While there is a Winter plot card revealed, each participating character whose controller
    // does not have a Winter plot card revealed gets -1 STR.
    setupCardAbilities(ability) {
        this.persistentEffect({
            match: (card, context) => card === context.source,
            effect: ability.effects.consideredOutOfFaction()
        });
        this.persistentEffect({
            condition: (context) =>
                context.game
                    .getPlayers()
                    .some((p) => p.activePlot && p.activePlot.hasTrait('Winter')),
            match: (card) =>
                card.getType() === 'character' &&
                card.isParticipating() &&
                !(card.controller.activePlot && card.controller.activePlot.hasTrait('Winter')),
            targetController: 'any',
            effect: ability.effects.modifyStrength(-1)
        });
    }
}

TheWall.code = '27510';
TheWall.version = '1.1.0';

export default TheWall;
