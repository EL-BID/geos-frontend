import React from "react";
import { FormationLevelsOptns } from "../SelectsOptions";

//Form Elements
import SelectField from "../FormElements/SelectField";

//Form Sections

//Helpers
import { fieldDestruture as f } from "../Helpers/ReduxFormHelpers";

// Components
import Field from "~/components/Form/Field";

const Principal = ({ l, fields, styles }) => {
  return (
    <div className="box">
      <h1 className={styles.title_section}>{l("SignUpForm.formation")}</h1>
    </div>
  );
};

export default Principal;
