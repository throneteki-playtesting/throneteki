import AgendaCard from '../../agendacard.js';
import GameActions from '../../GameActions/index.js';

class ArmedToTheTeeth extends AgendaCard {
    constructor(owner, cardData) {
        super(owner, cardData);

        this.registerEvents(['onPlayerKeepHandOrMulligan']);
    }

    setupCardAbilities(ability) {
        this.action({
            title: 'Put attachment into play',
            cost: [
                ability.costs.kneelFactionCard(),
                ability.costs.payXGold(
                    () => Math.min(...this.attachmentCosts()),
                    () => Math.max(...this.attachmentCosts())
                )
            ],
            target: {
                type: 'select',
                activePromptTitle: 'Select an attachment',
                cardCondition: (card, context) =>
                    context.player.agenda.underneath.includes(card) &&
                    card.getType() === 'attachment' &&
                    card.hasPrintedCost() &&
                    (context.xValue === undefined || card.getPrintedCost() === context.xValue) &&
                    GameActions.putIntoPlay({ card }).allow()
            },
            message: {
                format: '{player} uses {source}, kneels their faction card and pays {xValue} gold to put {target} into play from underneath {source}',
                args: { xValue: (context) => context.xValue }
            },
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.putIntoPlay((context) => ({ card: context.target })),
                    context
                );
            }
        });
    }

    onPlayerKeepHandOrMulligan(event) {
        if (event.player !== this.controller) {
            return;
        }
        const context = {
            player: this.controller,
            game: this.game,
            source: this
        };
        this.game.resolveGameAction(
            GameActions.search({
                title: 'Select 7 attachments',
                match: { type: 'attachment', trait: 'Weapon' },
                reveal: true,
                numToSelect: 7,
                message: '{player} places {searchTarget} facedown under {source}',
                gameAction: GameActions.simultaneously((context) =>
                    context.searchTarget.map((card) =>
                        GameActions.placeCardUnderneath({
                            card,
                            parentCard: context.player.agenda,
                            facedown: false
                        })
                    )
                )
            }),
            context
        );
    }

    attachmentCosts() {
        const attachments = this.controller.agenda.underneath.filter(
            (card) => card.getType() === 'attachment' && card.hasPrintedCost()
        );
        return attachments.map((card) => card.getPrintedCost());
    }
}

ArmedToTheTeeth.code = '26618';
ArmedToTheTeeth.version = '1.0.0';

export default ArmedToTheTeeth;
