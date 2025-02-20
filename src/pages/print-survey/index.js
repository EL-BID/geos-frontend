import React, { useEffect, useState } from "react";
import classnames from "classnames";

import PageLayoutWrapper from "~/components/PageLayoutWrapper";

import { FetchSurvey, FetchAnswer, FetchQuestions } from "~/api/Survey";

const d = console.log;
const j = (m) => JSON.stringify(m, null, 4);

const ChildrenWithGlobalProps = ({
  l,
  user,
  survey,
  questions,
  answer,
  questionResponses,
}) => {
  const { id, schedule: schedules } = survey;
  const schedule = schedules[0];
  const { survey_name, survey_description: descr } = schedule;

  return (
    <div className={classnames("section")}>
      <h3 className="is-size-3 mb-1">{survey_name}</h3>
      <p>{descr}</p>
      {questions.map((q, index) => {
        return (
          <Question
            key={index}
            question={q}
            questionResponses={questionResponses}
          />
        );
      })}
    </div>
  );
};

const Question = ({ question, questionResponses }) => {
  const {
    _id: { $oid: idQuestion },
    name,
    type,
    survey_question_description: options = [],
  } = question;

  const response = questionResponses.find(
    (qr) => qr.survey_question_id.$oid === idQuestion
  ) || { options: [] };
  const selectedOptns = response.options;

  return (
    <div className="mt-4">
      <h4 className="is-size-5 mb-1">{name}</h4>
      <ul>
        {(options || []).map((option, index) => (
          <QuestionOption
            key={index}
            option={option}
            selectedOptns={selectedOptns}
          />
        ))}
      </ul>
    </div>
  );
};

const QuestionOption = ({ option, selectedOptns }) => {
  const { id, weight, value } = option;
  const isSelected = selectedOptns.includes(id);
  const cls = isSelected ? "has-text-weight-bold" : "has-text-grey-dark";
  const char = isSelected ? "✓" : "";
  return (
    <ol className={cls}>
      {char} {value}
    </ol>
  );
};

const PrintSurvey = () => {
  // Extract the Survey ID from the URL
  const idSurvey = window.location.pathname.split("/").pop();

  const [survey, setSurvey] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answer, setAnswer] = useState({});
  const [questionResponses, setQuestionResponses] = useState([]);

  //Id Watcher
  useEffect(() => {
    if (idSurvey) {
      FetchSurvey(idSurvey).then(setSurvey);
      FetchQuestions(idSurvey).then(setQuestions);
      FetchAnswer(idSurvey).then(({ survey_response, question_responses }) => {
        setAnswer(survey_response || {});
        setQuestionResponses(question_responses || []);
      });
    }
  }, [idSurvey]);

  return (
    <PageLayoutWrapper pageTitle="Print Survey">
      {survey && (
        <ChildrenWithGlobalProps
          survey={survey}
          questions={questions}
          answer={answer}
          questionResponses={questionResponses}
        />
      )}
    </PageLayoutWrapper>
  );
};

export default PrintSurvey;
