import DrawCard from '../../drawcard.js';

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
                ),
            effect: ability.effects.contributeStrength(this, this.getContributedSTR())
        });
    }

    getContributedSTR() {
        return this.kneeled ? 2 : 1;
    }
}

NightfortRuins.code = '00122';

export default NightfortRuins;
