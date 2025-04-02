import DrawCard from '../../drawcard.js';

class EnameledGreenArmor extends DrawCard {
    setupCardAbilities(ability) {
        this.whileAttached({
            effect: ability.effects.addKeyword('renown')
        });

        this.action({
            title: 'Choose participating character',
            condition: () => this.parent.isParticipating(),
            cost: ability.costs.kneelSelf(),
            target: {
                cardCondition: {
                    type: 'character',
                    participating: true
                }
            },
            message: '{player} kneels {source} to have {target} contribute STR to their side',
            handler: (context) => {
                this.untilEndOfChallenge((ability) => ({
                    targetController: 'current',
                    effect: ability.effects.contributeCharacterStrength(context.target)
                }));
            }
        });
    }
}

EnameledGreenArmor.code = '26591';
EnameledGreenArmor.version = '1.0.1';

export default EnameledGreenArmor;
