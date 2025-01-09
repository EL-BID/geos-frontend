import React, { useEffect, useState } from "react";
import { reduxForm } from "redux-form";
import { compose } from "redux";
import "url-search-params-polyfill";
import { concat, isEmpty, keys } from "lodash";
import classnames from "classnames";
import API from "~/api";
import { FormattedMessage, injectIntl } from "react-intl";
import parse from "html-react-parser";
import { UserModel, TeacherDataModel, PrincipalDataModel } from "./Models";
import { GenderOptns, FormationLevelsOptns } from "./SelectsOptions";

//Form Elements
// import SelectField from "./FormElements/SelectField";

//Form Sections
import DatosLaborables from "./FormSections/DatosLaborables";

// Components
import Field from "~/components/Form/Field";
import SubmitBtn from "~/components/SubmitBtn";

import ModalContainer from "~/containers/modal";
import APIDataContainer from "~/containers/api_data";

import styles from "../../signup.styl";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

const d = console.log;
const j = (m) => JSON.stringify(m, null, 4);

const FieldNames = {
  name: "Nombre",
  password: "Contrasena",
  born: "Fecha de nacimiento",
  gender: "Género",
  email: "Correo electrónico",
};

const ReduxFormFields = concat(
  UserModel,
  TeacherDataModel,
  //Add view-model properties
  ["emailConfirm", "passwordConfirm"]
);

const saveUser = (userModel) => {
  const noLogin = true;
  const noaff = true;
  return API.Users.create(userModel, noLogin, noaff);
};

//Helper for destructuring ReduxForm fields
const f = ({ value, onChange, checked, name, error }) => ({
  value,
  onChange,
  checked,
  name,
  error,
});

//Helper function to transform ReduxForm fields to array [key, value]
const fieldsToArray = (fields) => keys(fields).map((k) => [k, fields[k].value]);

const validateModel = (userModel, fields, l) => {
  let allFieldsFilled = true;
  let errors = [];

  //Check if all basic user fields are filled
  const ignoreFields = ["term"];
  allFieldsFilled = UserModel.filter(
    (key) => !ignoreFields.includes(key)
  ).reduce((acc, key) => {
    const value = userModel[key];
    return acc && !isEmpty(value);
  }, allFieldsFilled);

  //Check user type fields
  if (userModel.profile === "teacher") {
    allFieldsFilled = TeacherDataModel.reduce((acc, key) => {
      const value = userModel.teacher_data[key];
      return acc && !isEmpty(value);
    }, allFieldsFilled);
  } else {
    allFieldsFilled = PrincipalDataModel.reduce((acc, key) => {
      const value = userModel.principal_data[key];
      return acc && !isEmpty(value);
    }, allFieldsFilled);
  }

  if (!allFieldsFilled) {
    errors.push(l(`SignUpForm.errors.allFieldsRequired`));
  }

  //Check if the email is valid
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userModel.email)) {
    errors.push(l(`SignUpForm.errors.email`));
  }

  //check if emails match
  if (userModel.email !== fields.emailConfirm.value) {
    errors.push(l(`SignUpForm.errors.emailConfirm`));
  }

  //Check if passwords match
  if (userModel.password !== fields.passwordConfirm.value) {
    errors.push(l(`SignUpForm.errors.passwordConfirm`));
  }

  //Check password is at least 6 chars long
  if (userModel.password.length < 6) {
    errors.push(l(`SignUpForm.errors.password`));
  }

  //Check ToS are accepted
  if (!userModel.term) {
    errors.push(l(`SignUpForm.errors.tos`));
  }

  return errors;
};

const toString = (value) => (value || "").toString();

