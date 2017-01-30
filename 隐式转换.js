/**
 * 位运算示例
 *
 * JavaScript 在做位运算时会隐式转换为 32 位整数后进行运算
 * 这里 8 会被转换为 00000000000000000000000000001001
 * 1 会被转换为 00000000000000000000000000000001
 */
console.log(8 | 1); // 9

/**
 * 字符串隐式转换
 */
console.log(1 + 2 + "3"); // 33
console.log(1 + "2" + 3); // 123
console.log("17" * 3); // 除了运算符 + 有对字符串有拼接的重载，其他情况下会被转为数字
console.log("8" | "1"); // 9 位运算时字符串也会隐式转为数字再进行位运算

/**
 * NaN 比较的坑
 *
 * JavaScript 遵循了 IEEE 标准当中 NaN 不等于其本身的要求
 * 所以在 JavaScript 当中比较 NaN 令人困惑
 */
var x = NaN;
console.log(x === NaN); // false

/**
 * 标准库的 isNaN 也不是很可靠
 *
 * 因为 isNaN 会将比较参数隐式转换为数字，所以对于其他不是 NaN 但会被强制转换为 NaN 的值
 * isNaN 是无法区分的
 */
console.log(isNaN(NaN)); // true
console.log(isNaN("foo")); // true
console.log(isNaN(undefined)); // true
console.log(isNaN({ })); // true
console.log(isNaN({ valueOf: "foo" })); // true

/**
 * 正确的 isNaN 比较方法
 *
 * 因为 NaN 是 JavaScript 中唯一一个不等于自身的值，所以随时通过检查是否等于其自身来测试该值是否为 NaN
 */
var a = NaN;
console.log(a !== a); // true

var b = "foo";
console.log(b !== b); // false

var c = undefined;
console.log(c !== c); // false

var d = {};
console.log(d !== d); // false

var e = { valueOf: "foo" };
console.log(e !== e); // false

// 进而抽象为一个工具函数
function isReallyNaN(x) {
  return x !== x;
}

/**
 * toString 与 valueOf 对象方法的坑
 *
 * toString 与 valueOf 可以控制对象的隐式转换结果
 */
console.log("J" + {
    toString: function () {
      return "S";
    }
  }); // "JS"

console.log(2 * {
    valueOf: function () {
      return 3;
    }
  }); // 6

/**
 * 但是当一个对象同时包含 toString 和 valueOf 问题会变的棘手，
 * 如果这时当两个字符串相加时并不会是去执行 toString 而是优先隐式转换为数字执行 valueOf
 */
var obj = {
  toString: function () {
    return "[object MyObject]";
  },
  valueOf: function () {
    return 17;
  }
};
console.log(1 + obj); // "object: 17"

/**
 * 真值表达式的隐式转换
 *
 * JavaScript 中只有 7 个假值: false、0、-0、""、NaN、undefined，其他都是真值
 * 因此由于数字和字符串都可能为假值，使用真值运算检查函数参数或者对象属性是否已定义不是绝对安全的。
 */
function point(x, y) {
  if (!x) {
    x = 320;
  }

  if (!y) {
    y = 240;
  }

  return { x: x, y: y };
}
console.log(point(0, 0)); // { x: 320, y: 240 }

/**
 * 测试一个值是否未定义应使用 typeof 或者与 undefined 进行比较
 */
function point2(x, y) {
  if (typeof x === "undefined") {
    x = 320;
  }

  if (typeof y === "undefined") {
    y = 240;
  }

  return { x: x, y: y };
}
console.log(point2(0, 0)); // { x: 0, y: 0 }
console.log(point2()); // { x: 320, y: 240 }

function point3(x, y) {
  if (x === undefined) {
    x = 320;
  }

  if (y === undefined) {
    y = 240;
  }

  return { x: x, y: y };
}
console.log(point3(0, 0)); // { x: 0, y: 0 }
console.log(point3()); // { x: 320, y: 240 }