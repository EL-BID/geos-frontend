import React from "react";
import classnames from "classnames";
import parse from "html-react-parser";

import styles from "~/pages/signup/styles.styl";

//Helpers
import { fieldDestruture as f } from "../Helpers/ReduxFormHelpers";

const SelectField = ({ l, field, titleId, descrId = null, options }) => {
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
          <select {...f(field)}>
            <option value="">Seleccione</option>
            {options.map(({ id, label }) => (
              <option key={id} value={id}>
                {l(label)}
              </option>
            ))}
          </select>
        </span>
      </div>
    </div>
  );
};

export default SelectField;
