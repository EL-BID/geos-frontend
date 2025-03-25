import React from "react";
import classnames from "classnames";

import styles from "~/pages/signup/styles.styl";

//Helpers
import { fieldDestruture as f } from "../Helpers/ReduxFormHelpers";

const SelectField = ({ l, field, title, descr, options }) => {
  return (
    <div>
      <label className={classnames("label", styles.form__label)}>{title}</label>
      {descr && (
        <div className={classnames("is-small", styles.field__description)}>
          {descr}
        </div>
      )}
      <div className={classnames("control")}>
        <span className={classnames("select", styles.form__select)}>
          <select {...f(field)}>
            <option value="">{l.help.pleaseSelect}</option>
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

export default SelectField;
