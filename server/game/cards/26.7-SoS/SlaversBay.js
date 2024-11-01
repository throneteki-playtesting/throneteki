import DrawCard from '../../drawcard.js';

class SlaversBay extends DrawCard {
    setupCardAbilities(ability) {
        const killDuringChallengePersistentEffect = ({ challengeType, location }) => {
            this.persistentEffect({
                condition: () =>
                    this.game.isDuringChallenge({ challengeType }) &&
                    this.controller.anyCardsInPlay({ name: location }),
                match: (card) => card.isParticipating(),
                effect: ability.effects.killIf((card) => card.getStrength() <= 1),
                targetController: 'any'
            });
        };

        killDuringChallengePersistentEffect({ challengeType: 'military', location: 'Astapor' });
        killDuringChallengePersistentEffect({ challengeType: 'intrigue', location: 'Yunkai' });
        killDuringChallengePersistentEffect({ challengeType: 'power', location: 'Meereen' });
    }
}

SlaversBay.code = '26581';
SlaversBay.version = '1.0.0';

export default SlaversBay;
