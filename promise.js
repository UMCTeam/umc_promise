var umc_promise = function (func) {
    this.defers = [];
    this.func = func;
    this.self = this;
};

umc_promise.prototype.resolve = function (res) {
    var pair = this.defers.shift();
    pair.onResolve(res);
};

umc_promise.prototype.reject = function (err) {
    var pair = this.defers.shift();
    pair.onReject && pair.onReject(err);
};

umc_promise.prototype.progress = function (res) {
    var pair = this.defers[0];
    pair.onProgress && pair.onProgress(res);
};

umc_promise.prototype.then = function (onResolve, onReject, onProgress) {
    this.defers.push({onResolve: onResolve, onReject: onReject, onProgress: onProgress});
    this.func.apply(this.self, [this.resolve.bind(this), this.reject.bind(this), this.progress.bind(this)]);
};