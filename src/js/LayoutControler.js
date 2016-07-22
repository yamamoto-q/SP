var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");
var Dispatcher = require('flux').Dispatcher;

var dispatcher = new Dispatcher();

_state = {
	ready:false
}

var EVENT = {
	RESIZE : "resize"
}

var Store = assign({}, EventEmitter.prototype, {
    addResizeListener: function(callback) {
        this.on(EVENT.RESIZE, callback);
    },
	emitResize: function() {
        this.emit(EVENT.RESIZE);
    }
});

var resizeTimer = null;
window.onresize = function() {
	if(resizeTimer !== null){
		clearTimeout(resizeTimer);
	}
	resizeTimer = setTimeout(function() {
		Store.emitResize();
		resizeTimer = null;
	},200);
}

module.exports = {
    Store: Store
}


