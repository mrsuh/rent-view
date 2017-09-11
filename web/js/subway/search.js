var SubwaySearch = function () {
    this.list = [];
    this.block = document.querySelector('.block-subway .stations-hints');
    this.index_hint = 0;
    this.hints = [];
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

SubwaySearch.prototype.activeNextHint = function () {
    var hints = this.block.querySelectorAll('.hint');

    var has_active_hint = false;
    for(var i = 0, length = hints.length; i < length; i++) {
        if(hints[i].hasClass('active')) {
            has_active_hint = true;
            break;
        }
    }

    if(this.index_hint + 1 >= hints.length) {

        return false;
    }

    if(has_active_hint) {
        this.index_hint++;
    }

    for(var i = 0, length = hints.length; i < length; i++) {
        hints[i].removeClass('active');

        if(i === this.index_hint) {
            hints[i].addClass('active');
        }
    }

    return true;
};

SubwaySearch.prototype.activePrevHint = function () {
    var hints = this.block.querySelectorAll('.hint');

    if(this.index_hint <= 0) {

        for(var i = 0, length = hints.length; i < length; i++) {
            hints[i].removeClass('active');
        }

        return false;
    }

    this.index_hint--;

    for(var i = 0, length = hints.length; i < length; i++) {
        hints[i].removeClass('active');

        if(i === this.index_hint) {
            hints[i].addClass('active');
        }
    }

    return true;
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
    elem_hint.setAttribute('data-id', station.id);

    for (var i = 0, length = station.colors.length; i < length; i++) {
        var elem_color = document.createElement('div');
        elem_color.className = 'label';
        elem_color.style.backgroundColor = station.colors[i];
        elem_hint.appendChild(elem_color);
    }

    var elem_label = document.createElement('div');
    elem_label.className = 'name';
    elem_label.innerText = station.name;

    elem_hint.appendChild(elem_label);

    this.block.appendChild(elem_hint);

    return elem_hint;
};

SubwaySearch.prototype.removeHints = function () {
    this.block.addClass('hide');
    this.index_hint = 0;
    while (this.block.firstChild) {
        this.block.removeChild(this.block.firstChild);
    }

    return true;
};

SubwaySearch.prototype.activeHint = function (element) {
    var hints = this.block.querySelectorAll('.hint');

    for(var i = 0, length = hints.length; i < length; i++) {
        hints[i].removeClass('active');
    }

    element.addClass('active');

    return true;
};

SubwaySearch.prototype.getActiveHint = function () {
    var hints = this.block.querySelectorAll('.hint');
    for(var i = 0, length = hints.length; i < length; i++) {
        if(hints[i].hasClass('active')) {
            return hints[i];
        }
    }

    return null;
};

SubwaySearch.prototype.search = function (string) {

    if('string' !== typeof string) {

        this.hints = [];
        return [];
    }

    if(0 === string.length) {

        this.hints = [];
        return [];
    }

    var regexp_empty = new RegExp(/^\s+$/i);

    if(regexp_empty.test(string)) {

        this.hints = [];
        return [];
    }

    var words = [
        {en: 'q', ru: 'й'},
        {en: 'w', ru: 'ц'},
        {en: 'e', ru: 'у'},
        {en: 'r', ru: 'к'},
        {en: 't', ru: 'е'},
        {en: 'y', ru: 'н'},
        {en: 'u', ru: 'г'},
        {en: 'i', ru: 'ш'},
        {en: 'o', ru: 'щ'},
        {en: 'p', ru: 'з'},
        {en: 'a', ru: 'ф'},
        {en: 's', ru: 'ы'},
        {en: 'd', ru: 'в'},
        {en: 'f', ru: 'а'},
        {en: 'g', ru: 'п'},
        {en: 'h', ru: 'р'},
        {en: 'j', ru: 'о'},
        {en: 'k', ru: 'л'},
        {en: 'l', ru: 'д'},
        {en: 'z', ru: 'я'},
        {en: 'x', ru: 'ч'},
        {en: 'c', ru: 'с'},
        {en: 'v', ru: 'м'},
        {en: 'b', ru: 'и'},
        {en: 'n', ru: 'т'},
        {en: 'm', ru: 'ь'}
    ];

    string = string.toLowerCase();

    var regexp_en = new RegExp(/[a-z]/i);

    if (regexp_en.test(string)) {
        for (var i = 0; i < words.length; i++) {
            var word = words[i];
            string = string.replace(word.en, word.ru);
        }
    }

    var regexp = new RegExp(string, 'i');
    var stations = [];
    for(var i = 0, length = this.list.length; i < length; i++) {
        var station = this.list[i];

        if(regexp.test(station.name)) {
            stations.push(station)
        }
    }

    this.hints = stations;
    return stations;
};