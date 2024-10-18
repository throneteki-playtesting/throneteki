import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class NorthernPatriarch extends DrawCard {
    setupCardAbilities(ability) {
        this.interrupt({
            canCancel: true,
            when: {
                onCardAbilityInitiated: (event) =>
                    event.source.controller !== this.controller &&
                    (event.source.getType() == 'event' ||
                        (event.source.getType() === 'plot' && event.source.hasTrait('Omen')))
            },
            message: {
                format: '{player} uses {source} to cancel {initiatingCard}',
                args: { initiatingCard: (context) => context.event.source }
            },
            gameAction: GameActions.choose({
                player: (context) => context.event.source.controller,
                choices: {
                    [`Move power to ${this.name}`]: {
                        message: {
                            format: '{initiatingPlayer} moves 1 power from their faction to {source}',
                            args: { initiatingPlayer: (context) => context.event.source.controller }
                        },
                        gameAction: GameActions.movePower((context) => ({
                            from: context.event.source.controller.faction,
                            to: this,
                            amount: 1
                        }))
                    },
                    'Allow cancel': GameActions.genericHandler((context) => {
                        context.event.cancel();
                    })
                }
            }),
            limit: ability.limit.perRound(1)
        });
    }
}

NorthernPatriarch.code = '26565';
NorthernPatriarch.version = '1.0.0';

export default NorthernPatriarch;
