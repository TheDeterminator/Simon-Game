//Coded with assistance from FreeCodeCamp medium page

//List of variables to be input into game playing functions
var game = {
  count: 0,
  possibleSteps: ["#blue", "#red", "#green", "#orange"],
  currentGame: [],
  player: [],
  sounds: {
    blue: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
    green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
    red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
    orange: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
  },
  strict: false
};

//Toggles strict mode so that a player restarts if a mistake is made
function strictMode() {
  if (game.strict) {
    game.strict = false;
    console.log("Strict Off");
    $("#strict-mode-setting").html("Off");
  } else {
    game.strict = true;
    console.log("Strict On");
    $("#strict-mode-setting").html("On");
  }
}

//Plays the sound effects for the game
function sound(name) {
  switch (name) {
    case "#green":
      game.sounds.green.play();
      break;
    case "#red":
      game.sounds.red.play();
      break;
    case "#blue":
      game.sounds.blue.play();
      break;
    case "#orange":
      game.sounds.orange.play();
      break;
  }
}

//Displays one of the patterns to be repeated by player, utilized inside of the showMoves function
function playGame(circle) {
  $(circle).css("background-color", "cyan");
  sound(circle);
  setTimeout(function() {
    $(circle).css("background-color", "gray");
  }, 300);
}

//Clears player input from the corresponding variable
function clearPlayer() {
  game.player = [];
}

//Displays all patterns for the player to memorize
function showMoves() {
  var i = 0;
  var moves = setInterval(function() {
    playGame(game.currentGame[i]);
    i++;
    if (i >= game.currentGame.length) {
      clearInterval(moves);
    }
  }, 600);
  clearPlayer();
}

//Randomly adds an additional step to the game
function generateStep() {
  game.currentGame.push(game.possibleSteps[Math.floor(Math.random() * 4)]);
  showMoves();
}

//Increments the round counter then calls generateStep to add another step to the game
function addStep() {
  game.count++;

  setTimeout(function() {
    $("#counter").html(game.count);
  }, 500);
  
  generateStep();
}

//Restarts the game, returns listed variables to their default state
function clearGame() {
  game.currentGame = [];
  game.count = 0;
  addStep();
}

function newGame() {
  clearGame();
}

//Takes player move as input and evaluates whther or not they made the right choice
function playerTurn(x) {
  if (
    game.currentGame[game.player.length - 1] !==
    game.player[game.player.length - 1]
  ) {
    if (game.strict) {
      alert("Wrong move. Start over!");
      newGame();
    } else {
      alert("Wrong move. Try again!");
      showMoves();
    }
  } else {
    sound(x);
    var check = game.player.length == game.currentGame.length;
    if (check) {
      if (game.count == 20) {
        alert("Congrats! You win");
      } else {
        addStep();
      }
    }
  }
}

//Logs the player's decision if the correct choice is made.
function addToPlayer(id) {
  var circle = "#" + id;
  console.log(circle);
  game.player.push(circle);
  playerTurn(circle);
}

console.log(game.strict);
newGame();