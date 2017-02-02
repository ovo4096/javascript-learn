/**
 * JavaScript 的 eval 可以动态传入一段程序并执行，但是该程序员运行于调用者的局部作用域中。
 */
function test(x) {
  eval("var y = x;"); // 动态绑定
  return y;
}

console.log(test("hello")); // "hello"

/**
 * 保证 eval 函数不影响外部作用域的一个简单方法是在一个明确的嵌套作用域中运行它。
 */
function test2(x) {
  (function () { eval("var y = x;") })();
  return y;
}

console.log(test2("hello")); // "Uncaught ReferenceError: y is not defined"
