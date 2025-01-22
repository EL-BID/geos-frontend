import axios from "axios";

const buildUrl = (apiURL, route, userToken, lang) => {
  const accessToken = `?access_token=${userToken}`;
  return apiURL + `/api/v1/survey/` + route + accessToken + `&lang=${lang}`;
};

export const GetSection = (idSection, apiURL, userToken, lang) => {
  const route = `sections/` + idSection;
  const URL_REQUEST = buildUrl(apiURL, route, userToken, lang);
  return axios.get(URL_REQUEST).then(({ data }) => data);
};

export const CreateSection = (data, apiURL, userToken, lang) => {
  const route = "sections/";
  const URL_REQUEST = buildUrl(apiURL, route, userToken, lang);
  return axios.post(URL_REQUEST, data);
};

export const UpdateSection = (idSection, data, apiURL, userToken, lang) => {
  const route = "sections/" + idSection;
  const URL_REQUEST = buildUrl(apiURL, route, userToken, lang);
  return axios.patch(URL_REQUEST, data);
};

export const CreateQuestion = (data, apiURL, userToken, lang) => {
  const route = "questions/";
  const URL_REQUEST = buildUrl(apiURL, route, userToken, lang);
  return axios.post(URL_REQUEST, data);
};
