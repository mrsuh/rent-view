var SubwayListCheck = function () {
    this.list = [];
    this.block = document.querySelector('.block-subway .stations-list-check');
    this.index_hint = 0;
    this.hints = [];
};

SubwayListCheck.prototype.addStation = function (station) {
    var elem = document.createElement('div');
    elem.className = 'station';
    elem.setAttribute('data-id', station.id);

    for (var i = 0, length = station.colors.length; i < length; i++) {
        var elem_color = document.createElement('div');
        elem_color.className = 'label';
        elem_color.style.backgroundColor = station.colors[i];
        elem.appendChild(elem_color);
    }

    var elem_label = document.createElement('div');
    elem_label.className = 'name';
    elem_label.innerText = station.name;

    elem.appendChild(elem_label);

    this.block.appendChild(elem);

    return elem;
};

SubwayListCheck.prototype.activeStation = function(station) {
    var elem = this.block.querySelector('.station[data-id="' + station.id + '"]');

    elem.addClass('active');
    elem.removeClass('hide');

    return true;
};

SubwayListCheck.prototype.inactiveStation = function(station) {
    var elem = this.block.querySelector('.station[data-id="' + station.id + '"]');

    elem.removeClass('active');

    return true;
};


SubwayListCheck.prototype.inactiveAllStations = function(station) {

    var elem_subway_stations = document.querySelectorAll('.stations-list-check .station');
    for (var i = 0, length = elem_subway_stations.length; i < length; i++) {
        var elem_station = elem_subway_stations[i];
        elem_station.removeClass('active')
    }

    return true;
};