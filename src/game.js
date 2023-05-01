//Object for player, map, users screen, monster
//Ideas: You could choose your stats at the beginning of the game to facilitate different play styles
//Player health

class MapLocations {
  constructor(displayText, items, accessibleLocations, actions) {
    this.displayText = displayText;
    this.items = items;
    this.accessibleLocations = accessibleLocations;
    this.actions = actions;
  }
}

function createLocations(
  name,
  displayText,
  items,
  accessibleLocations,
  actions
) {
  let loc = new MapLocations(displayText, items, accessibleLocations, actions);
  map.mapLocations[name] = loc;
}

let map = {
  mapLocations: {},
};

let player = {
  currentLocation: "clearing",

  updatePlayerLocation(newLocation) {
    player.currentLocation = newLocation;
  },
};

let playerScreen = {
  playerTextInput: document.querySelector("#user-text-input"),
  playerCommand: "",
  textDisplay: document.querySelector("#text-display"),
  showInTextDisplay(userInput, message) {
    let format = "";
    if (userInput === true) {
      format = ">";
    }
    playerScreen.textDisplay.innerHTML += `<br />${format} ${message}`;
  },

  readUserInput(event) {
    event.preventDefault();
    let command = playerScreen.playerTextInput.value;
    if (command.trim() === "") {
    } else {
      playerScreen.showInTextDisplay(true, command);
    }
  },
};

createLocations(
  "forest",
  { onPlayerEnter: "You are in a forest" },
  ["knife"],
  ["clearing"],
  { knife: "You pick up the knife", clearing: "You leave the forest" }
);

createLocations(
  "clearing",
  { onPlayerEnter: "You are in a clearing" },
  ["berries"],
  ["forest"],
  { forest: "You leave the clearing" }
);

let enterButton = document.querySelector("#user-text-submit");

enterButton.addEventListener("click", playerScreen.readUserInput);
