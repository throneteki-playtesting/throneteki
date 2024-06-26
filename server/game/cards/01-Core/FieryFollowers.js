import DrawCard from '../../drawcard.js';

class FieryFollowers extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                onPhaseStarted: (event) => event.phase === 'dominance' && this.kneeled
            },
            handler: () => {
                this.controller.standCard(this);
                this.game.addMessage('{0} uses {1} to stand {1}', this.controller, this);
            }
        });
    }
}

FieryFollowers.code = '01054';

export default FieryFollowers;
