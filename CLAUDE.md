# Throneteki Card Implementation Guide

This repository is a fan-maintained AGoT LCG 2nd Edition online client (throneteki), extended with custom playtesting cards. This guide covers everything needed to implement new cards autonomously.

---

## Repository Layout (Server-Side Focus)

```
throneteki/
├── server/game/
│   ├── cards/                  # Card implementations, organised by pack
│   │   ├── 01-Core/
│   │   ├── 17.1-R/
│   │   ├── 18-FH/
│   │   ├── 26.1-WAID/
│   │   ├── 26.2-WoW/
│   │   ├── 26.3-MaV/
│   │   ├── ...                 # All packs follow <cycle>-<packCode>/ naming
│   │   └── index.js            # Auto-loads all card files; no manual registration needed
│   ├── GameActions/index.js    # All game action factory functions
│   ├── effects.js              # All ability effect implementations
│   ├── costs.js                # All cost implementations
│   ├── Constants/
│   │   ├── Tokens.js           # Token name constants
│   │   └── Flags.js            # Internal flag constants
│   ├── drawcard.js             # Base class for character/location/event/attachment
│   ├── plotcard.js             # Base class for plot cards
│   └── agendacard.js           # Base class for agenda cards
├── throneteki-json-data/packs/ # JSON card data (one file per pack)
│   ├── WAID.json
│   ├── WoW.json
│   └── ...
└── test/server/cards/          # Jasmine integration tests, mirroring cards/ structure
    ├── 17.1-R/
    ├── 18-FH/
    ├── 26.1-WAID/
    └── ...
```

---

## Module System

All card files use **ES module syntax** — not CommonJS. The original docs show `require()`/`module.exports` but those are outdated.

```js
// CORRECT (modern)
import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';
import { Tokens } from '../../Constants/index.js';

class MyCard extends DrawCard { ... }

MyCard.code = '26001';

export default MyCard;
```

---

## Card Classes

| Card type                                    | Base class  |
|----------------------------------------------|-------------|
| Character, Location, Event, Attachment       | `DrawCard`  |
| Plot                                         | `PlotCard`  |
| Agenda                                       | `AgendaCard`|

---

## JSON Card Data and Card Codes

JSON data lives in `throneteki-json-data/packs/<PackCode>.json`. Example entry:

```json
{
  "code": "26001",
  "type": "character",
  "name": "Ser Clayton Suggs",
  "unique": true,
  "faction": "baratheon",
  "loyal": false,
  "cost": 3,
  "icons": { "military": true, "intrigue": false, "power": true },
  "strength": 3,
  "traits": ["Knight", "R'hllor"],
  "text": "<b>Reaction:</b> ...",
  "deckLimit": 3
}
```

The `code` field is the unique card identifier: first 2 digits = pack number, last 3 = position in pack (e.g., `26012` = pack 26, card 12). Assign this to `MyCard.code`.

To find cards with similar effects, search the JSON data files for trait keywords, ability text patterns, or browse existing implementations in the corresponding server card directory.

**Card label format for tests**: `'Card Name (PackCode)'` — e.g., `'Vargo Hoat (FH)'`, `'The King in the North (R)'`. When a name is unique across packs, the plain name works.

---

## Implementing a Card

### 1. Create the file

Place it in `/server/game/cards/<cycle>-<packCode>/MyCardName.js`. Each word in the filename is capitalised. The file is auto-discovered by `cards/index.js` — no manual registration needed.

### 2. Implement the class

```js
import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class MyCard extends DrawCard {
    setupCardAbilities(ability) {
        // Declare all abilities here
    }
}

MyCard.code = '26001';

export default MyCard;
```

### 3. Write a test

Place the spec at `test/server/cards/<packCode>/MyCard.spec.js`. The `cancreatecards.spec.js` test also runs automatically and will catch any instantiation errors.

---

## Ability Types

### `persistentEffect` — continuous, conditional bonuses

```js
// While another Raider character is in play, this card gains Intimidate
this.persistentEffect({
    condition: () => this.controller.filterCardsInPlay(
        card => card !== this && card.hasTrait('Raider') && card.getType() === 'character'
    ).length > 0,
    match: this,
    effect: ability.effects.addKeyword('intimidate')
});

// Affects all matching cards controlled by anyone
this.persistentEffect({
    match: card => card.getType() === 'character',
    targetController: 'any',   // 'current' (default), 'opponent', 'any'
    effect: ability.effects.modifyStrength(1)
});

// Dynamic strength based on game state
this.persistentEffect({
    match: this,
    effect: ability.effects.dynamicStrength(() => this.controller.gold)
});
```

### `whileAttached` — persistent effect on the attached card

```js
this.whileAttached({
    effect: [ability.effects.addTrait('Commander'), ability.effects.addKeyword('Renown')]
});

// Optional match condition
this.whileAttached({
    condition: () => this.parent.isParticipating(),
    targetController: 'any',
    effect: ability.effects.cannotPutIntoPlay(card => card.location === 'shadows')
});
```

