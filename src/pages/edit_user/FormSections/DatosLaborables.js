import React from "react";

// Components
import Field from "~/components/Form/Field";
import DateField from "../FormElements/Date";
import SelectField from "../FormElements/Select";

export default ({ l, user, onChange }) => {
  const isTeacher = user._profile === "teacher";

  return (
    <div className="box">
      <h2 className="title is-size-5">{l.laboral_data}</h2>
      <Field
        label={l.label.name}
        description={l.help.name}
        classField="slim"
        value={user.name}
        onChange={onChange}
      />
    </div>
  );
};
