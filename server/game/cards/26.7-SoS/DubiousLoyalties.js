import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class DubiousLoyalties extends DrawCard {
    setupCardAbilities(ability) {
        this.attachmentRestriction({ loyal: false });
        this.whileAttached({
            effect: ability.effects.addTrait('House Bolton')
        });
        this.forcedReaction({
            when: {
                afterChallenge: (event) => !!event.challenge.winner && this.parent.isParticipating()
            },
            message: {
                format: '{winner} is forced by {source} to take control of {parent}',
                args: {
                    winner: (context) => context.event.challenge.winner,
                    parent: () => this.parent
                }
            },
            gameAction: GameActions.takeControl((context) => ({
                card: this.parent,
                player: context.event.challenge.winner
            }))
        });
    }
}

DubiousLoyalties.code = '26568';
DubiousLoyalties.version = '1.0.0';

export default DubiousLoyalties;
