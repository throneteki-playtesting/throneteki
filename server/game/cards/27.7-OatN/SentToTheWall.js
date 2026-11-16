import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class SentToTheWall extends DrawCard {
    // Sent to the Wall (27556)
    // Non-loyal characters only. Terminal.
    // Reaction: After the plot phase begins, name a Trait. If the controller of the attached
    // character reveales a plot card with the same Trait during this phase, discard the attached
    // character from play.
    setupCardAbilities() {
        this.attachmentRestriction({ loyal: false });
        this.reaction({
            when: {
                onPhaseStarted: (event) => event.phase === 'plot'
            },
            message: '{player} uses {source} to name a trait',
            gameAction: GameActions.nameTrait({
                message: '{player} names the {trait} trait for {source}',
                gameAction: GameActions.delayedEffect((context) => {
                    const attached = context.source.parent;
                    const trait = context.namedTrait;
                    return {
                        duration: 'untilEndOfPhase',
                        title: attached.name,
                        when: {
                            onPlotRevealed: (event) =>
                                event.plot.controller === attached.controller &&
                                event.plot.hasTrait(trait)
                        },
                        message: {
                            format: '{player} forces {controller} to discard {card} from play',
                            args: { controller: () => attached.controller, card: () => attached }
                        },
                        gameAction: GameActions.discardCard({ card: attached })
                    };
                })
            })
        });
    }
}

SentToTheWall.code = '27556';
SentToTheWall.version = '1.0.0';

export default SentToTheWall;
