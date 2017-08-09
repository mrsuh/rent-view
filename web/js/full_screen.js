var FullScreen = function(elem)
{
    this.block_main = elem;
    this.block_description = elem.querySelector('.description');
    this.block_previews = elem.querySelector('.previews .slider-inner');
    this.block_slider = elem.querySelector('.slider');
    this.img = elem.querySelector('.photo img');
    this.previews = [];
    this.bind_arrow = false;

    document.querySelector('.block-photo-full-screen .btn-close').addEventListener('click', function(){this.close()}.bind(this));
    document.addEventListener('keydown', function(e){
        var evt = e || window.event;
        var isEscape = false;
        if ('key' in evt) {
            isEscape = (evt.key === 'Escape' || evt.key === 'Esc');
        } else {
            isEscape = (evt.keyCode === 27);
        }
        if (isEscape) {
            this.close();
        }
    }.bind(this));
};

FullScreen.prototype.close = function()
{
    document.body.style.overflow = 'auto';
    this.block_main.style.display = 'none';
};

FullScreen.prototype.setFull = function(e)
{
    for (var i = 0, length = this.previews.length; i < length; i++) {
        this.previews[i].removeClass('active');
    }

    e.target.addClass('active');

    var src = e.target.getAttribute('data-src');
    this.img.setAttribute('src', src);
};

FullScreen.prototype.init = function(element)
{
    this.previews = [];
    var main_src = element.getAttribute('data-src');
    this.img.setAttribute('src', main_src);

    while (this.block_previews.firstChild) {
        this.block_previews.removeChild(this.block_previews.firstChild);
    }

    var parent_previews = element.parentNode.querySelectorAll('.preview');

    for (var n = 0, nlength = parent_previews.length; n < nlength; n++) {
        var img = document.createElement('div');
        var src = parent_previews[n].getAttribute('data-src');

        img.setAttribute('data-src', src);
        img.style.backgroundImage = 'url(' + src + ')';

        if(main_src === src) {
            img.className = 'slide preview-full active';
        } else {
            img.className = 'slide preview-full';
        }

        img.addEventListener('click', function(e){this.setFull(e)}.bind(this));

        this.block_previews.appendChild(img);
        this.previews.push(img);
    }

    document.body.style.overflow = 'hidden';
    this.block_main.style.display = 'block';

    new Slider(this.block_slider, true);

    if(!this.bind_arrow) {
        document.addEventListener('keydown', function(e){
            this.bindArrow(e);
        }.bind(this));
        this.bind_arrow = true;
    }
};

FullScreen.prototype.bindArrow = function(e)
{
    var evt = e || window.event;

    switch(evt.keyCode) {
        case 37:
            this.onArrowLeft();
            break;
        case 39:
            this.onArrowRight();
            break;
    }
};

FullScreen.prototype.initOnEvent = function(e)
{
    var item = e.target.parentNode.parentNode.parentNode.parentNode.parentNode;
    var item_name = item.querySelector('.row1 .name a').innerText;
    var item_area = item.querySelector('.row1 .area').innerText;
    var item_price = item.querySelector('.row1 .price').innerText;

    var elem_name = document.createElement('div');
    elem_name.className = 'name';
    elem_name.innerText = item_name;

    var elem_area = document.createElement('div');
    elem_area.className = 'area';
    elem_area.innerText = item_area;

    var elem_price = document.createElement('div');
    elem_price.className = 'price';
    elem_price.innerText = item_price;

    while (this.block_description.firstChild) {
        this.block_description.removeChild(this.block_description.firstChild);
    }

    this.block_description.appendChild(elem_name);
    this.block_description.appendChild(elem_area);
    this.block_description.appendChild(elem_price);

    this.init(e.target);
};

FullScreen.prototype.onArrowRight = function()
{
  for(var i = 0, length = this.previews.length; i < length; i++) {
      var curr = this.previews[i];
      var next = this.previews[i + 1];

      if(curr.hasClass('active') && 'undefined' !== typeof next) {
          next.click();
          break;
      }
  }
};

FullScreen.prototype.onArrowLeft = function()
{
    for(var i = 0, length = this.previews.length; i < length; i++) {
        var curr = this.previews[i];
        var prev = this.previews[i - 1];

        if(curr.hasClass('active') && 'undefined' !== typeof prev) {
            prev.click();
            break;
        }
    }
};