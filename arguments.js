/**
 * JavaScript 可变长参数的函数通过访问 arguments 局部变量获取它的参数表
 *
 * 可以通过实现一个额外固定元数版本的函数，再通过传递 arguments 实现一个可变长参数的版本
 * 这样一来，函数的使用者就不用借助 apply 方法，因为 apply 方法会降低可读性而且经常导致性能损失
 */
(function () {
  function averageOfArray(a) {
    for (var i = 0, sum = 0, n = a.length; i < n; i++) {
      sum += a[i];
    }
    return sum / n;
  }
  console.log(averageOfArray([2, 7, 1, 8, 2, 8, 1, 8])); // 4.625

  function average() {
    return averageOfArray(arguments);
  }
  console.log(average(2, 7, 1, 8, 2, 8, 1, 8)); // 4.625
})();

/**
 * arguments 对象看起来像一个数组，可以它并不总是表现的像数组
 */
(function () {
  function callMethod(obj, method) {
    var shift = [].shift;
    shift.call(arguments);
    shift.call(arguments);
    return obj[method].apply(obj, arguments);
  }

  var obj = {
    add: function (x, y) { return x + y; }
  };
  console.log(callMethod(obj, "add", 17, 25)); // apply undefined
})();

/**
 * 上列函数出错的原因是 arguments 对象并不是函数参数的副本，即使通过 shift 方法移除了 arguments 对象中的元素之后，
 * obj 仍然是 arguments[0] 的别名，method 仍然是 arguments[1] 的别名，所以 obj 现在是 17 method 是 25 ，此时
 * 一切开始失控！这个例子告诉我们 arguments 对象与函数的命名参数之间的关系及其脆弱。
 *
 * 在 ES5 严格模式下，情况甚至更为复杂。在严格模式下参数不支持 arguments 对象取别名，可以通过一个例子更新 arguments
 * 对象某个元素的函数说明差异。
 */
(function () {
  function strict(x) {
    "use strict";
    arguments[0] = "modified";
    return x === arguments[0];
  }

  function nonstrict(x) {
    arguments[0] = "modified";
    return x === arguments[0];
  }

  strict("unmodified"); // false
  nonstrict("unmodified"); // true
})();


/**
 * 因此，永远不要修改 arguments 对象更为安全
 *
 * 通过复制参数中的元素到一个真正的数组的方式，很容易避免修改 arguments 对象
 */
(function () {
  function callMethod(obj, method) {
    var args = [].slice.call(arguments, 2);
    return obj[method].apply(obj, args);
  }

  var obj = {
    add: function (x, y) { return x + y; }
  };
  console.log(callMethod(obj, "add", 17, 25)); // 42
})();

/**
 * 在嵌套函数中调用 arguments 最好绑定一个明确的作用域引用 arguments 变量
 */