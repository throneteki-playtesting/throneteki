import PlotCard from '../../plotcard.js';

class BattleOfTheBells extends PlotCard {
    // Battle of the Bells (27609)
    // Each player cannot trigger abilities to cards entering play.
    setupCardAbilities(ability) {
        this.persistentEffect({
            targetController: 'any',
            effect: ability.effects.cannotTriggerCardAbilities(
                (abilityToCheck) =>
                    ['reaction', 'interrupt'].includes(abilityToCheck.eventType) &&
                    abilityToCheck.triggersFor('onCardEntersPlay')
            )
        });
    }
}

BattleOfTheBells.code = '27609';
BattleOfTheBells.version = '1.0.1';

export default BattleOfTheBells;
