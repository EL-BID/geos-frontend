import React from "react";
import classNames from "classnames";
import parse from "html-react-parser";
import moment from "moment";
import styles from "../Resources.styl";

import { isDirector, isDirectorOrTeacher } from "~/helpers/users";
import {
  setSelectedSurvey,
  surveyAnswered,
  surveyStarted,
  surveyOutPeriod,
  surveyNextResponse,
} from "~/actions/survey";
import { getUserToken } from "~/api/utils";

import Button from "~/components/Button";

import CONF from "~/api/index";

const d = console.log;
const j = (m) => JSON.stringify(m, null, 4);

const SurveysList = ({
  l,
  lang,
  surveys,
  user,
  school,
  contextSurvey,
  setShowModalHowItWorks,
}) => {
  const gotToSurvey = (survey) => {
    setSelectedSurvey(survey);
    const { type } = survey;
    window.location =
      type == "personal" ? "survey-context" : "/responder-questionario";
  };

  const gotToPrintSurvey = (survey) => {
    setSelectedSurvey(survey);
    window.open("/imprimir-questionario", "_blank");
  };

  const gotToPrintSurveyContext = () => {
    const url = `/print/survey/${contextSurvey.id}`;
    window.open(url, "_blank");
  };

  const showPrintContextSurveyBtn = user._profile === "teacher";

  return surveys.map((survey, idx) => {
    const {
      id: { $oid: idSurvey },
      type,
      schedule,
    } = survey;

    if (type == "context") {
      return null;
    }

    const firstSchedule = schedule[0];
    const hasDescr = !!firstSchedule.survey_description;
    const showHowItWorks = type == "personal";
    const answer = firstSchedule.answers.find(
      (answer) =>
        answer.status === "Complete" && answer.user_id.$oid === user._id.$oid
    );
    const hasAnswer = !!answer;

    return (
      <div className="container mb-30" key={idSurvey}>
        <div className={classNames("columns is-multiline", styles.box_main)}>
          <div className="column is-full">
            <h1 className="is-size-3 has-text-weight-light mb-0">
              {firstSchedule.survey_name}
            </h1>
            {hasDescr && (
              <p className="mt-1">{firstSchedule.survey_description}</p>
            )}
          </div>
          {showHowItWorks && (
            <HowItWorks
              label={l("LoginEducator.howWorks")}
              setShowModalHowItWorks={setShowModalHowItWorks}
            />
          )}
          <div className="column is-full">
            {survey.is_cyclic && schedule.length > 0 && firstSchedule.name && (
              <h3 className="is-size-6">
                <span className="has-text-weight-bold">
                  {parse(l("Resources.currentCycle"))}:
                </span>{" "}
                {firstSchedule.name}
              </h3>
            )}
            {!surveyOutPeriod(survey) &&
              !surveyAnswered(survey, user) &&
              isDirectorOrTeacher(user) &&
              !hasAnswer && (
                // Boton de responder cuestionario
                <Button
                  className={classNames(
                    "is-primary ml-0",
                    styles.resources__buttons__button
                  )}
                  onClick={() => gotToSurvey(survey)}
                >
                  <span className={styles.with_icon}>
                    <i
                      className={classNames(
                        "fas fa-clipboard-list is-size-5 mr-10",
                        styles.fa
                      )}
                    ></i>
                    {surveyStarted(survey, user)
                      ? parse(l("Resources.continueSurvey"))
                      : parse(l("Resources.answerSurvey"))}
                  </span>
                </Button>
              )}
            {surveyOutPeriod(survey) &&
            !survey.is_cyclic &&
            isDirectorOrTeacher(user) ? (
              <div>
                <p>{parse(l("Resources.description1"))} </p>
              </div>
            ) : (
              <span>
                {showPrintContextSurveyBtn && (
                  <Button
                    className={classNames(styles.resources__buttons__button)}
                    onClick={() => gotToPrintSurveyContext()}
                  >
                    <span className={styles.with_icon}>
                      <i className="fas fa-print is-size-5 mr-10"></i>
                      {parse(l("Resources.printContext"))}
                    </span>
                  </Button>
                )}
                <Button
                  className={classNames(styles.resources__buttons__button)}
                  onClick={() => gotToPrintSurvey(survey)}
                >
                  <span className={styles.with_icon}>
                    <i className="fas fa-print is-size-5 mr-10"></i>
                    {parse(l("Resources.print"))}
                  </span>
                </Button>
              </span>
            )}
          </div>
          {hasAnswer && (
            <HasAnswer
              l={l}
              lang={lang}
              answer={answer}
              schedule={schedule}
              survey={survey}
              user={user}
              school={school}
            />
          )}
        </div>
      </div>
    );
  });
};

const HasAnswer = ({ l, schedule, lang, survey, answer, user, school }) => {
  const openFeedback = () => {
    window.open(
      CONF.ApiURL +
        "/api/v1/survey/feedback/" +
        survey.id +
        "/" +
        answer.id.$oid +
        "?access_token=" +
        getUserToken() +
        "&lang=" +
        lang,
      "target=_blank"
    );
  };

  return (
    <div>
      <div className="column is-8 is-offset-2 mt-30 mb-20">
        <div className="has-text-weight-bold is-size-6">
          {parse(l("Resources.historicTitle"))}
        </div>
      </div>
      <div className={classNames("column is-8 is-offset-2", styles.history)}>
        <div className="columns">
          {school && isDirector(user) && survey.type == "school" && (
            <div className="column has-text-weight-bold">
              {parse(l("Resources.cycle"))}
            </div>
          )}
          <div className="column has-text-weight-bold">
            {parse(l("Resources.answered"))}
          </div>
          <div className="column has-text-weight-bold">
            {parse(l("Resources.devolutive"))}
          </div>
        </div>
        {schedule.map(
          (schedule) =>
            schedule.answers &&
            schedule.answers.map((answer, idxAns) =>
              answer.status === "Complete" &&
              answer.user_id.$oid === user._id.$oid &&
              answer.type !== "Combined" ? (
                <div className="columns" key={answer.id.$oid}>
                  {school && isDirector(user) && survey.type == "school" && (
                    <div className="column">{schedule.name}</div>
                  )}
                  <div className="column">
                    {school &&
                      isDirector(user) &&
                      survey.type == "school" && [answer.user_name, " - "]}
                    {moment(answer.submitted_at).format("DD/MM/YYYY")}
                  </div>
                  <div className="column">
                    <a
                      className={styles.access_link}
                      onClick={() => openFeedback()}
                    >
                      <span className={styles.with_icon}>
                        {parse(l("Resources.accessDevolutive"))}
                        <i className="ml-10 far fa-file-pdf"></i>
                      </span>
                    </a>
                  </div>
                </div>
              ) : null
            )
        )}
      </div>
    </div>
  );
};

const HowItWorks = ({ label, setShowModalHowItWorks }) => {
  return (
    <div className="column is-full">
      <Button
        className={classNames("ml-0 mb-0", styles.resources__buttons__button)}
        onClick={() => setShowModalHowItWorks(true)}
      >
        {label}
      </Button>
    </div>
  );
};

export default SurveysList;
