// Make a border around a clicked card

// Make a possibility to create up to 3 different accounts:
// Make a clickable h2 with a hover effect for the names
// Clicked Name is bigger and has a different color

// make a list with necesairy moves of 3 last attempts
// make a list with necesairy moves of 3 BEST attempts

// under the name of each created player there will be a "best time"

// ADD AND REMOVE PLAYER
// ---------------------------------------------
// ---------------------------------------------
// ---------------------------------------------

let nameInput = document.querySelector("#name-input");
let addPlayerBtn = document.querySelector("#add-player-button");

let player1Container = document.querySelector("#player-1");
let player1Name = document.querySelector("#player-1-name");
let player1Best = document.querySelector("#best-1");
let player1Second = document.querySelector("#second-1");
let player1Third = document.querySelector("#third-1");
// player 2
let player2Container = document.querySelector("#player-2");
let player2Name = document.querySelector("#player-2-name");
let player2Best = document.querySelector("#best-2");
let player2Second = document.querySelector("#second-2");
let player2Third = document.querySelector("#third-2");
// player 3
let player3Container = document.querySelector("#player-3");
let player3Name = document.querySelector("#player-3-name");
let player3Best = document.querySelector("#best-3");
let player3Second = document.querySelector("#second-3");
let player3Third = document.querySelector("#third-3");
// remove Buttons
let removePlayer1Btn = document.querySelector("#remove-player-1");
let removePlayer2Btn = document.querySelector("#remove-player-2");
let removePlayer3Btn = document.querySelector("#remove-player-3");

let players = [];
// for the add player function
let playerNr = 0;

let defaultName = "name";
let defaultTime = "00:00";

let activePlayer = "guest";

// EVENT LISTENERS

// Add Player
addPlayerBtn.addEventListener("click", () => {
  addPlayer(nameInput.value);
});

// Make Players Selectable
player1Container.addEventListener("click", () => {
  choosePlayer(0);
});
player2Container.addEventListener("click", () => {
  choosePlayer(1);
});
player3Container.addEventListener("click", () => {
  choosePlayer(2);
});

// remove buttons
removePlayer1Btn.addEventListener("click", () => {
  removePlayer(0);
});
removePlayer2Btn.addEventListener("click", () => {
  removePlayer(1);
});
removePlayer3Btn.addEventListener("click", () => {
  removePlayer(2);
});

// FUNCTIONS
function addPlayer(name) {
  if (playerNr === 3) {
    return alert(`to many players, please deleate one`);
  }
  if (name == "") {
    return alert(`please enter a Name`);
  }

  playerNr++;

  newPlayer = {
    name: name,
    best: 0,
    bestSteps: 0,
    second: 0,
    secondSteps: 0,
    third: 0,
    thirdSteps: 0,
  };
  players.push(newPlayer);
  assignPlayerValues(playerNr);
  choosePlayer(playerNr - 1);
}

function removePlayer(nr) {
  if (players[nr]) {
    playerNr--;

    players.splice(nr, 1);
    assignPlayerValues(1);
    assignPlayerValues(2);
    assignPlayerValues(3);

    // check if deleated element is a active player
    // if yes: guest plays, if no the other active player stays!
    unselectPlayers();
  } else {
    // console.log("player doesnt exist");
  }
}

function choosePlayer(nr) {
  switch (nr) {
    case 0:
      if (players[nr]) {
        activePlayer = players[nr];
        player1Container.classList.add("border");
        player2Container.classList.remove("border");
        player3Container.classList.remove("border");
      }
      break;
    case 1:
      if (players[nr]) {
        activePlayer = players[nr];
        player1Container.classList.remove("border");
        player2Container.classList.add("border");
        player3Container.classList.remove("border");
      }
      break;
    case 2:
      if (players[nr]) {
        activePlayer = players[nr];
        player1Container.classList.remove("border");
        player2Container.classList.remove("border");
        player3Container.classList.add("border");
      }
      break;
    default:
      break;
  }
}

function unselectPlayers() {
  activePlayer = "guest";

  player1Container.classList.remove("border");
  player2Container.classList.remove("border");
  player3Container.classList.remove("border");
}

