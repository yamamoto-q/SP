var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");
var Dispatcher = require('flux').Dispatcher;

var _store = {
	qUsers : []
}

var EVENT = {
	QUSERS_CHANGE:"qusers_chenge"
}

var Store = assign({}, EventEmitter.prototype, {
	getQUsers:function(){
		return _store.qUsers;
	},
	addQUsersChangeListener:function(callback){
		this.on(EVENT.QUSERS_CHANGE, callback);
	},
	emitQUsersChange:function(){
		this.emit(EVENT.QUSERS_CHANGE);
	},
});

module.exports = {
    //Action: Action,
    Store: Store
}

//
var Ctrl_Strage = require('./Ctrl_Strage.js');

Ctrl_Strage.Store.addChangeSavedDataListener(function(){
	var SavedValue = Ctrl_Strage.Store.getSavedValue();
	var qUsers = [];
	if(typeof SavedValue.qUsers !== "undefined"){
		qUser = SavedValue.qUsers;
	}

	_store.qUsers = qUsers;
	Store.emitQUsersChange();
});
Ctrl_Strage.Action.load();