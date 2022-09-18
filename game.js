var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

//check which button is clicked
$(".btn").on("click", function(event) {
  var userChosenColour = event.target.id;
  // console.log(userChosenColour);

  userClickedPattern.push(userChosenColour);
  // console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  //Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);
});

$(document).on("keypress", function(){

  if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started = true;
  }

});



function nextSequence() {

  userClickedPattern = [];

  level++;

  $("#level-title").text("Level "+level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);




}

function playSound(name) {
  var sound = new Audio('./sounds/' + name + '.mp3');
  sound.play();

}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");


  //set delay to remove class before (remove style class before)
  var delay = 100;  //millisecond

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, delay);
}

function checkAnswer(currentLevel){
  // to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
 if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");

    // If the user got the most recent answer right , then check that they have finished their sequence with another if statement.
   if(userClickedPattern.length === gamePattern.length){
     setTimeout(function() {
       nextSequence();
     }, 1000);
   }

 }else{
   console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
 }

}

function startOver(){
  level = 0;
  gamePattern =[];
  started = false;
}
