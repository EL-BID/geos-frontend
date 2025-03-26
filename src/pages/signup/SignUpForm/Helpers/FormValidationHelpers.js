import {
  UserModel,
  TeacherDataModel,
  PrincipalDataModel,
} from "~/models/Users";
import { isEmpty, toString, isNumber, isArray } from "lodash";

export const validateModel = (userModel, fields, DEFAULT_BDATE) => {
  let errors = [];

  const { share_personal_data, share_work_data, profile } = userModel;
  const isTeacher = profile === "teacher";

  //Check basic data required fields
  if (share_personal_data) {
    //Required fields for all profiles
    let requiredFields = ["name"];

    //These only required for teachers
    if (isTeacher) {
      requiredFields.push("born");
      requiredFields.push("gender");
    }

    const allFieldsFilled = requiredFields.reduce((acc, key) => {
      const value = userModel[key];
      return acc && !isEmpty(value);
    }, true);
    if (!allFieldsFilled) {
      errors.push(`personalDataRequired`);
    }

    //Check user is at least 18yo
    if (!isEmpty(userModel.born)) {
      const birthDate = new Date(userModel.born);
      const ageDiff = new Date(Date.now() - birthDate.getTime());
      const age = Math.abs(ageDiff.getUTCFullYear() - 1970);
      if (age < 18) {
        errors.push("born");
      }
    }
  }

  //Check Datos Laborables
  if (share_work_data) {
    //Required fields for all profiles
    let requiredFields = [
      //"country_id",
      //"province_id",
      //"state_id",
      "city_id",
      "school_id",
    ];

    //These only required for teachers
    if (isTeacher) {
      requiredFields.push("stages");
      requiredFields.push("knowledges");
    }

    const allFieldsFilled = requiredFields.reduce((acc, key) => {
      const value = userModel[key];
      return acc && !isEmpty(value);
    }, true);
    if (!allFieldsFilled) {
      errors.push(`workDataRequired`);
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
    errors.push(`profileDataRequired`);
  }

  //Check if the email is valid
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userModel.email)) {
    errors.push(`email`);
  }

  //check if emails match
  if (userModel.email !== fields.emailConfirm.value) {
    errors.push(`emailConfirm`);
  }

  //Check if passwords match
  if (userModel.password !== fields.passwordConfirm.value) {
    errors.push(`passwordConfirm`);
  }

  //Check password is at least 6 chars long
  if (userModel.password.length < 6) {
    errors.push(`password`);
  }

  //Check ToS are accepted
  if (!userModel.tos) {
    errors.push(`tos`);
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
