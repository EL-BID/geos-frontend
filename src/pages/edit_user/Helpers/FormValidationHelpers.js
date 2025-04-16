import { isEmpty } from "lodash";

export const validateModel = (userModel) => {
  let errors = [];

  const { name, born, gender, stages, knowledges, _profile } = userModel;
  const isTeacher = _profile === "teacher";

  //Required fields for all profiles
  let requiredFields = ["name"];

  //These only required for teachers
  if (isTeacher) {
    requiredFields.push("born");
    requiredFields.push("gender");
  }

  let allFieldsFilled = requiredFields.reduce((acc, key) => {
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

  //Check Datos Laborables (only teacher)
  if (isTeacher) {
    let requiredFields = ["stages", "knowledges"];

    const allFieldsFilled = requiredFields.reduce((acc, key) => {
      const value = userModel[key];
      return acc && !isEmpty(value);
    }, true);
    if (!allFieldsFilled) {
      errors.push(`workDataRequired`);
    }
  }

  return errors;
};
