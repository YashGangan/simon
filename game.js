const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

function nextSequence() {
        userClickedPattern = [];
        level++;
        $("#level-title").text("level " + level);
        let randomNum = Math.floor(Math.random() * 4);
        let chosenColor = buttonColors[randomNum];
        $("#" + chosenColor).fadeOut(100).fadeIn(100);
        gamePattern.push(chosenColor);
        makeSound(chosenColor);
}

$(document).on("keypress", function() {
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})


$(".btn").click(function(e) {
    let userChosenColor = $(this).attr("id");;
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    makeSound(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function makeSound(key) {
    let audio = new Audio("sounds/" + key + ".mp3");
    audio.play();
  }

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    } else {
        makeSound("wrong");

        $("body").addClass("game-over");
        setTimeout(() => {
        $("body").removeClass("game-over");
        }, 1500);

        $("#level-title").text("Game Over, Press any key to restart");
        startAgain();
    }
}

function startAgain(){
    level = 0;
    gamePattern = [];
    started = false;
}