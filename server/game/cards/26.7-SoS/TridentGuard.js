import DrawCard from '../../drawcard.js';

class TridentGuard extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: () =>
                this.game
                    .getPlayers()
                    .some((player) => player.getClaim() < this.controller.getClaim()),
            match: this,
            effect: ability.effects.addKeyword('renown')
        });
    }
}

TridentGuard.code = '26566';
TridentGuard.version = '1.0.0';

export default TridentGuard;
