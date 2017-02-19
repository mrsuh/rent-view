var Collapse = function(elem)
{
    this.text = elem;
    this.height = 85;
    this.next = elem.querySelector('.next');
    this.next_text = elem.querySelector('.next .dot');
    window.addEventListener('resize', function(){this.addNext();}.bind(this));
    this.addNext();
    this.next.addEventListener('click', function(){this.collapse()}.bind(this));
};

Collapse.prototype.addNext = function()
{
    var real_height = this.text.scrollHeight;

    if(real_height > this.height) {
        this.next.style.display = 'inline-block';
    } else {
        this.next.style.display = 'none';
    }
};

Collapse.prototype.collapse = function()
{
    var block_height = this.text.offsetHeight;
    var real_height = this.text.scrollHeight;

    if(real_height > block_height) {
        this.text.style.maxHeight = real_height + 'px';
        this.next.style.display = 'none';
    }
};