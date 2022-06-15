import React from "react";
import PropTypes from "prop-types";
import DescriptionField from "../fields/DescriptionField.js";
import Checkbox from "@material-ui/core/Checkbox";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";

//const theme = createTheme();

function CheckboxWidget(props) {
  const {
    theme,
    schema,
    id,
    value,
    required,
    disabled,
    readonly,
    label,
    autofocus,
    onChange,
  } = props;
  return (
    <MuiThemeProvider theme={theme}>
      <div className={`checkbox ${disabled || readonly ? "disabled" : ""}`}>
        {schema.description && (
          <DescriptionField description={schema.description} />
        )}
        <label>
          <Checkbox
            id={id}
            checked={typeof value === "undefined" ? false : value}
            required={required}
            disabled={disabled || readonly}
            autoFocus={autofocus}
            onChange={event => onChange(event.target.checked)}
          />
          <span>{label}</span>
        </label>
      </div>
    </MuiThemeProvider>
  );
}

CheckboxWidget.defaultProps = {
  autofocus: false,
};

if (process.env.NODE_ENV !== "production") {
  CheckboxWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.bool,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
  };
}

export default CheckboxWidget;
