/**
 * 对象是 JavaScript 的基本数据结构，JavaScript 支持继承，但不像许多传统的语言，JavaScript 的继承机制基于原型，而不是类
 *
 * 原型包括三个独立但相关的访问器 prototype、getPrototypeOf 和 __proto__ 这三个访问器的命名都是对单词 prototype 做了一些变化
 *
 * C.prototype 用于建立由 new C() 创建的对象原型
 * Object.getPrototypeOf(obj) 是 ES5 中来获取 obj 对象的原型对象的标准方法
 * obj.__proto__ 是获取 obj 对象原型对象的非标准方法
 *
 * JavaScript 中的类本质是一个构造函数与一个用于在该类实例间共享方法的原型对象的结合
 */
(function () {
  function User(name, passwordHash) {
    this.name = name;
    this.passwordHash = passwordHash;
  }

  User.prototype.toString = function () {
    return "[User " + this.name + "]";
  };

  User.prototype.checkPassword = function (password) {
    return password === this.passwordHash;
  };

  var u = new User("Hao", "123456789");

  console.log(u.toString()); // "[User Hao]"
  console.log(u.checkPassword("123456789")); // true

  /*
  Object.getPrototypeOf() 是 ES5 中用于检索现有对象的原型对象的方法
   */
  console.log(Object.getPrototypeOf(u) === User.prototype); // true
  /*
  一些环境提供了一个非标准的 __proto__ 属性检索对象的原型，这可作为不支持 ES5 的 Object.getPrototypeOf 方法的环境中的一个权宜之计
   */
  console.log(u.__proto__ === User.prototype); // true
})();

/**
 * 使用 Object.getPrototypeOf 函数而不要使用 __proto__ 属性，因为 ES5 引入的 Object.getPrototypeOf 函数作为获取对象原型的标准
 * API，但在这之前大量的 JavaScript 引擎早就使用一个特殊的 __proto__ 属性来达到相同的目的。然而并不是所有的 JavaScript 环境都支持
 * 通过 __proto__ 属性来获取对象的原型，因此，该属性并不是完全兼容的。例如，对于拥有 null 原型的对象，不同的环境处理的不一样。在一些
 * 环境中，__proto__ 属性继承自 Object.prototype，因此，拥有 null 原型的对象没有这个特殊的 __proto__ 属性。
 */
(function () {
  var empty = Object.create(null);
  console.log("__proto__" in empty); // false or true
  console.log(Object.getPrototypeOf(empty)); // null
})();

/**
 * 使构造函数与 new 操作符无关可以避免错误调用造成的严重错误
 *
 * 如果调用者忘记使用 new 关键字，那么构造函数的接收者将是全局对象，这将造成不易察觉的灾难性的错误
 */
(function () {
  function User(name, passwordHash) {
    /*
     严格模式下它的接收者默认为 undefined，在这种情况下这种错误调用会导致一个即时错误，因此严格模式下构造函数至少会帮助调用者尽早的发现
     该问题的存在
     */
    // "use strict";
    this.name = name;
    this.passwordHash = passwordHash;
  }

  var u = User("HaoWX", "0123456789");
  console.log(u); // undefined
  console.log(name); // "HaoWX"
  console.log(passwordHash); // "0123456789"
})();
console.log(name); // "HaoWX"
console.log(passwordHash); // "0123456789"

// 移除问题的影响
delete name;
delete passwordHash;
/**
 * 无论哪种情况下，User 函数都很脆弱，一个更健壮的方式是提供一个不管怎么调用都可以工作如构造函数的函数
 *
 * 实现该函数的一个简单方法是检查函数的接收者是否是一个正确的 User 实例
 */
(function () {
  function User(name, passwordHash) {
    if (!(this instanceof User)) {
      return new User(name, passwordHash);
    }
    this.name = name;
    this.passwordHash = passwordHash;
  }

  var x = User("Hao??", "998");
  var y = User("HaoR", "888");

  console.log(x instanceof User); // true
  console.log(y instanceof User); // true
})();

