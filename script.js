let buttonColours=["red", "blue", "green", "yellow"];
let gamePattern=[];
let started=false;
let level=0;
function nextSequence(){
  userClickedPattern=[];
  level++;
  $("h1").text("Level "+level);
  let randomNumber=(Math.floor(Math.random() * 4));
  let randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

$(".btn").click(function(e){
let userChosenColour=$(this).attr("id");
userClickedPattern.push(userChosenColour);
playSound(userChosenColour);
animatePress(userChosenColour);
checkAnswer(userClickedPattern.length-1);
});
function playSound(name){
  let audio = new Audio(name+".mp3");
  audio.play();
}
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function() {
       $("#"+currentColour).removeClass("pressed")
   }, 100);
}
$(document).keypress(function(){
  if(!started){
    $("h1").text("Level "+level);
    nextSequence();
    started=true;
  }
});
function checkAnswer(currentLevel){
if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
  console.log("success");
  if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
}else{
  console.log("wrong");
     $("h1").text("Game Over, Press Any Key to Restart");

  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function() {
       $("body").removeClass("game-over")
   },1000);
   startOver();
}
}
function startOver(){
  level=0;
  started=false;
  gamePattern=[];
}
