"use strict";

var React = require('react');

module.exports = React.createClass({
	displayName: "exports",

	render: function render() {
		var OuterStyle = {};

		if (this.props.style) {
			OuterStyle = this.props.style;
		}
		OuterStyle.width = "100%";
		OuterStyle.height = "100%";
		OuterStyle.relative = "100%";

		var OuterClasses = [this.props.className];
		OuterClasses.push("react-layout-elem-cover");

		return React.createElement(
			"div",
			{ className: OuterClasses.join(' ').trim(), style: OuterStyle },
			React.createElement(
				"div",
				null,
				this.props.children
			)
		);
	}
});
