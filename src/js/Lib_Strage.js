module.exports = {
    save: function(key, value, cb) {
        'use strict';
        if (typeof chrome !== "undefined") {
            // Chorome　の場合
            var saveObj = {};
            saveObj[keygi] = value;

            chrome.storage.local.set(saveObj, function() {
                cb();
            });

        } else {
            // Chorome 以外
            localStorage.setItem(key, JSON.stringify(value));
            cb();
        }
        return;
    },
    load: function(key, cb) {

        'use strict';
        if (typeof chrome !== "undefined" && typeof chrome.storage !== "undefined") {
            // Chorome　の場合
            chrome.storage.local.get(key, function(value) {
                console.log("load from chrome.storage.local:" + key);
                if (value && value != {}) {
                    cb(value[key]);
                    return;
                }
                cb(null);
            });

        } else {
            // Chorome 以外
            var value = localStorage.getItem(key);
            cb(JSON.parse(value));
        }
        return;
    }
};
