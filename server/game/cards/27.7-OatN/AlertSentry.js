// Generated with Claude Code - claude-opus-4-5-20250101
// - 2026-02-01: Created implementation for Alert Sentry

import DrawCard from '../../drawcard.js';

class AlertSentry extends DrawCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onBypassedByStealth: (event) =>
                    event.target.controller === this.controller && this.controller.canPutIntoPlay(this)
            },
            location: 'hand',
            max: ability.limit.perChallenge(1),
            handler: (context) => {
                this.game.addMessage(
                    '{0} uses {1} to put {1} into play as a defender after {2} was bypassed by stealth',
                    context.player,
                    this,
                    context.event.target
                );
                context.player.putIntoPlay(this, 'play', { kneeled: false });
                if (this.game.currentChallenge) {
                    this.game.currentChallenge.addDefender(this);
                }
            }
        });
    }
}

AlertSentry.code = '27602';
AlertSentry.version = '1.0.0';

export default AlertSentry;
