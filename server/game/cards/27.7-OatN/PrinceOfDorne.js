import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class PrinceOfDorne extends DrawCard {
    // Prince of Dorne (27543)
    // Unique [martell] character you control only.
    // If attached character is Doran Martell, he gains a [military] icon.
    // Interrupt: When claim is applied for a [military] challenge in which you are the attacking
    // player, apply [intrigue] claim instead. Then, attached character gains 1 power.
    setupCardAbilities(ability) {
        this.attachmentRestriction({ faction: 'martell', unique: true });

        this.whileAttached({
            condition: (context) => context.source.parent.name === 'Doran Martell',
            effect: ability.effects.addIcon('military')
        });

        this.interrupt({
            when: {
                onClaimApplied: (event, context) =>
                    event.claim.challengeType === 'military' &&
                    event.challenge.attackingPlayer === context.player &&
                    !!context.source.parent &&
                    context.source.parent.location === 'play area'
            },
            message: {
                format: '{player} uses {source} to apply intrigue claim instead and have {parent} gain 1 power',
                args: { parent: (context) => context.source.parent }
            },
            gameAction: GameActions.changeClaimType((context) => ({
                event: context.event,
                challengeType: 'intrigue'
            })).then({
                gameAction: GameActions.gainPower((context) => ({
                    card: context.source.parent,
                    amount: 1
                }))
            })
        });
    }
}

PrinceOfDorne.code = '27543';
PrinceOfDorne.version = '1.1.0';

export default PrinceOfDorne;
