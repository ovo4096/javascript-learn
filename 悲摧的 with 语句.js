/**
 * JavaScript 的 with 语句会造成程序不可靠和低效率，要避免使用它
 */
function f(x) {
  Math.x = 998;
  with (Math) {
    return round(x); // 这个 x 不是参数 x 而是 Math 的属性 x，所以慎用 with 语句。
  }
}

console.log(f(3.140592)); // 998
