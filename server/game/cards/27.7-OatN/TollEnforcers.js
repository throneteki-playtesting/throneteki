// Generated with Claude Code - claude-opus-4-5-20250101
// - 2026-02-01: Created implementation for Toll Enforcers
// - 2026-02-28: Refactored to use message: on reaction

import DrawCard from '../../drawcard.js';
import { Tokens } from '../../Constants/index.js';

class TollEnforcers extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: () => this.tokens[Tokens.gold] >= 2,
            match: this,
            effect: ability.effects.addKeyword('renown')
        });

        this.reaction({
            when: {
                onChallengeInitiated: (event) =>
                    event.challenge.initiatedAgainstPlayer === this.controller
            },
            limit: ability.limit.perRound(1),
            target: {
                activePromptTitle: 'Select a card to receive the gold',
                cardCondition: (card) =>
                    card.location === 'play area' && card.controller === this.controller
            },
            message: {
                format: '{player} uses {source} to force {attacker} to move 1 gold to {target} or end the challenge',
                args: { attacker: (context) => context.event.challenge.attackingPlayer }
            },
            handler: (context) => {
                let attacker = context.event.challenge.attackingPlayer;
                this.selectedCard = context.target;

                if (attacker.gold < 1) {
                    this.cancelChallenge(context);
                    return;
                }

                this.game.promptWithMenu(attacker, this, {
                    activePrompt: {
                        menuTitle: `Move 1 gold to ${this.selectedCard.name} or end the challenge?`,
                        buttons: [
                            { text: 'Move 1 gold', method: 'moveGold', arg: context.player.uuid },
                            {
                                text: 'End challenge',
                                method: 'cancelChallenge',
                                arg: context.player.uuid
                            }
                        ]
                    },
                    waitingPromptTitle: 'Waiting for opponent to choose'
                });
            }
        });
    }

    moveGold(player) {
        player.modifyGold(-1);
        this.selectedCard.modifyToken(Tokens.gold, 1);

        this.game.addMessage(
            '{0} chooses to move 1 gold to {1} to let the challenge continue',
            player,
            this.selectedCard
        );

        this.selectedCard = undefined;
        return true;
    }

    cancelChallenge(context) {
        this.game.currentChallenge.cancelChallenge();

        this.game.addMessage(
            '{0} uses {1} to end the current challenge with no winner or loser',
            context?.player || this.controller,
            this
        );

        this.selectedCard = undefined;
        return true;
    }
}

TollEnforcers.code = '27600';
TollEnforcers.version = '1.0.0';

export default TollEnforcers;
