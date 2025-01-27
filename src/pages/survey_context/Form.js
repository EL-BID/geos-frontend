import React, { useMemo, useState } from "react";
import { injectIntl } from "react-intl";
import APIDataContainer from "~/containers/api_data";
import AccountsContainer from "~/containers/accounts";
import NonUserRedir from "~/containers/non_user_redir";
import styles from "./styles.styl";
import classnames from "classnames";

import Button from "~/components/Button";
import { pull, remove } from "lodash";

const d = console.log;
const j = (m) => JSON.stringify(m, null, 4);

const Form = ({
  l,
  survey,
  sections,
  questions,
  answer,
  questionsResponses,
  onSave,
}) => {
  const { id, schedule: schedules } = survey;
  const schedule = schedules[0];
  const { survey_name } = schedule;
  const [answers, setAnswers] = useState({});

  const onAnswer = (newAnswer) => setAnswers({ ...answers, ...newAnswer });

  const save = () => onSave(answers);

  return (
    <FormWrap>
      <h1 className="title">{survey_name}</h1>
      {sections.map((section) => (
        <SurveySection
          l={l}
          key={section.id}
          section={section}
          questions={questions}
          questionsResponses={questionsResponses}
          onAnswer={onAnswer}
        />
      ))}
      <Button onClick={save} className="is-primary">
        Finalizar
      </Button>
    </FormWrap>
  );
};

const SurveySection = ({
  l,
  section,
  questions,
  questionsResponses,
  onAnswer,
}) => {
  const {
    _id: { $oid: idSection },
    name,
  } = section;

  const sectionQuestions = questions.filter(
    (q) => q.survey_section_id.$oid === idSection
  );

  return (
    <div className="">
      <h3 className="subtitle">{name}</h3>
      {sectionQuestions.map((q) => (
        <SurveyQuestion
          l={l}
          key={q._id.$oid}
          question={q}
          questionsResponses={questionsResponses}
          onAnswer={onAnswer}
        />
      ))}
    </div>
  );
};

const SurveyQuestion = ({ l, question, questionsResponses, onAnswer }) => {
  const {
    _id: { $oid: idQuestion },
    name,
    type,
    survey_question_description: options = [],
  } = question;

  const response = questionsResponses.find(
    (q) => q.survey_question_id === idQuestion
  );

  return (
    <div className={classnames(styles.question, styles.question__compound)}>
      <div className="field">
        <label className="label">{name}</label>
        {type == "radio" && (
          <FieldRadio
            options={options}
            idQuestion={idQuestion}
            response={response}
            onAnswer={onAnswer}
          />
        )}
        {type == "checkbox" && (
          <FieldCheckbox
            options={options}
            idQuestion={idQuestion}
            response={response}
            onAnswer={onAnswer}
          />
        )}
      </div>
    </div>
  );
};

const FieldRadio = ({ options, idQuestion, response, onAnswer }) => {
  const selectedOption = response ? response.options.at(0) : null;

  return options.map(({ id, weight, value }) => (
    <div className="control ml-3">
      <label className="radio">
        <input
          type="radio"
          name={idQuestion}
          value={id}
          defaultChecked={selectedOption == id}
          onChange={() => onAnswer({ [idQuestion]: [id] })}
        />
        {value}
      </label>
    </div>
  ));
};

const FieldCheckbox = ({ options, idQuestion, onAnswer }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const onOptionSelected = (id) => {
    const copy = [...selectedOptions];

    if (copy.includes(id)) {
      pull(copy, id);
    } else {
      copy.push(id);
    }

    setSelectedOptions(copy);
    onAnswer({ [idQuestion]: copy });
  };

  return options.map(({ id, weight, value }) => (
    <div className="control ml-3">
      <label className="checkbox">
        <input
          type="checkbox"
          name={idQuestion}
          value={id}
          onChange={() => onOptionSelected(id)}
        />
        {value}
      </label>
    </div>
  ));
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
