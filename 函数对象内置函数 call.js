/**
 * 通常情况下函数或者方法的接收者是由调用者的语法决定的，但是有时需要自定义接收者来调用函数
 *
 * 当然可以将方法作为一个新属性添加到接收者对象中，但是这种方式相当危险
 */
// obj.temporary = f; // 你并不确定是否有 temporary 方法
// var result = obj.temporary(arg1, arg2, arg3);
// delete obj.temporary; //  你并不确定是否有 temporary 方法
/**
 * 幸运的是，函数对象内置一个 call 方法可以自定义接收者，通过函数对象的 call 方法来调用其自身
 */
// f.call(obj, arg1, arg2, arg3);