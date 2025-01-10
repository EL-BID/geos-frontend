import React, { useEffect } from "react";
import { isEmpty } from "lodash";
import styles from "../../../signup.styl";

//Form Elements
import SelectField from "../FormElements/SelectField";

//Helpers

const DatosLaborables = ({
  l,
  fields,
  apiData,
  fetchCountries,
  fetchProvinces,
  fetchStates,
  fetchCities,
  fetchSchools,
}) => {
  //OnMount
  useEffect(() => {
    //Fetch countries
    if (isEmpty(apiData.countries)) {
      fetchCountries();
    }
  }, []);

  //Watcher: provinces
  useEffect(() => {
    const idCountry = fields.country_id.value;
    if (!isEmpty(idCountry)) {
      fetchProvinces(idCountry);
    }
  }, [fields.country_id]);

  //Watcher: states
  useEffect(() => {
    const idCountry = fields.country_id.value;
    const idProvince = fields.province_id.value;
    if (!isEmpty(idCountry) && !isEmpty(idProvince)) {
      fetchStates(idCountry, idProvince);
    }
  }, [fields.province_id]);

  //Watcher: cities
  useEffect(() => {
    const idCountry = fields.country_id.value;
    const idProvince = fields.province_id.value;
    const idState = fields.state_id.value;
    if (!isEmpty(idCountry) && !isEmpty(idProvince) && !isEmpty(idState)) {
      fetchCities(idCountry, idProvince, idState);
    }
  }, [fields.state_id]);

  //Watcher: schools
  useEffect(() => {
    const idCountry = fields.country_id.value;
    const idProvince = fields.province_id.value;
    const idState = fields.state_id.value;
    const idCity = fields.city_id.value;
    if (
      !isEmpty(idCountry) &&
      !isEmpty(idProvince) &&
      !isEmpty(idState) &&
      !isEmpty(idCity)
    ) {
      fetchSchools(idCountry, idProvince, idState, idCity);
    }
  }, [fields.city_id]);

  const mapApiData = (data) =>
    data.map((c) => ({ id: c._id.$oid, label: c.name }));

  return (
    <div className="box">
      <h1 className={styles.title_section}>
        {l("SignUpForm.professionalsData")}
      </h1>
      <SelectField
        l={l}
        field={fields.country_id}
        options={mapApiData(apiData.countries)}
        titleId="SignUpForm.label.region"
        onChange={(e) => fields.country_id.onChange(e.target.value)}
      />
      <SelectField
        l={l}
        field={fields.province_id}
        options={mapApiData(apiData.provinces)}
        titleId="SignUpForm.label.province"
        onChange={(e) => fields.province_id.onChange(e.target.value)}
      />
      <SelectField
        l={l}
        field={fields.state_id}
        options={mapApiData(apiData.states)}
        titleId="SignUpForm.label.state"
        onChange={(e) => fields.state_id.onChange(e.target.value)}
      />
      <SelectField
        l={l}
        field={fields.city_id}
        options={mapApiData(apiData.cities)}
        titleId="SignUpForm.label.city"
        onChange={(e) => fields.city_id.onChange(e.target.value)}
      />
      <SelectField
        l={l}
        field={fields.school_id}
        options={mapApiData(apiData.schools)}
        titleId="SignUpForm.label.school"
        onChange={(e) => fields.school_id.onChange(e.target.value)}
      />
    </div>
  );
};

export default DatosLaborables;
