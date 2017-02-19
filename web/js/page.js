document.addEventListener("DOMContentLoaded", function () {

    new Preview({
        photo: document.getElementById('js_main_photo'),
        blur: document.getElementById('js_main_blur'),
        previews: document.querySelectorAll('.preview')
    });

   new Slider(document.querySelector('.block-card-preview .slider'));

   var full_screen = new FullScreen(document.querySelector('.block-card-photo-full-screen'));

    document.getElementById('js_full_view').addEventListener('click', function(){
        full_screen.init(document.querySelector('.block-card-preview .active'));
    }.bind(this));
});