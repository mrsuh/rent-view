document.addEventListener("DOMContentLoaded", function () {

    var main_photo = document.getElementById('js_main_photo');
    var main_photo_full = document.getElementById('js_main_photo_full');
    var main_blur = document.getElementById('js_main_blur');
    var block_photo_full = document.querySelector('.block-card-photo-full-screen');

    var setPreview = function (e) {
        var src = e.target.getAttribute('data-src');
        main_blur.style.backgroundImage = 'url("' + src + '")';
        console.info(e.target);
        main_photo.setAttribute('src', src);
    };

    var setPreviewFull = function (e) {
        var src = e.target.getAttribute('data-src');
        main_photo_full.setAttribute('src', src);
    };

    var closeFullScreen = function()
    {
        document.body.style.overflow = 'auto';
        block_photo_full.style.display = 'none';
    };

    document.querySelector('.btn-close').onclick = closeFullScreen;

    var slider = new Slider(
        document.querySelector('.slider')
    );

    document.querySelector('.arrow-btn.left').onclick = function () {
        slider.left();
    };
    document.querySelector('.arrow-btn.right').onclick = function () {
        slider.right();
    };

    var previews = document.querySelectorAll('.preview');

    for (var i = 0, length = previews.length; i < length; i++) {
        previews[i].addEventListener('click', setPreview, true);
    }

    var previews_full = document.querySelectorAll('.preview-full');

    for (var i = 0, length = previews_full.length; i < length; i++) {
        previews_full[i].addEventListener('click', setPreviewFull, true);
    }

    document.getElementById('js_full_view').onclick = function () {
        document.body.style.overflow = 'hidden';
        block_photo_full.style.display = 'block';
    };

    document.onkeydown = function (evt) {
        evt = evt || window.event;
        var isEscape = false;
        if ('key' in evt) {
            isEscape = (evt.key == 'Escape' || evt.key == 'Esc');
        } else {
            isEscape = (evt.keyCode == 27);
        }
        if (isEscape) {
            closeFullScreen();
        }
    };
});