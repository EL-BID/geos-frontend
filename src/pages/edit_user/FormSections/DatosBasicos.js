import React from "react";

// Components
import Field from "~/components/Form/Field";
import DateField from "../FormElements/Date";
import SelectField from "../FormElements/Select";

export default ({ l, user, onChange }) => {
  const isTeacher = user._profile === "teacher";

  return (
    <div className="box">
      <h2 className="title is-size-5">{l.personal_data}</h2>
      <Field
        label={l.label.name}
        description={l.help.name}
        classField="slim"
        value={user.name}
        onChange={onChange}
      />
      {isTeacher && (
        <TeacherFieldsBasic l={l} user={user} onChange={onChange} />
      )}
    </div>
  );
};

const TeacherFieldsBasic = ({ l, user, onChange }) => {
  const { born } = user;
  return (
    <div className="columns" style={{ marginBottom: 0, marginTop: 0 }}>
      <div className="column">
        <DateField
          l={l}
          field={{
            selected: born ? new Date(born) : null,
            onChange,
          }}
          name="born"
          title={l.label.born}
          maxDate={new Date()}
          minDate={new Date(1900, 0, 1)}
        />
      </div>
      <div className="column">
        <SelectField
          l={l}
          field={{
            value: user.gender,
            onChange,
          }}
          title={l.label.gender}
          descr={l.help.gender}
          placeholder={l.ui.select.placeholder}
          options={[]}
        />
      </div>
    </div>
  );
};
