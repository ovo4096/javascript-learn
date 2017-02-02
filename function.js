/**
 * JavaScript 函数、方法、类只是 function 的三种不同的使用模式
 *
 * 最简单的使用模式是函数调用
 */
(function () {
  function hello(username) {
    return "hello, " + username;
  }

  console.log(hello("Hao")); // hello, Hao
})();

/**
 * 第二种使用模式是方法调用
 *
 * 在方法调用中，由调用表达式自身来确定 this 变量的绑定
 * 一个非方法的函数调用将会将全局对象作为接收者，在 ES5 严格模式将 this 变量的默认绑定值改为 undefined
 */
(function () {
  function hello() {
    console.log(this);
    return "hello, " + this.username; // 这里使用 this 变量访问对象属性
  }

  var obj = {
    hello: hello,
    username: "Hao"
  };
  console.log(obj.hello()); // "hello, Hao"

  var obj2 = {
    hello: hello,
    username: "JoeZhao"
  };
  console.log(obj2.hello()); // "hello, JoeZhao"

  console.log(hello()); // "hello, undefined"

  // (function () {
  //   "use strict";
  //
  //   function hello() {
  //     console.log(this);
  //     return "hello, " + this.username;
  //   }
  //
  //   console.log(hello()); // ES5 严格模式下 this 将被绑定到 undefined
  // })();
})();

/**
 * 第三种使用模式是通过构造函数使用
 *
 * 与函数调用和方法调用不同的是，构造函数调用将是一个全形的对象作为 this 变量的值，并隐式返回这个新对象调用作为结果
 * 构造函数的主要职责是初始化该新对象
 */
(function () {
  function User(name, password) {
    this.name = name;
    this.password = password;
  }

  var u = new User("Hao", "I don't tell you");

  console.log(u.name); // "Hao"
})();
