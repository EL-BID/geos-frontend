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

const Teacher = ({ l, fields }) => {
  return (
    <div className="box">
      <h1 className={styles.title_section}>{l("SignUpForm.formation")}</h1>
      <SelectField
        l={l}
        field={fields.formation_level}
        titleId="¿Cuál es tu mayor nivel de estudios alcanzado?"
        options={FormationLevelsOptns}
      />
      <Field
        label="¿Cuál fue el año de conclusión de tu formación inicial docente?"
        classField="slim"
        description="Por favor, ingresa solo el año."
        {...f(fields.year_finished_formation)}
        type="number"
        min="1950"
        max={new Date().getFullYear()}
      />
      {/* <SelectField
		  l={l}
		  field={fields.initial_formation}
		  titleId="Tu formación inicial docente fue en"
		  options={InitialFormationOptns}
		/>
		<SelectField
		  l={l}
		  field={fields.technology_in_teaching_and_learning}
		  titleId="¿Has tenido alguna disciplina o contenido para el uso de la tecnología en la enseñanza y el aprendizaje en tu formación inicial docente?"
		  options={YesNoOptns}
		/>
		<SelectField
		  l={l}
		  field={fields.cont_educ_in_the_use_of_digital_technologies}
		  titleId="¿Has participado de formaciones en servicio para el uso de tecnologías digitales en los procesos de enseñanza y de aprendizaje en los últimos 2 años?"
		  options={CourseModalityOptns}
		/>
		<SelectField
		  l={l}
		  field={fields.years_teaching}
		  titleId="¿Cuántos años llevas enseñando?"
		  options={YearsOptns}
		/>
		<SelectField
		  l={l}
		  field={fields.cargo_docente}
		  titleId="¿Cuál es tu tipo de cargo docente?"
		  options={CargoDocenteOptns}
		/>
		<SelectField
		  l={l}
		  field={fields.grado_docente}
		  titleId="¿Cuál es tu grado docente?"
		  options={OneToSevenOptns}
		/>
		<SelectField
		  l={l}
		  field={fields.years_of_uses_technology_for_teaching}
		  titleId="¿Hace cuántos años usas tecnología en los procesos de enseñanza y aprendizaje?"
		  options={YearsOptns}
		/> */}
    </div>
  );
};

export default Teacher;
