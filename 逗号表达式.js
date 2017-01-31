/**
 * JavaScript 的逗号表达式是一个比较容易疏漏的内容
 *
 * 逗号表达式会从左至右执行，并且返回最后一个表达式结果
 */
var a = ("r", "g", "b");
var b = (a += 1 , a += 2, a += 3, a += 4, a);
console.log(a);

var ken = [1, 2, 3, 4, 5];
console.log(ken[1, 2, 3, 1]);