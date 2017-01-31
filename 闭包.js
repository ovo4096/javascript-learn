/**
 * 虽然我已经对闭包很熟悉了，但是对于 JavaScript 这一核心特性还是要罗嗦下
 */
function box() {
  var val = undefined;
  return {
    set: function (newVal) { val = newVal; },
    get: function () { return val; },
    type: function () { return typeof val; }
  };
}

var b = box();

console.log(b.type()); // "undefined"
b.set(98.6);
console.log(b.get()); // 98.6
console.log(b.type()); // "number"
