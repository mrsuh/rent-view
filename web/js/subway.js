var SubwaySpb = function () {
    this.colors = [];
    this.colors[1] = '#1a85c3';
    this.colors[2] = '#a05da6';
    this.colors[3] = '#5bba47';
    this.colors[4] = '#cf202f';
    this.colors[5] = '#fbae1a';

    this.block_subway = document.querySelector('.block-filter-subway');

    this.block_stations = this.block_subway.querySelector('.stations .list');

    this.active_stations = [];

    this.btn_subway = document.querySelector('.filter-subway');

    this.getActiveStations();

    this.setBlockStations();

    this.setStationName();
};

SubwaySpb.prototype.setClassActive = function (elem) {
    var elements = [];

    var transfer_id = elem.getAttribute('data-transfer-id');
    if (transfer_id) {
        elements = this.block_subway.querySelectorAll('.subway-station[data-transfer-id="' + transfer_id + '"]');
    } else {
        elements.push(elem);
    }

    if (elem.getAttribute('class').indexOf("is-selected") > -1) {
        for (var i = 0, length = elements.length; i < length; i++) {
            elements[i].setAttribute('class', 'subway-station');
        }
    } else {
        for (var i = 0, length = elements.length; i < length; i++) {
            elements[i].setAttribute('class', 'subway-station is-selected');
        }
    }

    return true;
};

SubwaySpb.prototype.setBlockStations = function () {

    while (this.block_stations.firstChild) {
        this.block_stations.removeChild(this.block_stations.firstChild);
    }

    for (var s = 0, slength = this.active_stations.length; s < slength; s++) {

        var elem_station = document.createElement('div');
        elem_station.className = 'station';
        elem_station.setAttribute('data-id', this.active_stations[s].id);

        var elem_name = document.createElement('div');
        elem_name.className = 'name';
        elem_name.innerText = this.active_stations[s].name;

        var elem_label = document.createElement('div');
        elem_label.className = 'label';
        elem_label.style.backgroundColor = this.colors[this.active_stations[s].line];

        elem_station.appendChild(elem_label);
        elem_station.appendChild(elem_name);

        this.block_stations.appendChild(elem_station);
    }
};

SubwaySpb.prototype.setStationName = function () {

    var name = '';
    switch (this.active_stations.length) {
        case 0:
            name = 'Метро';
            break;
        case 1:
            name = 'м. ' + this.active_stations[0].name;
            break;
        default:
            name = 'м. ' + this.active_stations[0].name + ', ...';

    }

    this.btn_subway.innerText = name;
};

SubwaySpb.prototype.getActiveStations = function () {

    var selected_stations = this.block_subway.querySelectorAll('.subway-station.is-selected');

    this.active_stations = [];
    for (var i = 0, length = selected_stations.length; i < length; i++) {

        if (selected_stations[i].tagName.toUpperCase() !== 'G') {
           continue;
        }

        if(null === selected_stations[i].querySelector('text')) {
            continue;
        }

        this.active_stations.push({
            name: selected_stations[i].querySelector('text').innerHTML,
            id: parseInt(selected_stations[i].getAttribute('data-id')),
            line: parseInt(selected_stations[i].getAttribute('data-line'))
        });
    }
};

SubwaySpb.prototype.addStation = function (e) {

    while (this.block_stations.firstChild) {
        this.block_stations.removeChild(this.block_stations.firstChild);
    }

    var station = e.target;
    if (station.tagName.toUpperCase() !== 'G') {
        station = station.parentNode;
    }

    this.setClassActive(station);

    this.getActiveStations();

    this.setBlockStations();

    this.setStationName();
};

SubwaySpb.prototype.removeStation = function (e) {
    var station = e.target;

    if (station.tagName !== 'G') {
        station = station.parentNode;
    }

    var id = station.getAttribute('data-id');

    var elem = this.block_subway.querySelector('.subway-station[data-id="' + id + '"]');

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

    this.getActiveStations();

    this.setBlockStations();

    this.setStationName();
};

SubwaySpb.prototype.clearStations = function (e) {
    var selected_stations = this.block_subway.querySelectorAll('.subway-station.is-selected');

    this.active_stations = [];
    for (var i = 0, length = selected_stations.length; i < length; i++) {

        if (selected_stations[i].tagName !== 'g') {
            continue;
        }

        if(null === selected_stations[i].querySelector('text')) {
            continue;
        }

        this.active_stations.push({
            name: selected_stations[i].querySelector('text').innerHTML,
            id: parseInt(selected_stations[i].getAttribute('data-id')),
            line: parseInt(selected_stations[i].getAttribute('data-line'))
        });
    }
};