function assignPlayerValues(player) {
  // player 1
  switch (player) {
    case 1:
      if (players[0]) {
        player1Name.textContent = players[0].name;
        player1Best.textContent = convertToMinutes(players[0].best);
        player1Second.textContent = convertToMinutes(players[0].second);
        player1Third.textContent = convertToMinutes(players[0].third);
        break;
      } else {
        player1Name.textContent = defaultName;
        player1Best.textContent = defaultTime;
        player1Second.textContent = defaultTime;
        player1Third.textContent = defaultTime;
      }
    case 2:
      if (players[1]) {
        player2Name.textContent = players[1].name;
        player2Best.textContent = convertToMinutes(players[1].best);
        player2Second.textContent = convertToMinutes(players[1].second);
        player2Third.textContent = convertToMinutes(players[1].third);
        break;
      } else {
        player2Name.textContent = defaultName;
        player2Best.textContent = defaultTime;
        player2Second.textContent = defaultTime;
        player2Third.textContent = defaultTime;
      }
    case 3:
      if (players[2]) {
        player3Name.textContent = players[2].name;
        player3Best.textContent = convertToMinutes(players[2].best);
        player3Second.textContent = convertToMinutes(players[2].second);
        player3Third.textContent = convertToMinutes(players[2].third);
        break;
      } else {
        player3Name.textContent = defaultName;
        player3Best.textContent = defaultTime;
        player3Second.textContent = defaultTime;
        player3Third.textContent = defaultTime;
      }
    // case "all":
    //   console.log("trying to change all players");
    //   assignPlayerValues(1);
    //   assignPlayerValues(2);
    //   assignPlayerValues(3);
    //   break;
    default:
      break;
  }
}

function convertToMinutes(passedSeconds) {
  let minute = Math.floor(passedSeconds / 60);
  let seconds = passedSeconds - minute * 60;
  if (minute > 9) {
    return `${minute}:${seconds}`;
  } else if (minute <= 9) {
    return `0${minute}:${seconds}`;
  }
}

// CARD GAME
// ---------------------------------------------
// ---------------------------------------------
// ---------------------------------------------
let imgNames = [
  "img1",
  "img2",
  "img3",
  "img4",
  "img5",
  "img6",
  "img7",
  "img8",
  "img1",
  "img2",
  "img3",
  "img4",
  "img5",
  "img6",
  "img7",
  "img8",
];

let loaded = false;
let shuffledCards = [];
let openCards = 0;
let previousCard = "";
let necesairySteps = 0;

// TIMER
let time = "";
let totalSeconds = 0;
let timerIsRunning = false;
// QUERY SELECTOR
const allCards = document.querySelectorAll(".card");
const playSection = document.querySelector("#play-section");
const img1 = document.querySelector(".img1");
const playBtn = document.querySelector("#play-btn");

function isLoaded() {
  loaded = true;
}

function addEventToCards() {
  for (card of allCards) {
    card.addEventListener("click", compare);
  }
}

function countUpTimer() {
  ++totalSeconds;
  timerIsRunning = true;
  console.log(totalSeconds);

  // let minute = Math.floor(totalSeconds / 60);
  // let seconds = totalSeconds - minute * 60;
  // time = `${minute}:${seconds}`;
}

function resetVariables() {
  time = "";
  necesairySteps = 0;
  firstBlood = true;
  rightCards = 0;
  rightInRow = 0;
  loaded = false;
  totalSeconds = -1;
}

function startGame() {
  resetVariables();
  addEventToCards();
  resetCards();
  shuffleCards();
  showCards();
  setTimeout(showBackside, 1000);
  if (timerIsRunning == false) {
    setInterval(countUpTimer, 1000);
  }
  setTimeout(isLoaded, 1000);
  playSound("miau");
}

playBtn.addEventListener("click", () => {
  startGame();
});

function resetCards() {
  shuffledCards = [];
  imgNames = [
    "img1",
    "img2",
    "img3",
    "img4",
    "img5",
    "img6",
    "img7",
    "img8",
    "img1",
    "img2",
    "img3",
    "img4",
    "img5",
    "img6",
    "img7",
    "img8",
  ];
  for (card of allCards) {
    for (let i = 0; i < imgNames.length; i++) {
      if (card.classList.contains(imgNames[i])) {
        card.classList.remove(imgNames[i]);
      }
    }
  }
}
// shuffle cards

