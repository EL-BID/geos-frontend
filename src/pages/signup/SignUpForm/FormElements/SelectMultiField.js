import React from "react";
import classnames from "classnames";
import parse from "html-react-parser";
import Select from "react-select";

import styles from "~/pages/signup/styles.styl";

//Helpers
import { fieldDestruture as f } from "../Helpers/ReduxFormHelpers";

const SelectMultiField = ({ l, field, titleId, descrId = null, options }) => {
  const dasOptns = options.map(({ id, label }) => ({
    value: id,
    label: l(label),
  }));

  return (
    <div>
      <label className={classnames("label", styles.form__label)}>
        {l(titleId)}
      </label>
      {descrId && (
        <div className={classnames("is-small", styles.field__description)}>
          {parse(l(descrId))}
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
            placeholder={l(`SignUpForm.placeholderSelectOptions`)}
          />
        </span>
      </div>
    </div>
  );
};

export default SelectMultiField;
