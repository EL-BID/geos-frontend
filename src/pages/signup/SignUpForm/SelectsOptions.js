/**
 * These options can change by deployment
 */

export const GenderOptns = [
  {
    id: "male",
    label: "SignUpForm.GenderOptns.male",
  },
  {
    id: "female",
    label: "SignUpForm.GenderOptns.female",
  },
  {
    id: "other",
    label: "SignUpForm.GenderOptns.other",
  },
  {
    id: "didnt_say",
    label: "SignUpForm.GenderOptns.didnt_say",
  },
];

export const FormationLevelsOptns = [
  { id: "graduate" },
  { id: "teacher_graduate" },
  { id: "bachelor_degree" },
  { id: "postgraduate" },
  { id: "masters" },
  { id: "phd" },
];
for (const opt of FormationLevelsOptns) {
  opt.label = `SignUpForm.FormationLevelsOptns.${opt.id}`;
}

export const InitialFormationOptns = [
  { id: "early_childhood_teacher" },
  { id: "primary_education_teacher" },
  { id: "secondary_education_teacher" },
  { id: "technical_teacher" },
  { id: "other" },
];
for (const opt of InitialFormationOptns) {
  opt.label = `SignUpForm.InitialFormationOptns.${opt.id}`;
}

export const InternshipPracticeOptns = [
  { id: "no" },
  { id: "yes_observational" },
  { id: "yes_non_explorative" },
  { id: "yes_explorative" },
];
for (const opt of InternshipPracticeOptns) {
  opt.label = `SignUpForm.InternshipPracticeOptns.${opt.id}`;
}

export const CourseModalityOptns = [
  { id: "on_site" },
  { id: "online" },
  { id: "mixed" },
  { id: "none" },
];
for (const opt of CourseModalityOptns) {
  opt.label = `SignUpForm.CourseModalityOptns.${opt.id}`;
}

export const FormationInTechOptns = [
  { id: "on_site" },
  { id: "online" },
  { id: "mixed" },
  { id: "no" },
];
for (const opt of FormationInTechOptns) {
  opt.label = `SignUpForm.FormationInTechOptns.${opt.id}`;
}

export const YearsTeachingOptns = [
  { id: "between_1_and_3" },
  { id: "between_4_and_6" },
  { id: "between_7_and_9" },
  { id: "more_than_10_years" },
];
for (const opt of YearsTeachingOptns) {
  opt.label = `SignUpForm.YearsTeachingOptns.${opt.id}`;
}

export const YearsUsingTechOptns = [
  { id: "no" },
  { id: "between_1_and_3" },
  { id: "between_4_and_6" },
  { id: "between_7_and_9" },
  { id: "more_than_10_years" },
];
for (const opt of YearsUsingTechOptns) {
  opt.label = `SignUpForm.YearsUsingTechOptns.${opt.id}`;
}

export const TechApplicationOptns = [
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
];
for (const opt of TechApplicationOptns) {
  opt.label = `SignUpForm.TechApplicationOptns.${opt.id}`;
}

export const StagesOptns = [
  { id: "primary_1" },
  { id: "primary_2" },
  { id: "primary_3" },
];
for (const opt of StagesOptns) {
  opt.label = `SignUpForm.StagesOptns.${opt.id}`;
}

//Groug by each Stage
export const KnowledgesOptns = [
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
];

for (const opt of KnowledgesOptns) {
  for (const subopt of opt.options) {
    subopt.label = `SignUpForm.KnowledgesOptns.${subopt.id}`;
  }
}


