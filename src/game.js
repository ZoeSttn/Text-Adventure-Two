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
  actions,
  mapArrayIndex
) {
  let loc = new MapLocations(displayText, items, accessibleLocations, actions);
  map.locations[name] = loc;
}

let map = {
  locations: {},
};

let player = {
  currentLocation: { place: "forest", order: 0 },

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

    //Compare command to keys in current location object
    let possibleCommands = Object.keys(
      map.locations[player.currentLocation.place]
    );
    for (let i = 0; i < possibleCommands.length; i++) {
      if (command.includes(possibleCommands[i])) {
        let command = possibleKeys[i];
      }
    }
    console.log(possibleCommands);
  },
};

createLocations(
  "forest",
  { onPlayerEnter: "You are in a forest" },
  ["knife"],
  ["clearing"],
  {
    //Was working on this
    knife: {
      display: "You pick up the knife",
      invokeAction: function () {},
    },
    clearing: "You leave the forest",
  },
  0
);

createLocations(
  "clearing",
  { onPlayerEnter: "You are in a clearing" },
  ["berries"],
  ["forest"],
  { forest: "You leave the clearing" },
  1
);

let enterButton = document.querySelector("#user-text-submit");

enterButton.addEventListener("click", playerScreen.readUserInput);
