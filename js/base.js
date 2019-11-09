
var tool = {
    // 继承
    inherit: function (target, origin) {
        var F = function () {};
        F.prototype = origin.prototype;
        target.prototype = new F();
        target.prototype.constructor = target;
    },
    // 扩展
    extends: function (origin) {
        var target = function () {
            origin.apply(this, arguments);
            return this;
        }
        this.inherit(target, origin);
        return target;
    },
    // 单例模式
    single: function (origin) {
        var singleRequest = (function () {
            var instance;
            return function () {
                if (typeof instance == 'object') {
                    return instance;
                }
                origin && origin.apply(this, arguments);
                instance = this;
            }
        })()
        origin && this.inherit(singleRequest, origin);
        return singleRequest;
    }
};
