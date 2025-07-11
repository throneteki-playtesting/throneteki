import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';
import { Tokens } from '../../Constants/index.js';

class HotPie extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            match: (card) => card.getType() === 'character',
            effect: ability.effects.dynamicStrength((card) => card.tokens[Tokens.pie])
        });

        this.action({
            title: 'Bake a Pie',
            cost: ability.costs.kneelSelf(),
            phase: 'marshal',
            target: {
                cardCondition: (card) =>
                    card.getType() === 'character' && card.location === 'play area'
            },
            message: '{player} kneels {source} to bake a pie for {target}',
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.placeToken(() => ({ card: context.target, token: Tokens.pie })),
                    context
                );
            }
        });
    }
}

HotPie.code = '00357';

export default HotPie;
