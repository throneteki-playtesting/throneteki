import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class AlertSentry extends DrawCard {
    // Alert Sentry (27602)
    // Reaction: After a character you control is bypassed by stealth, put Alert Sentry into play
    // from your hand (standing), participating as a defender. (Max 1 per challenge.)
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onBypassedByStealth: (event, context) => event.target.controller === context.player
            },
            location: 'hand',
            max: ability.limit.perChallenge(1),
            message: {
                format: '{player} uses {source} to put {source} into play as a defender after {bypassed} was bypassed by stealth',
                args: { bypassed: (context) => context.event.target }
            },
            gameAction: GameActions.putIntoPlay((context) => ({
                card: context.source,
                kneeled: false
            })).then({
                gameAction: GameActions.addToChallenge((context) => ({ card: context.source }))
            })
        });
    }
}

AlertSentry.code = '27602';
AlertSentry.version = '1.0.1';

export default AlertSentry;
