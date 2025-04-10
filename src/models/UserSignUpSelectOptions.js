/**
 * These options can change by deployment
 */

export const GenderOptns = ({ GenderOptns: l }) => [
	{
		id: "male",
		label: l.male,
	},
	{
		id: "female",
		label: l.female,
	},
	{
		id: "other",
		label: l.other,
	},
	{
		id: "didnt_say",
		label: l.didnt_say,
	},
];

export const FormationLevelsOptns = ({ FormationLevelsOptns: l }) =>
	[
		{ id: "graduate" },
		{ id: "teacher_graduate" },
		{ id: "bachelor_degree" },
		{ id: "postgraduate" },
		{ id: "masters" },
		{ id: "phd" },
	].map((i) => ({ ...i, label: l[i.id] }));

export const InitialFormationOptns = ({ InitialFormationOptns: l }) =>
	[
		{ id: "early_childhood_teacher" },
		{ id: "primary_education_teacher" },
		{ id: "secondary_education_teacher" },
		{ id: "technical_teacher" },
		{ id: "other" },
	].map((i) => ({ ...i, label: l[i.id] }));

export const InternshipPracticeOptns = ({ InternshipPracticeOptns: l }) =>
	[
		{ id: "no" },
		{ id: "yes_observational" },
		{ id: "yes_non_explorative" },
		{ id: "yes_explorative" },
	].map((i) => ({ ...i, label: l[i.id] }));

export const CourseModalityOptns = ({ CourseModalityOptns: l }) =>
	[{ id: "on_site" }, { id: "online" }, { id: "mixed" }, { id: "none" }].map(
		(i) => ({ ...i, label: l[i.id] })
	);

export const FormationInTechOptns = ({ FormationInTechOptns: l }) =>
	[{ id: "on_site" }, { id: "online" }, { id: "mixed" }, { id: "no" }].map(
		(i) => ({ ...i, label: l[i.id] })
	);

export const YearsTeachingOptns = ({ YearsTeachingOptns: l }) =>
	[
		{ id: "between_1_and_3" },
		{ id: "between_4_and_6" },
		{ id: "between_7_and_9" },
		{ id: "more_than_10_years" },
	].map((i) => ({ ...i, label: l[i.id] }));

export const YearsUsingTechOptns = ({ YearsUsingTechOptns: l }) =>
	[
		{ id: "no" },
		{ id: "between_1_and_3" },
		{ id: "between_4_and_6" },
		{ id: "between_7_and_9" },
		{ id: "more_than_10_years" },
	].map((i) => ({ ...i, label: l[i.id] }));

export const TechApplicationOptns = ({ TechApplicationOptns: l }) =>
	[
		{
			id: "preparation_of_materials",
		},
		{
			id: "asynchronous_learning",
		},
		{
			id: "sending_emails",
		},
		{
			id: "develop_online_tasks_evaluations",
		},
		{
			id: "bureaucratic_and_planning_tasks",
		},
		{
			id: "conducting_research",
		},
		{
			id: "study_group",
		},
		{
			id: "use_of_tools",
		},
	].map((i) => ({ ...i, label: l[i.id] }));

export const StagesOptns = ({ StagesOptns: l }) =>
	[{ id: "early" }, { id: "primary" }, { id: "secondary" }].map((i) => ({
		...i,
		label: l[i.id],
	}));

//Groug by each Stage
export const KnowledgesOptns = ({ KnowledgesOptns: l }) =>
	[
		{
			stage: "early",
			options: [
				{ id: "early_art" },
				{ id: "early_communication" },
				{ id: "early_english" },
				{ id: "early_humanities" },
				{ id: "early_math" },
				{ id: "early_nature_sci" },
				{ id: "early_phys_ed" },
				{ id: "early_social_sci" },
				{ id: "early_spanish" },
				{ id: "early_tech" },
				{ id: "early_all" },
				{ id: "early_other" },
			],
		},
		{
			stage: "primary",
			options: [
				{ id: "primary_art" },
				{ id: "primary_communication" },
				{ id: "primary_english" },
				{ id: "primary_humanities" },
				{ id: "primary_math" },
				{ id: "primary_nature_sci" },
				{ id: "primary_phys_ed" },
				{ id: "primary_social_sci" },
				{ id: "primary_spanish" },
				{ id: "primary_tech" },
				{ id: "primary_all" },
				{ id: "primary_other" },
			],
		},
		{
			stage: "secondary",
			options: [
				{ id: "secondary_art" },
				{ id: "secondary_communication" },
				{ id: "secondary_english" },
				{ id: "secondary_humanities" },
				{ id: "secondary_math" },
				{ id: "secondary_nature_sci" },
				{ id: "secondary_phys_ed" },
				{ id: "secondary_social_sci" },
				{ id: "secondary_spanish" },
				{ id: "secondary_tech" },
				{ id: "secondary_all" },
				{ id: "secondary_other" },
			],
		},
	].map((i) => ({
		...i,
		options: i.options.map((o) => ({ ...o, label: l[o.id] })),
	}));
