import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class EuronCrowsEye extends DrawCard {
    // Euron Crow's Eye (27513)
    // Shadow (5). Pillage. Stealth.
    // Reaction: After a card you control comes out of shadows during the challenges phase, choose
    // and kneel a location. If that location's printed cost is greater than your initiative value,
    // you may stand it instead. (Limit twice per phase.)
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onCardOutOfShadows: (event, context) =>
                    context.game.currentPhase === 'challenge' &&
                    event.card.controller === context.player
            },
            target: {
                cardCondition: (card) =>
                    card.location === 'play area' && card.getType() === 'location'
            },
            limit: ability.limit.perPhase(2),
            message: '{player} uses {source} to choose {target}',
            gameAction: GameActions.ifCondition({
                condition: (context) =>
                    context.target.getPrintedCost() > context.player.getInitiative(),
                thenAction: GameActions.choose({
                    choices: {
                        Kneel: {
                            message: '{player} kneels {target}',
                            gameAction: GameActions.kneelCard((context) => ({
                                card: context.target
                            }))
                        },
                        Stand: {
                            message: '{player} stands {target}',
                            gameAction: GameActions.standCard((context) => ({
                                card: context.target
                            }))
                        }
                    }
                }),
                elseAction: GameActions.kneelCard((context) => ({ card: context.target }))
            })
        });
    }
}

EuronCrowsEye.code = '27513';
EuronCrowsEye.version = '1.2.0';

export default EuronCrowsEye;
