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
answers = {
  [idQuestion]: [idOption]
}
*/
export const PostAnswers = (idSurvey, idSchedule, answers) => {
  //d("PostAnswers", idSurvey, idSchedule, j(answers));
  const url = buildUrl(`surveys/${idSurvey}/answers`);
  return axios.post(url, {
    idUser: getUserId(),
    idSurvey,
    idSchedule,
    answers,
  });
};

export const FetchAnswer = (idSurvey) => {
  const url = buildUrl(`surveys/${idSurvey}/answers`);
  return axios.get(url).then(({ data }) => data || {});
};
