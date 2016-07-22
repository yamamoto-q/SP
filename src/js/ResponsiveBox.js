'use strict';

var React = require('react');

var LayoutControler = require('./LayoutControler.js');

module.exports = React.createClass({
	displayName: 'exports',

	/*
 getInitialState: function getInitialState() {
 	return {};
 },
 */
	componentDidMount: function componentDidMount() {
		var self = this;
		LayoutControler.Store.addResizeListener(function () {
			if (self.isMounted()) {
				console.log("resize");
				/*
    var info = Ctrl_WPRestAPI.Store.getInfo();
    self.setState({
    	initized: true,
    	url: info.url,
    	name: info.name,
    	description: info.description
    });
    */
			}
		});
	},
	render: function render() {
		var wrapperStyle = {};
		if (this.props.style) {
			wrapperStyle = this.props.style;
		}

		wrapperStyle.position = "relative";

		var beforeStyle = {};
		beforeStyle.paddingTop = '100%';
		if (this.props.rate) {
			beforeStyle.paddingTop = parseFloat(this.props.rate) * 100 + "%";
		}
		beforeStyle.display = 'block';

		var contentOuterStyle = {};
		contentOuterStyle.position = 'absolute';
		contentOuterStyle.top = '0px';
		contentOuterStyle.left = '0px';
		contentOuterStyle.bottom = '0px';
		contentOuterStyle.right = '0px';

		var contentInnerStyle = {};
		contentInnerStyle.position = "relative";
		contentInnerStyle.width = "100%";
		contentInnerStyle.height = "100%";

		return React.createElement(
			'div',
			{ id: this.props.id, style: wrapperStyle },
			React.createElement('div', { style: beforeStyle }),
			React.createElement(
				'div',
				{ style: contentOuterStyle },
				React.createElement(
					'div',
					{ style: contentInnerStyle },
					this.props.children
				)
			)
		);
	}
});
