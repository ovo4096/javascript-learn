/**
 * JavaScript 的 bind 方法可以指定接收者并产生以该接收者调用方法的封装函数
 */
(function () {
  var buffer = {
    entries: [],
    add: function (s) {
      this.entries.push(s);
    },
    concat: function () {
      return this.entries.join("");
    }
  };

  var source = ["867", "-", "5309"];
  source.forEach(buffer.add); // error: entries is undefined
  source.forEach(buffter.add, buffer); // 这里传入接收者对象解决，上面的错误，但是如果 forEach 不提供接收者参数怎么办？
  source.forEach(function (s) { // 使用局部函数传入调用对象
    buffer.add(s);
  });
  source.forEach(buffer.add.bind(buffer)); // 使用 bind 生成与上列相同结果的函数
})();

/**
 * 使用 bind 实现函数珂里化，可以更加简洁进行函数调用
 *
 * 举例一个常规实现方式
 */
(function () {
  function simpleURL(protocol, domain, path) {
    return protocol + "://" + domain + "/" + path;
  }

  var urls = paths.map(function (path) {
    return simpleURL("http", siteDomain, path);
  });
})();

/**
 * 使用 bind 实现函数珂里化方式
 */
(function () {
  function simpleURL(protocol, domain, path) {
    return protocol + "://" + domain + "/" + path;
  }

  /*
  bind 的第一个参数是接收者的值，但是由于 simpleURL 不需要引用 this 变量所以可以使用任何值（使用 null 或者 undefined 是惯用做法）
  bind 的其余参数和提供给新函数的所有参数共同组成了传递给 simpleURL 的参数
   */
  var urls = paths.map(simpleURL.bind(null, "http", siteDomain));
})();