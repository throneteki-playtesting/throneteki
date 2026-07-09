import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class PrinceOfDorne extends DrawCard {
    setupCardAbilities(ability) {
        this.attachmentRestriction({ faction: 'martell', unique: true });

        this.whileAttached({
            condition: () => this.parent && this.parent.name === 'Doran Martell',
            effect: ability.effects.addIcon('military')
        });

        this.interrupt({
            when: {
                onClaimApplied: (event) =>
                    event.claim.challengeType === 'military' &&
                    event.challenge.attackingPlayer === this.controller &&
                    this.parent &&
                    this.parent.location === 'play area'
            },
            message: {
                format: '{player} uses {source} to apply intrigue claim instead and have {parent} gain 1 power',
                args: { parent: () => this.parent }
            },
            handler: (context) => {
                context.event.claim.challengeType = 'intrigue';
                this.game.resolveGameAction(
                    GameActions.gainPower({ card: this.parent, amount: 1 }),
                    context
                );
            }
        });
    }
}

PrinceOfDorne.code = '27543';
PrinceOfDorne.version = '1.1.0';

export default PrinceOfDorne;