const reduxFormModelToUserModelConverter = (fields) => {
  const user = {};

  //Map basic model fields to user object
  UserModel.map((key) => {
    user[key] = toString(fields[key].value);
  });

  //If profile is teacher, add teacher_data
  if (user.profile === "teacher") {
    user.teacher_data = {};
    TeacherDataModel.map((key) => {
      user.teacher_data[key] = toString(fields[key].value);
    });
  }

  //Principal
  else {
    user.principal_data = {};
    PrincipalDataModel.map((key) => {
      user.principal_data[key] = toString(fields[key].value);
    });
  }

  return user;
};

const SignUpForm = ({
  intl,
  fields,
  submitting,
  handleSubmit,
  profile,
  apiData,
  fetchCountries,
  fetchProvinces,
  fetchStates,
  fetchCities,
  fetchSchools,
}) => {
  //Helper for internationalization
  const l = (id) => intl.formatMessage({ id });

  //OnMount
  useEffect(() => {
    //Fetch countries
    if (isEmpty(apiData.countries)) {
      fetchCountries();
    }
  }, []);

  //Watcher: provinces
  useEffect(() => {
    const idCountry = fields.country.value;
    if (!isEmpty(idCountry)) {
      fetchProvinces(idCountry);
    }
  }, [fields.country]);

  //Watcher: states
  useEffect(() => {
    const idCountry = fields.country.value;
    const idProvince = fields.province.value;
    if (!isEmpty(idCountry) && !isEmpty(idProvince)) {
      fetchStates(idCountry, idProvince);
    }
  }, [fields.province]);

  //Watcher: cities
  useEffect(() => {
    const idCountry = fields.country.value;
    const idProvince = fields.province.value;
    const idState = fields.state.value;
    if (!isEmpty(idCountry) && !isEmpty(idProvince) && !isEmpty(idState)) {
      fetchCities(idCountry, idProvince, idState);
    }
  }, [fields.state]);

  //Watcher: schools
  useEffect(() => {
    const idCountry = fields.country.value;
    const idProvince = fields.province.value;
    const idState = fields.state.value;
    const idCity = fields.city.value;
    if (
      !isEmpty(idCountry) &&
      !isEmpty(idProvince) &&
      !isEmpty(idState) &&
      !isEmpty(idCity)
    ) {
      fetchSchools(idCountry, idProvince, idState, idCity);
    }
  }, [fields.city]);

  const onSubmit = (e) => {
    e.preventDefault();
    const userModel = reduxFormModelToUserModelConverter(fields);
    const errors = validateModel(userModel, fields, l);

    if (!isEmpty(errors)) {
      const errs = errors.map((err) => `- ${err}`).join("\n");
      return alert(`${l("SignUpForm.errors.found")}:\n${errs}`);
    }

    return saveUser(userModel).then((res) => {
      //Error
      if (isEmpty(res._id)) {
        let msg = keys(res)
          .map((key) => `- ${l(`SignUpForm.label.${key}`)}: ${res[key]}`)
          .join("\n");
        alert(`${l("SignUpForm.errors.found")}:\n${msg}`);
      }
      //Success
      else {
        alert(`SignUpForm.success`);
        window.location = "/listar-usuario/professores";
      }
    });
  };

  return (
    <form className={styles.form} onSubmit={onSubmit} id="SignUpForm">
      {/* <DatosPersonales l={l} fields={fields} profile={profile} /> */}
      <DatosLaborables l={l} fields={fields} apiData={apiData} />
      {/* {profile === "teacher" ? (
        <FieldsTeacher l={l} fields={fields} />
      ) : profile === "principal" ? (
        <FieldsPrincipal l={l} fields={fields} />
      ) : null} */}
      <ToS l={l} field={fields.term} />
      <div
        className={classnames(
          "control",
          styles.form__input,
          styles.form__submit_button
        )}
      >
        <SubmitBtn
          className={classnames("is-primary", "submitBtn", {
            "is-loading": submitting,
          })}
        >
          {parse(l("SignUpForm.register"))}
        </SubmitBtn>
      </div>
    </form>
  );
};

const FieldsPrincipal = ({ l, fields }) => {
  return (
    <div className="box">
      <h1 className={styles.title_section}>{l("SignUpForm.formation")}</h1>
    </div>
  );
};