### `attachmentRestriction` — limits what can be attached to

```js
this.attachmentRestriction({ trait: ['Lord', 'Lady'] });
this.attachmentRestriction({ controller: 'opponent' });
this.attachmentRestriction({ faction: 'stark', trait: 'Lord' });
this.attachmentRestriction({ type: 'location' });          // for non-character targets
this.attachmentRestriction({ loyal: false, owner: 'current' });
// Multiple restrictions (OR logic):
this.attachmentRestriction({ trait: 'Dothraki' }, { name: 'Daenerys Targaryen' });
// Function form for complex logic:
this.attachmentRestriction(card => card.getType() === 'character' && card.getPrintedCost() <= 4);
```

### `plotModifiers` — plot modifier icons

```js
this.plotModifiers({ gold: 3 });
this.plotModifiers({ reserve: 1, gold: 1, initiative: 2 });
```

### `action` — player-triggered ability

```js
this.action({
    title: 'Stand attached character',
    phase: 'challenge',              // omit for 'any'; also: 'plot','draw','marshal','dominance'
    cost: ability.costs.kneelSelf(),
    condition: () => this.parent && this.parent.kneeled,
    target: {
        cardCondition: card =>
            card.location === 'play area' && card.getType() === 'character'
    },
    message: '{player} uses {source} to stand {target}',
    handler: context => {
        this.controller.standCard(context.target);
    }
});
```

**Opponent targeting (`chooseOpponent`):**

```js
// Auto-select: runs for any opponent matching the predicate
this.action({
    chooseOpponent: player => player.getNumberOfCardsInPlay({ type: 'location' }) < this.controller.getNumberOfCardsInPlay({ type: 'location' }),
    handler: context => {
        this.untilEndOfPhase(ability => ({
            targetController: context.opponent,
            effect: ability.effects.cannotInitiateChallengeType('intrigue', opp => opp === this.controller)
        }));
    }
});

// Prompt player to pick any opponent:
this.reaction({
    chooseOpponent: true,
    handler: context => { /* context.opponent is the chosen player */ }
});
```

### `reaction` / `forcedReaction` — triggered after an event

```js
this.reaction({
    when: {
        onCardEntersPlay: event => event.card === this
    },
    limit: ability.limit.perPhase(1),
    cost: ability.costs.payGold(1),
    message: '{player} uses {source} to gain 2 gold',
    gameAction: GameActions.gainGold(context => ({ player: context.player, amount: 2 }))
});

this.forcedReaction({
    when: {
        onPhaseStarted: (event, context) =>
            event.phase === 'dominance' && !context.player.anyCardsInPlay({ type: 'character', trait: 'King' })
    },
    message: '{player} is forced by {source} to sacrifice a character',
    handler: context => { /* ... */ }
});
```

### `interrupt` / `forcedInterrupt` — triggered before an event resolves

```js
// Save interrupt (canCancel: true)
this.interrupt({
    canCancel: true,
    when: {
        onCharacterKilled: event => event.allowSave && event.card === this.parent
    },
    handler: context => {
        context.event.saveCard();
        // pay cost or do other effects
    }
});
```

### `whenRevealed` — plot when-revealed abilities

```js
this.whenRevealed({
    target: {
        cardCondition: card => card.location === 'play area' && card.getType() === 'character'
    },
    handler: context => {
        // context.target is the chosen card
    }
});
```

---

## Ability Properties Reference

| Property         | Description |
|-----------------|-------------|
| `when`          | Object mapping event names to condition functions. Trigger fires when any returns `true`. |
| `handler`       | Function called when ability resolves. Receives `context` with `player`, `event`, `target`, `targets`, `opponent`, `costs`. |
| `gameAction`    | GameAction shorthand instead of `handler` for simple single-action resolutions. Prints the message first, then resolves. |
| `message`       | Log message. String (with `{player}`, `{source}`, `{target}`, `{opponent}`), object `{ format, args }` for dynamic args, or function. |
| `condition`     | Function returning `bool`; ability will not fire if `false`. |
| `cost`          | Single cost or array of costs. |
| `limit`         | Ability limit: `ability.limit.perPhase(1)`, `perChallenge(1)`, `perRound(1)`. |
| `target`        | Target selection config (see below). |
| `targets`       | Multiple named targets (`targets: { name1: {...}, name2: {...} }`). |
| `choices`       | Multi-choice abilities: keys are button labels, values are handlers or `{ condition, gameAction, message }` objects. |
| `location`      | Where the card must be to activate (e.g., `'hand'`, `'discard pile'`). Default is `'play area'`. |
| `phase`         | Restrict action to a phase: `'marshal'`, `'challenge'`, etc. |
| `chooseOpponent`| `true` to prompt for opponent, or `(player) => bool` to auto-select. |
| `player`        | Override which player's reaction fires (e.g., `() => this.game.currentChallenge.winner`). |
| `max`           | Alternative to `limit` in some reactions. |

