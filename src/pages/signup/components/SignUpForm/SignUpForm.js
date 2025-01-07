import React from "react";
import { reduxForm } from "redux-form";
import { compose } from "redux";
import "url-search-params-polyfill";
import { isEmpty, keys } from "lodash";
import classnames from "classnames";
import API from "~/api";
import { FormattedMessage, injectIntl } from "react-intl";
import parse from "html-react-parser";

// Components
import Field from "~/components/Form/Field";
import SubmitBtn from "~/components/SubmitBtn";

import ModalContainer from "~/containers/modal";

import styles from "../../signup.styl";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
const regex = new RegExp("^([A-zÀ-ú \\- \\/ \\( \\) ])+$");

const d = console.log;
const j = (m) => JSON.stringify(m, null, 4);

const FieldNames = {
  name: "Nombre",
  password: "Contrasena",
  born: "Fecha de nacimiento",
  gender: "Género",
  email: "Correo electrónico",
};

const UserModel = {
  profile: "teacher",
  name: "John Doe",
  password: null,
  email: null,
  born: "1985-05-15",
  gender: null,
  term: null,
  initial_formation: null,
  technology_in_teaching_and_learning: null,
  formation_level: {
    value: null,
    label: null,
    isDisabled: false,
  },
  term: false,
  teacher_data: {
    formation_level: null,
    cont_educ_in_the_use_of_digital_technologies: null,
    years_teaching: null,
    years_of_uses_technology_for_teaching: null,
    technology_application: [],
    cargo_docente: null,
    grado_docente: null,
  },
};

const UserModelTest = {
  profile: "teacher",
  name: "Jane Doe",
  password: "securePassword123",
  email: "janedoe@example.com",
  born: "1985-05-15",
  gender: "female",
  term: true,
  initial_formation: "Bachelor's Degree in Education",
  technology_in_teaching_and_learning: "Advanced",
  formation_level: {
    value: "Master's Degree",
    label: "Master's Degree",
    isDisabled: false,
  },
  term: true,
  teacher_data: {
    formation_level: "PhD",
    cont_educ_in_the_use_of_digital_technologies: "Yes",
    years_teaching: 10,
    years_of_uses_technology_for_teaching: 8,
    technology_application: [],
    cargo_docente: "Senior Lecturer",
    grado_docente: "PhD",
  },
};

const ReduxFormFields = [
  "name",
  "password",
  "passwordConfirm",
  "email",
  "emailConfirm",
  "born",
  "gender",
  "term",
  "initial_formation",
  "technology_in_teaching_and_learning",
  "term",
  "formation_level",
  "cont_educ_in_the_use_of_digital_technologies",
  "years_teaching",
  "years_of_uses_technology_for_teaching",
  "cargo_docente",
  "grado_docente",
];

const saveUser = (fields) => {
  //Convert from ReduxFormFields to UserModel
  const userModel = reduxFormModelToUserModelConverter(fields);

  const noLogin = true;
  const noaff = true;
  return API.Users.create(userModel, noLogin, noaff);
};

const GenderOptns = [
  { id: "Masculino", label: "Masculino" },
  { id: "Femenino", label: "Femenino" },
  { id: "Otro", label: "Otro" },
  { id: "Prefiero no decirlo", label: "Prefiero no decirlo" },
];

const FormationLevelsOptns = [
  { id: "Bachiller", label: "Bachiller" },
  {
    id: "Egresado de formación docente",
    label: "Egresado de formación docente",
  },
  { id: "Licenciatura de grado", label: "Licenciatura de grado" },
  { id: "Curso de posgrado", label: "Curso de posgrado" },
  { id: "Maestría", label: "Maestría" },
  { id: "Doctorado", label: "Doctorado" },
];

const InitialFormationOptns = [
  { id: "Maestro de Primera Infancia", label: "Maestro de Primera Infancia" },
  {
    id: "Maestro de Educación Primaria",
    label: "Maestro de Educación Primaria",
  },
  { id: "Profesor de Educación Media", label: "Profesor de Educación Media" },
  { id: "Maestro / Profesor Técnico", label: "Maestro / Profesor Técnico" },
  { id: "Otro", label: "Otro" },
];

const CourseModalityOptns = [
  { id: "Presencial", label: "Presencial" },
  { id: "Online", label: "Online" },
  { id: "Ambas", label: "Ambas" },
  { id: "No", label: "No" },
];

const YesNoOptns = [
  { id: "Sí", label: "Sí" },
  { id: "No", label: "No" },
];

const YearsOptns = [
  { id: "Entre 1 y 3", label: "Entre 1 y 3" },
  { id: "Entre 4 y 6", label: "Entre 4 y 6" },
  { id: "Entre 7 y 9", label: "Entre 7 y 9" },
  { id: "Más de 10 años", label: "Más de 10 años" },
];

const CargoDocenteOptns = [
  { id: "Efectivo", label: "Efectivo" },
  { id: "Interino", label: "Interino" },
  { id: "Suplente", label: "Suplente" },
];

const OneToSevenOptns = [
  { id: "1", label: "1" },
  { id: "2", label: "2" },
  { id: "3", label: "3" },
  { id: "4", label: "4" },
  { id: "5", label: "5" },
  { id: "6", label: "6" },
  { id: "7", label: "7" },
];

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

const getFieldTranslatedName = (field) => FieldNames[field] || field;

