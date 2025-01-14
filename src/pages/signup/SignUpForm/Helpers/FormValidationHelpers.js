import { UserModel, TeacherDataModel, PrincipalDataModel } from "../Models";
import { isEmpty } from "lodash";

export const validateModel = (userModel, fields, l) => {
  let errors = [];

  const { share_personal_data, share_work_data, profile } = userModel;

  //Check basic data required fields
  if (share_personal_data) {
    const requiredFields = ["name", "born", "gender"];
    const allFieldsFilled = requiredFields.reduce((acc, key) => {
      const value = userModel[key];
      return acc && !isEmpty(value);
    }, true);
    if (!allFieldsFilled) {
      errors.push(l(`SignUpForm.errors.personalDataRequired`));
    }
  }

  //Check Datos Laborables
  if (share_work_data) {
    const requiredFields = [
      "country_id",
      "province_id",
      "state_id",
      "city_id",
      "school_id",
    ];
    const allFieldsFilled = requiredFields.reduce((acc, key) => {
      const value = userModel[key];
      return acc && !isEmpty(value);
    }, true);
    if (!allFieldsFilled) {
      errors.push(l(`SignUpForm.errors.workDataRequired`));
    }
  }

  //Check user type fields
  let allFieldsFilled = true;
  if (profile === "teacher") {
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
    errors.push(l(`SignUpForm.errors.profileDataRequired`));
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
  if (!userModel.tos) {
    errors.push(l(`SignUpForm.errors.tos`));
  }

  return errors;
};
