const DrawCard = require('../../drawcard.js');

class LordProtectorOfTheVale extends DrawCard {
    setupCardAbilities(ability) {
        this.attachmentRestriction({ trait: 'Lord' });

        this.whileAttached({
            match: card => card.name === 'Littlefinger',
            effect: ability.effects.modifyStrength(2)
        });

        this.action({
            title: 'Contribute attached STR',
            phase: 'challenge',
            cost: ability.costs.kneelSelf(),
            condition: () => this.game.isDuringChallenge() && this.controller.anyCardsInPlay({ trait: 'House Arryn', type: 'character', participating: true }),
            message: {
                format: '{player} kneels {source} to have {parent} contribute its STR (currently {STR}) to {player}\'s side until the end of the challenge',
                args: { 
                    parent: () => this.parent,
                    STR: () => this.parent.getStrength()
                }
            },
            handler: () => {
                this.untilEndOfChallenge(ability => ({
                    // Force the effect to recalculate mid-challenge in case the character STR changes
                    condition: () => true,
                    targetController: 'current',
                    effect: ability.effects.contributeChallengeStrength(() => this.parent.getStrength())
                }));
            }
        });
    }
}

LordProtectorOfTheVale.code = '23035';

module.exports = LordProtectorOfTheVale;
