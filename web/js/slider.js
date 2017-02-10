var Slider = function(elem)
{
    this.slider = elem;
    this.slider_inner = elem.querySelector('.slider-inner');
    this.slides = elem.querySelectorAll('.slide');
    this.offset = 0;
};

Slider.prototype.left = function()
{
    var slide_width = this.slider_inner.offsetWidth / this.slides.length;

    if(Math.abs(this.offset) <= 0) {
        return false;
    }

    var module = Math.abs(this.offset) % slide_width;

    this.offset += module === 0 ? slide_width : module;

    this.slider_inner.style.transform = 'translateX(' + this.offset + 'px)';

    return true;
};

Slider.prototype.right = function()
{
    var slider_width = this.slider.offsetWidth;
    var slide_width = this.slider_inner.offsetWidth / this.slides.length;

    var sliders_width = this.slides.length * slide_width;

    var common_width = Math.abs(this.offset) + slider_width;
    var module = common_width % slide_width;

    if(common_width >= sliders_width){
        return false;
    }

    this.offset -= module === 0 ? slide_width : slide_width - module;
    this.slider_inner.style.transform = 'translateX(' + this.offset + 'px)';

    return true;
};