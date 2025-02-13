import React, { useEffect, useState } from "react";

import PageHeader from "~/components/Header/PageHeader";
import PageLayoutWrapper from "~/components/PageLayoutWrapper";
import Button from "~/components/Button";

import {
  FetchContextSurvey,
  FetchAnswer,
  FetchQuestions,
  FetchSections,
  PostAnswers,
} from "~/api/Survey";

import Form from "./Form";
import introStyles from "./introduction.css";

import { FetchLanguageDictionaryForCurrentLang } from "~/api/translations";

const d = console.log;
const j = (m) => JSON.stringify(m, null, 4);

const SurveyContext = ({ lang }) => {
  const [survey, setSurvey] = useState(null);
  const [sections, setSections] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [answer, setAnswer] = useState({});
  const [questionsResponses, setQuestionsResponses] = useState([]);
  const [began, setBegan] = useState(false);
  const [contextualLangDict, setContextualLangDict] = useState(null);

  //On Mount
  useEffect(() => {
    FetchContextSurvey().then(setSurvey);
    FetchLanguageDictionaryForCurrentLang("context-survey").then(
      setContextualLangDict
    );
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
      () => (window.location.href = "/responder-questionario")
    );

  if (!contextualLangDict) {
    return null;
  }

  return (
    <div id={introStyles.context_survey}>
      {!began && (
        <Introduction
          setBegan={setBegan}
          lang={lang}
          langDict={contextualLangDict}
        />
      )}
      {began && survey && (
        <Form
          langDict={contextualLangDict}
          survey={survey}
          sections={sections}
          questions={questions}
          answer={answer}
          questionsResponses={questionsResponses}
          onSave={onSave}
        />
      )}
    </div>
  );
};

const Introduction = ({ lang, langDict: { Introduction: l }, setBegan }) => {
  const img = (name) => `/images/context_survey/${name}-${lang}.png`;
  const label = (str) => str;

  return (
    <div className="section" id={introStyles.introduction}>
      <div className="container">
        <div className="columns">
          <div className="column">
            <h1 className="title">{label(l.Title)}</h1>
            <h2>{label(l.About.Title)}</h2>
            <p>{label(l.About.Descr)}</p>
            <h2>{label(l.S1.Title)}</h2>
            <p>{label(l.S1.Descr)}</p>
            <h3>1. {label(l.S1.SS1.Title)}</h3>
            <p>{label(l.S1.SS1.Descr)}</p>
            <h3>1. {label(l.S1.SS2.Title)}</h3>
            <p>{label(l.S1.SS2.Descr)}</p>
            <img src={img(`01`)} />
            <i>{label(l.S1.caption1)}</i>
            <i>{label(l.S1.caption2)}</i>
            <hr />
            <h2>{label(l.S2.Title)}</h2>
            <p>{label(l.S2.P1)}</p>
            <p>{label(l.S2.P2)}</p>
            <p>{label(l.S2.P3)}</p>
            <p>{label(l.S2.P4)}</p>
            <h3>{label(l.S2.SS1)}</h3>
            <p>{label(l.S2.P5)}</p>
            <h3>{label(l.S2.SS2)}</h3>
            <p>{label(l.S2.P6)}</p>
            <h3>{label(l.S2.SS3)}</h3>
            <p>{label(l.S2.P7)}</p>
            <img src={img(`02`)} />
            <hr />
            <Button onClick={() => setBegan(true)} className="is-primary mt-4">
              {label(l.btnStart)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Header = ({ user }) => {
  return (
    <section className="section">
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

//SurveyContext.propTypes = {};

export default () => {
  return (
    <PageLayoutWrapper pageTitle="Context Survey">
      <Header />
      <SurveyContext />
    </PageLayoutWrapper>
  );
};
