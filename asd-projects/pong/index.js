/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  //key variables
  var KEY = {
    "W": 87,
    "S": 83,
    "UP": 38,
    "DOWN": 40,

  }

  // Game Item Objects

}

// one-time setup
let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
$(document).on('eventType', handleEvent);                           // change 'eventType' to the type of event you want to handle
$(document).on('keydown', handleKeyDown);
$(document).on('keyup', handleKeyUp);
////////////////////////////////////////////////////////////////////////////////
///////////////////////// CORE LOGIC ///////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/* 
On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
by calling this function and executing the code inside.
*/
function newFrame() {


}

/* 
Called in response to events.
*/

function handleKeyDown(event) {
if (event.which === KEY.W){
console.log("W pressed");
}
else if (event.which === KEY.S){
  console.log("S pressed");
}
else if (event.which === KEY.UP){
  console.log("Up pressed");
}
else if (event.which === KEY.DOWN){
  console.log("Down pressed");
}
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

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



