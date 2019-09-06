var SubwayList = function () {
    this.list = [];
    this.block = document.querySelector('.stations .stations-list');
};

SubwayList.prototype.clear = function () {
    this.list = [];

    while (this.block.firstChild) {
        this.block.removeChild(this.block.firstChild);
    }

    return true;
};

SubwayList.prototype.hasStation = function(station) {
    for(var i = 0, length = this.list.length; i < length; i++) {
        if(this.list[i].id === station.id) {
            return true;
        }
    }

    return false;
};

SubwayList.prototype.isEmpty = function() {
    return !(this.list.length > 0);
};

SubwayList.prototype.addStation = function (station) {

    this.list.push(station);

    var elem_station = document.createElement('div');
    elem_station.className = 'station';
    elem_station.setAttribute('data-id', station.id);

    for (var i = 0, length = station.colors.length; i < length; i++) {
        var elem_color = document.createElement('div');
        elem_color.className = 'label';
        elem_color.style.backgroundColor = station.colors[i];
        elem_station.appendChild(elem_color);
    }

    var elem_label = document.createElement('div');
    elem_label.className = 'name';
    elem_label.innerText = station.name;

    elem_station.appendChild(elem_label);

    var elem_btn_close = document.createElement('div');
    elem_btn_close.className = 'btn-remove';

    elem_station.appendChild(elem_btn_close);

    this.block.appendChild(elem_station);

    return elem_station;
};

SubwayList.prototype.removeStation = function (station) {

    var indexes = [];
    for (var i = 0, length = this.list.length; i < length; i++) {

        if (parseInt(station.id) === parseInt(this.list[i].id)) {
            indexes.push(i);
        }
    }

    for (var i = 0, length = indexes.length; i < length; i++) {

        this.list.splice(indexes[i], 1);
    }

    var elem_station = this.block.querySelector('[data-id="' + station.id + '"]');

    this.block.removeChild(elem_station);

    return true;
};

SubwayList.prototype.getStations = function () {

    return this.list;
};