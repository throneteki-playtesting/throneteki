import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class RiverBarge extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                onCardOutOfShadows: (event) => event.card === this
            },
            target: {
                cardCondition: {
                    location: 'play area',
                    type: 'character',
                    condition: (card) =>
                        GameActions.loseIcon({ card }).allow() ||
                        GameActions.gainIcon({ card }).allow()
                }
            },
            message:
                '{player} uses {source} to have {target} gain or lose a military icon until the end of the phase',
            handler: (context) => {
                this.game.promptWithMenu(context.player, this.createPromptContext(context), {
                    activePrompt: {
                        menuTitle: 'Choose for ' + context.target.name + '?',
                        buttons: [
                            { text: 'Gain Military Icon', method: 'gainIcon' },
                            { text: 'Lose Military Icon', method: 'loseIcon' }
                        ]
                    },
                    source: this
                });
            }
        });
    }

    createPromptContext(context) {
        return {
            gainIcon: () => this.handleIcon(context, true),
            loseIcon: () => this.handleIcon(context, false)
        };
    }

    handleIcon(context, isGain) {
        this.untilEndOfPhase((ability) => ({
            match: context.target,
            effect: isGain
                ? ability.effects.addIcon('military')
                : ability.effects.removeIcon('military')
        }));

        this.game.addMessage(
            '{0} chooses to have {1} {2} a military icon until the end of the phase',
            context.player,
            context.target,
            isGain ? 'gain' : 'lose'
        );
        return true;
    }
}

RiverBarge.code = '26546';
RiverBarge.version = '1.0.0';

export default RiverBarge;
