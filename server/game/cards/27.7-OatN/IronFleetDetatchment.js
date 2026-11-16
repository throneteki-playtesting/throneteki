import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class IronFleetDetatchment extends DrawCard {
    // Iron Fleet Detatchment (27522)
    // Shadow (1).
    // Challenges Action: Pay 1 gold to treat Iron Fleet Detatchment as a Raider character with STR
    // 2, a [military] icon, a [power] icon, and the text "Stealth." until the end of the phase.
    setupCardAbilities(ability) {
        this.action({
            title: 'Treat as character',
            phase: 'challenge',
            cost: ability.costs.payGold(1),
            message:
                '{player} pays 1 gold to treat {source} as a character until the end of the phase',
            gameAction: GameActions.lastingEffect((context) => ({
                duration: 'untilEndOfPhase',
                match: context.source,
                effect: [
                    ability.effects.setCardType('character'),
                    ability.effects.addKeyword('stealth'),
                    ability.effects.addTrait('Raider'),
                    ability.effects.setStrength(2),
                    ability.effects.addIcon('military'),
                    ability.effects.addIcon('power')
                ]
            }))
        });
    }
}

IronFleetDetatchment.code = '27522';
IronFleetDetatchment.version = '1.0.0';

export default IronFleetDetatchment;
