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
} from "~/models/UserSignUpSelectOptions";

//Form Elements
import SelectField from "../FormElements/SelectField";
import SelectMultiField from "../FormElements/SelectMultiField";

//Helpers
import { fieldDestruture as f } from "../Helpers/ReduxFormHelpers";

// Components
import Field from "~/components/Form/Field";

const d = console.log;
const j = (m) => JSON.stringify(m, null, 4);

const Teacher = ({ l, fields, styles }) => {
  const [showTechApplication, setShowTechApplication] = React.useState(true);

  const YesNoOptns = [
    {
      id: "yes",
      label: l.yes,
    },
    {
      id: "no",
      label: l.no,
    },
  ];

  useEffect(() => {
    setShowTechApplication(fields.years_using_tech.value !== "no");
  }, [fields.years_using_tech]);

  return (
    <div className="box">
      <h1 className={styles.title_section}>{l.formation}</h1>
      <SelectField
        l={l}
        field={fields.formation_level}
        title={l.label.formation_level}
        options={FormationLevelsOptns(l)}
      />
      <SelectField
        l={l}
        field={fields.initial_formation}
        title={l.label.initial_formation}
        options={InitialFormationOptns(l)}
      />
      <Field
        label={l.label.year_finished_formation}
        classField="slim"
        description={l.help.year_finished_formation}
        {...f(fields.year_finished_formation)}
        type="number"
        min="1950"
        max={new Date().getFullYear()}
      />
      <SelectField
        l={l}
        field={fields.internship_practice}
        title={l.label.internship_practice}
        options={InternshipPracticeOptns(l)}
      />
      <Field
        label={l.label.institution_initial_formation}
        classField="slim"
        {...f(fields.institution_initial_formation)}
      />
      <SelectField
        l={l}
        field={fields.tech_in_teaching}
        title={l.label.tech_in_teaching}
        options={YesNoOptns}
      />
      <SelectField
        l={l}
        field={fields.course_modality}
        title={l.label.course_modality}
        options={CourseModalityOptns(l)}
      />
      <SelectField
        l={l}
        field={fields.formation_in_tech}
        title={l.label.formation_in_tech}
        options={FormationInTechOptns(l)}
      />
      <SelectField
        l={l}
        field={fields.years_teaching}
        title={l.label.years_teaching}
        options={YearsTeachingOptns(l)}
      />
      <SelectField
        l={l}
        field={fields.years_using_tech}
        title={l.label.years_using_tech}
        options={YearsUsingTechOptns(l)}
      />
      {showTechApplication && (
        <SelectMultiField
          l={l}
          field={fields.tech_application}
          title={l.label.tech_application}
          options={TechApplicationOptns(l)}
        />
      )}
    </div>
  );
};

export default Teacher;
