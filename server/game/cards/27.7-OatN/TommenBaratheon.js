import DrawCard from '../../drawcard.js';

const matchesParticipatingTyrell = (card, context) =>
    card.controller === context.source.controller &&
    card.isParticipating() &&
    card.isFaction('tyrell');

class TommenBaratheon extends DrawCard {
    // Tommen Baratheon (27587)
    // Each participating [tyrell] character you control gets +2 STR during:
    // - [military] challenges, if there is a revealed Noble plot card.
    // - [intrigue] challenges, if there is a revealed Edict plot card.
    // - [power] challenges, if there is a revealed Kingdom plot card.
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: (context) =>
                context.game.isDuringChallenge({ challengeType: 'military' }) &&
                context.game.anyPlotHasTrait('Noble'),
            match: matchesParticipatingTyrell,
            effect: ability.effects.modifyStrength(2)
        });
        this.persistentEffect({
            condition: (context) =>
                context.game.isDuringChallenge({ challengeType: 'intrigue' }) &&
                context.game.anyPlotHasTrait('Edict'),
            match: matchesParticipatingTyrell,
            effect: ability.effects.modifyStrength(2)
        });
        this.persistentEffect({
            condition: (context) =>
                context.game.isDuringChallenge({ challengeType: 'power' }) &&
                context.game.anyPlotHasTrait('Kingdom'),
            match: matchesParticipatingTyrell,
            effect: ability.effects.modifyStrength(2)
        });
    }
}

TommenBaratheon.code = '27587';
TommenBaratheon.version = '1.0.1';

export default TommenBaratheon;
