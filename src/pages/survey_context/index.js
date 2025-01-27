import React, { useEffect, useState } from "react";

import PageHeader from "~/components/Header/PageHeader";
import PageLayoutWrapper from "~/components/PageLayoutWrapper";

import {
  FetchContextSurvey,
  FetchAnswer,
  FetchQuestions,
  FetchSections,
  PostAnswers,
} from "~/api/Survey";

import Form from "./Form";

const d = console.log;
const j = (m) => JSON.stringify(m, null, 4);

const SurveyContext = ({}) => {
  const [survey, setSurvey] = useState(null);
  const [sections, setSections] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [answer, setAnswer] = useState({});
  const [questionsResponses, setQuestionsResponses] = useState([]);

  //On Mount
  useEffect(() => {
    FetchContextSurvey().then(setSurvey);
  }, []);

  //Sections Watcher
  useEffect(() => {
    if (survey) {
      const { id: idSurvey } = survey;
      FetchSections(idSurvey).then(setSections);
      FetchQuestions(idSurvey).then(setQuestions);
      FetchAnswer(idSurvey).then(({ answer, questionsResponses }) => {
        setAnswer(answer || {});
        setQuestionsResponses(questionsResponses || []);
      });
    }
  }, [survey]);

  const onSave = (answers) =>
    PostAnswers(survey.id, survey.schedule[0].id.$oid, answers).then(
      () => (window.location.href = "/recursos")
    );

  return (
    <PageLayoutWrapper pageTitle="Context Survey">
      <Header />
      {survey && (
        <Form
          survey={survey}
          sections={sections}
          questions={questions}
          answer={answer}
          questionsResponses={questionsResponses}
          onSave={onSave}
        />
      )}
    </PageLayoutWrapper>
  );
};

const Header = ({ user }) => {
  return (
    <section className="section pb-0">
      <div className="container">
        <div className="columns">
          <div className="column">
            <PageHeader user={user} />
          </div>
        </div>
      </div>
    </section>
  );
};

SurveyContext.propTypes = {};

export default SurveyContext;

//export default injectIntl(
//  compose(APIDataContainer, AccountsContainer, NonUserRedir)(SurveyContext)
//);
