import DrawCard from '../../drawcard.js';

class TommenBaratheon extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: () =>
                this.game.isDuringChallenge({ challengeType: 'military' }) &&
                this.game.anyPlotHasTrait('Noble'),
            match: this.getMatch,
            effect: ability.effects.modifyStrength(2)
        });
        this.persistentEffect({
            condition: () =>
                this.game.isDuringChallenge({ challengeType: 'intrigue' }) &&
                this.game.anyPlotHasTrait('Edict'),
            match: this.getMatch,
            effect: ability.effects.modifyStrength(2)
        });
        this.persistentEffect({
            condition: () =>
                this.game.isDuringChallenge({ challengeType: 'power' }) &&
                this.game.anyPlotHasTrait('Kingdom'),
            match: this.getMatch,
            effect: ability.effects.modifyStrength(2)
        });
    }

    getMatch(card) {
        return (
            card.controller === this.controller &&
            card.isParticipating() &&
            card.isFaction('tyrell')
        );
    }
}

TommenBaratheon.code = '27587';
TommenBaratheon.version = '1.0.1';

export default TommenBaratheon;
