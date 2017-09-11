var search = function (data) {

    data = data || {};

    var page = '';
    if ('number' === typeof data.page) {
        page = data.page;
    } else {
        var elem_page = document.querySelectorAll('input[name="page"]');
        for (var i = 0, length = elem_page.length; i < length; i++) {
            if (elem_page[i].checked) {
                page = elem_page[i].value;
                break;
            }
        }
    }

    var city = null;
    if ('undefined' !== typeof data.city) {
        city = data.city;
    } else {

        var elem_city = document.querySelectorAll('.block-filter-city .block-city .city');
        for (var i = 0, length = elem_city.length; i < length; i++) {
            if (elem_city[i].hasClass('active')) {
                city = elem_city[i].getAttribute('data-value');
                break;
            }
        }
    }

    var elem_realty = document.querySelector('.filter-realty');
    var realty = elem_realty.options[elem_realty.selectedIndex].value;

    var elem_realty_add = document.querySelectorAll('.filter-realty-add input');
    var realty_add = [];
    for (var i = 0, length = elem_realty_add.length; i < length; i++) {
        if (elem_realty_add[i].checked) {
            realty_add.push(elem_realty_add[i].value);
        }
    }

    var subway = [];
    var subway_stations = subway_list.getStations();
    for (var i = 0, length = subway_stations.length; i < length; i++) {
        subway.push(subway_stations[i].id);
    }

    var price_from = document.querySelector('.filter-price .from').value;
    var price_to = document.querySelector('.filter-price .to').value;

    var area_from = document.querySelector('.filter-area .from').value;
    var area_to = document.querySelector('.filter-area .to').value;

    var photo = document.getElementById('filter_photo').checked;

    var elem_order = document.querySelectorAll('input[name="order"]');
    var order = null;
    for (var i = 0, length = elem_order.length; i < length; i++) {
        if (elem_order[i].checked) {
            order = elem_order[i].value;
            break;
        }
    }

    var url = window.location;

    var query =
        (subway.length ? '&subway=' + subway : '') +
        (price_from.length ? '&price_from=' + price_from : '') +
        (area_from.length ? '&area_from=' + area_from : '') +
        (area_to.length ? '&area_to=' + area_to : '') +
        (price_to.length ? '&price_to=' + price_to : '') +
        (realty_add.length ? '&realty_add=' + realty_add : '') +
        (photo ? '&photo=1' : '') +
        (order !== 'date' ? '&order=' + order : '') +
        (parseInt(page) !== 1 && page.length ? '&page=' + page : '');

    location.href =
        url.protocol + "//" + url.host +
        '/' + city +
        '/' + realty +
        (query.length ? query.replace(/^&/, '?') : '');
};

var changeRealty = function () {
    var realty = document.querySelector('.filter-realty').value;

    var filter_area = document.querySelector('.filter-area');
    var filter_realty_add = document.querySelector('.filter-realty-add');

    if (realty === 'flat') {
        filter_area.addClass('hide');
        filter_realty_add.removeClass('hide');
    } else {
        filter_realty_add.addClass('hide');
        filter_area.removeClass('hide');
    }
};

var switchSubway = function (e) {

    if(e.target.hasClass('disabled')) {

        return false;
    }

    var block_switch = document.querySelector('.block-search-filters-switch');
    var block_subway = document.querySelector('.block-filter-subway');
    var btn_block_subway = document.querySelector('.filter-subway');

    if (block_subway.hasClass('show')) {
        block_subway.removeClass('show');
        block_switch.removeClass('show');
        btn_block_subway.removeClass('active');
        document.body.style.overflow = 'auto';
    } else {

        hideCity();

        document.body.style.overflow = 'hidden';
        block_subway.addClass('show');
        block_switch.addClass('show');
        btn_block_subway.addClass('active');
    }
};

var hideSubway = function () {

    var block_switch = document.querySelector('.block-search-filters-switch');
    var block_subway = document.querySelector('.block-filter-subway');
    var btn_block_subway = document.querySelector('.filter-subway');

    block_subway.removeClass('show');
    block_switch.removeClass('show');
    btn_block_subway.removeClass('active');
    document.body.style.overflow = 'auto';

    return true;
};

