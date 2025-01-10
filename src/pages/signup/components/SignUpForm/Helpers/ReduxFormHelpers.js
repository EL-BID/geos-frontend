import { concat, isEmpty, keys } from "lodash";

//Helper for destructuring ReduxForm fields
const fieldDestruture = ({ value, onChange, checked, name, error }) => ({
  value,
  onChange,
  checked,
  name,
  error,
});

const fieldsToArray = (fields) => keys(fields).map((k) => [k, fields[k].value]);

module.exports = {
  fieldDestruture,
  fieldsToArray,
};
