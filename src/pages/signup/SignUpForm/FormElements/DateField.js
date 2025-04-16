import React from "react";
import classnames from "classnames";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

import styles from "~/pages/signup/styles.styl";

const DateField = ({
  l,
  field,
  title,
  dateFormat = "dd/MM/yyyy",
  ...attrs
}) => {
  return (
    <div>
      <label className={classnames("label", styles.form__label)}>{title}</label>
      <div className={classnames("is-small", styles.field__description)}>
        {l.help.format}: {dateFormat}
      </div>
      <div className={classnames("control")}>
        <DatePicker
          className={classnames(
            "input",
            "input__datepicker",
            styles.field__datepicker,
            Boolean(field.error) ? styles.is_danger : null
          )}
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          selected={field.value ? new Date(field.value) : null}
          onChange={(date) => field.onChange(date.toISOString())}
          dateFormat={dateFormat}
          {...attrs}
        />
      </div>
      {field.error && <span className="help is-danger">{field.error}</span>}
    </div>
  );
};

export default DateField;
