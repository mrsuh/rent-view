var Banner = function (elem) {
    this.elem = elem;
};

Banner.prototype.show = function () {

    var key = this.elem.getAttribute('id');

    var val = localStorage.getItem(key);

    var timestamp_now = parseInt((new Date()).getTime());

    if ('undefined ' !== typeof val && parseInt(val) > timestamp_now) {

        return false;
    }

    this.elem.style.display = 'block';
};

Banner.prototype.close = function () {

    var timestamp_now = parseInt((new Date()).getTime());

    var timeout = 86400000; //24 hours in milliseconds

    var key = this.elem.getAttribute('id');

    localStorage.setItem(key, timestamp_now + timeout);

    this.elem.style.display = 'none';
};