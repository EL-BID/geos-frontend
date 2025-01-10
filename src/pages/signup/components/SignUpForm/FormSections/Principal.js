import React from "react";
import { FormationLevelsOptns } from "../SelectsOptions";
import styles from "../../../signup.styl";

//Form Elements
import SelectField from "../FormElements/SelectField";

//Form Sections

//Helpers
import { fieldDestruture as f } from "../Helpers/ReduxFormHelpers";

// Components
import Field from "~/components/Form/Field";

const Principal = ({ l, fields }) => {
  return (
    <div className="box">
      <h1 className={styles.title_section}>{l("SignUpForm.formation")}</h1>
    </div>
  );
};

export default Principal;
