import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class AlertSentry extends DrawCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onBypassedByStealth: (event) => event.target.controller === this.controller
            },
            location: 'hand',
            max: ability.limit.perChallenge(1),
            message: {
                format: '{player} uses {source} to put {source} into play as a defender after {bypassed} was bypassed by stealth',
                args: { bypassed: (context) => context.event.target }
            },
            gameAction: GameActions.putIntoPlay({ card: this, kneeled: false }).then({
                gameAction: GameActions.addToChallenge({ card: this })
            })
        });
    }
}

AlertSentry.code = '27602';
AlertSentry.version = '1.0.0';

export default AlertSentry;
