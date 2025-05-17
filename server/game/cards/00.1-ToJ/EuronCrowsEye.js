import DrawCard from '../../drawcard.js';
import Tokens from '../../Constants/Tokens.js';

class EuronCrowsEye extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            match: (card) =>
                card.location === 'play area' &&
                card.getType() === 'character' &&
                card.hasTrait('Raider') &&
                card.controller === this.controller &&
                card.hasToken(Tokens.gold),
            targetController: 'current',
            effect: ability.effects.modifyStrength(1)
        });

        this.reaction({
            when: {
                onCardDiscarded: (event, context) =>
                    event.isPillage &&
                    event.source.controller === context.player &&
                    event.source.hasTrait('Raider')
            },
            limit: ability.limit.perRound(3),
            handler: (context) => {
                this.game.addMessage(
                    '{0} uses {1} to have {2} gain 1 gold',
                    this.controller,
                    this,
                    context.target
                );
                context.target.modifyToken(Tokens.gold, 1);
            }
        });
    }
}

EuronCrowsEye.code = '00125';

export default EuronCrowsEye;
