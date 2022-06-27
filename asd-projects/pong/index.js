/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BALL_SIZE = 50;
  const BOARD_WIDTH = $("#board").width() - BALL_SIZE;
  const BOARD_HEIGHT = $("#board").height() - BALL_SIZE;
  const PADDLE_SIZE = 100;
  const BOARD_HEIGHT_PADDLE = $("#board").height() - PADDLE_SIZE;

  //key variables
  var KEY = {
    "W": 87,
    "S": 83,
    "UP": 38,
    "DOWN": 40,
  }

  var updatedScore1 = 1;
  var updatedScore2 = 1;

  // Game Item Objects

  var ball = properties('#ball');
  var leftPaddle = properties('#leftPaddle');
  var rightPaddle = properties('#rightPaddle');

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);
  $(document).on('keyup', handleKeyUp);
  $("#instructions").on("click", function () {
    $("#instructions_container").show();
  })
  $("#close_button").on("click", () => {
    $("#instructions_container").hide();
  })
  startBall();

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {

    moveObject(ball);
    moveObject(leftPaddle);
    moveObject(rightPaddle);

    wallCollision(ball);
    wallCollision(leftPaddle);
    wallCollision(rightPaddle);


    ballPaddle();
    points();

  }

  /* 
  Called in response to events.
  */

  function handleKeyDown(event) {
    if (event.which === KEY.W) {
      console.log("W pressed");
      leftPaddle.speedY = -5;
    }
    else if (event.which === KEY.S) {
      console.log("S pressed");
      leftPaddle.speedY = 5;
    }
    else if (event.which === KEY.UP) {
      console.log("Up pressed");
      rightPaddle.speedY = -5;
    }
    else if (event.which === KEY.DOWN) {
      console.log("Down pressed");
      rightPaddle.speedY = 5;
    }
  }

  function handleKeyUp(event) {

    if (event.which === KEY.W) {
      console.log("W unpressed");
      leftPaddle.speedY = 0;
    }
    else if (event.which === KEY.S) {
      console.log("S unpressed");
      leftPaddle.speedY = 0;
    }
    else if (event.which === KEY.UP) {
      console.log("Up unpressed");
      rightPaddle.speedY = 0;
    }
    else if (event.which === KEY.DOWN) {
      console.log("Down unpressed");
      rightPaddle.speedY = 0;
    }

  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function wallCollision(gamePiece) {
    if (gamePiece.x > BOARD_WIDTH) {
      gamePiece.speedX *= -1;
      $('#player1Score').text(updatedScore1++);
      startBall();
    }
    else if (gamePiece.x < 0) {
      gamePiece.speedX *= -1;
      $('#player2Score').text(updatedScore2++);
      startBall();
    }
    else if (gamePiece.y < 0) {
      gamePiece.speedY *= -1;
    }
    else if (gamePiece.y > BOARD_HEIGHT && gamePiece.y > BOARD_HEIGHT_PADDLE) {
      gamePiece.speedY *= -1;
    }
  }

  function points(){
    if (updatedScore1 >= 8 || updatedScore2 >= 8){
      endGame();
    }
  }



  function doCollide(obj1, obj2) {

    // TODO: calculate and store the remaining
    // sides of obj1
    obj1.leftX = obj1.x;
    obj1.topY = obj1.y;
    obj1.right = obj1.x + obj1.width;
    obj1.bottom = obj1.y + obj1.height;

    // TODO: Do the same for obj2

    obj2.leftX = obj2.x;
    obj2.topY = obj2.y;
    obj2.right = obj2.x + obj2.width;
    obj2.bottom = obj2.y + obj2.height;

    // TODO: Return true if they are overlapping, false otherwise

    if (obj1.leftX < obj2.right && obj1.right > obj2.leftX && obj1.topY <
      obj2.bottom && obj1.bottom > obj2.topY) {
      return true;
    }

    else return false;

  }

  function ballPaddle() {
    if (doCollide(leftPaddle, ball) === true) {
      ball.speedX *= -1;
    }
    else if (doCollide(rightPaddle, ball) === true) {
      ball.speedX *= -1;
    }
  }



  function moveObject(object) {

    //moving the objects
    object.x += object.speedX;
    object.y += object.speedY;

    //drawing the objects
    $(object.id).css("left", object.x);
    $(object.id).css("top", object.y);

  }

  function startBall() {
    ball.speedX = randomNumber = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
    ball.speedY = randomNumber = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
    ball.x = 630;
    ball.y = 250;

  }

  function properties(elementId) {

    var gameObject = {};
    gameObject.id = elementId;
    gameObject.x = parseFloat($(elementId).css('left'));
    gameObject.y = parseFloat($(elementId).css('top'));
    gameObject.width = $(elementId).width();
    gameObject.height = $(elementId).height();
    gameObject.speedX = 0;
    gameObject.speedY = 0;
    return gameObject;

  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

}