---

## Target Selection

```js
target: {
    activePromptTitle: 'Select a character',   // overrides default "Select a card"
    type: 'select',    // use 'select' for non-targeting effects (no immunity check)
    mode: 'upTo',      // 'upTo' for multi-select; also 'exactly', 'unlimited', 'atLeast'
    numCards: 3,
    cardCondition: (card, context) =>
        card.location === 'play area' &&
        card.getType() === 'character' &&
        card.controller === context.player,
}
```

`context.target` holds the selected card. For `mode: 'upTo'`, `context.target` is an array.

---

## Lasting Effects

Applied within handler code. These **must not** be used in `setupCardAbilities`.

```js
// Until end of phase
this.untilEndOfPhase(ability => ({
    match: context.target,
    effect: ability.effects.modifyStrength(3)
}));

// Until end of challenge
this.untilEndOfChallenge(ability => ({
    match: this.parent,
    effect: ability.effects.addKeyword('stealth')
}));

// Until end of round
this.untilEndOfRound(ability => ({
    match: plotCard,
    effect: ability.effects.addTrait('Winter')
}));

// At end of phase (fires at end, not immediately)
this.atEndOfPhase(ability => ({
    match: card,
    effect: ability.effects.discardIfStillInPlay(false)
}));

// Custom lasting effect with until condition
this.lastingEffect(ability => ({
    until: {
        onPhaseStarted: () => true
    },
    match: context.target,
    targetLocation: ['play area', 'out of game'],
    effect: ability.effects.removeFromGame()
}));
```

---

## GameActions

Import from `'../../GameActions/index.js'`. Used as the `gameAction` property in abilities, or resolved via `this.game.resolveGameAction(action, context)`.

```js
// Drawing cards
GameActions.drawCards(context => ({ player: context.player, amount: 2 }))

// Gaining gold
GameActions.gainGold(context => ({ player: context.player, amount: 3 }))

// Gaining power
GameActions.gainPower({ card: this, amount: 1 })
GameActions.gainPower({ card: this.parent, amount: 1 })

// Kill / sacrifice / discard
GameActions.kill(context => ({ card: context.target }))
GameActions.sacrificeCard({ card })
GameActions.discardCard(context => ({ card: context.target }))

// Move to hand / shadows / deck
GameActions.returnCardToHand({ card })
GameActions.putIntoShadows({ card })
GameActions.returnCardToDeck({ card, bottom: true })
GameActions.shuffleIntoDeck({ card })

// Put into play
GameActions.putIntoPlay(context => ({ card: context.target, player: context.player }))

// Kneel / stand
GameActions.kneelCard({ card: this })
GameActions.standCard({ card: this })

// Gold operations
GameActions.transferGold(context => ({ from: this, to: context.target, amount: 1 }))
GameActions.gainGold(context => ({ player: context.player, amount: 1 }))
GameActions.returnGoldToTreasury({ player, amount })

// Tokens
GameActions.placeToken({ card, token: Tokens.gold, amount: 1 })
GameActions.discardToken({ card, token: Tokens.gold, amount: 1 })

// Take control
GameActions.takeControl(context => ({ card: context.target, player: context.player }))

// Search deck
GameActions.search({
    title: 'Select a card',
    match: { name: 'Silence' },                       // or a function
    message: '{player} searches and {gameAction}',
    gameAction: GameActions.addToHand(context => ({ card: context.searchTarget }))
})

// Multiple simultaneous actions
GameActions.simultaneously([
    GameActions.standCard({ card: this }),
    GameActions.drawCards(context => ({ player: context.player, amount: 1 }))
])

// Conditional action
GameActions.ifCondition({
    condition: context => someTest,
    thenAction: GameActions.genericHandler(context => { /* ... */ })
})

// Raw handler (escape hatch)
GameActions.genericHandler(context => { /* arbitrary side-effectful code */ })

// Check if an action would be allowed (for conditions)
GameActions.kill({ card }).allow()
```

**Chaining actions** using `.thenExecute()` and `.then()`:

```js
this.game.resolveGameAction(
    GameActions.putIntoPlay(context => ({ card: context.target }))
        .thenExecute(event => {
            this.atEndOfPhase(ability => ({
                match: event.card,
                effect: ability.effects.discardIfStillInPlay(true)
            }));
        }),
    context
);
```

---

## Effects Reference (Key Ones)

Via `ability.effects.*` in `persistentEffect`, `whileAttached`, `untilEndOfPhase`, etc.

