HTMLElement.prototype.hasClass = function(class_name) {
    var classes = this.className.split(' ');
    for(var i = 0, length = classes.length; i < length; i++) {
        if(classes[i] === class_name) {
            return true;
        }
    }

    return false;
};

HTMLElement.prototype.addClass = function(class_name) {
    var classes = this.className.split(' ');
    var exist = false;
    for(var i = 0, length = classes.length; i < length; i++) {
        if(classes[i] === class_name) {
            exist = true;
            break;
        }
    }

    if(exist) {
        return false;
    }

    this.className = this.className + ' ' + class_name;

    return true;
};

HTMLElement.prototype.removeClass = function(class_name) {
    var classes = this.className.split(' ');
    for(var i = 0, length = classes.length; i < length; i++) {
        if(classes[i] === class_name) {
            classes.splice(i, 1);
            this.className = classes.join(' ');
            return true;
        }
    }

    return false;
};