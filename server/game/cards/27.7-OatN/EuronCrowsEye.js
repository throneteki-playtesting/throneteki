import DrawCard from '../../drawcard.js';

class EuronCrowsEye extends DrawCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onCardOutOfShadows: (event) => event.card.controller === this.controller
            },
            choices: {
                'Gain Assault': () => {
                    this.untilEndOfPhase((ability) => ({
                        match: this,
                        effect: ability.effects.addKeyword('assault')
                    }));
                    this.game.addMessage(
                        '{0} uses {1} to gain Assault until end of phase',
                        this.controller,
                        this
                    );
                },
                'Gain Insight': () => {
                    this.untilEndOfPhase((ability) => ({
                        match: this,
                        effect: ability.effects.addKeyword('insight')
                    }));
                    this.game.addMessage(
                        '{0} uses {1} to gain Insight until end of phase',
                        this.controller,
                        this
                    );
                },
                'Gain Renown': () => {
                    this.untilEndOfPhase((ability) => ({
                        match: this,
                        effect: ability.effects.addKeyword('renown')
                    }));
                    this.game.addMessage(
                        '{0} uses {1} to gain Renown until end of phase',
                        this.controller,
                        this
                    );
                },
                'Gain Stealth': () => {
                    this.untilEndOfPhase((ability) => ({
                        match: this,
                        effect: ability.effects.addKeyword('stealth')
                    }));
                    this.game.addMessage(
                        '{0} uses {1} to gain Stealth until end of phase',
                        this.controller,
                        this
                    );
                }
            },
            limit: ability.limit.perPhase(1)
        });
    }
}

EuronCrowsEye.code = '27513';
EuronCrowsEye.version = '1.1.0';

export default EuronCrowsEye;
