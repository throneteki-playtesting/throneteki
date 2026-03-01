// Generated with Claude Code - claude-opus-4-5-20250101
// - 2026-02-01: Created implementation for Toll Enforcers

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

                this.game.addMessage(
                    '{0} uses {1} to force {2} to move 1 gold to {3} or end the challenge',
                    context.player,
                    this,
                    attacker,
                    context.target
                );
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
