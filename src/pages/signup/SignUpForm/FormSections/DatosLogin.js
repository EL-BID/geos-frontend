import React from "react";
import classnames from "classnames";
import { isEmpty } from "lodash";
import { GenderOptns } from "~/models/UserSignUpSelectOptions";

//Form Elements
import SelectField from "../FormElements/SelectField";
import DateField from "../FormElements/DateField";

// Components
import Field from "~/components/Form/Field";

//Helpers
import { fieldDestruture as f } from "../Helpers/ReduxFormHelpers";

const DatosLogin = ({ l, fields, styles }) => {
  return (
    <div className="box">
      <input type="hidden" {...f(fields.profile)} />
      <h1 className={styles.title_section}>{l.title_login_data}</h1>

      <div className="columns" style={{ marginBottom: 0, marginTop: 0 }}>
        <div className="column">
          <Field label={l.label.email} classField="slim" {...f(fields.email)} />
        </div>
        <div className="column">
          <Field
            label={l.label.emailConfirmation}
            classField="slim"
            {...f(fields.emailConfirm)}
          />
        </div>
      </div>

      <div className="columns" style={{ marginBottom: 0, marginTop: 0 }}>
        <div className="column">
          <Field
            label={l.label.password}
            description={l.help.password}
            type="password"
            classField="slim"
            {...f(fields.password)}
          />
        </div>
        <div className="column">
          <Field
            label={l.label.confirmPassword}
            description={l.help.confirmPassword}
            type="password"
            classField="slim"
            {...f(fields.passwordConfirm)}
          />
        </div>
      </div>
    </div>
  );
};

export default DatosLogin;
