"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Checkbox = require("@mui/material/Checkbox");

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _styles = require("@mui/styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//const theme = createTheme();

function selectValue(value, selected, all) {
  var at = all.indexOf(value);
  var updated = selected.slice(0, at).concat(value, selected.slice(at));
  // As inserting values at predefined index positions doesn't work with empty
  // arrays, we need to reorder the updated selection to match the initial order
  return updated.sort(function (a, b) {
    return all.indexOf(a) > all.indexOf(b);
  });
}

function deselectValue(value, selected) {
  return selected.filter(function (v) {
    return v !== value;
  });
}

function CheckboxesWidget(props) {
  var id = props.id,
      theme = props.theme,
      disabled = props.disabled,
      options = props.options,
      value = props.value,
      autofocus = props.autofocus,
      readonly = props.readonly,
      onChange = props.onChange;
  var enumOptions = options.enumOptions,
      inline = options.inline;

  return _react2.default.createElement(
    _styles.ThemeProvider,
    { theme: theme },
    _react2.default.createElement(
      "div",
      { className: "checkboxes", id: id },
      enumOptions.map(function (option, index) {
        var checked = value.indexOf(option.value) !== -1;
        var disabledCls = disabled || readonly ? "disabled" : "";
        var checkbox = _react2.default.createElement(
          "span",
          null,
          _react2.default.createElement(_Checkbox2.default, {
            id: id + "_" + index,
            checked: checked,
            disabled: disabled || readonly,
            autoFocus: autofocus && index === 0,
            onCheck: function onCheck(event) {
              var all = enumOptions.map(function (_ref) {
                var value = _ref.value;
                return value;
              });
              if (event.target.checked) {
                onChange(selectValue(option.value, value, all));
              } else {
                onChange(deselectValue(option.value, value));
              }
            }
          }),
          _react2.default.createElement(
            "span",
            null,
            option.label
          )
        );
        return inline ? _react2.default.createElement(
          "label",
          { key: index, className: "checkbox-inline " + disabledCls },
          checkbox
        ) : _react2.default.createElement(
          "div",
          { key: index, className: "checkbox " + disabledCls },
          _react2.default.createElement(
            "label",
            null,
            checkbox
          )
        );
      })
    )
  );
}

CheckboxesWidget.defaultProps = {
  autofocus: false,
  options: {
    inline: false
  }
};

if (process.env.NODE_ENV !== "production") {
  CheckboxesWidget.propTypes = {
    schema: _propTypes2.default.object.isRequired,
    id: _propTypes2.default.string.isRequired,
    options: _propTypes2.default.shape({
      enumOptions: _propTypes2.default.array,
      inline: _propTypes2.default.bool
    }).isRequired,
    value: _propTypes2.default.any,
    required: _propTypes2.default.bool,
    readonly: _propTypes2.default.bool,
    disabled: _propTypes2.default.bool,
    multiple: _propTypes2.default.bool,
    autofocus: _propTypes2.default.bool,
    onChange: _propTypes2.default.func
  };
}

exports.default = CheckboxesWidget;