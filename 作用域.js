/**
 * JavaScript 的作用域有些奇怪的地方异同于其他编程语言
 *
 * JavaScript 没有块级作用域，只有函数作用域
 */
function f() {
  for (var i = 10; i < 100; i++) { } // 这个 for 语句当中的 i 将被提升到 f 函数作用域内
  return i;
}

console.log(f()); // 100

/**
 * 虽然上面说 JavaScript 没有块级作用域，只有函数作用域，但是也有一个例外。
 * try...catch 语句捕获的异常绑定到一个变量，该变量的作用域只是这个 catch 语句块。
 */
function t() {
  var x = "var", result = [];
  result.push(x);
  try {
    throw "exception";
  } catch (x) {
    x = "catch";
  }
  result.push(x);
  return result;
}

console.log(t()); // ["var", "var"]

/**
 * 可以考虑手动提升作用域避免混淆
 */
