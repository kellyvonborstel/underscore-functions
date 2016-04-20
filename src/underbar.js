(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument.
  // Use this if a function needs an iterator and none is passed in.
  _.identity = function(val) {
    return val;
  };

  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Returns an array of the last n elements of an array. If n is
  // undefined, return the last element.
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

  // Returns the index at which a target value can be found in the array,
  // or -1 if target value is not present in the array.
  _.indexOf = function(array, target) {
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

  // Takes an array of objects and returns an array of the values of
  // a certain property in it. For example, take an array of people and
  // return an array of just their ages.
  _.pluck = function(collection, key) {
    return _.map(collection, function(object) {
      return object[key];
    });
  };

  // Reduces an array or object to a single value by calling
  // iterator(accumulator, item) for each item; accumulator should be
  // the return value of the previous iterator call. A starting value for the
  // accumulator can be passed as the third argument to reduce. If no starting
  // value is passed, the first element is used as the accumulator and is
  // never passed to the iterator. So, in the case where a starting value is
  // not passed, the iterator is not invoked until the second element, with
  // the first element as its second argument.
  _.reduce = function(collection, iterator, accumulator) {
    if (arguments.length < 3) {
      accumulator = collection[0];
      collection = collection.slice(1);
    }
    _.each(collection, function(item) {
      accumulator = iterator(accumulator, item);
    });
    return accumulator;
  };

  // Determines if the array or object contains an item that is strictly
  // equal to the passed in target.
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
      iterator = _.identity;
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
      iterator = _.identity;
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
  // passed in object(s), but doesn't overwrite a key that
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
  // that value instead.
  _.memoize = function(func) {
    var memo = {};
    return function() {
      var args = Array.prototype.slice.call(arguments);
      if (memo[args] !== undefined) {
        return memo[args];
      } else {
        memo[args] = func.apply(this, args);
        return memo[args];
      }
    };
  };

  // Delays a function for the given number of milliseconds,
  // then calls it with the arguments supplied.
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

  // Calls the method named by functionOrKey on each value in the
  // list and returns a list of results.
  _.invoke = function(collection, functionOrKey, args) {
    return _.map(collection, function(value) {
      if (typeof functionOrKey === 'string') {
        return value[functionOrKey].apply(value, args);
      } else {
        return functionOrKey.apply(value, args);
      }
    });
  };

  // Sorts the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property named by
  // that string.
  _.sortBy = function(collection, iterator) {
    var newIterator = function(item) {
      return typeof iterator === 'string' ? item[iterator] : iterator(item);
    };
    for (var i = collection.length; i > 0; i--) {
      for (var j = 1; j < i; j++) {
        // undefined items should be moved towards the end of the list
        if (collection[j - 1] === undefined ||
          newIterator(collection[j - 1]) > newIterator(collection[j])) {
          var temp = collection[j - 1];
          collection[j - 1] = collection[j];
          collection[j] = temp;
        }
      }
    }
    return collection;
  };

  // Zips together two or more arrays, placing elements of the same index
  // together in a new array.
  _.zip = function() {
    var args = Array.prototype.slice.call(arguments);
    var results = [];
    // sort the args from longest to shortest and get longest to determine
    // how many zipped items there will be, so how many times to loop
    var longestArg = args.sort(function(a, b) {
      return b.length - a.length;
    })[0];
    for (var i = 0; i < longestArg.length; i++) {
      var zipped = [];
      for (var j = 0; j < args.length; j++) {
        zipped.push(args[j][i]);
      }
      results.push(zipped);
    }
    return results;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  _.flatten = function(nestedArray, result) {
    result = result || [];
    var unNest = function(array) {
      _.each(array, function(element) {
        if (Array.isArray(element)) {
          unNest(element);
        } else {
          result.push(element);
        }
      });
      return result;
    };
    return unNest(nestedArray);
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var args = Array.prototype.slice.call(arguments);
    var results = [];
    var shortestArg = args.sort(function(a, b) {
      return a.length - b.length;
    })[0];
    for (var i = 0; i < shortestArg.length; i++) {
      var allContain = true;
      for (var j = 0; j < args.length; j++) {
        if (!_.contains(args[j], shortestArg[i])) {
          allContain = false;
        }
      }
      if (allContain) {
        results.push(shortestArg[i]);
      }
    }
    return results;
  };

  // Takes the difference between one array and a number of other arrays.
  // Only the elements present in only the first array will remain.
  _.difference = function(array) {
    var args = Array.prototype.slice.call(arguments);
    var firstArg = args.shift();
    var remaining = _.flatten(args);
    var results = [];
    for (var i = 0; i < firstArg.length; i++) {
      if (!_.contains(remaining, firstArg[i])) {
        results.push(firstArg[i]);
      }
    }
    return results;
  };

  // Returns a function, that, when invoked, will only be triggered at
  // most once during a given window of time.
  _.throttle = function(func, wait) {
    var currentlyWaiting = false;
    return function() {
      if (!currentlyWaiting) {
        func.apply(this, arguments);
        currentlyWaiting = true;
        setTimeout(function() {
          currentlyWaiting = false;
        }, wait);
      }
    };
  };

}());