const validateModel = (fields) => {
  let errors = [];

  const ignoreFields = ["term"];

  const allFilled = keys(fields)
    .filter((k) => !ignoreFields.includes(k))
    .reduce((acc, key) => {
      const value = fields[key].value;
      return acc && !isEmpty(value);
    }, true);

  if (!allFilled) {
    errors.push("Todos los campos son requeridos.");
  }

  //Check if the email is valid
  if (
    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(fields.email.value)
  ) {
    errors.push("El correo electrónico no es válido.");
  }

  //check if emails match
  if (fields.email.value !== fields.emailConfirm.value) {
    errors.push("Los correos electrónicos no coinciden.");
  }

  //Check if passwords match
  if (fields.password.value !== fields.passwordConfirm.value) {
    errors.push("Las contraseñas no coinciden.");
  }

  //Check password is at least 6 chars long
  if (fields.password.value.length < 6) {
    errors.push("La contraseña debe tener al menos 6 caracteres.");
  }

  //Check ToS are accepted
  if (!fields.term.value) {
    errors.push("Debes aceptar las Condiciones de uso de la Guía EduTec.");
  }

  return errors;
};

const reduxFormModelToUserModelConverter = (fields) => {
  const userModel = {
    profile: "teacher",
  };

  keys(fields).map((key) => {
    userModel[key] = fields[key].value;
  });

  //Remove view-model properties
  delete userModel.emailConfirm;
  delete userModel.passwordConfirm;

  //Convert formation_level to object
  userModel.formation_level = {
    value: userModel.formation_level,
    label: userModel.formation_level,
    isDisabled: false,
  };

  //Add teacher_data
  userModel.teacher_data = {
    formation_level: userModel.formation_level.value,
    cont_educ_in_the_use_of_digital_technologies:
      userModel.technology_in_teaching_and_learning,
    years_teaching: userModel.years_teaching,
    years_of_uses_technology_for_teaching:
      userModel.years_of_uses_technology_for_teaching,
    technology_application: [],
    cargo_docente: userModel.cargo_docente,
    grado_docente: userModel.grado_docente,
  };

  //Remove teacher_data fields from main object
  delete userModel.technology_in_teaching_and_learning;
  delete userModel.years_teaching;
  delete userModel.years_of_uses_technology_for_teaching;
  delete userModel.technology_application;
  delete userModel.cargo_docente;
  delete userModel.grado_docente;

  return userModel;
};

const SignUpForm = ({ intl, fields, submitting, handleSubmit }) => {
  const onSubmit = (e) => {
    e.preventDefault();

    const errors = validateModel(fields);

    if (!isEmpty(errors)) {
      const errs = errors.map((err) => `- ${err}`).join("\n");
      alert(`Se encontraron algunos errores:\n${errs}`);
      return;
    }

    return saveUser(fields).then((res) => {
      //Error
      if (isEmpty(res._id)) {
        let msg = keys(res)
          .map((key) => `- ${getFieldTranslatedName(key)}: ${res[key]}`)
          .join("\n");
        alert(`Se encontraron algunos errores:\n${msg}`);
      }
      //Success
      else {
        alert("Usuario creado con éxito");
        window.location = "/listar-usuario/professores";
      }
    });
  };

  //Helper for internationalization
  const l = (id) => intl.formatMessage({ id });

  return (
    <form className={styles.form} onSubmit={onSubmit} id="SignUpForm">
      <DatosPersonales l={l} fields={fields} />
      <Formacion l={l} fields={fields} />
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

const Formacion = ({ l, fields }) => {
  return (
    <div className="box">
      <h1 className={styles.title_section}>{l("SignUpForm.formation")}</h1>
      <SelectField
        l={l}
        field={fields.formation_level}
        titleId="¿Cuál es tu mayor nivel de estudios alcanzado?"
        options={FormationLevelsOptns}
      />
      <SelectField
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
      {/* TODO: field name needed */}
      <Field
        label="¿Cuál fue el año de conclusión de tu formación inicial docente?"
        classField="slim"
        description="Por favor, ingresa solo el año."
        {...f(fields.born)}
        type="number"
        min="1950"
        max={new Date().getFullYear()}
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
      />
    </div>
  );
};

const DatosPersonales = ({ l, fields }) => {
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

  return (
    <div className="box">
      <h1 className={styles.title_section}>{l("SignUpForm.personalData")}</h1>
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
            titleId="¿Con cuál género te identificas?"
            descrId="Por favor selecciona"
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
            description={"Debe contener al menos 6 caracteres"}
            type="password"
            classField="slim"
            {...f(fields.password)}
          />
        </div>
        <div className="column">
          <Field
            label={l("SignUpForm.label.confirmPassword")}
            description={"Repita la contraseña nuevamente"}
            type="password"
            classField="slim"
            {...f(fields.passwordConfirm)}
          />
        </div>
      </div>
    </div>
  );
};

const SelectField = ({ l, field, titleId, descrId, options }) => {
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
              <option key={id} value={l(id)}>
                {label}
              </option>
            ))}
          </select>
        </span>
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
      <i
        className={classnames("fas fa-calendar-alt", styles.field__calendar)}
      ></i>
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
          termsOfUseLink: (
            <a onClick={() => field.onChange(1)}>
              {"Términos y condiciones, y el Aviso de privacidad"}
            </a>
          ),
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
  })(compose(ModalContainer)(SignUpForm))
);
