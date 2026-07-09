import DrawCard from '../../drawcard.js';

class CaptainOfTheIronFleet extends DrawCard {
    setupCardAbilities(ability) {
        this.attachmentRestriction({ trait: 'Ironborn' });
        this.whileAttached({
            effect: ability.effects.addTrait('Captain')
        });
        this.action({
            title: 'Participate in challenge',
            condition: () => this.game.isDuringChallenge({ challengeType: ['military', 'power'] }),
            cost: [
                ability.costs.kneelSelf(),
                ability.costs.kneel({ type: 'location', trait: 'Warship' })
            ],
            message: {
                format: '{player} kneels {costs.kneel} to add {parent} to the challenge',
                args: { parent: () => this.parent }
            },
            handler: () => {
                this.game.currentChallenge.addParticipantToSide(
                    this.parent.controller,
                    this.parent
                );
            }
        });
    }
}

CaptainOfTheIronFleet.code = '27519';
CaptainOfTheIronFleet.version = '1.0.1';

export default CaptainOfTheIronFleet;
