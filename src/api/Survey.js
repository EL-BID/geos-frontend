import axios from "axios";
import CONF from "~/api/index";
import { getUserToken, getUserId } from "~/api/utils";

const d = console.log;
const j = (m) => JSON.stringify(m, null, 4);

const getLang = () =>
  localStorage.getItem("lang") || process.env.DEFAULT_LOCALE;

const buildUrl = (endpoint) =>
  CONF.ApiURL +
  `/api/v1/${endpoint}?access_token=${getUserToken()}&lang=${getLang()}`;

export const FetchAllSurveys = () => {
  const url = buildUrl("surveys");
  return axios
    .get(url)
    .then(({ data }) => data || {})
    .then((data) => data.surveys || []);
};

export const FetchSurvey = (idSurvey) => {
  return FetchAllSurveys().then((surveys) =>
    surveys.find((s) => s.id === idSurvey)
  );
};

export const FetchContextSurvey = () => {
  return FetchAllSurveys().then((surveys) =>
    surveys.find((s) => s.type === "context")
  );
};

export const FetchSections = (idSurvey) => {
  const url = buildUrl(`surveys/${idSurvey}/sections`);
  return axios.get(url).then(({ data }) => data || []);
};

export const FetchQuestions = (idSurvey) => {
  const url = buildUrl(`surveys/${idSurvey}/questions`);
  return axios.get(url).then(({ data }) => data);
};

/*
answers = Array of response_answeres
*/
export const PostAnswers = (idSurvey, idSchedule, responses) => {
  const url = buildUrl(`surveys/${idSurvey}/answers`);
  return axios.post(url, {
    idUser: getUserId(),
    idSurvey,
    idSchedule,
    responses,
  });
};

export const FetchAnswer = (idSurvey) => {
  const url = buildUrl(`surveys/${idSurvey}/answers`);
  return axios.get(url).then(({ data }) => data || {});
};

//Copied from their code
export const FetchSurveysLegacy = () =>
  axios
    .get(
      CONF.ApiURL +
        "/api/v1/survey/surveys_list?access_token=" +
        getUserToken() +
        "&lang=" +
        getLang(),
      {}
    )
    .then(({ data }) => {
      const { surveys = [] } = data;
      return surveys;
    });