const FieldsTeacher = ({ l, fields }) => {
  return (
    <div className="box">
      <h1 className={styles.title_section}>{l("SignUpForm.formation")}</h1>
      <SelectField
        l={l}
        field={fields.formation_level}
        titleId="¿Cuál es tu mayor nivel de estudios alcanzado?"
        options={FormationLevelsOptns}
      />
      <Field
        label="¿Cuál fue el año de conclusión de tu formación inicial docente?"
        classField="slim"
        description="Por favor, ingresa solo el año."
        {...f(fields.year_finished_formation)}
        type="number"
        min="1950"
        max={new Date().getFullYear()}
      />
      {/* <SelectField
        l={l}
        field={fields.initial_formation}
        titleId="Tu formación inicial docente fue en"
        options={InitialFormationOptns}
      />
      <SelectField
        l={l}
        field={fields.technology_in_teaching_and_learning}
        titleId="¿Has tenido alguna disciplina o contenido para el uso de la tecnología en la enseñanza y el aprendizaje en tu formación inicial docente?"
        options={YesNoOptns}
      />
      <SelectField
        l={l}
        field={fields.cont_educ_in_the_use_of_digital_technologies}
        titleId="¿Has participado de formaciones en servicio para el uso de tecnologías digitales en los procesos de enseñanza y de aprendizaje en los últimos 2 años?"
        options={CourseModalityOptns}
      />
      <SelectField
        l={l}
        field={fields.years_teaching}
        titleId="¿Cuántos años llevas enseñando?"
        options={YearsOptns}
      />
      <SelectField
        l={l}
        field={fields.cargo_docente}
        titleId="¿Cuál es tu tipo de cargo docente?"
        options={CargoDocenteOptns}
      />
      <SelectField
        l={l}
        field={fields.grado_docente}
        titleId="¿Cuál es tu grado docente?"
        options={OneToSevenOptns}
      />
      <SelectField
        l={l}
        field={fields.years_of_uses_technology_for_teaching}
        titleId="¿Hace cuántos años usas tecnología en los procesos de enseñanza y aprendizaje?"
        options={YearsOptns}
      /> */}
    </div>
  );
};

const DatosPersonales = ({ l, fields, profile }) => {
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
            titleId={l("SignUpForm.label.gender")}
            descrId={l("SignUpForm.help.pleaseSelect")}
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

const DateField = ({
  l,
  field,
  titleId,
  dateFormat = "dd/MM/yyyy",
  ...attrs
}) => {
  return (
    <div>
      <label className={classnames("label", styles.form__label)}>
        {parse(l(titleId))}
      </label>
      <div className={classnames("is-small", styles.field__description)}>
        Formato correcto: {dateFormat}
      </div>
      <div className={classnames("control")}>
        <DatePicker
          className={classnames(
            "input",
            "input__datepicker",
            styles.field__datepicker,
            Boolean(field.error) ? styles.is_danger : null
          )}
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          selected={field.value ? new Date(field.value) : null}
          onChange={(date) => field.onChange(date.toISOString())}
          dateFormat={dateFormat}
          {...attrs}
        />
      </div>
      {field.error && <span className="help is-danger">{field.error}</span>}
    </div>
  );
};

const ToS = ({ l, field }) => {
  return (
    <div className={classnames("control", styles.form__input)}>
      <input type="checkbox" {...f(field)} className={styles.form__checkbox} />
      <FormattedMessage
        id="SignUpForm.acceptTermsOfUse"
        values={{
          termsOfUseLink: <a>{l("SignUpForm.termsOfUse")}</a>,
        }}
      />
    </div>
  );
};

SignUpForm.propTypes = {};

export default injectIntl(
  reduxForm({
    form: "signUpForm",
    fields: ReduxFormFields,
  })(compose(APIDataContainer, ModalContainer)(SignUpForm))
);
