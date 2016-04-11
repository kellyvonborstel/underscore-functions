(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument.
  // Use this if a function needs an iterator when the user does not pass one.
  _.identity = function(val) {
    return val;
  };

  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Returns an array of the last n elements of an array. If n is undefined,
  // return just the last element.
  _.last = function(array, n) {
    if (n === 0) {
      return [];
    }
    return n === undefined ? array[array.length - 1] : array.slice(-n);
  };

  // Calls iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    var result = -1;
    _.each(array, function(value, index) {
      if (value === target && result === -1) {
        result = index;
      }
    });
    return result;
  };

  // Returns all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var results = [];
    _.each(collection, function(element) {
      if (test(element)) {
        results.push(element);
      }
    });
    return results;
  };

  // Returns all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    return _.filter(collection, function(element) {
      return !test(element);
    });
  };

  // Produces a duplicate-free version of the array.
  _.uniq = function(array) {
    var results = [];
    _.each(array, function(element, index) {
      if (_.indexOf(results, element) === -1) {
        results.push(element);
      }
    });
    return results;
  };

  // Returns the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    var results = [];
    _.each(collection, function(element) {
      results.push(iterator(element));
    });
    return results;
  };

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages.
  _.pluck = function(collection, key) {
    return _.map(collection, function(object) {
      return object[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item; accumulator should be
  // the return value of the previous iterator call.
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  _.reduce = function(collection, iterator, accumulator) {
    if (arguments.length < 3) {
      var accumulator = collection[0];
      collection = collection.slice(1);
    }
    _.each(collection, function(item) {
      accumulator = iterator(accumulator, item);
    });
    return accumulator;
  };

  // Determines if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };

  // Determines whether all of the elements match a truth test.
  // If no iterator is provided, provide a default one.
  _.every = function(collection, iterator) {
    if (arguments.length < 2) {
      var iterator = _.identity;
    }
    return _.reduce(collection, function(allTrue, element) {
      if (!allTrue) {
        return false;
      }
      return !!(iterator(element) && allTrue);
    }, true);
  };

  // Determine whether any of the elements pass a truth test.
  // If no iterator is provided, provide a default one.
  _.some = function(collection, iterator) {
    if (arguments.length < 2) {
      var iterator = _.identity;
    }
    return !_.every(collection, function(element) {
      return !iterator(element);
    });
  };

  // Extends a given object with all the properties of the
  // passed in object(s).
  _.extend = function(obj) {
    var args = Array.prototype.slice.call(arguments);
    return _.reduce(args, function(obj, arg) {
      _.each(arg, function(value, key) {
        obj[key] = value;
      });
      return obj;
    }, obj);
  };

  // Extends a given object with all the properties of the
  // passed in object(s), but doesn't ever overwrite a key that
  // already exists in obj.
  _.defaults = function(obj) {
    var args = Array.prototype.slice.call(arguments);
    return _.reduce(args, function(obj, arg) {
      _.each(arg, function(value, key) {
        if (obj[key] === undefined) {
          obj[key] = value;
        }
      });
      return obj;
    }, obj);
  };

  // Returns a function that can be called at most one time.
  // Subsequent calls should return the previously returned value.
  _.once = function(func) {
    var alreadyCalled = false;
    var result;
    return function() {
      if (!alreadyCalled) {
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      return result;
    };
  };

  // Returns a function that, when called, will check if it has
  // already computed the result for the given argument and return
  // that value instead if possible.
  _.memoize = function(func) {
    var memo = {};
    return function() {
      var args = Array.prototype.slice.call(arguments);
      if (memo[args] !== undefined) {
        return memo[args];
      } else {
        return memo[args] = func.apply(this, args);
      }
    };
  };

  // Delays a function for the given number of milliseconds,
  // and then calls it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = Array.prototype.slice.call(arguments, 2);
    setTimeout(function() {
      return func.apply(this, args);
    }, wait);
  };

  // Randomizes the order of an array's contents.
  _.shuffle = function(array) {
    var arr = array.slice();
    while (arr.toString() === array.toString()) {
      for (var i = arr.length - 1; i > 0; i--) {
        var random = Math.floor(Math.random() * (i + 1));
        var temp = arr[random];
        arr[random] = arr[i];
        arr[i] = temp;
      }
    }
    return arr;
  };

  /**
   * EXTRA CREDIT
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
