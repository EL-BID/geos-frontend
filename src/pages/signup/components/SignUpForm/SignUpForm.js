import React from "react";
import { reduxForm } from "redux-form";
import { compose } from "redux";
import "url-search-params-polyfill";
import { concat, isEmpty, keys } from "lodash";
import classnames from "classnames";
import API from "~/api";
import { injectIntl } from "react-intl";
import parse from "html-react-parser";
import { UserModel, TeacherDataModel, PrincipalDataModel } from "./Models";
import styles from "../../signup.styl";

//Form Sections
import DatosBasicos from "./FormSections/DatosBasicos";
import DatosLaborables from "./FormSections/DatosLaborables";
import ToS from "./FormSections/ToS";
import Teacher from "./FormSections/Teacher";
import Principal from "./FormSections/Principal";

// Components
import SubmitBtn from "~/components/SubmitBtn";

import ModalContainer from "~/containers/modal";
import APIDataContainer from "~/containers/api_data";

const d = console.log;
const j = (m) => JSON.stringify(m, null, 4);

const ReduxFormFields = concat(
  UserModel,
  TeacherDataModel,
  PrincipalDataModel,
  //Add view-model properties
  ["emailConfirm", "passwordConfirm"]
);

const saveUser = (userModel) => {
  const noLogin = true;
  const noaff = false;
  return API.Users.create(userModel, noLogin, noaff);
};

//Helper function to transform ReduxForm fields to array [key, value]

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

  const onSubmit = (e) => {
    e.preventDefault();
    const userModel = reduxFormModelToUserModelConverter(fields);
    const errors = validateModel(userModel, fields, l);

    if (!isEmpty(errors)) {
      const errs = errors.map((err) => `- ${err}`).join("\n");
      return alert(`${l("SignUpForm.errors.found")}:\n${errs}`);
    }

    d("SAVING userModel", userModel);

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
      <DatosBasicos l={l} fields={fields} profile={profile} />
      <DatosLaborables
        l={l}
        fields={fields}
        apiData={apiData}
        fetchCountries={fetchCountries}
        fetchProvinces={fetchProvinces}
        fetchStates={fetchStates}
        fetchCities={fetchCities}
        fetchSchools={fetchSchools}
      />
      {profile === "teacher" ? (
        <Teacher l={l} fields={fields} />
      ) : profile === "principal" ? (
        <Principal l={l} fields={fields} />
      ) : null}
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

SignUpForm.propTypes = {};

export default injectIntl(
  reduxForm({
    form: "signUpForm",
    fields: ReduxFormFields,
  })(compose(APIDataContainer, ModalContainer)(SignUpForm))
);