function shuffleCards() {
  for (card of allCards) {
    const randomImg = Math.floor(Math.random() * imgNames.length);
    // image names will be randomly put into a placeholder array
    shuffledCards.push(String(imgNames.splice(randomImg, 1)));
  }
  for (let i = 0; i < shuffledCards.length; i++) {
    // a class with a bg-img of cats will be assigned
    allCards[i].classList.add(shuffledCards[i]);
  }
}

function showCards() {
  for (card of allCards) {
    if (card.classList.contains("default-cat")) {
      card.classList.remove("default-cat");
    }
  }
}

function showBackside() {
  for (let i = 0; i < allCards.length; i++) {
    allCards[i].classList.add("default-cat");
  }
}

const firstBloodSound = new Audio("/sounds/kill-sounds/first_blood.mp3");
const megaKillSound = new Audio("/sounds/kill-sounds/mega_kill.mp3");
const monsterKillSound = new Audio("/sounds/kill-sounds/monster_kill.mp3");
const miauSound = new Audio("/sounds/kill-sounds/miau.m4a");

function playSound(nr) {
  switch (nr) {
    // kill sounds
    case 2:
      megaKillSound.play();
      break;
    case 3:
      monsterKillSound.play();
      break;
    // other sounds
    case "miau":
      miauSound.play();
      break;
    case "firstBlood":
      firstBloodSound.play();
      break;
  }
}

// OPEN AND COMPARE!
openCards = 0;
let firstCard = "";
let firstCardDiv = "";
let secondCard = "";
let secondCardDiv = "";
let rightCards = 0;
let rightInRow = 0;
let firstBlood = true;

function compare() {
  // did I click the same card twice?
  necesairySteps++;

  let isPreviousCard = false;
  if (loaded === true && isPreviousCard === false && openCards == 0) {
    firstCard = this.classList[1];
    firstCardDiv = this;
    openCards = 1;
    this.classList.remove("default-cat");
  } else if (loaded === true && isPreviousCard === false && openCards == 1) {
    openCards = 2;
    secondCard = this.classList[1];
    secondCardDiv = this;
    this.classList.remove("default-cat");
    if (firstCard === secondCard) {
      // if its the first right card, play: first blood
      if (firstBlood) {
        firstBlood = false;
        playSound("firstBlood");
      }
      rightInRow++;
      playSound(rightInRow);
      rightCards = rightCards + 2;
      openCards = 0;
      // removes event listener for selected cards
      this.removeEventListener("click", compare);
      // change to 16!!!!!
      if (rightCards === 16) {
        youWin();
      }
    } else {
      rightInRow = 0;
      setTimeout(() => {
        firstCardDiv.classList.add("default-cat");
        secondCardDiv.classList.add("default-cat");
        openCards = 0;
      }, 700);
    }
  }
}

function youWin() {
  let timeInMinutes = convertToMinutes(totalSeconds);
  alert(`you opened ${necesairySteps} cards, and needed ${timeInMinutes}`);
  assignToObject(necesairySteps, totalSeconds);
  resetVariables();
}

function assignToObject(steps, seconds) {
  if (typeof activePlayer === "object") {
    // 1. check if there were times assigned to the Object
    if (seconds < activePlayer.best || activePlayer.best === 0) {
      activePlayer.third = activePlayer.second;
      activePlayer.second = activePlayer.best;
      activePlayer.best = seconds;
    } else if (seconds < activePlayer.second || activePlayer.second === 0) {
      activePlayer.third = activePlayer.second;
      activePlayer.second = seconds;
    } else if (seconds < activePlayer.third || activePlayer.third === 0) {
      activePlayer.third = seconds;
    }

    if (activePlayer == players[0]) {
      assignPlayerValues(1);
    } else if (activePlayer == players[1]) {
      assignPlayerValues(2);
    } else if (activePlayer == players[2]) {
      assignPlayerValues(3);
    }
    // if (totalSeconds < ) {

    // }
  }

  // console.log(steps);
  // console.log(timeInMinutes);
}
