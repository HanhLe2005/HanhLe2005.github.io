// This makes the arguments variable behave the way we want it to and a few
// other things. For more info:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
"use strict";

var _ = {};

/**
 * START OF OUR LIBRARY!
 * Implement each function below it's instructions
 */

/** _.typeOf
 * Arguments:
 *   1) Any value
 * Objectives:
 *   1) Return the type of <value> as a string
 *       Types are one of:
 *          - "string"
 *          - "array"
 *          - "object"
 *          - "undefined"
 *          - "number"
 *          - "boolean"
 *          - "null"
 *          - "function"
 * Examples:
 * _.typeOf(134) -> "number"
 * _.typeOf("javascript") -> "string"
 * _.typeOf([1,2,3]) -> "array"
 */

_.typeOf = function (value) {
  if (Array.isArray(value) === true) {
    return "array";
  }
  if (value === null) {
    return "null";
  }
  return typeof value;
};

/** _.first
 * Arguments:
 *   1) An array
 *   2) A number
 * Objectives:
 *   1) If <array> is not an array, return []
 *   2) If <number> is not given or not a number, return just the first element in <array>.
 *   3) Otherwise, return the first <number> items of <array>
 * Edge Cases:
 *   1) What if <number> is negative?
 *   2) What if <number> is greater than <array>.length?
 * Examples:
 *   _.first("ponies", 1) -> []
 *   _.first(["a", "b", "c"], "ponies") -> "a"
 *   _.first(["a", "b", "c"], 1) -> "a"
 *   _.first(["a", "b", "c"], 2) -> ["a", "b"]
 */

_.first = function (array, number) {
  if (number <= 0) {
    return [];
  }
  if (Array.isArray(array) === false) {
    return [];
  }
  if (number >= array.length) {
    return array;
  }
  if (typeof number !== "number") {
    return array[0];
  }
  var result = [];
  for (var i = 0; i < number; i++) {
    result.push(array[i]);
  }
  return result;
};

/** _.last
 * Arguments:
 *   1) An array
 *   2) A number
 * Objectives:
 *   1) If <array> is not an array, return []
 *   2) If <number> is not given or not a number, return just the last element in <array>.
 *   3) Otherwise, return the last <number> items of <array>
 * Edge Cases:
 *   1) What if <number> is negative?
 *   2) What if <number> is greater than <array>.length?
 * Examples:
 *   _.last("ponies", 2) -> []
 *   _.last(["a", "b", "c"], "ponies") -> "c"
 *   _.last(["a", "b", "c"], 1) -> "c"
 *   _.last(["a", "b", "c"], 2) -> ["b", "c"]
 */

_.last = function (array, number) {
  if (number <= 0) {
    return [];
  }
  if (Array.isArray(array) === false) {
    return [];
  }
  if (number >= array.length) {
    return array;
  }
  if (typeof number !== "number") {
    return array[array.length - 1];
  }
  var result = [];
  for (var i = array.length - number; i < array.length; i++) {
    result.push(array[i]);
  }
  return result;
};

/** _.indexOf
 * Arguments:
 *   1) An array
 *   2) A value
 * Objectives:
 *   1) Return the index of <array> that is the first occurrance of <value>
 *   2) Return -1 if <value> is not in <array>
 *   3) Do not use [].indexOf()!
 * Edge Cases:
 *   1) What if <array> has multiple occurances of val?
 *   2) What if <val> isn't in <array>?
 * Examples:
 *   _.indexOf(["a","b","c"], "c") -> 2
 *   _.indexOf(["a","b","c"], "d") -> -1
 */

_.indexOf = function (array, value) {
  for (var i = 0; i < array.length; i++) {
    if (value === array[i]) {
      return i;
    }
  }
  if (value !== array[i]) {
    return -1;
  }
};

