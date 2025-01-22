import React from "react";
import APIDataContainer from "~/containers/api_data";
import AccountsContainer from "~/containers/accounts";
import NonUserRedir from "~/containers/non_user_redir";
import { injectIntl } from "react-intl";
import styles from "./styles.styl";
import classnames from "classnames";

const d = console.log;
const j = (m) => JSON.stringify(m, null, 4);

const Form = ({ l, survey }) => {
  d("Form survey", survey);
  const { id, schedule: schedules } = survey;
  const schedule = schedules[0];
  const { survey_name } = schedule;

  return (
    <FormWrap>
      <h1 className="title">{survey_name}</h1>
    </FormWrap>
  );
};

const FormWrap = ({ children }) => {
  return (
    <form id="questionForm">
      <div className={classnames("section", styles.section_questions)}>
        <div className="container mt-50">
          <div className="columns">
            <div className="column">{children}</div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default injectIntl(
  (APIDataContainer, AccountsContainer, NonUserRedir)(Form)
);
