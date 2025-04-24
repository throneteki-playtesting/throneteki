import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class DubiousLoyalties extends DrawCard {
    setupCardAbilities(ability) {
        this.attachmentRestriction({ owner: 'current' });
        this.whileAttached({
            condition: () =>
                !this.controller.anyCardsInPlay(
                    (card) => card.getType() === 'character' && card.isLoyal()
                ),
            match: this.parent,
            effect: [
                ability.effects.addKeyword('Stealth'),
                ability.effects.addKeyword('Renown'),
                ability.effects.addTrait('House Bolton')
            ]
        });
        this.reaction({
            when: {
                afterChallenge: (event) => !!event.challenge.winner
            },
            player: () => this.game.currentChallenge.winner,
            cost: ability.costs.kneelFactionCard(),
            message: {
                format: '{player} uses {source} and kneels their faction card to take control of {parent}',
                args: {
                    parent: () => this.parent
                }
            },
            gameAction: GameActions.takeControl((context) => ({
                card: this.parent,
                player: context.player
            }))
        });
    }
}

DubiousLoyalties.code = '26568';
DubiousLoyalties.version = '1.1.0';

export default DubiousLoyalties;
