var init = function (window) {
    'use strict';
    var 
        draw = window.opspark.draw,
        physikz = window.opspark.racket.physikz,
        
        app = window.opspark.makeApp(),
        canvas = app.canvas, 
        view = app.view,
        fps = draw.fps('#000');
        
    
    window.opspark.makeGame = function() {
        
        window.opspark.game = {};
        var game = window.opspark.game;
        
        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM SETUP ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        // TODO 1 : Declare and initialize our variables
var circle;
var circles = [];

        // TODO 2 : Create a function that draws a circle 
      function drawCircle() {

 circle = draw.randomCircleInArea(canvas, true, true, '#999', 2);
 physikz.addRandomVelocity(circle, canvas);
 view.addChild(circle);
 circles.push(circle);

      }  

        // TODO 3 / 8 : Call the drawCircle() function 


for (var loopsDone = 0; loopsDone < 101; loopsDone++){
    drawCircle();
}


        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM LOGIC ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        /* 
        This Function is called 60 times/second producing 60 frames/second.
        In each frame, for every circle, it should redraw that circle
        and check to see if it has drifted off the screen.         
        */
        function update() {

            // TODO 4 : Update the circle's position //

          /* physikz.updatePosition(circle[0]);
           physikz.updatePosition(circle[1]);
           physikz.updatePosition(circle[2]);
            physikz.updatePosition(circle[3]);
            physikz.updatePosition(circle[4]); this is commented out as the iterations
             will act as us writing this code multiple times
            */

            for (var eachCircle = 0; eachCircle < 101; eachCircle++){
                physikz.updatePosition(circles[eachCircle]);
                game.checkCirclePosition(circles[eachCircle]);
            }
            
            // TODO 5 / 10 : Call game.checkCirclePosition() on your circles.
           
         /*   game.checkCirclePosition(circle[0]);
            game.checkCirclePosition(circle[1]);
            game.checkCirclePosition(circle[2]);
            game.checkCirclePosition(circle[3]);
            game.checkCirclePosition(circle[4]);
            this is commented out as the iterations
            will act as us writing this code multiple times

        */ 

            // TODO 9 : Iterate over the array
           
            
        }
    
        /* 
        This Function should check the position of a circle that is passed to the 
        Function. If that circle drifts off the screen, this Function should move
        it to the opposite side of the screen.
        */
        game.checkCirclePosition = function(circle) {

            // if the circle has gone past the RIGHT side of the screen then place it on the LEFT
            if ( circle.x > canvas.width ) {
                circle.x = 0;
            }
            
            // TODO 7 : YOUR CODE STARTS HERE //////////////////////
            
            else if (circle.y > canvas.height){ // if the circle's position goes out the bottom
                circle.y = 0;
            }


            else if (circle.y < 0){ //if the circle 
                circle.y = canvas.height;

            }

            else if (circle.x < 0){
                circle.x = canvas.height;
            }


            // YOUR TODO 7 CODE ENDS HERE //////////////////////////
        }
        
        /////////////////////////////////////////////////////////////
        // --- NO CODE BELOW HERE  --- DO NOT REMOVE THIS CODE --- //
        /////////////////////////////////////////////////////////////
        
        view.addChild(fps);
        app.addUpdateable(fps);
        
        game.circle = circle;
        game.circles = circles;
        game.drawCircle = drawCircle;
        game.update = update;
        
        app.addUpdateable(window.opspark.game);
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = init;
}
