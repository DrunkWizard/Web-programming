var buttonColours = ["green-btn", "red-btn", "yellow-btn", "blue-btn"];
var buttons = $(".buttons");
var userClickedPattern=[];
var gamePattern=[];
var wrongSound = new Audio("sounds/wrong.mp3");
nextRound();

function nextRound(){
  buttons.click(function(event){
    animateButtons(event);
    if (gamePattern.length === userClickedPattern.length && JSON.stringify(gamePattern)===JSON.stringify(userClickedPattern)){
      setTimeout(function(){
        pressButton();
      }, 1000)
      userClickedPattern.length = 0;
    }

    for(i = 0; i < userClickedPattern.length; i++){
      if(gamePattern[i] !== userClickedPattern[i]){
        wrongSound.play();
        userClickedPattern.length = 0;
        gamePattern.length = 0;
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").css("background-color", "red");
        setTimeout(function(){
            $("body").css("background-color", "#011F3F");
        }, 1000)
      }
    }
  })

    $("body").keypress(function(){
      if(gamePattern.length === 0 && userClickedPattern.length ===0){
        pressButton();
      }
    })
  }

function animateButtons(event){
  $(event.target).addClass("pressed")
  userClickedPattern.push($(event.target).attr("id"));
  var sound = new Audio("sounds/" + $(event.target).attr("id") + ".mp3");
  sound.play();
  setTimeout(function(){
    $(event.target).removeClass("pressed");
  }, 100)
}

function pressButton(){
  var level = gamePattern.length + 1;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var sound = new Audio("sounds/" + buttonColours[randomNumber] + ".mp3");
  $("#" + buttonColours[randomNumber] + ".buttons").fadeOut(100).fadeIn(100);
  sound.play();
  gamePattern.push(buttonColours[randomNumber]);
}
