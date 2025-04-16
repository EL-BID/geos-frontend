import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import classnames from "classnames";

//Form Elements
import SelectField from "../FormElements/SelectField";
import SelectMultiField from "../FormElements/SelectMultiField";
import { StagesOptns, KnowledgesOptns } from "~/models/UserSignUpSelectOptions";

//Helpers
import { fieldDestruture as f } from "../Helpers/ReduxFormHelpers";

const d = console.log;
const j = (m) => JSON.stringify(m, null, 4);

const DatosLaborables = ({
  l,
  profile,
  fields,
  styles,
  apiData,
  fetchCountries,
  fetchProvinces,
  fetchStates,
  fetchCities,
  fetchSchools,
}) => {
  const [showFields, setShowFields] = useState(fields.share_work_data.value);
  const isTeacher = profile === "teacher";

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

  //Watcher: share checkbox
  useEffect(() => {
    setShowFields(fields.share_work_data.value);
  }, [fields.share_work_data]);

  return (
    <div className="box">
      <h1 className={styles.title_section}>{l.professionalsData}</h1>
      <label className={classnames("control is-block", styles.form__input)}>
        <input
          type="checkbox"
          {...f(fields.share_work_data)}
          className={styles.form__checkbox}
        />
        {l.withLink}
      </label>
      {showFields && (
        <Fields l={l} fields={fields} apiData={apiData} isTeacher={isTeacher} />
      )}
    </div>
  );
};

const Fields = ({ l, fields, apiData, isTeacher }) => {
  const mapApiData = (data = []) =>
    data.map((c) => ({ id: c._id.$oid, label: c.name }));

  const [knowledgesOptns, setKnowledgesOptns] = useState([]);

  //stages watcher
  useEffect(() => {
    const stages = (fields.stages.value || []).map(({ value, label }) => value);

    const knowledges = KnowledgesOptns(l)
      .filter((k) => stages.includes(k.stage))
      .map((k) => k.options);

    setKnowledgesOptns(knowledges.flat());
  }, [fields.stages]);

  return (
    <span>
      <SelectField
        l={l}
        field={fields.country_id}
        options={mapApiData(apiData.countries)}
        title={l.label.region}
        onChange={(e) => fields.country_id.onChange(e.target.value)}
      />
      <SelectField
        l={l}
        field={fields.province_id}
        options={mapApiData(apiData.provinces)}
        title={l.label.province}
        onChange={(e) => fields.province_id.onChange(e.target.value)}
      />
      <SelectField
        l={l}
        field={fields.state_id}
        options={mapApiData(apiData.states)}
        title={l.label.state}
        onChange={(e) => fields.state_id.onChange(e.target.value)}
      />
      <SelectField
        l={l}
        field={fields.city_id}
        options={mapApiData(apiData.cities)}
        title={l.label.city}
        onChange={(e) => fields.city_id.onChange(e.target.value)}
      />
      <SelectField
        l={l}
        field={fields.school_id}
        options={mapApiData(apiData.schools)}
        title={l.label.school}
        onChange={(e) => fields.school_id.onChange(e.target.value)}
      />
      {isTeacher && (
        <span>
          <hr />
          <SelectMultiField
            l={l}
            field={fields.stages}
            title={l.label.stages}
            options={StagesOptns(l)}
          />
          <SelectMultiField
            l={l}
            field={fields.knowledges}
            title={l.label.knowledges}
            options={knowledgesOptns}
          />
          <br />
        </span>
      )}
    </span>
  );
};

export default DatosLaborables;
