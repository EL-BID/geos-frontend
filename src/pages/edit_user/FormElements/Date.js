import React from "react";
import classnames from "classnames";
import s from "../styles.styl";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

export default ({
  l,
  field,
  title,
  name,
  descr,
  onChange,
  dateFormat = "dd/MM/yyyy",
  ...attrs
}) => {
  return (
    <div className={classnames("", s.field)}>
      <label className={classnames("label")}>{title}</label>
      {descr && (
        <div className={classnames("is-small")}>
          {descr}: {dateFormat}
        </div>
      )}
      <div className={classnames("control", s.control)}>
        <DatePicker
          className={classnames("input", "input__datepicker")}
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          {...field}
          dateFormat={dateFormat}
          {...attrs}
        />
      </div>
    </div>
  );
};
