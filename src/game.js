let locations = {
  clearing: {
    displayText: "You are in a clearing",
    actions: {
      goToForest: function () {
        movePlayer("forest");
        showText(locations.forest.displayText, "game");
        console.log(locations.playerLocation);
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
  let userCommand = document.querySelector("#user-text-input").value;

  showText(userCommand, "user");

  let possible = locations[locations.playerLocation].keys();

  //make array of possible keys
  //Check command contains key
  //Run command

  //showText(userCommand, user);

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
