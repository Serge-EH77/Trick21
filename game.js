
// 1. Definitions: Ranks, Suits, Color Map
const ranks = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"];
const suits = ["♠", "♥", "♦", "♣"];
const suitColors = {
  "♠": "#000000",
  "♣": "#000000",
  "♥": "#d60000",
  "♦": "#d60000"
};
function generateUniqueDeck(count = 21) {
  const deck = [];
  const seen = new Set();

  while (deck.length < count) {
    const rank = ranks[Math.floor(Math.random() * ranks.length)];
    const suit = suits[Math.floor(Math.random() * suits.length)];
    const key = `${rank}${suit}`;
    if (!seen.has(key)) {
      seen.add(key);
      deck.push({ rank, suit });
    }
  }

  return deck;
}
function fillCards(deck) {
  const cardEls = document.querySelectorAll("#card-container .card");

  deck.forEach((card, idx) => {
    const el = cardEls[idx];
    el.textContent = `${card.rank}${card.suit}`;
    el.style.color = suitColors[card.suit];
    el.classList.add("revealed");   // for CSS flip or styling hooks
  });
  return deck;
}

let revealedDeck = [];

// 4. Handle "Reveal Cards" click
function handleReveal() {
  revealedDeck = generateUniqueDeck();
  fillCards(revealedDeck);
  document.getElementById("reveal-button").style.display = "none";
  document.getElementById("reset-button").style.display = "inline-block";
  document.getElementById("continue-button").style.display = "inline-block";
}

function handleReset() {
  document.querySelectorAll("#card-container .card").forEach(el => {
    el.textContent = "";
    el.classList.remove("revealed");
  });
  document.getElementById("continue-button").style.display = "none";
  document.getElementById("reset-button").style.display = "none";
  document.getElementById("reveal-button").style.display = "inline-block";
}

// 6. Wire up event listeners once DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("reveal-button")
          .addEventListener("click", handleReveal);
  document.getElementById("reset-button")
          .addEventListener("click", handleReset);
  document.getElementById("continue-button")
          .addEventListener("click", handleContinue);
  document.getElementById("subdeck1-button")
          .addEventListener("click", () => handleSubDeckChoice(1));
  document.getElementById("subdeck2-button")
          .addEventListener("click", () => handleSubDeckChoice(2));
  document.getElementById("subdeck3-button")        
          .addEventListener("click", () => handleSubDeckChoice(3));
});
function handleContinue() {
  if (revealedDeck.length !== 21) {
    console.error("Deck is incomplete or not initialized.");
    return;
  }
  showElement("sb1")
  const subdeck1 = revealedDeck.slice(0, 7);
  showElement("sb2");
  const subdeck2 = revealedDeck.slice(7, 14);
  showElement("sb3");
  const subdeck3 = revealedDeck.slice(14, 21);
  hideElement("firstline");
  hideElement("reveal-button");
  hideElement("reset-button");
  hideElement("continue-button");
  showElement("subdeck1-button");
  showElement("subdeck2-button");
  showElement("subdeck3-button");
  showElement("subdeck-choice");
}
let roundCount = 0;

function handleSubDeckChoice(subdeckNumber) {
  if (subdeckNumber < 1 || subdeckNumber > 3) {
    console.error("Invalid subdeck number. Must be 1, 2, or 3.");
    return;
  }
  let subdeck1 = revealedDeck.slice(0, 7);
  let subdeck2 = revealedDeck.slice(7, 14);
  let subdeck3 = revealedDeck.slice(14, 21);

  if (subdeckNumber === 1) {
    revealedDeck = [...subdeck2, ...subdeck1, ...subdeck3];
  } else if (subdeckNumber === 3) {
    revealedDeck = [...subdeck1, ...subdeck3, ...subdeck2];
  }
  console.log("Redistributed Deck:", revealedDeck);
  revealedDeck = redistributeToSubdecks(revealedDeck).flat();
  fillCards(revealedDeck);
  roundCount++;
  if (roundCount < 3) {
    // Show buttons again for next round
    showElement("subdeck1-button");
    showElement("subdeck2-button");
    showElement("subdeck3-button");
    showElement("subdeck-choice");
  } else {
    const chosenCard = revealedDeck[10];
    const cardEls = document.querySelectorAll("#card-container .card");
    const finalCardEl = cardEls[10];
    finalCardEl.classList.add("highlight"); // Add a CSS class for styling

    roundCount = 0; // Reset for next game
 
  hideElement("subdeck1-button");hideElement("subdeck2-button");hideElement("subdeck3-button");
  hideElement("subdeck-choice");
  hideElement("sb1");hideElement("sb2");hideElement("sb3");
  showElement("final-reveal");
}
}

function redistributeToSubdecks(deck) {
  const subdeck1 = [];
  const subdeck2 = [];
  const subdeck3 = [];
  let  j = 0;
  let i = 0;
  while (i < deck.length) {
    subdeck1[j] = deck[i];
    subdeck2[j] = deck[i+1];
    subdeck3[j] = deck[i+2];
    i += 3;
    j++;
  }
  return [subdeck1, subdeck2, subdeck3];
}

function hideElement(id) {
  const el = document.getElementById(id);
  if (!el) {
    console.error('hideElement failed: no element with id="${id}"');
    return;
  }
  el.style.display = "none";
}
function showElement(id) {
  const el = document.getElementById(id);
  if (!el) {
    console.error('showElement failed: no element with id="${id}"');
    return;
  }
  el.style.display = "block";
}
/*const deck = generateUniqueDeck(21);
renderDeck(deck);*/