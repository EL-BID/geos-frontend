import React, { useEffect } from "react";
import { reduxForm } from "redux-form";
import { compose } from "redux";
import { concat, isEmpty, keys } from "lodash";
import classnames from "classnames";
import API from "~/api";
import { injectIntl } from "react-intl";
import parse from "html-react-parser";
import { UserModel, TeacherDataModel, PrincipalDataModel } from "./Models";
import "url-search-params-polyfill";

//Containers
import ModalContainer from "~/containers/modal";
import APIDataContainer from "~/containers/api_data";

//Form Sections
import DatosBasicos from "./FormSections/DatosBasicos";
import DatosLaborables from "./FormSections/DatosLaborables";
import DatosLogin from "./FormSections/DatosLogin";
import ToS from "./FormSections/ToS";
import Teacher from "./FormSections/Teacher";
import Principal from "./FormSections/Principal";

// Components
import SubmitBtn from "~/components/SubmitBtn";

//Helpers
import {
  validateModel,
  reduxFormModelToUserModelConverter,
} from "./Helpers/FormValidationHelpers";

const d = console.log;
const j = (m) => JSON.stringify(m, null, 4);

const DEFAULT_BDATE = new Date(new Date().getFullYear() - 18, 0, 1);

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

const SignUpForm = ({
  intl,
  fields,
  submitting,
  styles,
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
    //Set default values for all fields
    setFieldsDefaultValues(fields, profile);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const userModel = reduxFormModelToUserModelConverter(fields);
    const errors = validateModel(userModel, fields, DEFAULT_BDATE, l);

    if (!isEmpty(errors)) {
      const errs = errors.map((err) => `- ${l(err)}`).join("\n");
      return alert(`${l("SignUpForm.errors.found")}:\n${errs}`);
    }

    d("SAVING userModel", j(userModel));

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
        alert(l(`SignUpForm.success`));
        window.location = "/listar-usuario/professores";
      }
    });
  };

  return (
    <form className={styles.form} onSubmit={onSubmit} id="SignUpForm">
      <DatosBasicos l={l} styles={styles} fields={fields} profile={profile} />
      <DatosLaborables
        l={l}
        styles={styles}
        fields={fields}
        apiData={apiData}
        fetchCountries={fetchCountries}
        fetchProvinces={fetchProvinces}
        fetchStates={fetchStates}
        fetchCities={fetchCities}
        fetchSchools={fetchSchools}
      />
      {profile === "teacher" ? (
        <Teacher l={l} fields={fields} styles={styles} />
      ) : profile === "principal" ? (
        <Principal l={l} fields={fields} styles={styles} />
      ) : null}
      <DatosLogin l={l} styles={styles} fields={fields} />
      <ToS l={l} field={fields.tos} />
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

const setFieldsDefaultValues = (fields, profile) => {
  //Set default values for fields
  const defaultValues = {
    share_personal_data: true,
    share_work_data: true,
    tos: false,
    profile,
  };

  //Default born value to today minus 18 years
  if (isEmpty(fields.born.value)) {
    //const today = new Date();
    //const year = today.getFullYear() - 18;
    //const month = today.getMonth();
    //const day = today.getDate();
    //const isoDate = new Date(year, month, day).toISOString();
    //// fields.born.onChange(isoDate);
    defaultValues.born = DEFAULT_BDATE.toISOString();
  }

  for (const key in fields) {
    const value = fields[key].value;
    if (isEmpty(value)) {
      fields[key].onChange(defaultValues[key]);
    }
  }
};

SignUpForm.propTypes = {};

export default injectIntl(
  reduxForm({
    form: "signUpForm",
    fields: ReduxFormFields,
  })(compose(APIDataContainer, ModalContainer)(SignUpForm))
);