/** _.contains
 * Arguments:
 *   1) An array
 *   2) A value
 * Objectives:
 *   1) Return true if <array> contains <value>
 *   2) Return false otherwise
 * Edge Cases:
 *   1) did you use === ?
 *   2) what if no <value> is given?
 * Examples:
 *   _.contains([1,"two", 3.14], "two") -> true
 *   _.contains([1,"two", 3.14], "three") -> false
 */

_.contains = function (array, value) {
  for (var i = 0; i < array.length; i++) {
    if (value === array[i]) {
      return true;
    }
  }
      return false;
    
};

/** _.each
 * Arguments:
 *   1) A collection
 *   2) A function
 * Objectives:
 *   1) if <collection> is an array, call <function> once for each element
 *      with the arguments:
 *         the element, it's index, <collection>
 *   2) if <collection> is an object, call <function> once for each property
 *      with the arguments:
 *         the property's value, it's key, <collection>
 * Examples:
 *   _.each(["a","b","c"], function(e,i,a){ console.log(e); });
 *      -> should log "a" "b" "c" to the console
 */

_.each = function(collection, func) {
  if (_.typeOf(collection) === "array") {
    for (var i = 0; i < collection.length; i++) {
      func(collection[i], i, collection);
    }
  }
  if (_.typeOf(collection) === "object") {
    for (var i = 0; i < array.length; i++) {
      func(collection[i], collection.key(i), collection[i]);
    }
  }

  if (_.typeOf(collection) = "object"){
    
  }
};

/** _.filter
 * Arguments:
 *   1) An array
 *   2) A function
 * Objectives:
 *   1) call <function> for each element in <array> passing the arguments:
 *      the element, it's index, <array>
 *   2) save the element in a new Array if calling <function> returned true
 *   3) return the new Array
 * Edge Cases:
 *   1) What if <function> returns something other than true or false?
 * Examples:
 *   _.filter([1,2,3,4,5], function(x){ return x%2 === 0; }) -> [2,4]
 * Extra Credit:
 *   use _.each in your implementation
 */

_.filter = function (arr, fun) {
  var result = [];

  for (var i = 0; i < arr.length; i++) {
    var isGood = fun(arr[i], i, arr);
    if (isGood === true) {
      result.push(arr[i]);
    }
  }
  return result;
};


/** _.map
 * Arguments:
 *   1) A collection
 *   2) a function
 * Objectives:
 *   1) if <collection> is an array, call <function> once for each element
 *      with the arguments:
 *         the element, it's index, <collection>
 *   2) if <collection> is an object, call <function> once for each property
 *      with the arguments:
 *         the property's value, it's key, <collection>
 *   3) save the return value of each <function> call in a new array
 *   4) return the new array
 * Examples:
 *   _.map([1,2,3,4], function(e){ return e * 2; }) -> [2,4,6,8]
 */

_.map = function (collection, func) {
  var result = [];

  if (typeOf(collection) === array) {
    for (i = 0; i < array.length; i++) {
      func(collection[i], i, collection[i]);
      result.push(array[i]);
    }
  }

  if (typeOf(collection) === object) {
    for (i = 0; i < array.length; i++) {
      func(collection[i], collection.i, collection[i]);
      result.push(array[i]);
    }

    return result;
  }
  return result;
};

/** _.reject
 * Arguments:
 *   1) An array
 *   2) A function
 * Objectives:
 *   1) call <function> for each element in <array> passing the arguments:
 *      the element, it's index, <array>
 *   2) save the element in a new Array if calling <function> returned false
 *   3) return the new Array
 *
 * HINT: This is the logical inverse of _.filter() - how can you use it in your implementation?
 *
 * Examples:
 *   _.reject([1,2,3,4,5], function(e){ return e%2 === 0}; ) -> [1,3,5]
 **/

