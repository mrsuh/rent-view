"use strict";

/**
 *
 * @param page
 * @param total
 * @param range
 * @returns {Array}
 */
var paginate = function (page, total, range) {
    range = parseInt(range) || 5;
    page = parseInt(page);
    total = parseInt(total);

    if (range % 2 === 0) {
        range++;
    }

    var half = (range - 1) / 2;
    var right = page + half;

    if (right > total) {
        var left = page - (right - total) - half;
    } else {
        var left = page - half;
    }

    if (left <= 0) {
        right += Math.abs(left);
        right++;
        left = 1;
    }

    var numbers = [];
    for (var i = left; i <= right && i <= total; i++) {
        numbers.push(i);
    }

    return numbers;
};

module.exports = {
    paginate: paginate
};