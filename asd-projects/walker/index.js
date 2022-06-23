/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  //declaring key codes and assigning them a name
  var KEY = {
    "ENTER": 13,
    "DOWN": 40,
    "UP": 38,
    "LEFT": 37,
    "RIGHT": 39,
    "A": 65,
    "W": 87,
    "S": 83,
    "D": 68,
  }
  //positions for up, down, right, and left

  var positionX = 1000;
  var positionY = 250;
  var speedX = 0;
  var speedY = 0;

  //position for up, down, right, and left for second player
  var positionX2 = 200;
  var positionY2 = 250;
  var speedX2 = 0;
  var speedY2 = 0;

  // Game Item Objects


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp); // event code for actions when key is released
  $("#instructions").on("click", function () {
    $("#instructions_container").show();
  })
  $("#close_button").on("click", () => {
    $("#instructions_container").hide();
  })

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  //helper function that includes functions for moving and drawing the box when a new frame happens

  function newFrame() {

    repositionGameItem();
    redrawGameItem();
  }

  /* 
  Called in response to events.
  */
  // function created to let us know what happens when we press on the arrow keys and AWSD
  function handleKeyDown(event) {

    if (event.which === KEY.LEFT) {
      speedX = -5;
      console.log("left pressed");
    }
    else if (event.which === KEY.RIGHT) {
      speedX = 5;
      console.log("right pressed");
    }

    else if (event.which === KEY.DOWN) {
      speedY = 5;
      console.log("down pressed");
    }
    else if (event.which === KEY.UP) {
      speedY = -5;
      console.log("up pressed");
    }
    else if (event.which === KEY.A) {
      speedX2 = -5;
      console.log("A pressed");
    }
    else if (event.which === KEY.W) {
      speedY2 = -5;
      console.log("W pressed");
    }
    else if (event.which === KEY.S) {
      speedY2 = 5;
      console.log("S pressed");
    }
    else if (event.which === KEY.D) {
      speedX2 = 5;
      console.log("D pressed");
    }
  }



  //function to let us know what happens when the arrow key and AWSD keys are released
  function handleKeyUp(event) {
    if (event.which === KEY.LEFT) {
      speedX = 0;
      speedY = 0;
    }
    else if (event.which === KEY.RIGHT) {
      speedX = 0;
      speedY = 0;
    }
    else if (event.which === KEY.UP) {
      speedX = 0;
      speedY = 0;
    }
    else if (event.which === KEY.DOWN) {
      speedX = 0;
      speedY = 0;
    }
    else if (event.which === KEY.A) {
      speedX2 = 0;
      speedY2 = 0;
    }
    else if (event.which === KEY.W) {
      speedX2 = 0;
      speedY2 = 0;
    }
    else if (event.which === KEY.S) {
      speedX2 = 0;
      speedY2 = 0;
    }
    else if (event.which === KEY.D) {
      speedX2 = 0;
      speedY2 = 0;
    }

  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////


  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

  function repositionGameItem() {

    var boardHeight = $('board').height();
  

    positionX = positionX + speedX; //for walker 1
    positionY = positionY + speedY;

    //conditionals to prevent the walker peices to leave bounds - will reposition to starting point
    if (positionX >= 1250) {
      positionX = 1000
      positionY = 250;

    }
    if (positionY <= boardHeight) {
      positionX = 1000;
      positionY = 250;
    }

    if (positionX <= 0) {
      positionX = 1000;
      positionY = 250;
    }

    if (positionY >= 500) {
      positionX = 1000;
      positionY = 250;
    }


    positionX2 = positionX2 + speedX2; //for walker 2
    positionY2 = positionY2 + speedY2;

    //conditionals to prevent walker 2 to leave bounds - will reposition to original position

    if (positionX2 >= 1250) {
      positionX2 = 200
      positionY2 = 250;

    }
    if (positionY2 <= boardHeight) {
      positionX2 = 200;
      positionY2 = 250;
    }

    if (positionX2 <= 0) {
      positionX2 = 200;
      positionY2 = 250;
    }

    if (positionY2 >= 500) {
      positionX2 = 200;
      positionY2 = 250;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////Code for collisions///////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////

    /* var swimmerWidth = $('#swimmer').width();
     var swimmerHeight = $('#swimmer').height();
     var swimmerLeft = parseFloat($("#swimmer").css("left"));
     var swimmerTop = parseFloat($("#swimmer").css("left"));
 
     if (positionX > swimmerWidth){
       speedX = -1;
     }
     if (positionY > swimmerHeight){
       speedY = -1;
     }
     if (positionX > swimmerLeft){
       speedX = -1;
     }
     if(positionY > swimmerTop){
       speedX = -1;
     }
     */


  }

  function redrawGameItem() {
    $("#walker").css("left", positionX);   //drawing it relative to its position to the left
    $("#walker").css("top", positionY);   //drawing to relative to its position to the top

    $("#swimmer").css("left", positionX2); //same as above but for player 2
    $("#swimmer").css("top", positionY2);

  }

}

