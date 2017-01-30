/**
 * JavaScript 就和 Java 一样也有原始类型与原始类型对象
 *
 * JavaScript 有 5 个原始类型: 布尔值、数字、字符串、null 和 undefined。
 * 令人困惑的是 null 进行 typeof 操作结果为 "object"，然而，ECMAScript 标准描述其为一个独特类型。
 */
var s = new String("hello");
console.log(s + " world"); // hello world

console.log(typeof null); // "object"
console.log(typeof "hello"); // "string"
console.log(typeof s); // "object"

/**
 * 当对原始类型进行方法调用时将会隐式转换为原始类型对象
 */
console.log("hello".toUpperCase()); // "HELLO"
