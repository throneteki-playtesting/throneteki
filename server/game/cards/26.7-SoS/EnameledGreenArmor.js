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
                    participating: true,
                    condition: (card) => card.getStrength() < this.parent.getStrength()
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
EnameledGreenArmor.version = '1.0.0';

export default EnameledGreenArmor;
