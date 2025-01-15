import axios from "axios";

export const CreateSection = (section, apiURL, userToken, lang) => {
  const route = "/api/v1/survey/section/";
  const accessToken = `?access_token=${userToken}`;
  const URL_REQUEST = apiURL + route + accessToken + `&lang=${lang}`;
  return axios.post(URL_REQUEST, section);
};
