(function(window, _) {
    window.myLibraryName = window.myLibraryName || {
      numz: {},
      phyz: {
        /**
         * 
         * @param {object} obj1 
         * @param {number} obj1.x
         * @param {number} obj1.y
         * @param {object} obj2 
         * @param {number} obj2.x
         * @param {number} obj2.y
         * @returns {number} number represents distance between obj1 and obj2
         */
        calcDistance(obj1, obj2){
          const
          distanceX = obj2.x - obj1.x,
          distanceY = obj2.y - obj1.y,
          distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        return distance;

        },
      },
    };
  }(window, window._));

  gummybears.phyz.calcDistance();