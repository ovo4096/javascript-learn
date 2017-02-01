/**
 * JavaScript 的命名函数表达式
 */
var f = function double(x) { // 这里的 double 在命名函数表达式中仅仅作为它局部变量存在 ( 当然前提是它被正确实现
  console.log(double);
  return x * 2;
};
console.log(f(2)); // 4

/**
 * 命名函数表达式，最大的作用是写递归函数时可以传递自身，作为该函数内的一个局部变量
 */
var f1 = function find(tree, key) {
  if (!tree) {
    return null;
  }
  if (tree.key === key) {
    return tree.value;
  }

  return find(tree.left, key) || find(tree.right, key);
};

/**
 * 命名函数表达式递归似乎没有必要，因为使用外部作用域的函数名也可以达到相同的效果
 */
var f2 = function (tree, key) {
  if (!tree) {
    return null;
  }
  if (tree.key === key) {
    return tree.value;
  }

  return f2(tree.left, key) || f2(tree.right, key);
};

/**
 * 以上阐述了命名函数表达式正确实现时的使用方式，但是遗憾的是 ECMAScript 历史规范中的错误和流行 JavaScript 引擎中
 * 的 Bug 带来的作用域和兼容性问题使它变的一团糟。
 *
 * 在 ES3 规范中 JavaScript 引擎被要求将命名函数表达式的作用域视为一个对象，该作用域也继承了 Object.prototype 的属性，
 * 这意味着仅仅给函数表达式命名也会将 Object.prototype 中的属性引入作用域中。
 */
var constructor = function () { return null; };
var f3 = function f() {
  return constructor();
};

console.log(f3()); // 在 ES3 环境中将返回 {}

/**
 * 甚至有些 JavaScript 环境实现对匿名表达式也使用对象作用域
 */
// var constructor = ....
var f4 = function () {
  return constructor();
};

console.log(f4()); // 在未正确实现的环境中将返回 {}

/**
 * 在流行的 JavaScript 实现另一个缺陷是对命名函数进行作用域提升
 */
var f5 = function g() { return 17; };
console.log(g()); // 未正确实现的 JavaScript 环境将输出 17

/**
 * 对于上例的解决方式是将 g 赋值 null 让垃圾回收器进行回收
 */
var f6 = function g() { return 17; };
g = null;

/**
 * 可以看的出命名函数表达式因为流行 JavaScript 环境实现 BUG 和 ECMAScript 规范的错误，变的一团糟，所以并不值得使用，
 * 也要避免对 Object.prototype 进行修改和使用与 Object.prototype 属性同名的函数命名
 */