_.reject = function (arr, func) {
    var result = [];
  
    for (var i = 0; i < arr.length; i++) {
      var isBad = func(arr[i], i, arr);
      if (isBad === false) {
        result.push(arr[i]);
      }
    }
    return result;
  
  };

  /** _.partition
* Arguments:
*   1) An array
*   2) A function
* Objectives:
*   1) Call <function> for each element in <array> passing it the arguments:
*       element, key, <array>
*   2) Return an array that is made up of 2 sub arrays:
*       0) An array that contains all the values for which <function> returned something truthy
*       1) An array that contains all the values for which <function> returned something falsy
* Edge Cases:
*   1) This is going to return an array of arrays.
* Examples:
*   _.partition([1,2,3,4,5], function(element,index,arr){
*     return element % 2 === 0;
*   }); -> [[2,4],[1,3,5]]
}
*/

  _.partition = function (array, func) {
    var resultT = [];
    var resultF = [];

    for (var i = 0; i < array.length; i++) {
      var answer = func(array[i], i, array);
    }
    if (answer === true) {
      resultT.push(array[i]);
    }

    for (var i = 0; i < array.length; i++) {
      var answer = func(array[i], i, array);
    }
    if (answer === false) {
      resultF.push(array[i]);
    }
  };


/** _.every
 * Arguments:
 *   1) A collection
 *   2) A function
 * Objectives:
 *   1) if <collection> is an array, call <function> once for each element
 *      with the arguments:
 *         the element, it's index, <collection>
 *   2) if <collection> is an object, call <function> once for each property
 *      with the arguments:
 *         the property's value, it's key, <collection>
 *   3) If the return value of calling <function> for every element is true, return true
 *   4) If even one of them returns false, return false
 *   5) If <function> is not provided, return true if every element is truthy, otherwise return false
 * Edge Cases:
 *   1) what if <function> doesn't return a boolean
 *   2) What if <function> is not given?
 * Examples:
 *   _.every([2,4,6], function(e){ return e % 2 === 0}; ) -> true
 *   _.every([1,2,3], function(e){ return e % 2 === 0}; ) -> false
 */

_.every = function (collection, func) {
  if (typeOf(collection) === array) {
    for (var i = 1; i < collection.length; i++) {
      var placeholder = func(collection[i], i, collection);
      placeholder2.push(placeholder);
    }

    if (typeOf(collection) === object) {
      for (i = 0; i < array.length; i++) {
        var placehol = func(object[i], object(key(i)), collection[i]);
        placeholder2.push(placehol);
      }
    }

    var placeholder2 = [];

    if (placeholder2 === true) {
      return "true";
    }
    if (placeholder2 === false) {
      return "false";
    }
  }
};

/** _.some
 * Arguments:
 *   1) A collection
 *   2) A function
 * Objectives:
 *   1) if <collection> is an array, call <function> once for each element
 *      with the arguments:
 *         the element, it's index, <collection>
 *   2) if <collection> is an object, call <function> once for each property
 *      with the arguments:
 *         the property's value, it's key, <collection>
 *   3) If the return value of calling <function> is true for at least one element, return true
 *   4) If it is false for all elements, return false
 *   5) If <function> is not provided return true if at least one element is truthy, otherwise return false
 * Edge Cases:
 *   1) what if <function> doesn't return a boolean
 *   2) What if <function> is not given?
 * Examples:
 *   _.some([1,3,5], function(e){ return e % 2 === 0}; ) -> false
 *   _.some([1,2,3], function(e){ return e % 2 === 0}; ) -> true
 */

/** _.pluck
 * Arguments:
 *   1) An array of objects
 *   2) A property
 * Objectives:
 *   1) Return an array containing the value of <property> for every element in <array>
 *   2) You must use _.map() in your implementation.
 * Examples:
 *   _.pluck([{a: "one"}, {a: "two"}], "a") -> ["one", "two"]
 */

_.pluck = function (array, property) {
  var feathers = [];
  for (var i = 0; i < array.length; i++) {
    if (property === array[i]) {
      var check = map(array[i]);
      feathers.push(check);
    }
  }
};

//////////////////////////////////////////////////////////////////////
// DON'T REMOVE THIS CODE ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = _;
}