/**
 * 上述模式的缺点是它需要额外的函数调用，因此代价有点高。而且，它也很难适用于可变参数的构造函数，因为没有一种直接模拟 apply 方法将可变
 * 参数作为构造函数的调用方式。
 *
 * 一种更好的方式是利用 ES5 的 Object.create 方法
 */
(function () {
  function User(name, passwordHash) {
    var self = this instanceof User ? this : Object.create(User.prototype);
    self.name = name;
    self.passwordHash = passwordHash;

    return self;
  }

  var x = User("Hao??", "998");
  var y = User("HaoR", "888");

  console.log(x instanceof User); // true
  console.log(y instanceof User); // true
})();

/**
 * 总是应该在原型中储存方法，因为将方法存储在实例对象中将创建该方法的多个副本，所以将方法存储于原型中优于存储在实例对象中。
 *
 * JavaScript 中并没有特别鼓励强制信息隐藏，通常 JavaScript 程序员都倾向使用编码规范对待私有属性，而不是任何绝对的强制机制。例如私有
 * 属性前缀下划线 _，这并没有强制信息隐藏。
 *
 * 如果希望强制信息隐藏，可以使用 JavaScript 闭包来实现，该模式的缺点是为了使用构造函数中的变量，方法必须置于构造函数中，这会导致方法
 * 副本的扩散。
 */
(function () {
  function User(name, passwordHash) {
    var bigName = "BIG" + name;

    this.toString = function () {
      return "[User " + name + "]" + bigName;
    };
    this.checkPassword = function (password) {
      return password === passwordHash;
    };
  }

  var u = new User("Hao2333", "7777");
  console.log(u.name); // undefined
  console.log(u.bigName); // undefined
  console.log(u.toString()); // "[User Hao2333]"
})();

/**
 * 在编写类时要小心 this 变量的隐式绑定问题
 */
(function () {
  function Splice(separator) {
    this.separator = separator;
  }

  Splice.prototype.read = function (list) {
    return list.map(function (item) {
      return item + this.separator; // 这里的 this 绑定到了 list 期望值应该是 Splice 实例
    });
  };

  var splice = new Splice('-');

  console.log(splice.read(["a", "b", "c", "d"])); // ["aundefined", "bundefined", "cundefined", "dundefined"]
})();

/**
 * 解决上述问题可以使用 map 方法提供的调用者参数
 */
(function () {
  function Splice(separator) {
    this.separator = separator;
  }

  Splice.prototype.read = function (list) {
    return list.map(function (item) {
      return item + this.separator; // 这里传入 Splice 的 this 指定 map 的 this 的调用者
    }, this);
  };

  var splice = new Splice('-');

  console.log(splice.read(["a", "b", "c", "d"])); // ["a-", "b-", "c-", "d-"]
})();

/**
 * 目前并不是所有基于回调函数的 API 都是考虑周全的，如果 map 方法不提供指定调用者参数，可以通过保存 this 到作用域的变量，来储存这个外
 * 部的 this 引用。
 */
(function () {
  function Splice(separator) {
    this.separator = separator;
  }

  Splice.prototype.read = function (list) {
    var self = this;

    return list.map(function (item) {
      return item + self.separator; // 通过保存外部的 this 到 self 局部变量进行引用
    }, this);
  };

  var splice = new Splice('-');

  console.log(splice.read(["a", "b", "c", "d"])); // ["a-", "b-", "c-", "d-"]
})();

/**
 * 在 ES5 环境中，使用 bind 解决这个问题更加通用和方便
 */
(function () {
  function Splice(separator) {
    this.separator = separator;
  }

  Splice.prototype.read = function (list) {
    return list.map(function (item) {
      return item + this.separator;
    }.bind(this)); // 绑定这个匿名函数的调用者为 Splice 的 this
  };

  var splice = new Splice('-');

  console.log(splice.read(["a", "b", "c", "d"])); // ["a-", "b-", "c-", "d-"]
})();
