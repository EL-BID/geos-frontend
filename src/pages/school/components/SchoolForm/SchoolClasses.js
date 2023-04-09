import React from "react";
import classnames from "classnames";

import styles from "../../school.styl";
import SchollFormSchoolClassesFields from "./SchoolClassesFields";
import {
  FormattedMessage,
  FormattedHTMLMessage,
  injectIntl,
  intlShape,
} from "react-intl";
import parse from "html-react-parser";

const SchoolClasses = (props) => {
  const {
    //kindergarten,
    elementary_1,
    //elementary_2,
    highschool,
    technical,
    //adult,
    school_classe,
  } = props;

  const translate = (id) => {
    return props.intl.formatMessage({ id });
  };

  return (
    <div className="box">
      <div className="columns is-multiline">
        <div className="column is-full">
          <h1 className={styles.title_section}>
            {parse(translate("InfraStructureFormModal.educationLevel"))}
          </h1>
        </div>
        <div className="column is-full">
          <ul className={styles.checkbox_level_list}>
            
            <li className={styles.checkbox_level}>
              <input id="elementary_1" type="checkbox" {...elementary_1} />
              <label htmlFor="elementary_1">
                {parse(translate("InfraStructureFormModal.elementary_1"))}
              </label>
            </li>
            
            <li className={styles.checkbox_level}>
              <input id="highschool" type="checkbox" {...highschool} />
              <label htmlFor="highschool">
                {parse(translate("InfraStructureFormModal.highschool"))}
              </label>
            </li>
            <li className={styles.checkbox_level}>
              <input id="technical" type="checkbox" {...technical} />
              <label htmlFor="technical">
                {parse(translate("InfraStructureFormModal.technical"))}
              </label>
            </li>
            
          </ul>
        </div>
      </div>
      <div className="table-container">
        <table className={classnames("table is-fullwidth", styles.level_table)}>
          <thead>
            <tr>
              <th>{parse(translate("InfraStructureFormModal.level"))}</th>
              <th>{parse(translate("InfraStructureFormModal.period"))}</th>
              <th>
                {parse(translate("InfraStructureFormModal.classesNumber"))}
              </th>
              <th>
                {parse(translate("InfraStructureFormModal.studentNumber"))}
              </th>
              <th>
                {parse(
                  translate(
                    "InfraStructureFormModal.numberOfStudentsInTheLargestClass"
                  )
                )}
              </th>
            </tr>
          </thead>
          
          {elementary_1.value && (
            <SchollFormSchoolClassesFields
              title={translate("InfraStructureFormModal.elementary_1")}
              {...school_classe.elementary_1}
            />
          )}
          
          {highschool.value && (
            <SchollFormSchoolClassesFields
              title={translate("InfraStructureFormModal.highschool")}
              {...school_classe.highschool}
            />
          )}
          {technical.value && (
            <SchollFormSchoolClassesFields
              title={translate("InfraStructureFormModal.technical")}
              {...school_classe.technical}
            />
          )}
          
        </table>
      </div>
    </div>
  );
};

export default injectIntl(SchoolClasses);
