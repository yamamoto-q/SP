'use strict';

if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
    document.addEventListener("deviceready", onDeviceReady, false);
} else {
    onDeviceReady();
}

var React = require('react');
var ReactDOM = require('react-dom');

var ViewSmartQApp = require('./View_SmartQApp.js');

function onDeviceReady() {
    $(document).ready(function () {

        /**
        * Sandbox 対応
        * index.html ChromeAppLogin.html　sandbox.html が必要
        **/
        if (location.pathname == "/www/ChromeAppLogin.html") {
            // A. Sandbox の親として開かれた場合（Chrome Apps）
            //　Sanboxとして samdbox.hrml をIFRAMEで開く ... B
            // （Chrome Appsの場合、background.js で ChromeAppLogin.html が指定されている）
            ReactDOM.render(React.createElement('iframe', { id: 'Sandbox', src: 'sandbox.html', width: '300', height: '200' }), document.getElementById('App'));
        } else if (location.pathname == "/www/sandbox.html") {
            // B. Sandbox として開かれた場合
            // 
            ReactDOM.render(React.createElement(ViewSmartQApp, { mode: 'sandbox' }), document.getElementById('App'));
        } else {
            // Nomal
            // 通常 モードでアプリを開く
            ReactDOM.render(React.createElement(ViewSmartQApp, { mode: 'nomal' }), document.getElementById('App'));
        }
    });
}
