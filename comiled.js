'use strict';

var adam = {};
/**
 * 获取指定的 querystring 中指定 name 的 value
 * @param {String} name
 * @param {String} querystring
 * @return {String|undefined}
 *
 * query('hello', '?hello=js') 结果是 js
 *
 */
adam.query = function (name, querystring) {
    var reg = new RegExp('(?:\\?|&)' + name + '=(.*?)(?:&|$)');
    var result = reg.exec(querystring) || [];
    return result[1];
};

/**
 * 序列化对象，就是把对象转成 url 字符串
 * @param {Obj} data
 * @return {String}
 *
 * serialize({hello: 'js', hi: 'test'}) 结果是 'hello=js&hi=test'
 */
adam.serialize = function (data) {
    var arr = [];
    if (!data) {
        return '';
    }
    Object.keys(data).forEach(function (item) {
        arr.push(encodeURIComponent(item) + '=' + encodeURIComponent(data[item]));
    });
    return arr.join('&');
};

/**
 * 根据选择器查找 DOM
 * 就是模拟 $() ，当然，这里返回元素的 DOM 对象即可
 * @param {String} selector
 * @return {DOM|Null}
 */
adam.$ = function (selector) {
    return document.querySelector(selector);
};

/**
 * 删除 DOM 节点
 * @param {DOM} node
 * @return {DOM}
 */

adam.removeNode = function (node) {
    return node.parentNode.removeChild(node);
};

/**
 * 在 target 节点之后插入 node 节点
 * 类似 $().insertAfter()
 * @param {DOM} node
 * @param {DOM} target
 */
adam.insertAfter = function (node, target) {
    var parentEl = target.parentNode;
    if (parentEl.lastElementChild == target) {
        parentEl.appendChild(node);
    } else {
        parentEl.insertBefore(node, target.nextSibling);
    }
};

/**
 * 添加类名
 * @param {DOM} node
 * @param {String|Array} className
 */
adam.addClass = function (node, className) {
    var nodeEl = document.querySelector(node);
    if (nodeEl.classList.contains(className)) {
        return null;
    } else {
        nodeEl.classList.add(className);
    }
};

/**
 * 移除类名
 * @param {DOM} node
 * @param {String|Array} className
 */
adam.removeClass = function (node, className) {
    var nodeEl = document.querySelector(node);
    if (!nodeEl.classList.contains(className)) {
        return null;
    } else {
        nodeEl.classList.remove(className);
    }
};

/**
 * 获取绝对路径
 * @param {String} url
 * @return {String}
 *
 * getAbsoluteUrl('/jerojiang') => 'http://imweb.io/jerojiang'
 * 在当前页面获取绝对路径，这里要创建 A 元素，测试用例看你们的了
 */
adam.getAbsoluteUrl = function (url) {
    var path = location.href;
    var position = path.lastIndexOf('/');
    path = path.substring(0, position);
    return path + url;
};

/**
 * 防抖动
 * 防抖动函数了啦，有做个这个习题，不清楚回去复习
 */
adam.debounce = function (callback, time) {
    var timer;
    time = time || 300; // 给个默认值
    return function () {
        if (!timer) {
            timer = setTimeout(function () {
                callback();
                clearTimeout(timer);
                timer = null;
            }, time);
        }
    };
};

/**
 *  根据所以移出数组的某一项
 * @param {Number} index
 * @param {Array} arr
 * @return {Array}
 *
 * removeItemByIndex(1, [1,2,3]) => [1, 3]
 */
adam.removeItemByIndex = function (index, arr) {
    if (!Array.isArray(arr)) {
        return arr;
    }
    if (index >= arr.length) {
        return null;
    }
    if (index === null) {
        return undefined;
    }
    arr.splice(index, 1);
    return arr;
};
/**
 *数组去重
 * @param {Array} arr
 */
adam.arrUique = function (arr) {
    if (!arr) {
        return '';
    }
    for (var i = arr.length - 1; i >= 0; i--) {
        for (var j = i - 1; j >= 0; j--) {
            if (arr[i] === arr[j]) {
                arr.splice(i, 1);
            }
        }
    }
    return arr;
};
/**
 * 数组中最大项
 * @param {Array} arr
 */
adam.arrMax = function (arr) {
    if (!arr) {
        return '';
    }
    return Math.max.apply(undefined, arr);
};
/**
 * 数组中最小项
 * @param {Array} arr
 */
adam.arrMin = function (arr) {
    if (!arr) {
        return '';
    }
    return Math.min.apply(undefined, arr);
};
/**
 * 判断是否为对象
 * @param {*} obj
 */
adam.isObject = function (obj) {
    var result = Object.prototype.toString.call(obj);
    if (result === '[object Object]') {
        return true;
    } else {
        return false;
    }
};
/**
 * 字符串每个字母出现的次数
 * @param {*} str
 */
adam.stringTime = function (str) {
    if (!str) {
        return '';
    }
    return str.split('').reduce(function (res, cur) {
        res[cur] ? res[cur]++ : res[cur] = 1;
        return res;
    }, {});
};
/**
 *随机产生从start - end的num个随机整数
 * @param {随机字符串个数} num
 * @param {范围起始} start
 * @param {范围结束} end
 */
adam.randomNum = function (num, start, end) {
    var arr = [];
    var n = 0;
    while (n < num) {
        var _num = Math.round(Math.random() * end + start);
        if (arr.indexOf(_num) < 0) {
            arr.push(_num);
            n++;
        }
    }
    return arr;
};
module.exports = adam;
