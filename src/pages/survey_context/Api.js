import axios from "axios";
import CONF from "~/api/index";
import { getUserToken, getUserId } from "~/api/utils";

const getLang = () =>
  localStorage.getItem("lang") || process.env.DEFAULT_LOCALE;

export const FetchContextSurvey = () => {
  const url =
    CONF.ApiURL +
    `/api/v1/survey/surveys_list?access_token=${getUserToken()}&lang=${getLang()}`;

  return axios
    .get(url)
    .then(({ data }) => data.surveys || [])
    .then((surveys) => surveys.find((s) => s.type === "context"));
};