var switchCity = function () {
    var block_city = document.querySelector('.block-city');

    if (block_city.hasClass('show')) {
        block_city.removeClass('show');
    } else {

        hideSubway();

        block_city.addClass('show');
    }
};

var hideCity = function () {
    var block_city = document.querySelector('.block-city');
    block_city.removeClass('show');

    return true;
};

var searchOnPressEnter = function (event) {
    if (parseInt(event.keyCode) === 13) {
        search({page: 1});
    }
};

function isElementInViewport(elem) {

    var rect = elem.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
}

function lazyLoadImages() {
    var images = document.querySelectorAll('.img-lazy-load');
    for (var i = 0, length = images.length; i < length; i++) {
        var img = images[i];
        if (isElementInViewport(img)) {
            img.style.backgroundImage = "url('" + img.getAttribute('data-src') + "')";
        }
    }
}

subway_map = new SubwayMap();
subway_list = new SubwayList();
subway_search = new SubwaySearch();
subway_list_check = new SubwayListCheck();

function activeSubwayStation(subway_station) {

    subway_map.activeStation(subway_station);
    subway_list_check.activeStation(subway_station);
    var elem_station = subway_list.addStation(subway_station);

    var btn_remove = elem_station.querySelector('.btn-remove');

    if (!btn_remove) {
        console.error('invalid btn-remove element');

        return false;
    }

    if (!subway_list.isEmpty()) {
        document.querySelector('.block-subway .stations-btn-clear').removeClass('hide');
    }

    btn_remove.addEventListener('click', function (e) {

        var elem = e.target.parentNode;

        var station = new SubwayStation();
        station.id = elem.getAttribute('data-id');

        subway_map.inactiveStation(station);
        subway_list.removeStation(station);

        if (subway_list.isEmpty()) {
            document.querySelector('.block-subway .stations-btn-clear').addClass('hide');
        }

        setStationName();

    }.bind(this));

    setStationName();
}

function switchSubwayStation(event) {

    var elem = event.target;
    if(!elem.hasAttribute('data-id')) {
        elem = event.target.parentNode;
    }

    var subway_station = subway_search.getStationById(elem.getAttribute('data-id'));

    if (subway_list.hasStation(subway_station)) {

        subway_map.inactiveStation(subway_station);
        subway_list_check.inactiveStation(subway_station);
        subway_list.removeStation(subway_station);

        if (subway_list.isEmpty()) {
            document.querySelector('.block-subway .stations-btn-clear').addClass('hide');
        }

        return false;
    }

    activeSubwayStation(subway_station);
}

setStationName = function () {
    var elem = document.querySelector('.filter-subway');
    var name = '';

    if(subway_list.isEmpty()) {
        name = 'Метро';
    } else {
        name = 'м. ' + subway_list.list[0].name.substr(0,5) + '...';
    }

    elem.innerText = name;
};

