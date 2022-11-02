const DrawCard = require('../../drawcard');

class TheEyrie extends DrawCard {
    setupCardAbilities(ability) {
        this.plotModifiers({
            initiative: -2,
            reserve: 1
        });

        this.persistentEffect({
            condition: () => this.controller.getTotalInitiative() === 0,
            match: this,
            effect: ability.effects.immuneTo(card => card.controller !== this.controller)
        });

        this.action({
            title: 'Contribute STR',
            phase: 'challenge',
            cost: ability.costs.kneelSelf(),
            condition: () => this.game.isDuringChallenge() && this.game.currentChallenge.anyParticipants(card => card.controller === this.controller && (card.isLoyal() || card.hasTrait('House Arryn'))),
            message: {
                format: '{player} kneels {source} to have it contribute {amount} STR to {player}\'s side of the challenge',
                args: { amount: () => this.calculateAmount() }
            },
            handler: () => {
                // TODO: Update this (contribute strength) to a GameAction
                this.untilEndOfChallenge(ability => ({
                    condition: () => true,
                    targetController: 'current',
                    effect: ability.effects.contributeChallengeStrength(this.calculateAmount())
                }));
            }
        });
    }

    calculateAmount() {
        return this.game.currentChallenge.getNumberOfParticipants(card => card.controller === this.controller) * 2;
    }
}

TheEyrie.code = '23031';

module.exports = TheEyrie;
