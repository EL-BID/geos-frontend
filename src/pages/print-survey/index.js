import React, { useEffect, useState } from "react";
import classnames from "classnames";

import PageLayoutWrapper from "~/components/PageLayoutWrapper";

import {
  FetchSurvey,
  FetchAnswer,
  FetchQuestions,
  FetchSections,
  PostAnswers,
} from "~/api/Survey";

const d = console.log;
const j = (m) => JSON.stringify(m, null, 4);

const ChildrenWithGlobalProps = ({ l, user, survey, apiData }) => {
  const { id, schedule: schedules } = survey;
  const schedule = schedules[0];
  const { survey_name, survey_description: descr } = schedule;

  return (
    <div className={classnames("section")}>
      <h3 className="is-size-3">{survey_name}</h3>
      <p>{descr}</p>
    </div>
  );
};

const PrintSurvey = () => {
  // Extract the Survey ID from the URL
  const idSurvey = window.location.pathname.split("/").pop();

  const [survey, setSurvey] = useState(null);
  const [answer, setAnswer] = useState({});
  const [questionResponses, setQuestionResponses] = useState([]);

  //Id Watcher
  useEffect(() => {
    if (idSurvey) {
      FetchSurvey(idSurvey).then(setSurvey);
      FetchAnswer(idSurvey).then(({ survey_response, question_responses }) => {
        setAnswer(survey_response || {});
        setQuestionResponses(question_responses || []);
      });
    }
  }, [idSurvey]);

  return (
    <PageLayoutWrapper pageTitle="Print Survey">
      {survey && <ChildrenWithGlobalProps survey={survey} />}
    </PageLayoutWrapper>
  );
};

export default PrintSurvey;
