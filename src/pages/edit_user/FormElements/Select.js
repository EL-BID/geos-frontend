import React from "react";
import classnames from "classnames";
import s from "../styles.styl";

export default ({ l, field, title, descr, placeholder, options }) => {
  return (
    <div className={classnames("", s.field)}>
      <label className="label">{title}</label>
      {descr && <div className="is-small">{descr}</div>}
      <div className={classnames("control")}>
        <span className={classnames("select", s.select)}>
          <select {...field}>
            <option value="">{placeholder}</option>
            {options.map(({ id, label }) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
        </span>
      </div>
    </div>
  );
};
