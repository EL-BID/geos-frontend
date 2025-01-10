import React from "react";
import { isEmpty } from "lodash";
import { GenderOptns } from "../SelectsOptions";
import styles from "../../../signup.styl";

//Form Elements
import SelectField from "../FormElements/SelectField";
import DateField from "../FormElements/DateField";

// Components
import Field from "~/components/Form/Field";

//Helpers
import { fieldDestruture as f } from "../Helpers/ReduxFormHelpers";

const DatosBasicos = ({ l, fields, profile }) => {
  //Default born value to today minus 18 years
  if (isEmpty(fields.born.value)) {
    const today = new Date();
    const year = today.getFullYear() - 18;
    const month = today.getMonth();
    const day = today.getDate();
    const isoDate = new Date(year, month, day).toISOString();
    // fields.born.onChange(isoDate);
    fields.born.value = isoDate;
  }

  //Set profile field
  fields.profile.value = profile;

  return (
    <div className="box">
      <h1 className={styles.title_section}>{l("SignUpForm.personalData")}</h1>
      <Field {...f(fields.profile)} type="hidden" />
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

      <div className="columns" style={{ marginBottom: 0, marginTop: 0 }}>
        <div className="column">
          <Field
            label={l("SignUpForm.label.email")}
            classField="slim"
            {...f(fields.email)}
          />
        </div>
        <div className="column">
          <Field
            label={l("SignUpForm.label.emailConfirmation")}
            classField="slim"
            {...f(fields.emailConfirm)}
          />
        </div>
      </div>

      <div className="columns" style={{ marginBottom: 0, marginTop: 0 }}>
        <div className="column">
          <Field
            label={l("SignUpForm.label.password")}
            description={l("SignUpForm.help.password")}
            type="password"
            classField="slim"
            {...f(fields.password)}
          />
        </div>
        <div className="column">
          <Field
            label={l("SignUpForm.label.confirmPassword")}
            description={l("SignUpForm.help.confirmPassword")}
            type="password"
            classField="slim"
            {...f(fields.passwordConfirm)}
          />
        </div>
      </div>
    </div>
  );
};

export default DatosBasicos;
