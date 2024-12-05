import DrawCard from '../../drawcard.js';

class BaelorBrightsmile extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                afterChallenge: (event) =>
                    event.challenge.winner === this.controller &&
                    event.challenge.strengthDifference >= 5 &&
                    this.isParticipating()
            },
            message:
                '{player} uses {source} to place the top card of their deck as a duplicate on {source}',
            handler: () => {
                let dupe = this.controller.drawDeck[0];

                this.controller.removeCardFromPile(dupe);
                this.addDuplicate(dupe);
                dupe.facedown = true;
            }
        });
    }
}

BaelorBrightsmile.code = '26585';
BaelorBrightsmile.version = '1.0.0';

export default BaelorBrightsmile;
