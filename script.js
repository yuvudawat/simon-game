const buttonColors = ['green', 'red', 'yellow', 'blue'];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;
let highestLevel = 0;

$('#start').click(function() {
  if (!started) {
    $('#start').text('Restart');
    $('#game-over-text').text('');
    level = 0;
    $('#level-number').text(level);
    nextSequence();
    started = true;
  }
});

$('.button').click(function() {
  const userChosenColor = $(this).attr('id');
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $('#level-number').text(level);
  if (level > highestLevel) {
    highestLevel = level;
    $('#highest-level-number').text(highestLevel);
  }
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $('#' + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(name) {
  const audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(currentColor) {
  $('#' + currentColor).addClass('pressed');
  setTimeout(function() {
    $('#' + currentColor).removeClass('pressed');
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound('wrong');
    $('body').addClass('game-over-bg');
    $('#game-over-text').text('Game Over, Press Start to Restart');
    setTimeout(function() {
      $('body').removeClass('game-over-bg');
    }, 200);
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
