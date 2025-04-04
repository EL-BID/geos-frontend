import React, { useEffect, useMemo, useState } from "react";
import { injectIntl } from "react-intl";
import APIDataContainer from "~/containers/api_data";
import AccountsContainer from "~/containers/accounts";
import NonUserRedir from "~/containers/non_user_redir";
import styles from "./styles.styl";
import classnames from "classnames";

import Button from "~/components/Button"; // Components
import Field from "~/components/Form/Field";
import { isArray, pull, set } from "lodash";

const d = console.log;
const j = (m) => JSON.stringify(m, null, 4);

const OtherLabelLocalized = [
	/^Otr(o|a)(s)?$/i,
	/^Other(s)?$/i,
	/^Outr(a|o)(s)?$/i,
	/^Autre(s)?$/i,
];

let SHOW_CONDITIONED_QUESTION = false;

const Form = ({
	l,
	langDict: ld,
	survey,
	sections,
	questions,
	response,
	questionsResponses,
	onSave,
}) => {
	const { id, schedule: schedules } = survey;
	const schedule = schedules[0];
	const { survey_name } = schedule;
	const [localQuestionResponses, setLocalQuestionResponses] = useState(
		questionsResponses || []
	);

	const onAnswer = (newResponse) => {
		const copy = [...localQuestionResponses];
		const index = copy.findIndex(
			(q) =>
				q.survey_question_id.$oid ===
				newResponse.survey_question_id.$oid
		);
		if (index >= 0) {
			copy[index] = newResponse;
		} else {
			copy.push(newResponse);
		}
		setLocalQuestionResponses(copy);
	};

	const save = () => onSave(localQuestionResponses);

	useEffect(() => {
		setLocalQuestionResponses(questionsResponses);
	}, [questionsResponses]);

	return (
		<MainContentWrap>
			<h1 className="">{survey_name}</h1>
			{sections.map((section) => (
				<SurveySection
					langDict={ld}
					key={section.id}
					section={section}
					questions={questions}
					questionsResponses={localQuestionResponses}
					onAnswer={onAnswer}
				/>
			))}
			<Button onClick={save} className="is-primary">
				{ld.ui.btnContinue}
			</Button>
		</MainContentWrap>
	);
};

