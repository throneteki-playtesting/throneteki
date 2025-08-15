import DrawCard from '../../drawcard.js';
import { Tokens } from '../../Constants/index.js';

class NightfortRuins extends DrawCard {
    setupCardAbilities(ability) {
        this.plotModifiers({
            reserve: 1
        });

        this.persistentEffect({
            condition: () =>
                this.game.isDuringChallenge({ challengeType: 'power' }) &&
                this.controller.anyCardsInPlay(
                    (card) => card.isParticipating() && card.getType() === 'character'
                ) &&
                !this.kneeled,
            effect: ability.effects.contributeStrength(this, this.tokens[Tokens.gold])
        });
    }
}

NightfortRuins.code = '00123';

export default NightfortRuins;
