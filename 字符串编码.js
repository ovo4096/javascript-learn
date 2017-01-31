/**
 * JavaScript 采用 Unicode 进行字符串编码
 *
 * 在 JavaScript 出现时，Unicode 只有 2^16 的容量所以它采用 16 位的代码单元组成字符串，但如今 Unicode 的编码范围已经超过 16 位它
 * 包含 16 个子平面和一个基础面，所以不能保证一个字符是由一个 16 位的代码单元组成的。
 */
console.log("𝄞 clef".length); // 7
console.log("G clef".length); // 6

console.log("𝄞 clef".charCodeAt(0)); // 55348
console.log("𝄞 clef".charCodeAt(1)); // 56606

console.log("𝄞 clef".charAt(1) === " "); // false
console.log("𝄞 clef".charAt(2) === " "); // true

/**
 * http://www.russellcottrell.com/greek/utilities/surrogatepaircalculator.htm UTF-16 解码用
 */
