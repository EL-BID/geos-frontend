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
	return surveys.map((survey, idx) => {
		const {
			id: { $oid: idSurvey },
			type,
			schedule: schedules,
		} = survey;

		if (type == "context") {
			return null;
		}

		return (
			<div className="container mb-4" key={idSurvey}>
				<div className={classNames("", styles.box_main)}>
					{schedules.map((schedule) => (
						<Schedule
							l={l}
							lang={lang}
							schedule={schedule}
							survey={survey}
							user={user}
							school={school}
							contextSurvey={contextSurvey}
							setShowModalHowItWorks={setShowModalHowItWorks}
						/>
					))}
				</div>
			</div>
		);
	});
};

const Schedule = ({
	l,
	lang,
	schedule,
	survey,
	user,
	school,
	contextSurvey,
	setShowModalHowItWorks,
}) => {
	const {
		id: { $oid: idSurvey },
		type,
	} = survey;

	const {
		survey_name: name = null,
		survey_description: descr = null,
		answers = [],
	} = schedule;

	const completedAnswers = answers.filter((a) => a.results) || [];
	const hasAnswers = completedAnswers.length > 0;
	const showHowItWorks = type == "personal";

	const showPrintContextSurveyBtn = user._profile === "teacher";

	const surveyBtnLabel =
		answers.length > 0
			? "Resources.continueSurvey"
			: "Resources.answerSurvey";

	const gotToSurvey = (survey) => {
		setSelectedSurvey(survey);
		const { type } = survey;
		window.location =
			type == "personal" ? "survey-context" : "/responder-questionario";
	};

	return (
		<div>
			<div className="column is-full mb-2">
				<h1 className="is-size-3 has-text-weight-light mb-0">{name}</h1>
				{descr && <p className="mt-1">{descr}</p>}
			</div>
			{hasAnswers ? (
				<ScheduleAnswers
					l={l}
					lang={lang}
					answers={completedAnswers}
					survey={survey}
					user={user}
					school={school}
				/>
			) : (
				<Button
					className={classNames(
						"is-primary mb-0",
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
						{parse(l(surveyBtnLabel))}
					</span>
				</Button>
			)}
			<ScheduleActions
				l={l}
				survey={survey}
				contextSurvey={contextSurvey}
				setSelectedSurvey={setSelectedSurvey}
				showPrintContextSurveyBtn={showPrintContextSurveyBtn}
				showHowItWorks={showHowItWorks}
				setShowModalHowItWorks={setShowModalHowItWorks}
			/>
		</div>
	);
};

const ScheduleAnswers = ({ l, answers, lang, survey, user, school }) => {
	const openFeedback = (answer) => {
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

	const seeFeedbackLabel = l("Resources.accessDevolutive");

	return (
		<div className="column is-full pt-0 pb-0">
			<div className=" mb-2 mt-0">
				<div className="has-text-weight-bold is-size-6">
					{l("Resources.historicTitle")}
				</div>
			</div>

			<table className={classNames(
						"table pb-0",
						styles.resources__list
					)}
					width="100%">
				<thead>
					<tr>
						<th>{l("Resources.answered")}</th>
						<th width="85%">{l("Resources.devolutive")}</th>
					</tr>
				</thead>
				<tbody>
					{answers.map(
						(answer, idxAns) =>
							answer.type !== "Combined" && (
								<tr key={answer.id.$oid}>
									<td>
										{school &&
											isDirector(user) &&
											survey.type == "school" && [
												answer.user_name,
												" - ",
											]}
										{moment(answer.submitted_at).format(
											"DD/MM/YYYY"
										)}
									</td>
									<td>
										{j}
										<a
											className={styles.access_link}
											onClick={() => openFeedback(answer)}
										>
											<span className={styles.with_icon}>
												<i className="mr-1 far fa-file-pdf"></i>
												{seeFeedbackLabel}
											</span>
										</a>
									</td>
								</tr>
							)
					)}
				</tbody>
			</table>
		</div>
	);
};

const ScheduleActions = ({
	l,
	survey,
	contextSurvey,
	setSelectedSurvey,
	showPrintContextSurveyBtn,
	showHowItWorks,
	setShowModalHowItWorks,
}) => {
	const gotToPrintSurvey = (survey) => {
		setSelectedSurvey(survey);
		window.open("/imprimir-questionario", "_blank");
	};

	const gotToPrintSurveyContext = () => {
		const url = `/print/survey/${contextSurvey.id}`;
		window.open(url, "_blank");
	};

	return (
		<div className="columns mt-2">
			<div className="column">
				{/*Boton de Como funciona*/}
				{showHowItWorks && (
					<Button
						className={classNames(
							"is-small",
							styles.resources__buttons__button
						)}
						onClick={() => setShowModalHowItWorks(true)}
					>
						{l("LoginEducator.howWorks")}
					</Button>
				)}
				{showPrintContextSurveyBtn && (
					<Button
						className={classNames(
							"is-small",
							styles.resources__buttons__button
						)}
						onClick={() => gotToPrintSurveyContext()}
					>
						<span className={styles.with_icon}>
							<i className="fas fa-print mr-10"></i>
							{parse(l("Resources.printContext"))}
						</span>
					</Button>
				)}
				<Button
					className={classNames(
						"is-small",
						styles.resources__buttons__button
					)}
					onClick={() => gotToPrintSurvey(survey)}
				>
					<span className={styles.with_icon}>
						<i className="fas fa-print mr-10"></i>
						{parse(l("Resources.print"))}
					</span>
				</Button>
			</div>
		</div>
	);
};

export default SurveysList;
