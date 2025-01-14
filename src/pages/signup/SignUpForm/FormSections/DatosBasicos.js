import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { isEmpty } from "lodash";
import { GenderOptns } from "../SelectsOptions";

//Form Elements
import SelectField from "../FormElements/SelectField";
import DateField from "../FormElements/DateField";

// Components
import Field from "~/components/Form/Field";

//Helpers
import { fieldDestruture as f } from "../Helpers/ReduxFormHelpers";

const DatosBasicos = ({ l, fields, profile, styles }) => {
  const isTeacher = profile === "teacher";
  const [showFields, setShowFields] = useState(
    fields.share_personal_data.value
  );

  //Watcher: share checkbox
  useEffect(() => {
    setShowFields(fields.share_personal_data.value);
  }, [fields.share_personal_data]);

  return (
    <div className="box">
      <h1 className={styles.title_section}>{l("SignUpForm.personalData")}</h1>
      {isTeacher && (
        <div>
          <label className={classnames("control is-block", styles.form__input)}>
            <input
              type="checkbox"
              {...f(fields.share_personal_data)}
              className={styles.form__checkbox}
            />
            {l(`SignUpForm.share_personal_data`)}
          </label>
        </div>
      )}
      {showFields && <Fields l={l} fields={fields} />}
    </div>
  );
};

const Fields = ({ l, fields }) => {
  return (
    <span>
      <Field
        label={l("SignUpForm.label.name")}
        classField="slim"
        {...f(fields.name)}
      />
      <div className="columns" style={{ marginBottom: 0, marginTop: 0 }}>
        <div className="column">
          <DateField
            l={l}
            field={fields.born}
            name="born"
            titleId="SignUpForm.label.birthDate"
            maxDate={new Date()}
            minDate={new Date(1900, 0, 1)}
          />
        </div>
        <div className="column">
          <SelectField
            l={l}
            field={fields.gender}
            options={GenderOptns}
            titleId="SignUpForm.label.gender"
            descrId="SignUpForm.help.pleaseSelect"
          />
        </div>
      </div>
    </span>
  );
};

export default DatosBasicos;
