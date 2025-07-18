import { Tokens } from '../../Constants/index.js';
import DrawCard from '../../drawcard.js';

class BlackBalaq extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: () => this.isAttacking(),
            match: (card) => card.isDefending(),
            targetController: 'opponent',
            effect: ability.effects.dynamicStrength(() => -this.tokens[Tokens.gold])
        });
    }
}

BlackBalaq.code = '00248';

export default BlackBalaq;