function searchHints(e) {

    var stations = subway_search.search(e.target.value);

    subway_search.removeHints();

    for (var i = 0, length = stations.length; i < length && i < 5; i++) {
        var hint = subway_search.addHint(stations[i]);

        hint.addEventListener('click', function (e) {

            var elem = e.target;
            if(!e.target.hasClass('hint')) {
                elem = e.target.parentNode;
            }

            var subway_station = subway_search.getStationById(elem.getAttribute('data-id'));

            subway_search.removeHints();
            document.querySelector('.stations-search').value = '';

            if (!subway_list.hasStation(subway_station)) {
                activeSubwayStation(subway_station);
            }
        });

        hint.addEventListener('mouseover', function (e) {

            var elem = e.target;
            if(!e.target.hasClass('hint')) {
                elem = e.target.parentNode;
            }

            subway_search.activeHint(elem);
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {

    var elem_subway_stations = document.querySelectorAll('.subway-station');
    for (var i = 0, length = elem_subway_stations.length; i < length; i++) {

        var elem_station = elem_subway_stations[i];

        var station = subway_map.getStationFromElement(elem_station);

        if (!subway_search.hasStation(station)) {
            subway_search.addStation(station);

            var elem_station_check = subway_list_check.addStation(station);

            elem_station_check.addEventListener('click', switchSubwayStation);
        }

        if(station.active) {
            activeSubwayStation(station);
        }

        elem_station.addEventListener('click', switchSubwayStation);
    }

    var elem_page = document.querySelectorAll('input[name="page"]');
    for (var i = 0, length = elem_page.length; i < length; i++) {
        elem_page[i].addEventListener('click', search);
    }

    var elem_order = document.querySelectorAll('input[name="order"]');
    for (var i = 0, length = elem_order.length; i < length; i++) {
        elem_order[i].addEventListener('click', search);
    }

    document.querySelector('.stations-search').addEventListener('input', searchHints);
    // document.querySelector('.search-input').addEventListener('blur', function(){
    //      subway_search.clear();
    // });

    document.querySelector('.stations-btn-show-check-list').addEventListener('click', function(){

        var btn = document.querySelector('.stations-btn-show-check-list');

        var all = !btn.hasClass('all');

        btn.innerText = all ? btn.getAttribute('data-active') : btn.getAttribute('data-all');

        all ? btn.addClass('all') : btn.removeClass('all');

        var elem_subway_stations = document.querySelectorAll('.stations-list-check .station');
        for (var i = 0, length = elem_subway_stations.length; i < length; i++) {

            var elem_station = elem_subway_stations[i];

            if(all) {
                elem_station.removeClass('hide')
            } else {
                if(!elem_station.hasClass('active')) {
                    elem_station.addClass('hide');
                }
            }
        }
    });

    document.querySelector('.stations-search').addEventListener('keydown', function (event) {

        if (parseInt(event.keyCode) === 40) {
            subway_search.activeNextHint();
        }

        if (parseInt(event.keyCode) === 38) {
            subway_search.activePrevHint();
        }

        if (parseInt(event.keyCode) === 13) {
            var hint = subway_search.getActiveHint();

            var subway_station = subway_search.getStationById(hint.getAttribute('data-id'));

            subway_search.removeHints();
            document.querySelector('.stations-search').value = '';

            if (!subway_list.hasStation(subway_station)) {
                switchSubwayStation(subway_station);
            }
        }
    });

    document.querySelector('.choose-city').addEventListener('click', switchCity);
    document.querySelector('.current-city').addEventListener('click', switchCity);
    document.querySelector('.block-city .btn-close').addEventListener('click', switchCity);

    document.querySelector('.filter-realty').addEventListener('change', changeRealty);
    document.querySelector('.filter-subway').addEventListener('click', switchSubway);
    document.querySelector('.block-subway .btn-close').addEventListener('click', switchSubway);
    document.querySelector('.block-subway .stations-arrow-close').addEventListener('click', switchSubway);
    document.querySelector('.search-btn').addEventListener('click', function () {
        search({page: 1});
    });

    document.querySelector('.block-subway .stations-btn-clear').addEventListener('click', function (e) {
        e.target.addClass('hide');
        subway_list.clear();
        subway_map.clear();
        subway_list_check.inactiveAllStations();
        setStationName();
    });

    document.querySelector('.block-subway .stations-btn-clear-check-list').addEventListener('click', function (e) {
        subway_list.clear();
        subway_map.clear();
        subway_list_check.inactiveAllStations();
        setStationName();
    });

    document.querySelector('.filter-area .from').addEventListener('keydown', searchOnPressEnter);
    document.querySelector('.filter-area .to').addEventListener('keydown', searchOnPressEnter);
    document.querySelector('.filter-price .from').addEventListener('keydown', searchOnPressEnter);
    document.querySelector('.filter-price .to').addEventListener('keydown', searchOnPressEnter);

    window.addEventListener('DOMContentLoaded', lazyLoadImages);
    window.addEventListener('load', lazyLoadImages);
    window.addEventListener('resize', lazyLoadImages);
    window.addEventListener('scroll', lazyLoadImages);

    var sliders = document.querySelectorAll('.slider');
    for (var i = 0, length = sliders.length; i < length; i++) {
        new Slider(sliders[i]);
    }

    var texts = document.querySelectorAll('.row5 p');
    for (var i = 0, length = texts.length; i < length; i++) {
        new Collapse(texts[i]);
    }

    var fullScreen = new FullScreen(document.querySelector('.block-photo-full-screen'));

    var previews = document.querySelectorAll('.row4 .previews .preview');
    for (var i = 0, length = previews.length; i < length; i++) {
        previews[i].addEventListener('click', function (e) {
            fullScreen.initOnEvent(e)
        }.bind(this));
    }
});