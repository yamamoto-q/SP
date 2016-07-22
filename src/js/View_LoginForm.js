'use strict';

var React = require('react');
var QUser = require('./QUser.js');

var Ctrl_QUser = require('./Ctrl_QUser.js');

var View_Middle = require('./Middle.js');

module.exports = React.createClass({
	displayName: 'exports',

	getInitialState: function getInitialState() {
		return {
			qUsers: []
		};
	},
	componentDidMount: function componentDidMount() {
		var self = this;
		Ctrl_QUser.Store.addQUsersChangeListener(function () {
			console.log('addQUsersChangeListener');
			var qUsers = Ctrl_QUser.Store.getQUsers();
			console.log(qUsers);
			if (self.isMounted()) {
				self.setState({
					qUsers: qUsers
				});
			}
		});

		//ModelsCtrl.Action.getAllProcessModelInfos();
	},
	render: function render() {
		return React.createElement(
			View_Middle,
			null,
			React.createElement(
				'p',
				null,
				React.createElement(
					'a',
					{ className: 'btn' },
					'Test'
				)
			)
		);
	}
});
