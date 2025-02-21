import { UserModel, TeacherDataModel, PrincipalDataModel } from "../Models";
import { concat, isEmpty, keys, toString, isNumber, isArray } from "lodash";

export const validateModel = (userModel, fields, DEFAULT_BDATE) => {
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
      errors.push(`SignUpForm.errors.personalDataRequired`);
    }

    //Alert the user is born date was not set
    if (userModel.born === DEFAULT_BDATE.toISOString()) {
      errors.push("SignUpForm.errors.born");
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
      "stages",
      "knowledges",
    ];
    const allFieldsFilled = requiredFields.reduce((acc, key) => {
      const value = userModel[key];
      return acc && !isEmpty(value);
    }, true);
    if (!allFieldsFilled) {
      errors.push(`SignUpForm.errors.workDataRequired`);
    }
  }

  //Check user type fields
  let allFieldsFilled = true;
  if (profile === "teacher") {
    let notRequiredFields = [];

    //Exception: years_using_tech == "no" means tech_application is not required
    if (userModel.teacher_data.years_using_tech === "no") {
      notRequiredFields.push("tech_application");
    }

    allFieldsFilled = TeacherDataModel.filter(
      (key) => !notRequiredFields.includes(key)
    ).reduce((acc, key) => {
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
    errors.push(`SignUpForm.errors.profileDataRequired`);
  }

  //Check if the email is valid
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userModel.email)) {
    errors.push(`SignUpForm.errors.email`);
  }

  //check if emails match
  if (userModel.email !== fields.emailConfirm.value) {
    errors.push(`SignUpForm.errors.emailConfirm`);
  }

  //Check if passwords match
  if (userModel.password !== fields.passwordConfirm.value) {
    errors.push(`SignUpForm.errors.passwordConfirm`);
  }

  //Check password is at least 6 chars long
  if (userModel.password.length < 6) {
    errors.push(`SignUpForm.errors.password`);
  }

  //Check ToS are accepted
  if (!userModel.tos) {
    errors.push(`SignUpForm.errors.tos`);
  }

  return errors;
};

//Helper function to transform ReduxForm fields to array [key, value]
export const reduxFormModelToUserModelConverter = (fields) => {
  const user = {};

  //Map basic model fields to user object
  UserModel.map((key) => {
    const value = fields[key].value;
    if (isNumber(value)) {
      user[key] = toString(value);
    } else if (isArray(value)) {
      user[key] = value.map((v) => v.value);
    } else {
      user[key] = value;
    }
  });

  //If profile is teacher, add teacher_data
  if (user.profile === "teacher") {
    user.teacher_data = {};
    TeacherDataModel.map((key) => {
      const value = fields[key].value;
      if (isNumber(value)) {
        user.teacher_data[key] = toString(value);
      } else if (isArray(value)) {
        user.teacher_data[key] = value.map((v) => v.value);
      } else {
        user.teacher_data[key] = value;
      }
    });

    //Special case: years_using_tech == "no" means tech_application is empty
    if (user.teacher_data.years_using_tech === "no") {
      user.teacher_data.tech_application = [];
    }
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
