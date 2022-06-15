"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require("../../utils");

var _Select = require("@mui/material/Select");

var _Select2 = _interopRequireDefault(_Select);

var _Typography = require("@mui/material/Typography");

var _Typography2 = _interopRequireDefault(_Typography);

var _MenuItem = require("@mui/material/MenuItem");

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _styles = require("@mui/styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//const theme = createTheme();

/**
 * This is a silly limitation in the DOM where option change event values are
 * always retrieved as strings.
 */
function processValue(_ref, value) {
  var type = _ref.type,
      items = _ref.items;

  if (value === "") {
    return undefined;
  } else if (type === "array" && items && ["number", "integer"].includes(items.type)) {
    return value.map(_utils.asNumber);
  } else if (type === "boolean") {
    return value === "true";
  } else if (type === "number") {
    return (0, _utils.asNumber)(value);
  }
  return value;
}

function getValue(event, index, value, multiple) {
  if (multiple) {
    return [].slice.call(event.target.options).filter(function (o) {
      return o.selected;
    }).map(function (o) {
      return o.value;
    });
  } else {
    return value;
  }
}

function SelectWidget(props) {
  var theme = props.theme,
      schema = props.schema,
      id = props.id,
      options = props.options,
      value = props.value,
      required = props.required,
      disabled = props.disabled,
      readonly = props.readonly,
      multiple = props.multiple,
      autofocus = props.autofocus,
      _onChange = props.onChange,
      onBlur = props.onBlur,
      onFocus = props.onFocus,
      placeholder = props.placeholder;
  var enumOptions = options.enumOptions;

  var emptyValue = multiple ? [] : "_";
  return _react2.default.createElement(
    _styles.ThemeProvider,
    { theme: theme },
    _react2.default.createElement(
      "div",
      null,
      _react2.default.createElement(
        _Typography2.default,
        { variant: "caption" },
        schema.title
      )
    ),
    _react2.default.createElement(
      _Select2.default,
      {
        id: id,
        multiple: multiple
        // className="form-control"
        , value: typeof value === "undefined" ? emptyValue : value,
        required: required,
        disabled: disabled || readonly,
        autoFocus: autofocus,
        onBlur: onBlur && function (event, index, value) {
          var newValue = getValue(event, index, value, multiple);
          onBlur(id, processValue(schema, newValue));
        },
        onFocus: onFocus && function (event, index, value) {
          var newValue = getValue(event, index, value, multiple);
          onFocus(id, processValue(schema, newValue));
        },
        onChange: function onChange(event) {
          //const newValue = getValue(event, index, value, multiple);
          _onChange(processValue(schema, event.target.value));
        } },
      !multiple && !schema.default && _react2.default.createElement(
        _MenuItem2.default,
        { value: "_" },
        " ",
        placeholder ? placeholder : "Select",
        " "
      ),
      enumOptions.map(function (_ref2, i) {
        var value = _ref2.value,
            label = _ref2.label;

        return _react2.default.createElement(
          _MenuItem2.default,
          { key: i, value: value },
          label
        );
      })
    )
  );
}

SelectWidget.defaultProps = {
  autofocus: false
};

if (process.env.NODE_ENV !== "production") {
  SelectWidget.propTypes = {
    schema: _propTypes2.default.object.isRequired,
    id: _propTypes2.default.string.isRequired,
    options: _propTypes2.default.shape({
      enumOptions: _propTypes2.default.array
    }).isRequired,
    value: _propTypes2.default.any,
    required: _propTypes2.default.bool,
    disabled: _propTypes2.default.bool,
    readonly: _propTypes2.default.bool,
    multiple: _propTypes2.default.bool,
    autofocus: _propTypes2.default.bool,
    onChange: _propTypes2.default.func,
    onBlur: _propTypes2.default.func,
    onFocus: _propTypes2.default.func
  };
}

exports.default = SelectWidget;