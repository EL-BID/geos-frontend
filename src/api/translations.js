import axios from "axios";
import CONF from "~/api/index";
import { getUserToken, getUserId } from "~/api/utils";

const d = console.log;
const j = (m) => JSON.stringify(m, null, 4);

const getLang = () =>
  localStorage.getItem("lang") || process.env.DEFAULT_LOCALE;

const buildUrl = (locale, dictionary = "") =>
  CONF.ApiURL +
  `/api/v1/translation/${locale}/${dictionary}?access_token=${getUserToken()}&lang=${getLang()}`;

export default function ({ apiURL, translations }) {
  return {
    async getAll(lang) {
      const response = await fetch(`${apiURL}/${translations.read}/${lang}`);
      const data = await response.json();
      return data[0];
    },
  };
}

export const FetchLanguageDictionary = (locale, dictionary) => {
  const url = buildUrl(locale, dictionary);
  return axios
    .get(url)
    .then(({ data }) => data)
    .then(({ data }) => data)
    .then((data) => data[0]);
};

export const FetchLanguageDictionaryForCurrentLang = (dictionary) =>
  FetchLanguageDictionary(getLang(), dictionary);

export const UpdateLanguageDictionary = (locale, data, dictionary) => {
  const url = buildUrl(locale, dictionary);
  return axios.post(url, { data }).then((data) => data);
};