```js
// Strength
ability.effects.modifyStrength(1)
ability.effects.modifyStrength(-2)
ability.effects.dynamicStrength(() => this.controller.gold)
ability.effects.setStrength(0)
ability.effects.cannotIncreaseStrength(context => context.resolutionStage === 'effect')
ability.effects.cannotDecreaseStrength(...)

// Icons
ability.effects.addIcon('military')    // 'military', 'intrigue', 'power'
ability.effects.removeIcon('intrigue')
ability.effects.dynamicIcons(card => [...])

// Keywords
ability.effects.addKeyword('stealth')
ability.effects.addKeyword('Renown')
ability.effects.removeKeyword('stealth')
ability.effects.losesAllKeywords()
ability.effects.dynamicKeywords(card => [...])
ability.effects.dynamicKeywordSources(card => bool)  // copies keywords from matching cards

// Traits and factions
ability.effects.addTrait('Commander')
ability.effects.removeTrait('Knight')
ability.effects.addFaction('targaryen')
ability.effects.losesAllFactions()
ability.effects.losesAllTraits()

// Loyality
ability.effects.setLoyal(true)

// Keywords for plot modifiers (on plots)
ability.effects.modifyGold(3)
ability.effects.modifyInitiative(2)
ability.effects.modifyReserve(1)
ability.effects.modifyClaim(1)

// Restrictions
ability.effects.cannotMarshal(card => condition)
ability.effects.cannotPutIntoPlay(card => condition)
ability.effects.cannotPlay(card => card.getPrintedType() === 'event')
ability.effects.cannotBeDeclaredAsAttacker()
ability.effects.cannotBeDeclaredAsDefender()
ability.effects.cannotParticipate()
ability.effects.cannotGainPower()
ability.effects.cannotBeTargetedByAssault()
ability.effects.cannotBeBypassedByStealth()
ability.effects.cannotTriggerCardAbilities(restriction => bool)
ability.effects.cannotInitiateChallengeType('intrigue', opponent => opponent === this.controller)

// Participation
ability.effects.doesNotKneelAsAttacker()
ability.effects.doesNotKneelAsDefender()
ability.effects.mustBeDeclaredAsAttacker()
ability.effects.mustBeDeclaredAsDefender()
ability.effects.consideredToBeAttacking()

// Discard / kill effects (timed)
ability.effects.discardIfStillInPlay(allowSave)
ability.effects.killIfStillInPlay(allowSave)
ability.effects.returnToHandIfStillInPlay(allowSave)

// Blanking
ability.effects.blankExcludingTraits
ability.effects.fullBlank

// Immunity
ability.effects.immuneTo(cardCondition)
ability.effects.losesAllImmunities()

// Other
ability.effects.removeFromGame()
ability.effects.gainAmbush()
ability.effects.addAttachmentRestriction(restriction)
ability.effects.restrictAttachmentsTo(trait)
ability.effects.takeControl(newController)
ability.effects.doesNotContributeToDominance()
ability.effects.optionalStandDuringStanding()

// Cost reducers
ability.effects.reduceCost({ amount, match, playingTypes })
ability.effects.reduceNextMarshalledCardCost(amount, match)
ability.effects.reduceSelfCost(playingTypes, amount)

// Player-level effects (targetType: 'player' implied)
ability.effects.mayInitiateAdditionalChallenge('military')
ability.effects.modifyDrawPhaseCards(1)
ability.effects.modifyMaxLimited(1)
```

---

## Costs Reference (Key Ones)

Via `ability.costs.*` in `cost: [...]` on abilities.

```js
ability.costs.kneelSelf()
ability.costs.kneelFactionCard()
ability.costs.kneelParent()
ability.costs.kneel(condition)          // kneel a card matching condition

ability.costs.sacrificeSelf()
ability.costs.sacrificeParent()
ability.costs.sacrifice(condition)

ability.costs.killSelf()
ability.costs.kill(condition)

ability.costs.payGold(1)                // fixed, non-reduceable gold
ability.costs.payXGold(minFunc, maxFunc) // variable gold, prompts player
ability.costs.payReduceableGoldCost('play')

ability.costs.discardSelfFromHand()
ability.costs.discardFromHand(condition)
ability.costs.discardMultipleFromHand(2, condition)
ability.costs.discardAnyFromHand(condition)
ability.costs.discardGold(1)            // discard 1 gold token from this card
ability.costs.discardGoldFromCard(1, condition)
ability.costs.discardTokenFromSelf('gold', 1)
ability.costs.discardPowerFromSelf(1)
ability.costs.discardDuplicate()
ability.costs.discardFromDeck()         // top card of own deck

ability.costs.returnSelfToHand()
ability.costs.returnToHand(condition)

ability.costs.standSelf()
ability.costs.standParent()

ability.costs.removeSelfFromGame()

ability.costs.revealSpecific(cardFunc)
ability.costs.revealCards(2, condition)
ability.costs.revealUpTo(2, condition)

ability.costs.playEvent()               // standard event cost (gold + expend)
ability.costs.expendEvent()             // move event to "being played" zone
```

