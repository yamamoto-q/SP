var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");
var Dispatcher = require('flux').Dispatcher;

var LibStrage = require('./Lib_Strage.js');

// Dispatcher をシングルトンで提供
var dispatcherInstance = null;
var dispatcher = {
    getInstance: function() {
        if (dispatcherInstance === null) {
            dispatcherInstance = new Dispatcher();
        }
        return dispatcherInstance;
    }
}

var Action = {
	load:function(){
		if(location.pathname == "/www/sandbox.html"){
			dispatcher.getInstance().dispatch({
				actionType: "LoadFromSandBox",
				value:{}
			});
		}else{
			dispatcher.getInstance().dispatch({
				actionType: "Load",
				value:{}
			});
		}
	},
	save:function(key, value){
		// 保存する
		if(location.pathname == "/www/sandbox.html"){
			// サンドボックスのとき
			dispatcher.getInstance().dispatch({
				actionType: "SaveFromSandBox",
				value:{
					key:key,
					value:value
				}
			});
		}else{
			// 通常のとき
			dispatcher.getInstance().dispatch({
				actionType: "Save",
				value:{
					key:key,
					value:value
				}
			});
		}
	}
}

// SandBox 親 - - - - - - - - - - - - - - - - - - - - -
// SandBox使用時に、親がサンドボックスからコマンドを受け取った時に...
if(location.pathname == "/www/ChromeAppLogin.html"){
	window.addEventListener('message', function(event) {
		var command = event.data.command;
		switch (command){
			case "load":
				Store.Load();
				break;
			case "save":
				// 子から保存要請を受信
				var key = event.data.option.key;
				var value = event.data.option.value;
				// 保存を実行
				Store.Save(key, value);
				break;
		}
	});
}

// SandBox 子 - - - - - - - - - - - - - - - - - - - - -
// SandBox使用時に、サンドボックスが親からコマンドを受け取った時に...
if(location.pathname == "/www/sandbox.html"){
	window.addEventListener('message', function(event) {
		var command = event.data.command;
		switch (command){
			case "loaded":
				var values = event.data.option.values;
				_store.savedValues = values;
				Store.emitChangeSavedData();
				break;
		}
	});
}

var EVENT = {
	SAVED:"saved",
	LOADED:"loaded"
}

var _store = {
	savedValues:null,
}

var Store = assign({}, EventEmitter.prototype, {
	getSavedValue:function(){
		return _store.savedValues;
	},
	addChangeSavedDataListener:function(callback){
		this.on(EVENT.LOADED, callback);
	},
	emitChangeSavedData:function(){
		this.emit(EVENT.LOADED);
	},
	LoadFromSandBox:function(){
		parent.postMessage({
			command:"load",
			option:{}
		},"*");
	},
	Load:function(){
		LibStrage.load("test", function(value){
			if(location.pathname == "/www/ChromeAppLogin.html"){
				// サンドボックスの親の場合は子に通知する
				var sandbox = document.getElementById("Sandbox").contentWindow;
				sandbox.postMessage({
					command:"loaded",
					option:{values:value}
				},"*")
			}else{
				_store.savedValues = value;
				Store.emitChangeSavedData();
			}
		});
	},
	SaveFromSandBox:function(key, value){
		// 親に save 送信
		parent.postMessage({
			command:"save",
			option:{
				key:key,
				value:value
			}
		},"*");
	},
	Save:function(key, value){
		// 保存を実行する
		if (typeof chrome !== "undefined") {
			// Chrome の場合
			var saveObj = {};
            saveObj[key] = value;
            chrome.storage.local.set(saveObj, function() {
            	// 保存成功
            	console.log("chrome saved");
            	Store.Load();
            });
		}
	},
	dispatcherIndex: dispatcher.getInstance().register(function(payload) {
		switch (payload.actionType) {
			case "LoadFromSandBox":
				Store.LoadFromSandBox();
				break;
			case "Load":
				Store.Load();
			case "SaveFromSandBox":
				Store.SaveFromSandBox(payload.value.key, payload.value.value);
				break;
			case "Save":
				Store.Save(payload.value.key, payload.value.value);
				break;
		}
	})
});

module.exports = {
    Action: Action,
    Store: Store
}