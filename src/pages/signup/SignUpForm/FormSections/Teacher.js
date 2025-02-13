import React, { useEffect } from "react";
import {
  FormationLevelsOptns,
  InitialFormationOptns,
  InternshipPracticeOptns,
  CourseModalityOptns,
  FormationInTechOptns,
  YearsTeachingOptns,
  YearsUsingTechOptns,
  TechApplicationOptns,
} from "../SelectsOptions";

//Form Elements
import SelectField from "../FormElements/SelectField";
import SelectMultiField from "../FormElements/SelectMultiField";

//Helpers
import { fieldDestruture as f } from "../Helpers/ReduxFormHelpers";

// Components
import Field from "~/components/Form/Field";

const d = console.log;
const j = (m) => JSON.stringify(m, null, 4);

const YesNoOptns = [
  {
    id: "yes",
    label: `SignUpForm.yes`,
  },
  {
    id: "no",
    label: `SignUpForm.no`,
  },
];

const Teacher = ({ l, fields, styles }) => {
  const [showTechApplication, setShowTechApplication] = React.useState(true);

  useEffect(() => {
    setShowTechApplication(fields.years_using_tech.value !== "no");
  }, [fields.years_using_tech]);

  return (
    <div className="box">
      <h1 className={styles.title_section}>{l("SignUpForm.formation")}</h1>
      <SelectField
        l={l}
        field={fields.formation_level}
        titleId="SignUpForm.label.formation_level"
        options={FormationLevelsOptns}
      />
      <SelectField
        l={l}
        field={fields.initial_formation}
        titleId="SignUpForm.label.initial_formation"
        options={InitialFormationOptns}
      />
      <Field
        label={l(`SignUpForm.label.year_finished_formation`)}
        classField="slim"
        description={l(`SignUpForm.help.year_finished_formation`)}
        {...f(fields.year_finished_formation)}
        type="number"
        min="1950"
        max={new Date().getFullYear()}
      />
      <SelectField
        l={l}
        field={fields.internship_practice}
        titleId="SignUpForm.label.internship_practice"
        options={InternshipPracticeOptns}
      />
      <Field
        label={l(`SignUpForm.label.institution_initial_formation`)}
        classField="slim"
        {...f(fields.institution_initial_formation)}
      />
      <SelectField
        l={l}
        field={fields.tech_in_teaching}
        titleId="SignUpForm.label.tech_in_teaching"
        options={YesNoOptns}
      />
      <SelectField
        l={l}
        field={fields.course_modality}
        titleId="SignUpForm.label.course_modality"
        options={CourseModalityOptns}
      />
      <SelectField
        l={l}
        field={fields.formation_in_tech}
        titleId="SignUpForm.label.formation_in_tech"
        options={FormationInTechOptns}
      />
      <SelectField
        l={l}
        field={fields.years_teaching}
        titleId="SignUpForm.label.years_teaching"
        options={YearsTeachingOptns}
      />
      <SelectField
        l={l}
        field={fields.years_using_tech}
        titleId="SignUpForm.label.years_using_tech"
        options={YearsUsingTechOptns}
      />
      {showTechApplication && (
        <SelectMultiField
          l={l}
          field={fields.tech_application}
          titleId="SignUpForm.label.tech_application"
          options={TechApplicationOptns}
        />
      )}
    </div>
  );
};

export default Teacher;