---

## Tokens

```js
import { Tokens } from '../../Constants/index.js';
// OR
import { Tokens } from '../../Constants/Tokens.js';

Tokens.gold      // 'gold'
Tokens.poison    // 'poison'
Tokens.blood     // 'blood'
Tokens.ear       // 'ear'
Tokens.prayer    // 'prayer'
Tokens.shadow    // 'shadow'
Tokens.stand     // 'stand'
Tokens.vengeance // 'vengeance'
Tokens.venom     // 'venom'
// ... see Constants/Tokens.js for full list

// Checking tokens on a card:
card.hasToken(Tokens.gold)
card.tokens[Tokens.gold]   // count

// Placing tokens (in handler):
this.game.resolveGameAction(
    GameActions.placeToken({ card, token: Tokens.gold, amount: 1 })
)
```

---

## Common Event Names (for `when:`)

| Event name               | When it fires                                              |
|--------------------------|------------------------------------------------------------|
| `onCardEntersPlay`       | Card enters the play area (has `.card`, `.playingType`)    |
| `onCardLeftPlay`         | Card leaves the play area (has `.card`)                    |
| `onCardOutOfShadows`     | Card comes out of shadows                                  |
| `onCharacterKilled`      | Character is killed (has `.card`, `.cardStateWhenKilled`, `.allowSave`) |
| `onSacrificed`           | Card is sacrificed (has `.cardStateWhenSacrificed`)        |
| `onCardDiscarded`        | Card is discarded (has `.card`, `.cardStateWhenDiscarded`) |
| `onCardPlayed`           | Event card is played                                       |
| `onCardRevealed`         | Card is revealed from hand/deck                            |
| `onCardPowerGained`      | Power is placed on a card                                  |
| `onCardPowerMoved`       | Power is moved to a card (has `.target`)                   |
| `afterChallenge`         | Challenge resolves (has `.challenge`)                      |
| `onPhaseStarted`         | Phase begins (has `.phase`)                                |
| `onPhaseEnded`           | Phase ends (has `.phase`)                                  |
| `onRoundStarted`         | Round begins                                               |

---

## Aggregate Triggers

For events that fire multiple times simultaneously (e.g., multiple cards discarded at once):

```js
this.reaction({
    when: {
        onCardDiscarded: {
            aggregateBy: (event, context) => ({
                controller: event.cardStateWhenDiscarded.controller,
                location: event.cardStateWhenDiscarded.location
            }),
            condition: (aggregate, events, context) =>
                aggregate.controller !== this.controller &&
                ['hand', 'draw deck'].includes(aggregate.location)
        }
    },
    handler: context => {
        // context.events.length = number of matching events grouped together
    }
});
```

---

## Common Patterns

### Using `isMatch` shorthand

```js
event.card.isMatch({ trait: ['Dragon', 'Stormborn'] })
event.challenge.isMatch({ winner: this.controller, attackingPlayer: this.controller })
```

### Checking game state

```js
this.controller.anyCardsInPlay({ type: 'character', trait: 'King' })
this.controller.filterCardsInPlay(card => card.hasTrait('Raider') && card !== this)
this.controller.getNumberOfCardsInPlay({ type: 'location' })
this.game.filterCardsInPlay(card => card.getType() === 'character')
this.game.getNumberOfCardsInPlay(card => card.tokens[Tokens.gold] >= 1)

this.game.currentChallenge
this.game.currentChallenge.winner
this.game.currentChallenge.attackingPlayer
this.game.currentChallenge.isAttacking(card)
this.game.currentChallenge.isDefending(card)
this.game.currentChallenge.getWinnerCards()
this.game.isDuringChallenge({ challengeType: 'military' })
this.game.claim.isApplying
this.game.claim.type

card.isParticipating()
card.isAttacking()
card.isFaction('stark')
card.hasTrait('Lord')
card.hasKeyword('stealth')
card.isUnique()
card.getPrintedCost()
card.getPower()
card.getType()                // 'character', 'location', 'attachment', 'event', 'plot', 'agenda'
card.getPrintedType()
card.controller === this.controller
card.allowGameAction('gainPower')
```

### `queueSimpleStep` for deferred effects

When you need something to run after the current handler resolves (e.g., to avoid timing issues when a gold transfer may trigger keyword changes):

```js
this.game.queueSimpleStep(() => {
    this.untilEndOfPhase(ability => ({
        match: this,
        effect: flatten(context.target.getKeywords().map(kw => ability.effects.addKeyword(kw)))
    }));
});
```

### `promptWithMenu` for imperative card prompts

Used when the ability needs to show a custom menu (e.g., choosing a challenge type):

```js
this.game.promptWithMenu(context.player, this, {
    activePrompt: {
        menuTitle: 'Select a challenge type',
        buttons: ChallengeTypes.asButtons({ method: 'myMethodName' })
    },
    source: this
});

myMethodName(player, value) {
    // called when player clicks a button
    return true; // required to clear the prompt
}
```

