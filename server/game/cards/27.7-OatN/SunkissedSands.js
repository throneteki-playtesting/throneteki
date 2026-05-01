import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class SunkissedSands extends DrawCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onDeclaredAsAttacker: () => true,
                onDeclaredAsDefender: () => true
            },
            cost: ability.costs.kneelSelf(),
            message: {
                format: '{player} uses {source} to have {character} lose an icon of their choice until the end of the phase',
                args: { character: (context) => context.event.card }
            },
            gameAction: GameActions.genericHandler((context) => {
                this.game.promptForIcon(this.controller, this, (icon) => {
                    this.untilEndOfPhase((ability) => ({
                        match: context.event.card,
                        effect: ability.effects.removeIcon(icon)
                    }));

                    this.game.addMessage(
                        '{0} chooses to have {1} lose {2} {3} icon until the end of the phase',
                        this.controller,
                        context.event.card,
                        icon === 'intrigue' ? 'an' : 'a',
                        icon
                    );
                });
            })
        });
    }
}

SunkissedSands.code = '27546';
SunkissedSands.version = '1.0.0';

export default SunkissedSands;
