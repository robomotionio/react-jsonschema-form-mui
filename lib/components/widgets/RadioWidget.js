"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Radio = require("@material-ui/core/Radio");

var _Radio2 = _interopRequireDefault(_Radio);

var _RadioGroup = require("@material-ui/core/RadioGroup");

var _RadioGroup2 = _interopRequireDefault(_RadioGroup);

var _styles = require("@material-ui/core/styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//const theme = createMuiTheme();

function RadioWidget(props) {
  var theme = props.theme,
      options = props.options,
      value = props.value,
      required = props.required,
      disabled = props.disabled,
      readonly = props.readonly,
      autofocus = props.autofocus,
      _onChange = props.onChange;
  // Generating a unique field name to identify this set of radio buttons

  var name = Math.random().toString();
  var enumOptions = options.enumOptions;
  // checked={checked} has been moved above name={name}, As mentioned in #349;
  // this is a temporary fix for radio button rendering bug in React, facebook/react#7630.

  return _react2.default.createElement(
    _styles.MuiThemeProvider,
    { theme: theme },
    _react2.default.createElement(
      "div",
      { className: "field-radio-group" },
      _react2.default.createElement(
        _RadioGroup2.default,
        {
          name: "shipSpeed",
          defaultSelected: "not_light",
          onChange: function onChange(e, v) {
            return _onChange(v);
          } },
        enumOptions.map(function (option, i) {
          return _react2.default.createElement(_Radio2.default, {
            checked: option.value === value,
            name: name,
            label: option.label,
            required: required,
            value: option.value,
            disabled: disabled || readonly,
            autoFocus: autofocus && i === 0
          });
        })
      )
    )
  );
}

RadioWidget.defaultProps = {
  autofocus: false
};

if (process.env.NODE_ENV !== "production") {
  RadioWidget.propTypes = {
    schema: _propTypes2.default.object.isRequired,
    id: _propTypes2.default.string.isRequired,
    options: _propTypes2.default.shape({
      enumOptions: _propTypes2.default.array,
      inline: _propTypes2.default.bool
    }).isRequired,
    value: _propTypes2.default.any,
    required: _propTypes2.default.bool,
    disabled: _propTypes2.default.bool,
    readonly: _propTypes2.default.bool,
    autofocus: _propTypes2.default.bool,
    onChange: _propTypes2.default.func
  };
}
exports.default = RadioWidget;