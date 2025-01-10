import React from "react";
import classnames from "classnames";
import { FormattedMessage } from "react-intl";
import styles from "../../../signup.styl";

//Helpers
import { fieldDestruture as f } from "../Helpers/ReduxFormHelpers";

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

export default ToS;
