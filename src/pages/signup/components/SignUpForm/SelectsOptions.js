/**
 * These options can change by deployment
 */

const GenderOptns = [
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
    id: "prefer_not_to_say",
    label: "SignUpForm.GenderOptns.prefer_not_to_say",
  },
];

const FormationLevelsOptns = [
  { id: "graduate", label: "SignUpForm.FormationLevelsOptns.graduate" },
  {
    id: "teacher_graduate",
    label: "SignUpForm.FormationLevelsOptns.teacher_graduate",
  },
  {
    id: "bachelor_degree",
    label: "SignUpForm.FormationLevelsOptns.bachelor_degree",
  },
  { id: "postgraduate", label: "SignUpForm.FormationLevelsOptns.postgraduate" },
  { id: "masters", label: "SignUpForm.FormationLevelsOptns.masters" },
  { id: "phd", label: "SignUpForm.FormationLevelsOptns.phd" },
];

const InitialFormationOptns = [
  { id: "Maestro de Primera Infancia", label: "Maestro de Primera Infancia" },
  {
    id: "Maestro de Educación Primaria",
    label: "Maestro de Educación Primaria",
  },
  { id: "Profesor de Educación Media", label: "Profesor de Educación Media" },
  { id: "Maestro / Profesor Técnico", label: "Maestro / Profesor Técnico" },
  { id: "Otro", label: "Otro" },
];

const CourseModalityOptns = [
  { id: "Presencial", label: "Presencial" },
  { id: "Online", label: "Online" },
  { id: "Ambas", label: "Ambas" },
  { id: "No", label: "No" },
];

const YesNoOptns = [
  { id: "Sí", label: "Sí" },
  { id: "No", label: "No" },
];

const YearsOptns = [
  { id: "Entre 1 y 3", label: "Entre 1 y 3" },
  { id: "Entre 4 y 6", label: "Entre 4 y 6" },
  { id: "Entre 7 y 9", label: "Entre 7 y 9" },
  { id: "Más de 10 años", label: "Más de 10 años" },
];

const CargoDocenteOptns = [
  { id: "Efectivo", label: "Efectivo" },
  { id: "Interino", label: "Interino" },
  { id: "Suplente", label: "Suplente" },
];

const OneToSevenOptns = [
  { id: "1", label: "1" },
  { id: "2", label: "2" },
  { id: "3", label: "3" },
  { id: "4", label: "4" },
  { id: "5", label: "5" },
  { id: "6", label: "6" },
  { id: "7", label: "7" },
];

module.exports = {
  GenderOptns,
  FormationLevelsOptns,
};
