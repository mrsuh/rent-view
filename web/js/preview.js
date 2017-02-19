var Preview = function(obj)
{
    this.photo = obj.photo;
    this.blur = obj.blur;
    this.previews = obj.previews;

    for (var i = 0, length = this.previews.length; i < length; i++) {
        this.previews[i].addEventListener('click', function(e){this.setPreview(e)}.bind(this));
    }
};

Preview.prototype.setPreview = function (e) {

    for (var i = 0, length = this.previews.length; i < length; i++) {
        this.previews[i].removeClass('active');
    }

    e.target.addClass('active');

    var src = e.target.getAttribute('data-src');
    this.blur.style.backgroundImage = 'url("' + src + '")';
    this.photo.setAttribute('src', src);
};

