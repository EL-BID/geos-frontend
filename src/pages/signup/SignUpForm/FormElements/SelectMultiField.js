import React from "react";
import classnames from "classnames";
import Select from "react-select";

import styles from "~/pages/signup/styles.styl";

//Helpers
import { fieldDestruture as f } from "../Helpers/ReduxFormHelpers";

const SelectMultiField = ({ l, field, title, descr, options }) => {
  const dasOptns = options.map(({ id, label }) => ({
    value: id,
    label,
  }));

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
          <Select
            {...f(field)}
            closeMenuOnSelect={false}
            isMulti={true}
            className={classnames("react-select-container")}
            classNamePrefix="react-select"
            options={dasOptns}
            placeholder={l.placeholderSelectOptions}
          />
        </span>
      </div>
    </div>
  );
};

export default SelectMultiField;
