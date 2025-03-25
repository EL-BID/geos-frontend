import React from "react";
import classnames from "classnames";
import parse from "html-react-parser";

import styles from "~/pages/signup/styles.styl";

//Helpers
import { fieldDestruture as f } from "../Helpers/ReduxFormHelpers";

const ToS = ({ l, field, onShowTos }) => {
  return (
    <div className={classnames("control", styles.form__input)}>
      <input type="checkbox" {...f(field)} className={styles.form__checkbox} />
      <span onClick={onShowTos}>
        {parse(
          l.acceptTermsOfUse.replace(
            "{termsOfUseLink}",
            `<a>${l.termsOfUse}</a>`
          )
        )}
      </span>
    </div>
  );
};

export default ToS;
