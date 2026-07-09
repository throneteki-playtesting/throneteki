import DrawCard from '../../drawcard.js';

class TheWall extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            match: this,
            effect: ability.effects.consideredOutOfFaction()
        });
        this.persistentEffect({
            condition: () =>
                this.game.getPlayers().some((p) => p.activePlot && p.activePlot.hasTrait('Winter')),
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
