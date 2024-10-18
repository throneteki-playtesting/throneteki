import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class StallionWhoMountsTheWorld extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                afterChallenge: (event) =>
                    event.challenge.challengeType === 'power' &&
                    event.challenge.winner === this.controller &&
                    event.challenge.strengthDifference >= 5
            },
            message: '{player} plays {source} to search their deck',
            gameAction: GameActions.search({
                title: 'Select a character',
                match: { unique: true, trait: 'Dothraki', type: 'character' },
                message: '{player} puts {searchTarget} into play',
                gameAction: GameActions.simultaneously((context) => [
                    GameActions.putIntoPlay({
                        card: context.searchTarget
                    }),
                    GameActions.genericHandler(() => {
                        this.untilEndOfPhase((ability) => ({
                            match: context.searchTarget,
                            effect: ability.effects.addKeyword('intimidate')
                        }));
                    })
                ])
            })
        });
    }
}

StallionWhoMountsTheWorld.code = '26584';
StallionWhoMountsTheWorld.version = '1.0.0';

export default StallionWhoMountsTheWorld;
