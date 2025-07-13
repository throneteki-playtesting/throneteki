import DrawCard from '../../drawcard.js';

class LivingShadow extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            match: this,
            effect: ability.effects.cannotBeKilled()
        });

        this.forcedReaction({
            when: {
                onBypassedByStealth: (event) =>
                    event.source === this && this.controller.canAttach(this, event.target) // TODO: Need to check if the character can take condition attachments
            },
            message: {
                format: '{player} is forced to attach {source} to {character}"',
                args: { character: (context) => context.event.target }
            },
            handler: (context) => {
                context.player.attach(context.player, this, context.target, 'effect');
                this.lastingEffect((ability) => ({
                    condition: () => !!this.parent,
                    targetLocation: 'any',
                    match: this,
                    effect: [
                        ability.effects.setCardType('attachment'),
                        ability.effects.addKeyword('Terminal'),
                        ability.effects.addTrait('Condition')
                    ]
                }));

                this.lastingEffect((ability) => ({
                    condition: () => this.location === 'play area',
                    targetLocation: 'any',
                    targetController: 'any',
                    match: (card) => card === this.parent,
                    effect: ability.effects.cannotBeSaved()
                }));
            }
        });
    }
}

LivingShadow.code = '26506';
LivingShadow.version = '1.1.0';

export default LivingShadow;
