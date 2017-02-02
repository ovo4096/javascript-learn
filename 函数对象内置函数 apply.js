/**
 * apply 方法主要用于可变参数传入数组参数时的解构
 *
 * 当需要一个函数接收可变长度的参数我们有两种方式，可变长度参数和单个数组作为参数
 */
// average(1, 2, 3);
// average(1);

// average([1, 2, 3]);
// average([1]);

/**
 * 显然可变长参数的版本要比单个数组作为参数要简洁、优雅
 * 倘若，我们需要在可变长参数的版本传入单个数组的结果使用 average 应该怎么办呢？
 */
// var scores = getAllScores();
// average(scores); // 这样调用嘛? 显然不是

/**
 * 幸运的是，函数对象有一个内置的 apply 方法，它与 call 方法非常类似
 */
// var scores = getAllScores();
// average.apply(null, scores); // 第一个参数指定调用函数的 this 变量，由于 average 函数没有 this 变量，我们简单地可以传递 null