var Slider = function(elem, _center)
{
    var center = _center || false;
    this.slider = elem;
    this.slider_inner = elem.querySelector('.slider-inner');
    this.slides = elem.querySelectorAll('.slide');
    this.offset = 0;

    this.arrow = {
        left: elem.querySelector('.left'),
        right: elem.querySelector('.right')
    };

    window.addEventListener('resize', function(){this.showArrow()}.bind(this));
    this.arrow.left.addEventListener('click', function(){this.left()}.bind(this));
    this.arrow.right.addEventListener('click', function(){this.right()}.bind(this));

    this.showArrow();

    if(center) {
        this.centerPreview();
        window.addEventListener('resize', function(){this.showArrow();}.bind(this));
    }
};

Slider.prototype.showArrow = function()
{
  var width_slider = this.slider.offsetWidth;
  var width_inner_slider = this.slider_inner.offsetWidth;


  if(width_slider < 640){
      this.arrow.left.style.display = 'none';
      this.arrow.right.style.display = 'none';

      return false;
  }

  if(width_inner_slider > width_slider) {
      this.arrow.left.style.display = 'block';
      this.arrow.right.style.display = 'block';
  } else {
      this.arrow.left.style.display = 'none';
      this.arrow.right.style.display = 'none';
  }
};

Slider.prototype.centerPreview = function()
{
    var width_slider = this.slider.offsetWidth;
    var width_inner_slider = this.slider_inner.offsetWidth;

    if(width_inner_slider > width_slider) {
        this.slider.parentNode.style.textAlign = 'left';
        this.slider_inner.style.position = 'absolute';
    } else {
        this.slider.parentNode.style.textAlign = 'center';
        this.slider_inner.style.position = 'relative';
    }
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