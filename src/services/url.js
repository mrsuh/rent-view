"use strict";

/**
 *
 * @param url
 * @param name
 * @returns {*}
 */
var getParameter = function (url, name) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return null;
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};

module.exports = {
    getParameter: getParameter
};