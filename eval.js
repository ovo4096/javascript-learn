/**
 * JavaScript 的 eval 可以动态传入一段程序并执行，但是该程序员运行于调用者的局部作用域中。
 */
(function () {
  function test(x) {
    eval("var y = x;"); // 动态绑定
    return y;
  }
  console.log(test("hello")); // "hello"
})();

/**
 * 保证 eval 函数不影响外部作用域的一个简单方法是在一个明确的嵌套作用域中运行它。
 */
(function () {
  function test(x) {
    (function () { eval("var y = x;") })();
    return y;
  }
  console.log(test("hello")); // "Uncaught ReferenceError: y is not defined"
})();

/**
 * 正是因为 eval 具有访问调用它时的整个作用域的能力，所以 eval 函数很难高效地调用任何一个函数，因为一旦被调用的函数是 eval 函数，那么
 * 每个函数调用都需要确保在运行时整个作用域对 eval 函数是可访问的。
 * 作为一种折中的解决方案，语言标准演化出辨别两种不同的调用 eval 函数方法。函数调用涉及 eval 标识符，被认为是 “直接” 调用 eval 函数的
 * 方式。
 */
(function () {
  var x = "global";
  function test() {
    var x = "local";
    return eval("x"); // 直接调用 eval;
  }
  console.log(test()); // "local"
})();

/**
 * 上面这种情况下，编译器需要确保被执行的程序具有完全访问调用者局部作用域的权限，其他调用 eval 函数的方式被认为是 “间接” 的。
 * 绑定 eval 函数到另一个变量名，通过该变量名调用函数会使代码失去对所有局部作用域的访问能力。
 */
(function () {
  var x = "global";
  function test() {
    var x = "local";
    var f = eval;
    return f("x");
  }
  console.log(test()); // 这里既不会输出 global 也不会输出 local 但是会尝试输出全局作用域的 x;
})();

/**
 * 上例 eval 失去了对局部作用域的访问能力，这里的 eval 不一定是局部作用域的上级作用域，而是全局作用域，这一点非常重要！
 *
 * 还有一种利用逗号表达式的 间接 eval 调用方式
 */
var x = "global";

function test() {
  var x = "local";
  return (0, eval)("x");
}

console.log(test()); // global
