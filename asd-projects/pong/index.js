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

  //variables for player scores//
  var updatedScore1 = 1;
  var updatedScore2 = 1;
  let interval;
  // Game Item Objects

  //variables storing element properties from function//
  var ball = properties('#ball');
  var leftPaddle = properties('#leftPaddle');
  var rightPaddle = properties('#rightPaddle');

  // one-time setup
  $(document).on('keydown', handleKeyDown); //event handler for detecting keys and what happens after they're pressed
  $(document).on('keyup', handleKeyUp); //event handler for detecting when keys aren't pressed
  $("#start").on("click", start); //event handler saying when the start button is clicked, the start function is called, which starts the program
  $('#change_themes').on("click", changeTheme); //event saying to change CSS elements of the game when pressed
  $("#instructions").on("click", function () { //event calling the instructions and it's close button
    $("#instructions_container").show();
  })
  $("#close_button").on("click", () => {
    $("#instructions_container").hide(); //this hides the instruction button
  })
  startBall(); //starts the ball

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

  }

  /* 
  Called in response to events.
  */

  //function used above in the event handler, what happens when these keys are pressed...

  function handleKeyDown(event) {
    if (event.which === KEY.W) {
      console.log("W pressed"); //console will say its pressed
      leftPaddle.speedY = -10; //the SpeedY = -10, meaning it will go down
    }
    else if (event.which === KEY.S) {
      console.log("S pressed"); //console will say its pressed
      leftPaddle.speedY = 10; //SpeedY = 10, it'll go up.
    }
    else if (event.which === KEY.UP) {
      console.log("Up pressed");
      rightPaddle.speedY = -10; //same as key W
    }
    else if (event.which === KEY.DOWN) {
      console.log("Down pressed");
      rightPaddle.speedY = 10; //same as key S
    }
  }

  function handleKeyUp(event) {

    if (event.which === KEY.W) {
      console.log("W unpressed"); //console will say unpressed
      leftPaddle.speedY = 0; //speed will stop (same for all keys below)
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

  //calls the program to start
  function start() {
    interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  }

  //detects collision with wall
  function wallCollision(gamePiece) {
    if (gamePiece.x > BOARD_WIDTH) { //if the objectX is greater than board width (left side)
      gamePiece.speedX *= -1;       //it'll bounce back
      $('#player1Score').text(updatedScore1++); //the score will increase by one
      startBall(); //the ball will restart at its original position 
      points(); //point function will be called
    }
    else if (gamePiece.x < 0) {     //if objectX is greater than 0 (right side)
      gamePiece.speedX *= -1;      //go in opposite direction
      $('#player2Score').text(updatedScore2++);    //score will increase by one
      startBall();       //start ball will be called
      points();        //point function is called
    }
    else if (gamePiece.y < 0) {     //if objectY is less than 0 (top)
      gamePiece.speedY *= -1;     //itll go in the oppsite direction
    }
    else if (gamePiece.y > BOARD_HEIGHT && gamePiece.y > BOARD_HEIGHT_PADDLE) {   //if the object is greater than board height (bottom) OR boardheight paddle(declared above, just subjects the height of the paddle)
      gamePiece.speedY *= -1;     //object will go in the opposite direction
    }
  }

  function points() {
    if (updatedScore1 >= 11 || updatedScore2 >= 11) {     //if the scores for either player is greater than or equal to 11 (10 when called). the game ends
      endGame();
    }
    else if (updatedScore1 >= 4 || updatedScore2 >= 4) {     //when the score is greater than or equal to 4, (3 when called), the random speed will increase
      ball.speedX = (Math.random() * 5 + 6) * (Math.random() > 0.5 ? -1 : 1);
      ball.speedY = (Math.random() * 5 + 6) * (Math.random() > 0.5 ? -1 : 1);

    }

  }


  //function for checking if two objects collide

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


  //function that uses the collide function to check if the paddles and ball collide, and if so, the ball will bounce back
  function ballPaddle() {
    if (doCollide(leftPaddle, ball) === true) {
      ball.speedX *= -1;
    }
    else if (doCollide(rightPaddle, ball) === true) {
      ball.speedX *= -1;
    }
  }

//function to move objects across the board

  function moveObject(object) {

    //moving the objects
    object.x += object.speedX;
    object.y += object.speedY;

    //drawing the objects
    $(object.id).css("left", object.x);
    $(object.id).css("top", object.y);

  }


  //function that starts the ball at the center and gives it a random speed for when it moves
  function startBall() {
    ball.speedX = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
    ball.speedY = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
    ball.x = 630;
    ball.y = 250;

  }

  //function that changes the CSS elements of the game, when the button is pushed
  function changeTheme() {
    $('#board').css('background-color', 'rgb(204, 255, 204)');
    $('#board').css('border', '3px solid white');
    $('body').css('background-color', 'black');
    $('#start').css('border', '3px solid brown');
    $('#change_themes').css('border', '3px solid brown');
    $('#instructions').css('border', '3px solid brown');
    $('#player1Score').css('border', '3px solid brown');
    $('#player2Score').css('border', '3px solid brown');
    $('#ball').css('background-color', ' brown');

  }


  //factory function that stores everything
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


  //ends the game
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

}

