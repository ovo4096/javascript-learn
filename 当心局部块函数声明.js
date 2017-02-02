/**
 * JavaScript 会提升局部块函数，因为它没有块级作用域
 */
function f() { return "global"; }

function test(x) {
  function f() { return "local"; }

  var result = [];
  if (x) {
    result.push(f());
  }

  result.push(f());
  return result;
}

console.log(test(true)); // ["local", "local"]
console.log(test(false)); // ["local"]

/**
 * 如果将函数声明放在块级作用域
 */
function test2(x) {
  var result = [];
  if (x) {
    function f() { return "local"; } // 这里的函数将被提升
    result.push(f());
  }

  result.push(f());
  return result;
}

console.log(test2(true)); // ["local", "local"]
console.log(test2(false)); // ["local"] * chrome 这里会提示 f 函数未定义的错误

/**
 * 因为块级别函数的作用域会被提升，和 JavaScript 实现环境的差异，应该尽量避免局部声明函数
 */
