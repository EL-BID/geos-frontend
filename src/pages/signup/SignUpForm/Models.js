/**
 *
 * Editing these models require also editing the backend models at
 * app/controllers/api/v1/users_controller.rb
 */

/**
 * Base user model applicable to all users
 */
export const UserModel = [
  "profile",
  "name",
  "email",
  "password",
  "born",
  "gender",
  "tos",
  "share_personal_data",
  "share_work_data",

  "country_id",
  "province_id",
  "state_id",
  "city_id",
  "school_id",
  "stages",
  "knowledges",

  "teacher_data",
  "principal_data",
];

/**
 * Teacher specific data model
 */
export const TeacherDataModel = [
  "formation_level",
  "year_finished_formation",
  "initial_formation",
  "internship_practice",
  "institution_initial_formation",
  "tech_in_teaching",
  "course_modality",
  "formation_in_tech",
  "years_teaching",
  "years_using_tech",
  "tech_application",
];

/**
 * Principal specific data model
 */
export const PrincipalDataModel = [];

// Add other models here...
