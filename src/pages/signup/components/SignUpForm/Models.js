/**
 *
 * Editing these models require also editing the backend models at
 * app/controllers/api/v1/users_controller.rb
 */

/**
 * Base user model applicable to all users
 */
const UserModel = [
  "profile",
  "name",
  "email",
  "password",
  "born",
  "gender",
  "term",

  "country",
  "province",
  "state",
  "city",
  "school",
];

/**
 * Teacher specific data model
 */
const TeacherDataModel = [
  "formation_level",
  "year_finished_formation",
  //   "initial_formation",
  //   "technology_in_teaching_and_learning",
  //   "cont_educ_in_the_use_of_digital_technologies",
  //   "years_teaching",
  //   "years_of_uses_technology_for_teaching",
  //   "technology_application",
  //   "cargo_docente",
  //   "grado_docente",
];

/**
 * Principal specific data model
 */
const PrincipalDataModel = [];

// Add other models here...

module.exports = {
  UserModel,
  TeacherDataModel,
  PrincipalDataModel,
};
