Under the repository https://github.com/Serge-EH77/Cards_game.git is the Java implementation of the game.
# 21 Card Trick — Web Game

A browser-based implementation of the classic "21 Card Trick," ported from an original Java console version into a fully client-side JavaScript experience with an animated, interactive UI.

## How the Trick Works

The game deals 21 cards into three columns of 7. The player picks a card and tells the game which column it's in — no further information needed. The deck is regathered column-by-column (with the chosen column always placed in the middle) and redealt into three columns again. After repeating this process three times, the player's card is guaranteed to land in the exact center of the deck: position 11 of 21, every time, regardless of which card was originally chosen.

This works because each reshuffle is a precise, deterministic rearrangement — not a true shuffle. The "magic" is really just pigeonhole position-tracking dressed up as randomness.

## Original Logic (Java)

The original implementation (`CardsGame.java`) models this with:
- A `LinkedHashSet<Integer>` of 21 random two-digit numbers as the deck, preserving insertion order.
- `distribute()`, which splits the current deck into three 7-card sub-decks, asks the player which one holds their card, and calls `cardMerge()` to re-stack the decks with the selected one in the middle.
- Three rounds of this distribute → ask → merge cycle, after which the card is read directly from index 10.

## Web Port

The JavaScript version reimplements this same column-split/merge logic as a fully client-side experience:
- Dynamic DOM rendering of the three columns per round
- Click-driven column selection in place of console input
- CSS-animated card transitions and visual feedback between rounds
- A responsive layout that works across screen sizes

## Tech Stack

- JavaScript (vanilla, no framework)
- HTML5
- CSS3 (animations, responsive layout)

## Running Locally

Since this is a static client-side project, no build step or server is required:

```bash
git clone <your-repo-url>
cd 21-card-game
open index.html   # or just double-click it, or serve with any static file server
```

## Possible Extensions

- Support deck sizes other than 21 (any multiple of 3 works with the same algorithm)
- Add a "reveal the math" mode explaining why the trick works, for an educational angle
- Animate the actual card re-stacking order, not just the reveal

