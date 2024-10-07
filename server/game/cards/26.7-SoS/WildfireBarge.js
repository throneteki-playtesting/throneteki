import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class WildfireBarge extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Sacrifice to kill',
            phase: 'plot',
            // TODO: This probably shouldn't actually be a target, but rather a select within handler (based on cards wording). I am lazy.
            target: {
                choosingPlayer: (player) =>
                    player.getNumberOfCardsInPlay({ type: 'character' }) > 3,
                cardCondition: (card, context) =>
                    card.location === 'play area' &&
                    card.controller === context.choosingPlayer &&
                    card.getType() === 'character'
            },
            cost: ability.costs.sacrificeSelf(),
            message: {
                format: '{player} sacrifices {costs.sacrifice} to have {choosingPlayer} each kill {target}',
                args: { choosingPlayer: (context) => context.choosingPlayer }
            },
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.simultaneously((context) =>
                        context.target.map((card) => GameActions.kill({ card, allowSave: false }))
                    ),
                    context
                );
            }
        });
    }
}

WildfireBarge.code = '26535';
WildfireBarge.version = '1.0.0';

export default WildfireBarge;
