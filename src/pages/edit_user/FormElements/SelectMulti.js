import React from "react";
import classnames from "classnames";
import Select from "react-select";
import s from "../styles.styl";
import { c, j } from "~/helpers/Debug";

export default ({ placeholder, field, title, descr, options }) => {
  const dasOptns = options.map(({ id, label }) => ({
    value: id,
    label,
  }));

  return (
    <div className={classnames("", s.field)}>
      <label className="label">{title}</label>
      {descr && <div className={classnames("is-small")}>{descr}</div>}
      <div className={classnames("control", s.control)}>
        <span className={classnames("select", s.select)}>
          <Select
            {...field}
            closeMenuOnSelect={false}
            isMulti={true}
            className={classnames("react-select-container")}
            classNamePrefix="react-select"
            options={dasOptns}
            placeholder={placeholder}
          />
        </span>
      </div>
    </div>
  );
};
