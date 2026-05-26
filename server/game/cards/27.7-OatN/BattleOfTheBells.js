import PlotCard from '../../plotcard.js';

class BattleOfTheBells extends PlotCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            targetController: 'any',
            effect: ability.effects.cannotTriggerCardAbilities(
                (abilityToCheck) =>
                    ['reaction', 'interrupt'].includes(ability.eventType) &&
                    abilityToCheck.triggersFor('onCardEntersPlay')
            )
        });
    }
}

BattleOfTheBells.code = '27609';
BattleOfTheBells.version = '1.0.1';

export default BattleOfTheBells;
