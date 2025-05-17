import DrawCard from '../../drawcard.js';

class FlamingSword extends DrawCard {
    setupCardAbilities(ability) {
        this.whileAttached({
            effect: ability.effects.addIcon('power')
        });
        this.whileAttached({
            effect: ability.effects.addKeyword('Intimidate')
        });

        this.forcedReaction({
            when: {
                onDeclaredAsAttacker: (event) => event.card === this.parent
            },
            handler: () => {
                this.game.once('onAtEndOfPhase', () => {
                    this.controller.sacrificeCard(this);
                });
            }
        });
    }
}

FlamingSword.code = '00123';

export default FlamingSword;
