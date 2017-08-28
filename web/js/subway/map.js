var SubwayMap = function () {

    this.block_subway = document.querySelector('.block-filter-subway');
};

SubwayMap.prototype.getStationFromElement = function (elem) {

    if (!elem.getAttribute('data-id')) {
        elem = elem.parentNode;
    }

    var station = new SubwayStation();
    station.id = elem.getAttribute('data-id');
    station.name = elem.getAttribute('data-name');
    station.line = elem.getAttribute('data-line');
    station.colors = elem.getAttribute('data-color').split(',');
    station.active = elem.getAttribute('class').match(/active/);

    return station;
};

SubwayMap.prototype.activeStation = function (station) {

    var elem = this.block_subway.querySelector('.subway-station[data-id="' + station.id + '"]');

    var elements = [];
    var transfer_id = elem.getAttribute('data-transfer-id');
    if (transfer_id) {
        elements = this.block_subway.querySelectorAll('.subway-station[data-transfer-id="' + transfer_id + '"]');
    } else {
        elements.push(elem);
    }

    for(var i = 0, length = elements.length; i < length; i ++ ) {
        elements[i].setAttribute('class', 'subway-station active');
    }

    return true;
};

SubwayMap.prototype.inactiveStation = function (station) {

    var elem = this.block_subway.querySelector('.subway-station[data-id="' + station.id + '"]');

    var elements = [];
    var transfer_id = elem.getAttribute('data-transfer-id');
    if (transfer_id) {
        elements = this.block_subway.querySelectorAll('.subway-station[data-transfer-id="' + transfer_id + '"]');
    } else {
        elements.push(elem);
    }

    for(var i = 0, length = elements.length; i < length; i ++ ) {
        elements[i].setAttribute('class', 'subway-station');
    }

    return true;
};

SubwayMap.prototype.clear = function () {
    var selected_stations = this.block_subway.querySelectorAll('.subway-station.active');

    for (var i = 0, length = selected_stations.length; i < length; i++) {
        selected_stations[i].setAttribute('class', 'subway-station')
    }

    return true;
};