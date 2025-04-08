import React, { useState, useEffect } from "react";

import { StagesOptns, KnowledgesOptns } from "~/models/UserSignUpSelectOptions";
import { c, j } from "~/helpers/Debug";

// Components
import Field from "~/components/Form/Field";
import DateField from "../FormElements/Date";
import SelectField from "../FormElements/Select";
import SelectMultiField from "../FormElements/SelectMulti";
import { concat, isArray, isEmpty, merge, pull } from "lodash";

const idsToObjs = (ids, allOptions) => {
	let idsArr = isArray(ids) ? ids : [];
	return idsArr.map((id) => allOptions.find((o) => o.id === id));
};

export default ({ l, s, user, onChange: oC }) => {
	const isTeacher = user._profile === "teacher";
	const stagesOptns = StagesOptns(s);
	const knowledgesOptnsLocalized = KnowledgesOptns(s);

	const [knowledgesOptns, setKnowledgesOptns] = useState([]);
	const [userStages, setUserStages] = useState(
		idsToObjs(user.stages, stagesOptns)
	);
	const [userKnowledges, setUserKnowledges] = useState([]);

	//User watcher - Init setup
	useEffect(() => {
		setupSelectKnowledges(user.stages);
		setupUserKnowledges(user.knowledges);
	}, [user.stages, user.knowledges]);

	const onStageChange = (_, { name, action, option, removedValue }) => {
		let copy = [...userStages];
		if (action == "remove-value") {
			pull(copy, removedValue);
		} else if (action == "select-option") {
			if (!copy.includes(option)) {
				copy.push({
					id: option.value,
					label: option.label,
				});
			}
		} else if (action == "clear") {
			copy = [];
		}

		const copyIds = copy.map(({ id }) => id);

		setUserStages(copy);
		setupSelectKnowledges(copyIds);
		setUserKnowledges([]);

		oC({ stages: copyIds, knowledges: [] });
	};

	const onKnowledgeChange = (_, { name, action, option, removedValue }) => {
		let copy = [...userKnowledges];
		if (action == "remove-value") {
			pull(copy, removedValue);
		} else if (action == "select-option") {
			if (!copy.includes(option)) {
				copy.push({
					id: option.value,
					label: option.label,
				});
			}
		} else if (action == "clear") {
			copy = [];
		}

		const copyIds = copy.map(({ id }) => id);

		setUserKnowledges(copy);
		oC({ knowledges: copyIds });
	};

	const setupSelectKnowledges = (stages) => {
		if (isEmpty(stages) || !isArray(stages)) {
			setKnowledgesOptns([]);
			return;
		}

		const knowledges = knowledgesOptnsLocalized
			.filter((k) => stages.includes(k.stage))
			.map((k) => k.options);

		setKnowledgesOptns(knowledges.flat());
	};

	const setupUserKnowledges = (userKnowledges) => {
		if (isEmpty(userKnowledges) || !isArray(userKnowledges)) {
			setUserKnowledges([]);
			return;
		}

		const knowledges = knowledgesOptnsLocalized
			.map((k) => k.options)
			.flat()
			.filter((k) => userKnowledges.includes(k.id));

		setUserKnowledges(knowledges);
	};

	return (
		<div className="box">
			<h2 className="title is-size-5">{l.laboral_data}</h2>
			<div className="columns">
				<div className="column">
					<SelectMultiField
						l={l}
						field={{
							name: "stages",
							value: userStages,
							onChange: onStageChange,
						}}
						title={l.label.stages}
						options={stagesOptns}
					/>
				</div>
				<div className="column">
					<SelectMultiField
						l={l}
						field={{
							value: userKnowledges,
							onChange: onKnowledgeChange,
						}}
						title={l.label.knowledges}
						options={knowledgesOptns}
					/>
				</div>
			</div>
		</div>
	);
};
