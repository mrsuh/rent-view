var hoverImg = function (e) {
    e.target.parentElement.removeEventListener('mouseover', hoverImg, true);
    var imgs = e.target.parentElement.querySelectorAll('.img');

    for (var i = 0; i < imgs.length; i++) {
        var img = imgs[i];
        if (img.hasAttribute('data-src')) {
            img.style.backgroundImage = "url('" + img.getAttribute('data-src') + "')";
            img.removeAttribute('data-src');
        }
    }
};

var search = function (_page) {

    var page = null;
    if('number' === typeof _page){
        page = _page;
    } else {
        var elem_page = document.querySelectorAll('input[name="page"]');
        for (var i = 0, length = elem_page.length; i < length; i++) {
            if (elem_page[i].checked) {
                page = elem_page[i].value;
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

    var url = window.location;

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
        filter_area.addClass('hide');
        filter_realty_add.removeClass('hide');
    } else {
        filter_realty_add.addClass('hide');
        filter_area.removeClass('hide');
    }
};

var switchSubway = function () {
    var block_switch = document.querySelector('.block-search-filters-switch');
    var block_subway = document.querySelector('.block-filter-subway');
    var btn_block_subway = document.querySelector('.filter-subway');

    if (block_subway.hasClass('show')) {
        block_subway.removeClass('show');
        block_switch.removeClass('show');
        btn_block_subway.removeClass('active');
        document.body.style.overflow = 'auto';
    } else {
        document.body.style.overflow = 'hidden';
        block_subway.addClass('show');
        block_switch.addClass('show');
        btn_block_subway.addClass('active');
    }
};
var searchOnPressEnter = function(event)
{
    if (event.keyCode == 13) {
        search(1);
    }
};

document.addEventListener("DOMContentLoaded", function () {

    var subway = new Subway();

    var elem_subway_stations = document.querySelectorAll('.subway__station');
    for (var i = 0, length = elem_subway_stations.length; i < length; i++) {
        elem_subway_stations[i].addEventListener('click', function(e){
            subway.add(e)
        }.bind(this));
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
    document.querySelector('.search-btn').addEventListener('click', function(){search(1);});
    document.querySelector('.search-subway-btn').addEventListener('click', function(){search(1);});

    document.querySelector('.filter-area .from').addEventListener('keydown', searchOnPressEnter);
    document.querySelector('.filter-area .to').addEventListener('keydown', searchOnPressEnter);
    document.querySelector('.filter-price .from').addEventListener('keydown', searchOnPressEnter);
    document.querySelector('.filter-price .to').addEventListener('keydown', searchOnPressEnter);

    var sliders = document.querySelectorAll('.slider');

    for(var i = 0, length = sliders.length; i < length; i ++) {
        new Slider(sliders[i]);
    }

    var texts = document.querySelectorAll('.row5 p');

    for(var i = 0, length = texts.length; i < length; i ++) {
        new Collapse(texts[i]);
    }

    var fullScreen = new FullScreen(document.querySelector('.block-photo-full-screen'));

    var previews = document.querySelectorAll('.row4 .previews .preview');

    for (var i = 0, length = previews.length; i < length; i++) {
        previews[i].addEventListener('click', function(e){
            fullScreen.initOnEvent(e)
        }.bind(this));
    }
});