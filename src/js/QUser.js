var _context, _credentials, _QUser;

function _authentication(context, email, password, successCallBack, failCallback) {
	_self(context, email, password, successCallBack, failCallback);
}

function _self(context, email, password, successCallBack, failCallback){
    var credentials = $.base64.encode(email + ":" + password);

    $.ajax({
            type: 'GET',
            url: _context + "/API/User/Quser/self",
            dataType: 'json',
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + credentials);
            }
        })
        .done(function(data, textStatus, jqXHR) {
            successCallBack(data);
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            failCallback(jqXHR.status);
        });
}


module.exports = {
    authentication: function(context, email, password, successCallBack, failCallback) {
        _authentication(context, email, password, successCallBack, failCallback);
    },
    self: function(context, email, password, successCallBack, failCallback) {
        _self(context, email, password, successCallBack, failCallback);
    }
}
