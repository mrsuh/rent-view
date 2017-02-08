"use strict";

var hoverImg = function (e) {
    e.target.parentElement.removeEventListener('mouseover', hoverImg, true);
    var imgs = e.target.parentElement.querySelectorAll('.img');

    for (var i = 0; i < imgs.length; i++) {
        console.info(imgs[i]);
        var img = imgs[i];
        if (img.hasAttribute('data-src')) {
            img.style = "background-image: url('" + img.getAttribute('data-src') + "')";
            img.removeAttribute('data-src');
        }
    }
};

var search = function () {
    var elem_realty = document.querySelector('.filter-realty');
    var realty = elem_realty.options[elem_realty.selectedIndex].value;

    var elem_realty_add = document.querySelectorAll('.filter-realty-add input');
    var realty_add = [];
    for (var i = 0, length = elem_realty_add.length; i < length; i++) {
        if (elem_realty_add[i].checked) {
            realty_add.push(elem_realty_add[i].value);
        }
    }

    var elem_subway = document.querySelectorAll('.block-filter-subway .subway__station.is-selected');
    var subway = [];
    for (var i = 0, length = elem_subway.length; i < length; i++) {
        subway.push(elem_subway[i].getAttribute('data-id'));
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

    var elem_page = document.querySelectorAll('input[name="page"]');
    var page = null;
    for (var i = 0, length = elem_page.length; i < length; i++) {
        if (elem_page[i].checked) {
            page = elem_page[i].value;
            break;
        }
    }

    var url = window.location;

    console.info(url);

    location.href = url.protocol + "//" + url.host +
        '?realty=' + realty +
        (subway ? '&subway=' + subway : '') +
        (price_from ? '&price_from=' + price_from : '') +
        (area_from ? '&area_from=' + area_from : '') +
        (area_to ? '&area_to=' + area_to : '') +
        (price_to ? '&price_to=' + price_to : '') +
        (realty_add ? '&realty_add=' + realty_add : '') +
        (photo ? '&photo=' + photo : '') +
        '&order=' + order +
        (page ? '&page=' + page : '');
};

var changeRealty = function () {
    var realty = document.querySelector('.filter-realty').value;

    var filter_area = document.querySelector('.filter-area');
    var filter_realty_add = document.querySelector('.filter-realty-add');

    if (realty == 'flat') {
        filter_area.style.display = 'none';
        filter_realty_add.style.display = 'initial';
    } else {
        filter_realty_add.style.display = 'none';
        filter_area.style.display = 'initial';
    }
};

var switchSubway = function () {
    var block_subway = document.querySelector('.block-filter-subway');
    var btn_block_subway = document.querySelector('.filter-subway');

    if (block_subway.hasClass('show')) {
        block_subway.removeClass('show');
        btn_block_subway.removeClass('active');
    } else {
        block_subway.addClass('show');
        btn_block_subway.addClass('active');
    }
};

var subway = function (e) {
    var station = e.target;

    if (station.tagName !== 'G') {
        station = station.parentNode;
    }

    var transfer_id = station.getAttribute('data-transfer-id');

    var elements;

    if (transfer_id) {
        elements = document.querySelectorAll('.subway [data-transfer-id="' + transfer_id + '"]');
    } else {
        elements = [station];
    }

    var names = [];

    if (station.getAttribute('class').indexOf("is-selected") > -1) {
        for (var i = 0, length = elements.length; i < length; i++) {
            elements[i].setAttribute('class', 'subway__station');
        }
    } else {
        for (var i = 0, length = elements.length; i < length; i++) {
            elements[i].setAttribute('class', 'subway__station is-selected');
        }
    }

    var elem_subway = document.querySelectorAll('.block-filter-subway .subway__station.is-selected');
    var subway = [];
    for (var i = 0, length = elem_subway.length; i < length; i++) {
        names.push(elem_subway[i].querySelector('text').innerHTML);
    }

    var btn_block_subway = document.querySelector('.filter-subway');

    var name = '';
    switch(names.length) {
        case 0:
            name = 'Метро';
            break;
        case 1:
            name = 'м. ' + names[0];
            break;
        default:
            name = 'м. ' + names[0] + ', ...';

    }
    btn_block_subway.innerText = name;
};

document.addEventListener("DOMContentLoaded", function () {

    var elem_subway_stations = document.querySelectorAll('.subway__station');
    for (var i = 0, length = elem_subway_stations.length; i < length; i++) {
        elem_subway_stations[i].addEventListener('click', subway);
    }

    var hover_imgs = document.querySelectorAll('.hover-img');
    for (var i = 0, length = hover_imgs.length; i < length; i++) {
        hover_imgs[i].addEventListener('mouseover', hoverImg, true)
    }

    var elem_page = document.querySelectorAll('input[name="page"]');
    for (var i = 0, length = elem_page.length; i < length; i++) {
        elem_page[i].addEventListener('click', search);
    }

    var elem_order = document.querySelectorAll('input[name="order"]');
    for (var i = 0, length = elem_order.length; i < length; i++) {
        elem_order[i].addEventListener('click', search);
    }

    document.querySelector('.filter-realty').addEventListener('change', changeRealty);
    document.querySelector('.filter-subway').addEventListener('click', switchSubway);
    document.querySelector('.search-btn').addEventListener('click', search);
});