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
  [{ id: "primary_1" }, { id: "primary_2" }, { id: "primary_3" }].map((i) => ({
    ...i,
    label: l[i.id],
  }));

//Groug by each Stage
export const KnowledgesOptns = ({ KnowledgesOptns: l }) =>
  [
    {
      stage: "primary_1",
      options: [
        { id: "primary_1_english" },
        { id: "primary_1_phys_ed" },
        { id: "primary_1_all" },
      ],
    },
    {
      stage: "primary_2",
      options: [
        { id: "primary_2_english" },
        { id: "primary_2_phys_ed" },
        { id: "primary_2_all" },
      ],
    },
    {
      stage: "primary_3",
      options: [
        { id: "primary_3_english" },
        { id: "primary_3_phys_ed" },
        { id: "primary_3_all" },
      ],
    },
  ].map((i) => ({
    ...i,
    options: i.options.map((o) => ({ ...o, label: l[o.id] })),
  }));
