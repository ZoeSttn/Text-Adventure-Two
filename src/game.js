let locations = {
  clearing: {
    displayText: "You are in a clearing",
    actions: {
      forest: function () {
        movePlayer("forest");
        showText(locations.forest.displayText, "game");
        console.log(locations.playerLocation);
        console.log("success");
      },
    },
  },
  forest: {
    displayText: "You are in a forest",
    actions: {
      goToClearing: function () {
        movePlayer("clearing");
        showText(locations.forest.displayText);
      },
    },
  },
  playerLocation: "clearing",
};

function readUserCommand(event) {
  event.preventDefault();
  let userCommand = document
    .querySelector("#user-text-input")
    .value.toLowerCase();
  console.log(userCommand);
  showText(userCommand, "user");

  let currentArea = locations.playerLocation;

  let possibleKeys = Object.keys(locations[currentArea].actions);
  console.log(possibleKeys);

  for (let i = 0; i < possibleKeys.length; i++) {
    if (userCommand.includes(possibleKeys[i])) {
      let command = possibleKeys[i];
      locations[currentArea].actions[command]();
    }
  }

  userCommand.value = "";
}

function showText(text, source = "game") {
  let display = document.querySelector("#text-display");

  let sourceFormatting = "";
  if (source === "user") {
    sourceFormatting = " > ";
  }
  let messageHTML = `<br />${sourceFormatting}${text}`;

  display.innerHTML += messageHTML;
}

function movePlayer(location) {
  locations.playerLocation = location;
}

let enterButton = document.querySelector("#user-text-submit");
enterButton.addEventListener("click", readUserCommand);
