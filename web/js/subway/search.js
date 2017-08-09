var SubwaySearch = function () {
    this.list = [];
    this.block = document.querySelector('.block-subway .search-list');
};

SubwaySearch.prototype.addStation = function (station) {
    this.list.push(station);
};

SubwaySearch.prototype.hasStation = function (station) {
    for(var i = 0, length = this.list.length; i < length; i++) {
        if(this.list[i].id === station.id) {
            return true;
        }
    }
};

SubwaySearch.prototype.getStationById = function (id) {

    for(var i = 0, length = this.list.length; i < length; i++) {
        if(this.list[i].id === id) {
            return this.list[i];
        }
    }

    return null;
};

SubwaySearch.prototype.addHint = function (station) {
    this.block.removeClass('hide');
    var elem_hint = document.createElement('div');
    elem_hint.className = 'hint';
    elem_hint.innerText = station.name;
    elem_hint.setAttribute('data-id', station.id);

    this.block.appendChild(elem_hint);

    return elem_hint;
};

SubwaySearch.prototype.removeHints = function () {
    this.block.addClass('hide');
    while (this.block.firstChild) {
        this.block.removeChild(this.block.firstChild);
    }

    return true;
};

SubwaySearch.prototype.search = function (string) {

    if('string' !== typeof string) {

        return [];
    }

    if(0 === string.length) {

        return [];
    }

    var regexp = new RegExp(string, 'ui');
    var stations = [];
    for(var i = 0, length = this.list.length; i < length; i++) {
        var station = this.list[i];

        if(regexp.test(station.name)) {
            stations.push(station)
        }
    }

    return stations;
};