---

## Message Formatting

Messages should follow these conventions:
- Begin with the player doing the action
- Use present tense
- No trailing punctuation
- Targeting prompts use `'Select a <type>'` without specifying the goal

```js
// Simple string (placeholders: {player}, {source}, {target}, {opponent}, {costs.*})
message: '{player} uses {source} to kill {target}'

// Object form for dynamic arguments
message: {
    format: '{player} uses {source} to return {target} to {targetOwner}\'s hand',
    args: {
        targetOwner: context => context.target.owner
    }
}

// Function form (escape hatch)
message: context => this.game.addMessage('{0} uses {1} to kill {2}', context.player, this, context.target)
```

---

## Recent Card Examples (Modern Style)

### Character with reaction + action (18-FH, VargoHoat.js)

```js
import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';
import { Tokens } from '../../Constants/index.js';
import { flatten } from '../../../Array.js';

class VargoHoat extends DrawCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onCardEntersPlay: event => event.card.getType() !== 'plot' && event.card.isBestow()
            },
            handler: context => {
                this.game.resolveGameAction(
                    GameActions.placeToken(context => ({ card: context.event.card, token: Tokens.gold })),
                    context
                );
                this.game.addMessage('{0} uses {1} to have {2} gain 1 gold', this.controller, this, context.event.card);
            },
            limit: ability.limit.perPhase(2)
        });

        this.action({
            title: 'Move 1 gold to character',
            condition: () => this.hasToken(Tokens.gold),
            target: {
                type: 'select',
                cardCondition: card =>
                    card.location === 'play area' &&
                    card.getType() === 'character' &&
                    (!card.hasToken(Tokens.gold) || card.tokens[Tokens.gold] < 3)
            },
            handler: context => {
                this.game.transferGold({ from: this, to: context.target, amount: 1 });
                this.game.queueSimpleStep(() => {
                    this.untilEndOfPhase(ability => ({
                        match: this,
                        effect: flatten(context.target.getKeywords().map(kw => ability.effects.addKeyword(kw)))
                    }));
                });
                this.game.addMessage('{0} uses {1} to move 1 gold from {1} to {2}', this.controller, this, context.target);
            }
        });
    }
}

VargoHoat.code = '18017';
export default VargoHoat;
```

### Plot with whenRevealed + target (18-FH, ThePointyEnd.js)

```js
import PlotCard from '../../plotcard.js';

class ThePointyEnd extends PlotCard {
    setupCardAbilities() {
        this.whenRevealed({
            target: {
                cardCondition: card => card.location === 'play area' && card.getType() === 'character'
            },
            handler: context => {
                if(context.target.attachments.length > 1) {
                    this.game.addMessage('{0} uses {1} to discard each attachment from {2}', this.controller, this, context.target);
                    context.target.attachments.forEach(card => card.controller.discardCard(card));
                } else {
                    this.game.addMessage('{0} uses {1} to discard each duplicate and power from {2}', this.controller, this, context.target);
                    if(context.target.dupes) {
                        context.target.dupes.forEach(card => card.controller.discardCard(card));
                    }
                    if(context.target.getPower() > 0) {
                        context.target.modifyPower(-context.target.getPower());
                    }
                }
            }
        });
    }
}

ThePointyEnd.code = '18020';
export default ThePointyEnd;
```

### Character with multi-choice reaction (26.1-WAID, SerClaytonSuggs.js)

```js
import DrawCard from '../../drawcard.js';

class SerClaytonSuggs extends DrawCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onCardPowerGained: event => event.card.getType() === 'character',
                onCardPowerMoved: event => event.target.getType() === 'character'
            },
            limit: ability.limit.perPhase(3),
            choices: {
                'Give +1 STR': context => {
                    this.untilEndOfPhase(ability => ({
                        match: context.event.target || context.event.card,
                        effect: ability.effects.modifyStrength(1)
                    }));
                    this.game.addMessage('{0} uses {1} to give {2} +1 STR', this.controller, this, context.event.target || context.event.card);
                },
                'Give -1 STR': context => {
                    this.untilEndOfPhase(ability => ({
                        match: context.event.target || context.event.card,
                        effect: ability.effects.modifyStrength(-1)
                    }));
                    this.game.addMessage('{0} uses {1} to give {2} -1 STR', this.controller, this, context.event.target || context.event.card);
                }
            }
        });
    }
}

SerClaytonSuggs.code = '26001';
export default SerClaytonSuggs;
```

### Reaction with `gameAction` shorthand + dynamic message (26.3-MaV, MagisterIllyrio.js)

