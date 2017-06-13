/**
 * 节流函数，在一定的时间范围内阻止请求
 * @param {*cb} 是一个返回promise的函数
 */

export default (cb) => {

    if (typeof cb !== 'function') throw 'cb must is a function';
    let canRun = true;
    return function () {
        if (!canRun) return;
        canRun = false;
        return cb.apply(this, arguments).then(function (res) {
            canRun = true;
            return res;
        });
    }
}
