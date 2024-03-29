// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {

  // Multiple TODOs: Call your apply function(s) here

  //calls functions to apply filters
  applyFilter(reddify); 
  applyFilterNoBackground(decreaseBlue);
  applyFilterNoBackground(increaseGreenByBlue);

  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here

//function created in order to apply filters to each of the grid in the image
//function also used to change and differentiate between strings and rgb values

function applyFilter(filterFunction){
  for (var i = 0; i < image.length; i++){
    for (var j = 0; j < image[i].length; j++){
      var rgbString = image[i][j];
       var rgbNumbers = rgbStringToArray(rgbString); //changes the numbers to strings and vice versa
        filterFunction(rgbNumbers);
          rgbString = rgbArrayToString(rgbNumbers);
          image[i][j] = rgbString;
      }
    }
  }
      
// TODO 7: Create the applyFilterNoBackground function

//function created to apply filters on parts of the image array that isn't the background color
function applyFilterNoBackground(filterFunction){
  var backgroundColor = image[1][1]; //value of background color
  for (var i = 0; i < image.length; i++){
    for (var j = 0; j < image[i].length; j++){
      var rgbString = image[i][j];
        if (backgroundColor === image[i][j]){ //declaring what it has to be equal to stay the same
          }
          else {
            var rgbNumbers = rgbStringToArray(rgbString); //everything in this section applies the filter
               filterFunction(rgbNumbers);
                 rgbString = rgbArrayToString(rgbNumbers);
                   image[i][j] = rgbString;
          }
      }
    }
  }
  

// TODO 5: Create the keepInBounds function

// function created to keep values between a range of 255 and 0
function keepInBounds(tight){
  
var o = Math.min(tight, 255); // creates a boundary and stores it in a variable
  return Math.max(o, 0); 

};


// TODO 3: Create reddify function

//applies a red filter to image
function reddify(rosa){
  rosa[RED] = 200;
}

// TODO 6: Create more filter functions

//applies a blue filter or decrease the blue value of the image
function decreaseBlue(agua){
  agua[BLUE] = keepInBounds(agua[BLUE] - 50); //takes away values
}

//applies a green filter to the image based on the blue values
function increaseGreenByBlue(verde){
  verde[GREEN] = keepInBounds(verde[BLUE] + verde[GREEN]); //creating a filter by adding blue and green values
}
// CHALLENGE code goes below here
