import classnames from "classnames";
import parse from "html-react-parser";
import { concat, isEmpty, keys } from "lodash";
import styles from "../../../signup.styl";

class SelectField extends React.Component {
  render() {
    const { l, f, field, titleId, descrId = null, options } = this.props;
    return (
      <div>
        <h4>SELECT FIELD!!!1</h4>
        {/* <label className={classnames("label", styles.form__label)}>
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
                <option key={id} value={id}>
                  {l(label)}
                </option>
              ))}
            </select>
          </span>
        </div> */}
      </div>
    );
  }
}

export default SelectField;
