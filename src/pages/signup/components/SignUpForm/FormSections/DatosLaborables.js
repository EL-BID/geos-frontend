import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import parse from "html-react-parser";
import { concat, isEmpty, keys } from "lodash";
import styles from "../../../signup.styl";

//Form Elements
import Test from "../FormElements/Test";

class DatosLaborables extends React.Component {
  render() {
    const { l, f, fields, apiData } = this.props;

    const mapApiData = (data) =>
      data.map((c) => ({ id: c._id.$oid, label: c.name }));

    return (
      <div className="box">
        <h1 className={styles.title_section}>
          {l("SignUpForm.professionalsData")}
        </h1>
        <SelectField
          l={l}
          field={fields.country}
          options={mapApiData(apiData.countries)}
          titleId={l("SignUpForm.label.region")}
          onChange={(e) => fields.country.onChange(e.target.value)}
        />
        {/* <SelectField
          l={l}
          field={fields.province}
          options={mapApiData(apiData.provinces)}
          titleId={l("SignUpForm.label.province")}
          onChange={(e) => fields.province.onChange(e.target.value)}
        />
        <SelectField
          l={l}
          field={fields.state}
          options={mapApiData(apiData.states)}
          titleId={l("SignUpForm.label.state")}
          onChange={(e) => fields.state.onChange(e.target.value)}
        />
        <SelectField
          l={l}
          field={fields.city}
          options={mapApiData(apiData.cities)}
          titleId={l("SignUpForm.label.city")}
          onChange={(e) => fields.city.onChange(e.target.value)}
        />
        <SelectField
          l={l}
          field={fields.school}
          options={mapApiData(apiData.schools)}
          titleId={l("SignUpForm.label.school")}
          onChange={(e) => fields.school.onChange(e.target.value)}
        /> */}
      </div>
    );
  }
}

// class DatosLaborables extends React.Component {
//   render() {
//     return <h1>TEST121212</h1>;
//   }
// }

// DatosLaborables.propTypes = {};

export default DatosLaborables;