const SurveySection = ({
	langDict: ld,
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

	const wasPrelatedQuestionAnsweredCorrectly = (
		questionsResponses,
		idQuestion
	) => {
		const questionResponse = questionsResponses.find(
			(q) => q.survey_question_id.$oid === idQuestion
		);
		if (!questionResponse) return false;

		const { options } = questionResponse;
		if (!isArray(options)) return false;

		return options
			.map((i) => i.toString())
			.includes(
				process.env.CONTEXT_FORM_QUESTION_COURSES_LAST_YEAR_OPTION_YES_ID.toString()
			);
	};

	return (
		<div className="">
			<h3 className="subtitle">{name}</h3>
			{sectionQuestions.map((q) => {
				const {
					_id: { $oid: idQuestion },
				} = q;

				//Check if a specific question was answered with an specific option so we can show another question
				if (
					idQuestion ==
					process.env.CONTEXT_FORM_QUESTION_COURSES_LAST_YEAR_ID
				) {
					SHOW_CONDITIONED_QUESTION =
						wasPrelatedQuestionAnsweredCorrectly(
							questionsResponses,
							idQuestion
						);
				}

				return (
					<SurveyQuestion
						langDict={ld}
						key={idQuestion}
						idQuestion={idQuestion}
						question={q}
						questionsResponses={questionsResponses}
						onAnswer={onAnswer}
					/>
				);
			})}
		</div>
	);
};

const SurveyQuestion = ({
	langDict: ld,
	idQuestion,
	question,
	questionsResponses,
	onAnswer,
}) => {
	const { name, type, survey_question_description: options = [] } = question;

	// Hide specific question until another was answered a certain way
	if (
		idQuestion == process.env.CONTEXT_FORM_QUESTION_HOW_MANY_COURSES_ID &&
		!SHOW_CONDITIONED_QUESTION
	) {
		return null;
	}

	const response =
		questionsResponses.find(
			(q) => q.survey_question_id.$oid === idQuestion
		) || makeNewResponse(idQuestion);

	const hasOptionOther = options.find((o) =>
		OtherLabelLocalized.some((r) => r.test(o.value))
	);

	return (
		<div className={classnames(styles.question, styles.question__compound)}>
			<div className="field">
				<label className="label">{name}</label>
				{type == "radio" && (
					<FieldRadio
						langDict={ld}
						options={options}
						idQuestion={idQuestion}
						response={response}
						onAnswer={onAnswer}
						hasOptionOther={hasOptionOther}
					/>
				)}
				{type == "checkbox" && (
					<FieldCheckbox
						langDict={ld}
						options={options}
						idQuestion={idQuestion}
						response={response}
						onAnswer={onAnswer}
						hasOptionOther={hasOptionOther}
					/>
				)}
			</div>
		</div>
	);
};

const FieldRadio = ({
	langDict: ld,
	options,
	idQuestion,
	response,
	onAnswer,
	hasOptionOther = {},
}) => {
	const onOptionSelected = (id, isSelected) => {
		const copy = { ...response };

		if (isSelected) {
			copy.options = [id];
		} else {
			copy.options = [];
			copy.other_text = null;
		}

		onAnswer(copy);
	};

	return options.map(({ id: idAny, value }) => {
		const id = idAny.toString();
		const isOther = id == hasOptionOther.id;
		const isSelected = response.options.includes(id);

		return (
			<div className="control ml-3">
				<label className="radio">
					<input
						type="radio"
						name={idQuestion}
						value={id}
						defaultChecked={isSelected}
						onChange={({ target }) =>
							onOptionSelected(target.value, target.checked)
						}
					/>
					{value}
				</label>
				{isOther && (
					<OtherField
						langDict={ld}
						idQuestion={idQuestion}
						response={response}
						onChange={onAnswer}
						disabled={!isSelected}
					/>
				)}
			</div>
		);
	});
};

const FieldCheckbox = ({
	langDict: ld,
	options,
	idQuestion,
	response,
	onAnswer,
	hasOptionOther = {},
}) => {
	const onOptionSelected = (id, isSelected, isOther) => {
		const copy = { ...response };
		const { options } = copy;

		if (isSelected && !options.includes(id)) {
			options.push(id);
		} else {
			pull(options, id);
		}

		if (isOther && !isSelected) {
			copy.other_text = null;
		}

		copy.options = options;

		onAnswer(copy);
	};

	return options.map(({ id: idAny, value }) => {
		const id = idAny.toString();
		const isOther = id == hasOptionOther.id;
		const isSelected = response.options.includes(id);

		return (
			<div className="control ml-3">
				<label className="checkbox">
					<input
						type="checkbox"
						name={idQuestion}
						value={id}
						defaultChecked={isSelected}
						onChange={({ target }) => {
							onOptionSelected(
								target.value,
								target.checked,
								isOther
							);
						}}
					/>
					{value}
				</label>
				{isOther && (
					<OtherField
						langDict={ld}
						idQuestion={idQuestion}
						response={response}
						onChange={onAnswer}
						disabled={!isSelected}
					/>
				)}
			</div>
		);
	});
};

const OtherField = ({ langDict, idQuestion, response, onChange, disabled }) => {
	const otherText = response.other_text || "";

	return (
		<Field
			type="text"
			style={{ width: "100%" }}
			name={idQuestion + `__other`}
			value={otherText}
			maxLength={100}
			onChange={(e) =>
				onChange({ ...response, other_text: e.target.value })
			}
			disabled={disabled}
			placeholder={langDict.ui.indique}
		/>
	);
};

const MainContentWrap = ({ children }) => {
	return (
		<form id="questionForm">
			<div className={classnames("section", styles.section_questions)}>
				<div className="container">
					<div className="columns">
						<div className="column">{children}</div>
					</div>
				</div>
			</div>
		</form>
	);
};

const makeNewResponse = (idQuestion) => {
	return {
		survey_question_id: { $oid: idQuestion },
		options: [],
		other_text: null,
	};
};

export default injectIntl(
	(APIDataContainer, AccountsContainer, NonUserRedir)(Form)
);