```js
import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class MagisterIllyrio extends DrawCard {
    setupCardAbilities() {
        this.plotModifiers({ gold: 1 });
        const numOfShadowCards = context =>
            context.game.allCards.reduce((count, card) => (card.location === 'shadows' ? count + 1 : count), 0);
        const amountToGain = context => Math.floor(numOfShadowCards(context) / 2);

        this.reaction({
            when: {
                onPhaseStarted: event => event.phase === 'challenge'
            },
            message: {
                format: '{player} uses {source} to gain {amountToGain} gold',
                args: { amountToGain }
            },
            gameAction: GameActions.gainGold(context => ({
                player: context.player,
                amount: amountToGain(context)
            }))
        });
    }
}

MagisterIllyrio.code = '26053';
export default MagisterIllyrio;
```

### Attachment with conditional persistent effect (26.1-WAID, TheWardenOfTheNorth.js)

```js
import DrawCard from '../../drawcard.js';

class TheWardenOfTheNorth extends DrawCard {
    setupCardAbilities(ability) {
        this.attachmentRestriction({ faction: 'stark', trait: 'Lord' });

        this.whileAttached({
            effect: [ability.effects.addTrait('Commander'), ability.effects.addKeyword('Renown')]
        });

        this.whileAttached({
            condition: () => this.parent.isParticipating(),
            targetController: 'any',
            effect: [
                ability.effects.cannotPutIntoPlay(card => card.location === 'shadows'),
                ability.effects.cannotPlay(card => card.getPrintedType() === 'event')
            ]
        });
    }
}

TheWardenOfTheNorth.code = '26012';
export default TheWardenOfTheNorth;
```

### Attachment with reaction and `choosingPlayer` (26.3-MaV, Retribution.js)

```js
import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class Retribution extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                onCharacterKilled: event =>
                    event.card.controller === this.controller &&
                    this.isApplyingClaim('military') &&
                    this.controlsFewerCharacters()
            },
            target: {
                choosingPlayer: player => player === this.game.currentChallenge.attackingPlayer,
                cardCondition: card =>
                    card.location === 'play area' &&
                    card.getType() === 'character' &&
                    card.isAttacking() &&
                    GameActions.kill({ card }).allow()
            },
            message: {
                format: '{player} plays {source} to have {controller} kill {target}',
                args: { controller: context => context.target.controller }
            },
            handler: context => {
                this.game.resolveGameAction(
                    GameActions.kill(context => ({ card: context.target })),
                    context
                );
            }
        });
    }

    isApplyingClaim(type) {
        return this.game.currentChallenge &&
            this.game.claim.isApplying &&
            this.game.claim.type === type;
    }

    controlsFewerCharacters() {
        return this.controller.getNumberOfCardsInPlay({ type: 'character' }) <
            this.game.currentChallenge.attackingPlayer.getNumberOfCardsInPlay({ type: 'character' });
    }
}

Retribution.code = '26048';
export default Retribution;
```

---

## Testing: Writing Jasmine Integration Tests

Tests use the global `integration()` function defined in `test/helpers/integrationhelper.js`. All methods listed here are available within the `integration(function() { ... })` block.

### Basic test structure

```js
describe('My Card', function() {
    integration(function() {
        beforeEach(function() {
            // Build decks using card labels from JSON data
            const deck1 = this.buildDeck('lannister', [
                'A Noble Cause',           // plot
                'My Card (WAID)',          // unique disambiguation: 'Name (PackCode)'
                'Hedge Knight',            // character used as a foil
                'Little Bird (Core)'       // attachment
            ]);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck1);
            this.startGame();
            this.keepStartingHands();    // both players keep their starting hands

            // Find cards. findCardByName(name, location) — location defaults to 'any'
            this.myCard = this.player1.findCardByName('My Card');
            this.knight = this.player1.findCardByName('Hedge Knight');
            // For multiple copies: filterCardsByName
            [this.copy1, this.copy2] = this.player1.filterCardsByName('Hedge Knight', 'hand');

            // Place cards in starting setup (during setup phase, before completeSetup)
            this.player1.clickCard(this.myCard);
            this.player1.clickCard(this.knight);
            this.player2.clickCard(someP2Card);

            this.completeSetup();        // ends setup phase

            // Direct placement (bypasses game rules - use for test scaffolding only)
            this.myCard.modifyPower(3);
            this.player1.dragCard(someCard, 'discard pile');  // move to any location

            this.selectFirstPlayer(this.player1);  // choose who goes first in plot phase
            // OR: this.player1.selectPlot('A Noble Cause');
        });

        describe('when something happens', function() {
            beforeEach(function() {
                // Marshal a card by clicking it during marshal phase
                this.player1.clickCard(this.myCard);
                // Attach by clicking attachment then target
                this.player1.clickCard(this.attachment);
                this.player1.clickCard(this.knight);
                // Respond to prompts
                this.player1.clickPrompt('Done');
                // Trigger a triggered ability (reaction/interrupt window)
                this.player1.triggerAbility(this.myCard);
                // Trigger an action from the card menu
                this.player1.clickMenu(this.myCard, 'Action Title');
                // Click a prompt button
                this.player1.clickPrompt('Yes');
                this.player1.clickPrompt('No Thanks');
                // Select a card when prompted
                this.player1.clickCard(this.knight);
            });

            it('should do the expected thing', function() {
                expect(this.myCard.location).toBe('play area');
                expect(this.knight.getPower()).toBe(3);
                expect(this.player1Object.gold).toBe(5);
                expect(this.player1.handSize).toBe(7);
                expect(this.knight.getStrength()).toBe(4);
                expect(this.knight.hasKeyword('stealth')).toBe(true);
            });

            it('should show the right prompt', function() {
                expect(this.player1).toHavePrompt('Select a character');
            });

            it('should allow triggering the ability', function() {
                expect(this.player1).toAllowAbilityTrigger('My Card');
                expect(this.player1).not.toAllowAbilityTrigger('My Card');
            });

            it('should allow the action menu item', function() {
                expect(this.player1).toAllowTriggerAction(this.myCard, 'Action Title');
            });

            it('should allow selecting a card', function() {
                expect(this.player1).toAllowSelect(this.knight);
            });
        });
    });
});
```

