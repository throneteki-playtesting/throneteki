import PlotCard from '../../plotcard.js';

class BeneathTheRedKeep extends PlotCard {
    // Beneath the Red Keep (27614)
    // During the challenges phase, players cannot trigger abilities on characters, locations, or
    // attachments, unless those cards have shadow.
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: (context) => context.game.currentPhase === 'challenge',
            targetController: 'any',
            effect: ability.effects.cannotTriggerCardAbilities(
                (abilityToCheck) =>
                    ['character', 'location', 'attachment'].includes(
                        abilityToCheck.card.getType()
                    ) && !abilityToCheck.card.isShadow()
            )
        });
    }
}

BeneathTheRedKeep.code = '27614';
BeneathTheRedKeep.version = '1.0.1';

export default BeneathTheRedKeep;