### Available test setup helpers

| Method | Description |
|--------|-------------|
| `this.startGame()` | Initialises the game |
| `this.keepStartingHands()` | Both players keep their hands |
| `this.completeSetup()` | Ends setup phase |
| `this.selectFirstPlayer(player)` | Selects first player (skips plot selection prompts) |
| `this.completeMarshalPhase()` | Completes the marshal phase |
| `this.completeChallengesPhase()` | Completes the challenges phase |
| `this.completeDominancePhase()` | Completes the dominance phase |
| `this.completeStandingPhase()` | Completes the standing phase |
| `this.completeTaxationPhase()` | Completes the taxation phase |
| `this.completeRound()` | Completes the full round |
| `this.unopposedChallenge(...)` | Runs an unopposed challenge |
| `this.skipSetupPhase()` | Skips setup entirely |

### Player wrapper methods

```js
this.player1.findCardByName('Card Name')              // throws if not found
this.player1.findCardByName('Card Name', 'hand')      // restrict by location
this.player1.filterCardsByName('Card Name')           // returns array
this.player1.clickCard(card)                          // click a card
this.player1.clickCard('Card Name', 'hand')           // click by name
this.player1.clickPrompt('Done')                      // click a prompt button
this.player1.clickMenu(card, 'Menu Text')             // click card menu item
this.player1.triggerAbility(card)                     // click during reaction window
this.player1.dragCard(card, 'discard pile')           // force move card location
this.player1.selectPlot('Plot Name')                  // select a plot
this.player1.selectDeck(deck)                         // set player's deck
this.player1.gold                                     // get/set gold directly
this.player1.handSize                                 // hand card count
this.player1Object                                    // raw Player object (for gold etc.)
this.player1Object.gold = 5                           // set gold directly
```

### Faction names for `buildDeck`

`'baratheon'`, `'greyjoy'`, `'lannister'`, `'martell'`, `'thenightswatch'`, `'stark'`, `'targaryen'`, `'tyrell'`, `'neutral'`

---

## Legacy vs Modern Patterns

The original `docs/implementing-cards.md` uses CommonJS (`require`/`module.exports`). **All current card implementations use ES modules.** Do not use CommonJS syntax in new cards.

Some older cards use direct player/card method calls (`this.controller.standCard(card)`, `context.player.putIntoPlay(card)`). Modern cards prefer `GameActions.*` for all game state changes, as these integrate correctly with the action resolution pipeline, event system, and effect tracking.

Older cards sometimes use `this.game.addMessage` in a handler alongside a `message` property. Current style either uses the `message` property alone (with `gameAction` shorthand) or calls `this.game.addMessage` explicitly within the handler. Don't mix both.

---

## Finding Similar Cards as Reference

1. **By mechanic keyword**: Search the JSON pack files for text patterns:
   - `grep -r "comes out of shadows" throneteki-json-data/packs/` → shadow-based reactions
   - `grep -r "bestow" throneteki-json-data/packs/` → bestow cards

2. **By implementation pattern**: Search card implementations:
   - `grep -rn "onCardOutOfShadows" server/game/cards/` → all shadow reactions
   - `grep -rn "aggregateBy" server/game/cards/` → aggregate triggers
   - `grep -rn "chooseOpponent" server/game/cards/` → opponent-targeting effects

3. **Recent packs** (newest first) to find modern style reference cards:
   - `server/game/cards/26.3-MaV/`
   - `server/game/cards/26.2-WoW/`
   - `server/game/cards/26.1-WAID/`
   - `server/game/cards/18-FH/`
   - `server/game/cards/17.1-R/`

4. **By card code**: Once you know the code from the JSON data, the file is in the matching pack directory with a CamelCase filename matching the card name.
